// Voltage Editorial design: navigation-first layout, navy ink, Zap cyan, amber wayfinding, and DM Mono metadata.
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, BookOpen, Check, ChevronRight, Command, Copy, Menu, Search, X } from "lucide-react";

const logoSrc = "/manus-storage/zap-logo_dbceddfd.jpg";
const heroTexture = "/manus-storage/zap-hero-field_fa9e733f.png";
const atlasTexture = "/manus-storage/zap-code-atlas_6bec9d95.png";
const sectionTexture = "/manus-storage/zap-section-pattern_e29d1e6c.png";

const sections = [
  { label: "Getting Started", count: "03", items: [["Introduction", "introduction"], ["Installation", "installation"], ["Quick Start", "quick-start"]] },
  { label: "Language Guide", count: "06", items: [["Syntax Basics", "syntax"], ["Control Flow", "control-flow"], ["Functions", "functions"], ["Types & Values", "types"], ["Classes", "classes"], ["Modules", "modules"]] },
  { label: "Standard Library", count: "04", items: [["Built-in Functions", "built-ins"], ["Data & JSON", "data-json"], ["HTTP Client", "http"], ["File System", "filesystem"]] },
  { label: "Community", count: "03", items: [["Contributing", "contributing"], ["Roadmap", "roadmap"], ["Ecosystem", "ecosystem"]] },
];

const allDocs = sections.flatMap((section) => section.items.map(([title, slug]) => ({ title, slug, section: section.label })));
const searchMeta: Record<string, string> = {
  introduction: "beginner guide language overview learning path",
  installation: "install cli setup version doctor toolchain",
  "quick-start": "hello world first program run command tutorial",
  syntax: "variables values expressions braces types",
  "control-flow": "if else for loops decisions repetition conditions",
  functions: "fn parameters return composition reuse",
  types: "strings integers floats booleans arrays optional values",
  classes: "state behavior constructor invariants objects",
  modules: "imports exports public api files organization",
  "built-ins": "standard library print inspect collections map filter reduce",
  "data-json": "json decode encode payload response api data",
  http: "http client requests headers timeout status api",
  filesystem: "files read write paths configuration storage",
  contributing: "issues pull requests tests community development",
  roadmap: "milestones priorities diagnostics tooling future",
  ecosystem: "libraries packages editor templates integrations tools",
};
const searchDocs = allDocs.map((doc) => ({ ...doc, searchText: `${doc.title} ${doc.section} ${searchMeta[doc.slug] ?? ""}` }));

function Header({ onMenu }: { onMenu: () => void }) {
  const [, navigate] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => normalizedQuery ? searchDocs.filter((doc) => doc.searchText.toLowerCase().includes(normalizedQuery)) : [], [normalizedQuery]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const selectResult = (slug: string) => { navigate(`/docs/${slug}`); setSearchOpen(false); setQuery(""); };
  return <header className="site-header">
    <div className="header-inner">
      <button className="mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
      <Link href="/" className="brand">
        <span className="brand-mark"><img src={logoSrc} alt="Zap logo" /></span>
        <span className="brand-copy"><strong>Zap</strong><span>Documentation</span></span>
      </Link>
      <nav className="top-links" aria-label="Primary navigation">
        <Link href="/docs/introduction">Introduction</Link><Link href="/docs/syntax">Syntax Basics</Link><Link href="/docs/built-ins">Standard Library</Link><Link href="/docs/roadmap">Roadmap</Link>
      </nav>
      <div className="header-actions">
        <button className="search-trigger" onClick={() => setSearchOpen((open) => !open)} aria-label="Search documentation" aria-expanded={searchOpen}><Search size={16} /><span>Search docs</span><kbd><Command size={11} /> K</kbd></button>
        <a className="github-link" href="https://github.com/hidecard/zap" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
      </div>
      {searchOpen && <><div className="search-backdrop" onClick={() => setSearchOpen(false)} /><div className="search-panel"><div className="search-panel-head"><Search size={17} /><input autoFocus placeholder="Search titles, topics, or keywords" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && results[0]) selectResult(results[0].slug); }} /><button onClick={() => { setSearchOpen(false); setQuery(""); }} aria-label="Close search"><X size={17} /></button></div>{query ? <div className="search-results">{results.length ? results.map((doc) => <button key={doc.slug} onClick={() => selectResult(doc.slug)}><span><strong>{doc.title}</strong><small>{doc.section} · {searchMeta[doc.slug]}</small></span><ChevronRight size={15} /></button>) : <p>No matching pages. Try a title, concept, or command.</p>}</div> : <p className="search-hint">Search titles, topics, code concepts, or commands.</p>}</div></>}
    </div>
  </header>;
}

function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const [location, navigate] = useLocation();
  const active = location.split("/")[2] || "introduction";
  return <aside className={`docs-sidebar ${mobileOpen ? "is-open" : ""}`}>
    <div className="sidebar-top"><span className="eyebrow">Field guide / 01</span><button className="sidebar-close" onClick={onClose} aria-label="Close navigation"><X size={17} /></button><p>Everything you need to build with Zap.</p></div>
    <div className="sidebar-scroll">{sections.map((section, index) => <div className="sidebar-section" key={section.label}><div className="section-heading"><span className="section-index">0{index + 1}</span><span>{section.label}</span><b>{section.count}</b></div>{section.items.map(([title, slug]) => <Link key={slug} href={`/docs/${slug}`} onClick={(event) => { event.preventDefault(); navigate(`/docs/${slug}`); onClose(); }} className={`sidebar-link ${active === slug ? "active" : ""}`}><span>{title}</span>{active === slug && <ChevronRight size={15} />}</Link>)}</div>)}</div>
    <div className="sidebar-footer"><span className="status-dot" /> Zap v2.0.4 · stable release</div>
  </aside>;
}

function Home() {
  const [, navigate] = useLocation();
  return <div className="home-page">
    <section className="hero hero-redesign" style={{ backgroundImage: `linear-gradient(90deg, rgba(246,251,253,.97) 0%, rgba(246,251,253,.87) 52%, rgba(246,251,253,.28) 100%), url(${heroTexture})` }}>
      <div className="hero-inner">
        <div className="hero-kicker"><span className="kicker-line" /> ZAP / LANGUAGE SYSTEM <span className="kicker-code">v2.0.4 stable</span></div>
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-mark"><img src={logoSrc} alt="Zap" /></div>
            <span className="eyebrow hero-eyebrow">A field guide for builders</span>
            <h1>Build boldly.<br /><em>Learn clearly.</em></h1>
            <p>A beginner-friendly language for Web, Mobile, AI, and IoT, with a direct route from your first `.zp` file to a working project.</p>
            <div className="hero-actions"><button className="button-primary" onClick={() => navigate("/docs/introduction")}>Start with the guide <ArrowUpRight size={17} /></button><button className="button-quiet" onClick={() => navigate("/docs/installation")}>Install Zap <ChevronRight size={17} /></button></div>
            <div className="hero-proof"><span><b>01</b> Read the model</span><span><b>02</b> Run the example</span><span><b>03</b> Make it yours</span></div>
          </div>
          <aside className="hero-panel"><div className="hero-panel-top"><span>LIVE ROUTE</span><span className="signal-dot" /></div><strong>From first line<br />to clear system.</strong><p>Follow the sequence, keep the signal, and build with less ceremony.</p><button onClick={() => navigate("/docs/quick-start")}>Open quick start <ArrowUpRight size={15} /></button></aside>
        </div>
        <div className="hero-index"><span>01</span><span>Learn the language</span><span>→</span></div>
      </div>
    </section>
    <section className="launch-section launch-redesign"><div className="section-lead"><span className="eyebrow">The route</span><h2>Choose your<br /><span>next signal.</span></h2><p>Each path is a focused loop: understand one idea, run one example, then move forward with confidence.</p><div className="section-note"><span className="signal-dot" /> 16 lessons · one readable system</div></div><div className="launch-grid">{sections.slice(0, 3).map((section, index) => <article key={section.label} className={`launch-card card-${index + 1}`} style={{ backgroundImage: index === 1 ? `linear-gradient(140deg, rgba(255,255,255,.94), rgba(238,248,250,.86)), url(${sectionTexture})` : undefined }}><div className="card-top"><span>0{index + 1}</span><span>{section.count} lessons</span></div><h3>{section.label}</h3><ul>{section.items.slice(0, 3).map(([title, slug]) => <li key={slug}><button onClick={() => navigate(`/docs/${slug}`)}>{title}<ChevronRight size={15} /></button></li>)}</ul><button className="card-link" onClick={() => navigate(`/docs/${section.items[0][1]}`)}>Open section <ArrowUpRight size={14} /></button></article>)}</div></section>
    <section className="code-band code-redesign" style={{ backgroundImage: `linear-gradient(110deg, rgba(8,20,38,.98), rgba(11,36,58,.9)), url(${atlasTexture})` }}><div className="code-band-inner"><div><span className="eyebrow cyan">The first signal</span><h2>Small syntax.<br /><span>Serious range.</span></h2><p>Zap starts with a readable line and scales toward structured systems, modules, and services.</p><button className="band-link" onClick={() => navigate("/docs/syntax")}>Read the syntax guide <ArrowUpRight size={15} /></button></div><div className="code-card"><div className="code-bar"><span><i /> <i /> <i /></span><small>hello.zp</small><span className="code-label">ZAP</span></div><pre><code><span className="code-muted">01</span> <span className="code-keyword">say</span> <span className="code-string">"Hello from Zap"</span><br /><span className="code-muted">02</span> <span className="code-keyword">for</span> item <span className="code-keyword">in</span> [<span className="code-string">"web"</span>, <span className="code-string">"ai"</span>]:<br /><span className="code-muted">03</span>     <span className="code-keyword">say</span> item</code></pre></div></div></section>
    <footer className="site-footer site-footer-redesign"><div className="footer-brand"><img src={logoSrc} alt="Zap" /><div><strong>Zap Documentation</strong><span>Keep the signal clear.</span></div></div><div className="footer-columns"><div><span className="footer-label">Navigate</span><a href="/docs/introduction">Introduction</a><a href="/docs/installation">Installation</a><a href="/docs/syntax">Syntax basics</a></div><div><span className="footer-label">Project</span><a href="https://github.com/hidecard/zap/releases" target="_blank" rel="noreferrer">Releases</a><a href="https://github.com/hidecard/zap/blob/master/CHANGELOG_EN.md" target="_blank" rel="noreferrer">Changelog</a><a href="https://github.com/hidecard/zap" target="_blank" rel="noreferrer">Source on GitHub</a></div><div><span className="footer-label">Community</span><a href="https://discord.gg/j9DHdCtJE" target="_blank" rel="noreferrer">Discord</a><a href="https://t.me/zap_lang" target="_blank" rel="noreferrer">Telegram</a><a href="mailto:hello@zap-lang.dev">Contact the team</a></div></div><div className="footer-bottom"><span>© 2026 Zap Language Project</span><span>Built for the next clear idea <ArrowUpRight size={13} /></span></div></footer>
  </div>;
}

function renderBody(text: string) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    return match ? <a key={`${match[2]}-${index}`} className="doc-inline-link" href={match[2]} target="_blank" rel="noreferrer">{match[1]}</a> : part;
  });
}

function highlightZap(code: string) {
  const tokenPattern = /(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:let|fn|if|else|for|in|while|break|continue|return|class|extends|new|module|import|as|export|async|await|try|catch|raise|and|or|not)\b|\b(?:text|number|bool|list|map|none|any|Result|Option|result|option)\b|\b(?:true|false)\b|\b\d+(?:\.\d+)?\b)/g;
  return code.split(tokenPattern).map((part, index) => {
    if (!part) return null;
    let className = "";
    if (part.startsWith("#")) className = "zap-comment";
    else if (part.startsWith("\"") || part.startsWith("'")) className = "zap-string";
    else if (/^\d/.test(part)) className = "zap-number";
    else if (/^(true|false)$/.test(part)) className = "zap-bool";
    else if (/^(text|number|bool|list|map|none|any|Result|Option|result|option)$/.test(part)) className = "zap-type";
    else if (/^(let|fn|if|else|for|in|while|break|continue|return|class|extends|new|module|import|as|export|async|await|try|catch|raise|and|or|not)$/.test(part)) className = "zap-keyword";
    return className ? <span key={part + "-" + index} className={className}>{part}</span> : <span key={part + "-" + index}>{part}</span>;
  });
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return <div className="inline-code"><div className="inline-code-top"><span className="code-label">ZAP</span><button className="copy-code" onClick={handleCopy} type="button" aria-label={copied ? "Code copied" : "Copy code"}>{copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}</button></div><pre><code>{highlightZap(code)}</code></pre></div>;
}

function DocsPage() {
  const [location] = useLocation();
  const slug = location.split("/")[2] || "introduction";
  const doc = allDocs.find((item) => item.slug === slug) ?? allDocs[0];
  const [prev, next] = [allDocs[allDocs.indexOf(doc) - 1], allDocs[allDocs.indexOf(doc) + 1]];
  const [release, setRelease] = useState({ version: "v2.0.4", linux: "https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-linux-x86_64.tar.gz", macos: "https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-macos-arm64.tar.gz", windows: "https://github.com/hidecard/zap/releases/download/v2.0.4/zap-2.0.4-windows-x86_64.zip", changelog: "https://github.com/hidecard/zap/blob/master/CHANGELOG_EN.md" });
  useEffect(() => {
    if (slug !== "installation") return;
    fetch("https://api.github.com/repos/hidecard/zap/releases/latest").then((res) => res.json()).then((data) => {
      if (!data.tag_name || !data.assets) return;
      const find = (p: string) => data.assets.find((a: any) => a.name.includes(p))?.browser_download_url;
      setRelease({ version: data.tag_name, linux: find("linux") || release.linux, macos: find("macos") || release.macos, windows: find("windows") || release.windows, changelog: `https://github.com/hidecard/zap/releases/tag/${data.tag_name}` });
    }).catch(() => {});
  }, [slug]);
  type Lesson = { intro: string; blocks: [string, string, string?][] };
  const lessonContent: Record<string, Lesson> = {
    introduction: { intro: "Zap is a small, readable, general-purpose programming language with .zp source files and a standalone native runtime. It is designed to make programming approachable while providing a clear path from small scripts to structured applications.", blocks: [["What Zap is", "A Zap program is a sequence of statements separated by new lines. The runtime is intentionally small: source files are easy to read, blocks use indentation, and the CLI provides one consistent workflow for running, checking, formatting, testing, and building projects.", "say \"Hello from Zap\""], ["The mental model", "Think of every lesson as a loop: name the value, express the rule, run the example, then inspect the result. Zap supports text, number, bool, list, map, and none values before you need more advanced abstractions."], ["Your first practice", "Create hello.zp, run it with zap hello.zp, then change the message and run it again. If the output changes, you have completed the first useful feedback loop.", "zap hello.zp"]] },
    installation: { intro: "Zap is distributed as a standalone native executable. No separate language runtime is required. Download the archive for your system, extract it, and add the zap command to your PATH.", blocks: [["Supported targets", "Official releases are published for Linux x86_64, Windows x86_64, and macOS ARM64. Select the asset that matches your computer's architecture.", "zap --version"], [`Downloads (${release.version})`, `Download the archive for your platform: [Linux x86_64](${release.linux}), [macOS ARM64](${release.macos}), or [Windows x86_64](${release.windows}). View the [official changelog](${release.changelog}) for recent updates.`], ["Linux & macOS", "Extract the .tar.gz archive and run the included install.sh script. On macOS, you may need to grant execute permission to the installer first.", "tar -xzf zap-v2.0.4-linux.tar.gz\nbash install.sh"], ["Windows", "Download the .zip archive, extract it to a folder like C:\\Zap, and run install_windows.bat from Command Prompt as a normal user.", "cd C:\\Zap\ninstall_windows.bat"]] },
    "quick-start": { intro: "The quickest way to understand Zap is to run a first program. Zap source files use the .zp extension and are executed directly from the command line.", blocks: [["Create a file", "Save a new file named hello.zp. Zap programs are a sequence of statements separated by new lines, so the smallest program needs no boilerplate function.", "say \"Hello, Zap\""], ["Run and inspect", "Use the zap command followed by your filename. The runtime executes the code in one step. Change the string, run again, and use the output as your first feedback loop.", "zap hello.zp\nzap --version\nzap --help"], ["Project workflow", "For larger projects, zap init creates a scaffold, zap check validates structure and types, zap fmt formats source, and zap test runs assertions.", "zap init my-project\nzap check .\nzap fmt main.zp\nzap test ."], ["When something fails", "Read the file and line reported by the diagnostic, make the smallest correction, then run zap check . again. Do not hide an error by deleting the example; use it to learn the rule that was violated."], ["Practice", "Create a tiny score program with a number, an if branch, and a say statement. Run it once, change the score, and confirm the branch changes."]] },
    syntax: { intro: "Zap syntax is designed to be scanned quickly. Blocks are defined by a colon and indentation, and comments begin with the # symbol.", blocks: [["Statements and comments", "Write one statement per line. A comment begins with # and continues to the end of that line. Comments explain intent and are ignored by the runtime.", "# This line is ignored\nsay \"One statement\""], ["Blocks & indentation", "A colon opens a block and the following lines must be indented consistently. Four spaces per level are recommended. Mixing tabs and spaces or reducing indentation early produces a syntax error.", "if true:\n    say \"Inside the block\""], ["Variables", "Use let for a new binding and ordinary assignment when changing an existing binding. Keep one name responsible for one concept.", "let language = \"Zap\"\nlet version = 2\nversion = 3"], ["Type annotations", "Annotations are optional. Use text, number, bool, list, map, none, or any when a boundary needs an explicit contract.", "let name: text = \"Zap\"\nlet port: number = 8080"], ["Check before running", "Use zap check . to catch indentation, name, and type problems before the program reaches runtime. Use zap check --json . when an editor or automation tool needs structured diagnostics.", "zap check .\nzap check --json ."]] },
    "control-flow": { intro: "Control flow lets a Zap program make decisions and repeat work. Conditions are expressions, and loops provide explicit iteration over collections or ranges.", blocks: [["Conditions", "Use if and else with a colon. The indented branch runs only when its expression is true. Logical operators are and, or, and not.", "let score = 85\nif score >= 80:\n    say \"Excellent\"\nelse:\n    say \"Keep practicing\""], ["Several branches", "Use an else-if chain when more than two outcomes are possible. Put the most specific test first and keep the final else as a safe fallback.", "if score >= 90:\n    say \"A\"\nelse if score >= 80:\n    say \"B\"\nelse:\n    say \"Keep practicing\""], ["for loops", "for walks through a list or range. The loop variable receives one value at a time, and the body describes the work for that value.", "for item in [\"web\", \"ai\"]:\n    say item\n\nfor number in range(3):\n    say number"], ["while, break, and continue", "while repeats until its condition becomes false. Use break to stop immediately and continue to skip the current iteration. Always update the loop state or it may never finish.", "let count = 0\nwhile count < 3:\n    count = count + 1\n    if count == 2:\n        continue\n    say count"], ["Practice", "Print only even numbers from 0 through 10, then add a branch that labels values greater than 6. The goal is to combine a loop, a condition, and a changing variable."]] },
    functions: { intro: "Functions are the main unit of reuse in Zap. They support parameters, return values, local scope, nested functions, and closures.", blocks: [["Declaration", "The fn keyword introduces a function. Parameters are listed in parentheses and -> declares the return type. A function without an explicit return produces none.", "fn add(a: number, b: number) -> number:\n    return a + b\n\nsay add(4, 6)"], ["Arguments and defaults", "Zap binds ordinary arguments positionally. A parameter can provide a default with =, and named arguments are supported. Required parameters must be supplied.", "fn greet(name: text = \"World\", punctuation: text = \"!\"):\n    return \"Hello, \" + name + punctuation\n\nsay greet()\nsay greet(\"Zap\", \".\")"], ["Scope and closures", "A nested function can read a value from its enclosing function. Keep captured state small and give each function one responsibility.", "fn make_greeting(prefix: text):\n    fn greet(name: text):\n        return prefix + \", \" + name\n    return greet(\"Developer\")"], ["Async and await", "Prefix a function with async to return a deterministic Future. Use await to unwrap its value. The current runtime executes async bodies deterministically.", "async fn answer() -> number:\n    return 42\n\nlet value = await answer()"], ["Common mistakes", "Check argument count, parameter types, and return paths. A function that promises a number should not return text, and callers should not assume a value exists when a function returns none."]] },
    types: { intro: "Zap's type system provides a balance between script-like flexibility and application-scale safety. A type describes what kind of value a name contains and which operations are safe to perform.", blocks: [["The seven core types", "Zap documents text for strings, number for integers, bool for true/false values, list for ordered collections, map for key/value records, none for an intentional empty value, and any when a boundary accepts different kinds of values.", "let title: text = \"Zap\"\nlet count: number = 3\nlet ready: bool = true\nlet tags: list = [\"lang\"]\nlet user: map = {\"id\": 1}\nlet empty: none = none"], ["How to declare values", "Use let for a new name. The type can be inferred from the right-hand value or written after the colon when you want the contract to be visible.", "let inferred = 8080\nlet port: number = 8080\nlet enabled: bool = true"], ["Collections", "A list is indexed from zero and keeps an ordered sequence. A map stores values under keys and is accessed with bracket lookup. Use len, keys, contains, and get to inspect them safely.", "let languages = [\"Zap\", \"Rust\"]\nlet profile = {\"name\": \"Developer\"}\nsay languages[0]\nsay profile[\"name\"]"], ["Result and Option", "Result models success or failure with ok and err. Option models presence or absence with some and option_none. Use unwrap_or for a safe fallback instead of assuming a value exists.", "let result: result<number> = ok(42)\nlet missing: option<text> = option_none()\nsay unwrap_or(result, 0)"], ["Type mistakes", "The checker reports an annotation mismatch, such as assigning text to a number. Run zap check . before executing a project so type mistakes are found near their source.", "let port: number = \"8080\"  # invalid\nzap check ."], ["Practice", "Declare a map for a learner with name, age, and active fields. Add a list of two topics, read the first topic, and use type(...) to inspect the values."]] },
    classes: { intro: "Classes group state and behavior around a concept. Zap provides a beginner-friendly OOP foundation with constructors, methods, and inheritance.", blocks: [["Definition and init", "A class defines an init method for initialization. The first parameter of every method is self, which refers to the current object. Store state on self so other methods can use it.", "class User:\n    fn init(self, name):\n        self.name = name\n\n    fn greet(self):\n        return \"Hello, \" + self.name"], ["Create and use objects", "Call new with the class name and constructor arguments. Then call a method with dot syntax. Keep initialization complete so the object is valid immediately.", "let user = new(\"User\", \"Zap\")\nsay user.greet()"], ["Inheritance", "Use extends to reuse behavior from a parent class. A child method with the same name overrides the parent implementation.", "class Animal:\n    fn speak(self):\n        return \"sound\"\n\nclass Dog extends Animal:\n    fn speak(self):\n        return \"woof\""], ["Common mistakes", "Do not forget self in a method declaration, and do not access a field before init assigns it. Prefer small methods that protect the object's invariants."]] },
    modules: { intro: "Modules keep Zap projects navigable and maintainable. Zap uses explicit module declarations and deterministic imports to avoid accidental exposure.", blocks: [["Declaration and exports", "A source file declares its logical name with module. Only names marked export are available to importers; private helpers stay inside the module.", "module app.core\n\nexport fn version():\n    return \"2.0\"\n\nfn private_helper():\n    return \"internal\""], ["Imports and aliases", "Import a module by its dotted path and give it a local alias. The dotted path maps to a .zp file under the configured module root.", "module app.main\nimport app.core as core\n\nsay core.version()"], ["Workspace manifest", "The zap.toml manifest declares the project entry and module root. Entries must be relative .zp files that exist below the root.", "[package]\nname = \"workspace-demo\"\nmain = \"main.zp\"\n\n[module]\nroot = \"modules\"\nentries = [\"app/core.zp\"]"], ["Safety rules", "Absolute paths, traversal-like paths, duplicate entries, missing entries, and circular imports are rejected. New libraries should use explicit module and import/export syntax instead of legacy path-style imports."]] },
    "built-ins": { intro: "The standard library provides dependable building blocks for text, math, collections, paths, time, and environment access. Learn the small helpers first; they compose well in larger programs.", blocks: [["Text and math", "Use upper, lower, trim, split, abs, min, max, pow, and sqrt for common transformations. Keep conversions close to the input boundary so the rest of the program sees clean values.", "say upper(\"zap\")\nsay trim(\"  ready  \" )\nsay abs(-8)\nsay max(4, 9)"], ["Collections", "Use len for size, contains for membership, keys for map keys, join for combining text, and sort or reverse for ordering. Confirm a key exists before indexing a map when input is untrusted.", "let items = [\"b\", \"a\"]\nsay len(items)\nsay sort(items)\nsay join(items, \",\")"], ["Environment and paths", "Use env and has_env for configuration, path_join for portable paths, and exists before reading optional files. Keep system access at the edge of your application.", "if has_env(\"PATH\"):\n    say env(\"PATH\")\n\nlet path = path_join(\"data\", \"note.txt\")\nsay exists(path)"], ["Practice", "Build a small summary function that accepts a list of scores and returns its length, minimum, maximum, and total. Then sort a copy and print the result."]] },
    "data-json": { intro: "JSON is the primary data exchange format for Zap. The standard library includes built-ins for encoding and decoding structured data at configuration and API boundaries.", blocks: [["Encoding", "The json function converts a Zap value, usually a map or list, into a JSON string. Build the map first, then encode the stable public shape rather than an internal object with private fields.", "let data = {\"ok\": true, \"count\": 2}\nsay json(data)"], ["Decoding", "The from_json function parses a JSON string back into a Zap value. Read the expected keys after decoding and treat missing or malformed input as an error case.", "let user = from_json(\"{\\\"name\\\": \\\"Zap\\\"}\")\nsay user[\"name\"]"], ["Round trips", "Encoding and decoding should preserve the values your boundary needs. Test both a normal payload and an empty list or map so the receiving code does not depend on one shape only.", "let payload = {\"items\": [1, 2, 3]}\nlet restored = from_json(json(payload))\nsay restored[\"items\"]"], ["Common mistakes", "Do not treat JSON text as a map before calling from_json, and do not assume every external field exists. Validate the shape near the boundary and pass typed, useful values inward."]] },
    http: { intro: "Zap provides a practical HTTP client for interacting with web services and APIs. Build requests, handle responses, and manage timeouts.", blocks: [["Build the request", "Keep the URL, method, headers, and timeout explicit. A timeout protects the rest of the program when a remote service stops responding.", "let response = http.get(url, timeout: 5000)"], ["Read the response", "Check status before decoding the body. A successful response can be converted with from_json, while a non-success response should become a useful error with status context.", "if response.status == 200:\n    let data = from_json(response.body)\nelse:\n    return err(\"request failed\")"], ["Retry deliberately", "Retries should be limited and should not repeat unsafe operations blindly. Start with one request, log the status and endpoint, then add a bounded retry policy only when the API contract supports it."], ["Practice", "Call a public JSON endpoint, check for a successful status, decode the body, and print one field. Then add a fallback message for a missing field or failed request."]] },
    filesystem: { intro: "File I/O in Zap is explicit and workspace-confined. Read and write text or line-based data at the edge of your program.", blocks: [["Text files", "Use read_text and write_text for simple file access. Paths are resolved against the active project workspace, so application code can keep file access predictable.", "write_text(\"note.txt\", \"Zap\")\nsay read_text(\"note.txt\")"], ["Line-based I/O", "Use read_lines and write_lines when each line is a separate record. These helpers work naturally with lists and handle newlines for you.", "let items = read_lines(\"data.txt\")\nwrite_lines(\"out.txt\", [\"one\", \"two\"])"], ["Paths and existence", "Use path_join instead of manually concatenating separators, and exists before reading optional data. Handle missing files as an expected branch rather than an unexpected crash.", "let path = path_join(\"data\", \"config.zp\")\nif exists(path):\n    say read_text(path)"], ["Safety", "Runtime workspace confinement prevents reads and writes from escaping the project directory through parent traversal. Validate user-provided names before creating paths."]] },
    contributing: { intro: "Contributions are welcome for the Zap runtime, standard library, documentation, and tooling. The project favors readable syntax and deterministic diagnostics.", blocks: [["Start with a reproducible problem", "Describe the current behavior, expected behavior, Zap version, operating system, command, and smallest source file that shows the issue. A precise report is easier to verify and fix.", "zap --version\nzap check --json ."], ["Implement the smallest change", "Fork the repository, create a focused branch, and keep unrelated formatting or refactors out of the pull request. Update the relevant English and Burmese docs when behavior is user-visible.", "git checkout -b fix/clear-diagnostic"], ["Quality gates", "Run formatting, clippy, native tests, and the relevant Zap examples before opening a pull request. Add a regression test for every bug that could return.", "cargo fmt --check\ncargo clippy\ncargo test"], ["Review principles", "Zap favors readable syntax, safe handling of malformed input, bounded resource usage, deterministic diagnostics, and a clear path for beginners.", "git diff --check"]] },
    roadmap: { intro: "The Zap roadmap focuses on a stable language core, a welcoming learning path, and practical integrations for web, AI, and IoT.", blocks: [["Stable core", "The P1 core includes the native Rust runtime, direct AST execution, and Result/Option foundations. These layers make the language useful before adding a large ecosystem.", "zap --version"], ["Tooling and packages", "The next layer expands registry resolution, async foundations, LSP/editor integration, diagnostics, and cross-platform release packaging. Follow the official changelog for the current release sequence."], ["Future directions", "Domain-specific libraries for web, mobile, and IoT should be built on top of the stable language core instead of being mixed into beginner syntax. This keeps the first lesson simple while leaving room for serious systems.", "v2.1 package reliability"], ["How to follow progress", "Read the changelog, compare release tags, and run the documented examples against the version installed on your machine. When behavior differs, report the exact version and command used."]] },
    ecosystem: { intro: "The Zap ecosystem includes the official CLI, the VS Code extension, and a growing collection of community libraries and templates.", blocks: [["Editor support", "The official Zap Language Support extension provides syntax highlighting, snippets, diagnostics, and LSP integration. Install it in VS Code, then open a .zp file to confirm the language mode activates.", "code --install-extension ArkarYan.zap-language-support"], ["Registry and packages", "Zap P2 provides deterministic registry resolution with exact and compatible version ranges over HTTPS. Prefer a pinned version for reproducible builds and read the package's supported Zap range.", "zap install"], ["Community channels", "Use the Discord or Telegram communities to ask questions, share examples, and follow language development. When asking for help, include the Zap version and a minimal source file.", "https://discord.gg/j9DHdCtJE"], ["Practice", "Choose one small command-line tool, describe its inputs and outputs, then decide whether it belongs in one file, a module, or a reusable package. Document that decision for the next contributor."]] },
  };
  const content: Lesson = lessonContent[slug] ?? { intro: `${doc.title} is part of the Zap field guide. This page collects the concepts, examples, and decisions you need to move forward with confidence.`, blocks: [["Keep it practical", "Read one concept, try one example, then use the adjacent pages to deepen your understanding."], ["Follow the route", "The sidebar keeps related topics close so you always have a clear next step."]] };
  return <div className="docs-page"><div className="docs-breadcrumb"><span>DOCS</span><ChevronRight size={14} /><span>{doc.section.toUpperCase()}</span><ChevronRight size={14} /><strong>{doc.title}</strong></div><div className="doc-title-row"><div><span className="eyebrow">{doc.section} / {String(allDocs.indexOf(doc) + 1).padStart(2, "0")}</span><h1>{doc.title}</h1></div><span className="read-time">6 min read · v2.1.0 syntax</span></div><p className="doc-intro">{content.intro}</p><div className="doc-rule" />{content.blocks.map(([title, body, code], index) => <section className="doc-section" key={title}><span className="doc-number">0{index + 1}</span><div><h2>{title}</h2><p>{renderBody(body)}</p>{code && <CodeBlock code={code} />}</div></section>)}<div className="doc-nav">{prev ? <Link href={`/docs/${prev.slug}`}><small>PREVIOUS</small><span>← {prev.title}</span></Link> : <span />}{next ? <Link href={`/docs/${next.slug}`}><small>NEXT</small><span>{next.title} →</span></Link> : <span />}</div></div>;
}

function DocsLayout({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  return <><div className={`mobile-nav-backdrop ${mobileOpen ? "is-visible" : ""}`} onClick={onClose} aria-hidden="true" /><div className="app-shell"><Sidebar mobileOpen={mobileOpen} onClose={onClose} /><main className="docs-main"><DocsPage /></main></div></>;
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const isDocs = location.startsWith("/docs/");
  return <><Header onMenu={() => setMobileOpen(true)} />{isDocs ? <DocsLayout mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} /> : <Home />}</>;
}
