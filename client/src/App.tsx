// Voltage Editorial design: navigation-first layout, navy ink, Zap cyan, amber wayfinding, and DM Mono metadata.
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, BookOpen, ChevronRight, Command, Menu, Search, X } from "lucide-react";

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
        <a className="github-link" href="https://github.com/hidecard/ZAP-Docs" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
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
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(246,251,253,.96) 0%, rgba(246,251,253,.82) 55%, rgba(246,251,253,.35) 100%), url(${heroTexture})` }}><div className="hero-inner"><div className="hero-kicker"><span className="kicker-line" /> ZAP / LANGUAGE SYSTEM <span className="kicker-code">v2.0.4 stable</span></div><div className="hero-content"><div className="hero-mark"><img src={logoSrc} alt="Zap" /></div><h1>Build boldly.<br /><em>Learn clearly.</em></h1><p>A beginner-friendly language for Web, Mobile, AI, and IoT — with documentation that keeps the signal clear.</p><div className="hero-actions"><button className="button-primary" onClick={() => navigate("/docs/introduction")}>Start with the guide <ArrowUpRight size={17} /></button><button className="button-quiet" onClick={() => navigate("/docs/syntax")}>Explore syntax <ChevronRight size={17} /></button></div></div><div className="hero-index"><span>01</span><span>Learn the language</span><span>→</span></div></div></section>
    <section className="launch-section"><div className="section-lead"><span className="eyebrow">The map</span><h2>Everything in<br /><span>one clear route.</span></h2><p>From your first variable to a deployed service, the Zap docs are organized around the way you actually learn.</p></div><div className="launch-grid">{sections.slice(0, 3).map((section, index) => <article key={section.label} className={`launch-card card-${index + 1}`} style={{ backgroundImage: index === 1 ? `linear-gradient(140deg, rgba(255,255,255,.94), rgba(238,248,250,.86)), url(${sectionTexture})` : undefined }}><div className="card-top"><span>0{index + 1}</span><span>{section.count} pages</span></div><h3>{section.label}</h3><ul>{section.items.slice(0, 3).map(([title, slug]) => <li key={slug}><button onClick={() => navigate(`/docs/${slug}`)}>{title}<ChevronRight size={15} /></button></li>)}</ul><button className="card-link" onClick={() => navigate(`/docs/${section.items[0][1]}`)}>Open section <ArrowUpRight size={14} /></button></article>)}</div></section>
    <section className="code-band" style={{ backgroundImage: `linear-gradient(110deg, rgba(8,20,38,.98), rgba(11,36,58,.9)), url(${atlasTexture})` }}><div className="code-band-inner"><div><span className="eyebrow cyan">A first signal</span><h2>Your first program<br /><span>should feel easy.</span></h2><p>Start with a readable language, then keep going when your ideas get bigger.</p></div><div className="code-card"><div className="code-bar"><span><i /> <i /> <i /></span><small>hello.zap</small><span className="code-label">ZAP</span></div><pre><code><span className="code-muted">01</span> <span className="code-keyword">fn</span> <span className="code-name">main</span>() {'{'}<br /><span className="code-muted">02</span>   <span className="code-keyword">print</span>(<span className="code-string">"Hello, world."</span>)<br /><span className="code-muted">03</span> {'}'}</code></pre></div></div></section>
    <footer className="site-footer"><div><img src={logoSrc} alt="Zap" /><span>Zap Documentation</span></div><p>Keep the signal clear.</p><a href="https://github.com/hidecard/ZAP-Docs" target="_blank" rel="noreferrer">Source on GitHub <ArrowUpRight size={14} /></a></footer>
  </div>;
}

function DocsPage() {
  const [location] = useLocation();
  const slug = location.split("/")[2] || "introduction";
  const doc = allDocs.find((item) => item.slug === slug) ?? allDocs[0];
  const [prev, next] = [allDocs[allDocs.indexOf(doc) - 1], allDocs[allDocs.indexOf(doc) + 1]];
  type Lesson = { intro: string; blocks: [string, string, string?][] };
  const lessonContent: Record<string, Lesson> = {
    introduction: { intro: "Zap is a small, readable, general-purpose programming language with .zp source files and a standalone native runtime. It is designed to make programming approachable while providing a clear path from small scripts to structured applications.", blocks: [["A clear signal", "Zap uses indentation-based blocks, readable keywords, explicit modules, optional type annotations, and structured Result/Option values. It focuses on a small core that stays out of your way.", "say \"Hello from Zap\""], ["The learning path", "This guide moves from installation to values, control flow, functions, modules, and practical projects. Each lesson adds one concept without hiding the code behind ceremony."]] },
    installation: { intro: "Zap is distributed as a standalone native executable. No separate language runtime is required. Download the archive for your system, extract it, and add the zap command to your PATH.", blocks: [["Supported targets", "Official releases are published for Linux x86_64, Windows x86_64, and macOS ARM64. Select the asset that matches your computer's architecture.", "zap --version"], ["Linux & macOS", "Extract the .tar.gz archive and run the included install.sh script. On macOS, you may need to grant execute permission to the installer first.", "tar -xzf zap-v2.0.4-linux.tar.gz\nbash install.sh"], ["Windows", "Download the .zip archive, extract it to a folder like C:\\Zap, and run install_windows.bat from Command Prompt as a normal user.", "cd C:\\Zap\ninstall_windows.bat"]] },
    "quick-start": { intro: "The quickest way to understand Zap is to run a first program. Zap source files use the .zp extension and are executed directly from the command line.", blocks: [["Create a file", "Save a new file named hello.zp. Zap programs are a sequence of statements separated by new lines.", "say \"Hello, Zap\""], ["Run the program", "Use the zap command followed by your filename. The runtime compiles and executes the code in one step.", "zap hello.zp"], ["Project workflow", "For larger projects, use zap init to create a scaffold, zap check to validate types, and zap test to run assertions.", "zap init my-project\nzap check .\nzap test ."]] },
    syntax: { intro: "Zap syntax is designed to be scanned quickly. Blocks are defined by a colon and indentation, and comments begin with the # symbol.", blocks: [["Blocks & Indentation", "Consistent indentation is required inside every if, loop, function, and class body. Four spaces per level are recommended.", "if true:\n    say \"Inside the block\""], ["Variables", "Use let to declare a new variable. Zap supports text, integer numbers, booleans, lists, maps, and none.", "let language = \"Zap\"\nlet version = 2\nlet ready = true"], ["Type annotations", "Annotations are optional but helpful for boundaries. Supported names include text, number, bool, list, map, none, and any.", "let name: text = \"Zap\"\nlet port: number = 8080"]] },
    "control-flow": { intro: "Control flow lets a Zap program make decisions and repeat work. Conditions are expressions, and loops provide explicit iteration over collections or ranges.", blocks: [["Conditions", "Use if and else with a colon. Logical operators are and, or, and not.", "let score = 85\nif score >= 80:\n    say \"Excellent\"\nelse:\n    say \"Keep practicing\""], ["Loops", "for iterates over a list or range, while while repeats while a condition is true. Use break and continue to control the loop execution.", "for item in [\"web\", \"ai\"]:\n    say item\n\nlet count = 0\nwhile count < 3:\n    say count\n    count = count + 1"]] },
    functions: { intro: "Functions are the main unit of reuse in Zap. They support parameters, return values, local scope, nested functions, and closures.", blocks: [["Declaration", "The fn keyword introduces a function. Parameters and return types can be optionally annotated.", "fn add(a: number, b: number) -> number:\n    return a + b"], ["Default parameters", "Parameters can provide a default value with =. Omitted arguments use their defaults, while supplied ones override them.", "fn greet(name: text = \"World\"):\n    return \"Hello, \" + name"], ["Async functions", "Prefix a function with async to return a Future. Use await to unwrap the completed result deterministically.", "async fn load() -> number:\n    return 42\n\nlet value = await load()"]] },
    types: { intro: "Zap's type system provides a balance between script-like flexibility and application-scale safety. Use primitive values for everyday work and Result/Option for error handling.", blocks: [["Core values", "Zap includes text (strings), integer numbers, booleans, lists, maps, and the none value.", "let items = [\"a\", \"b\"]\nlet user = {\"id\": 1, \"active\": true}"], ["Result & Option", "Result represents success or failure, while Option represents presence or absence. Use unwrap_or for safe fallbacks.", "let success = ok(42)\nlet present = some(\"Zap\")\nsay unwrap_or(success, 0)"], ["Propagation", "The ? operator unwraps a successful Result or returns the error from the current function immediately.", "fn profile() -> Result:\n    let user = load_user()?\n    return ok(user)"]] },
    classes: { intro: "Classes group state and behavior around a concept. Zap provides a beginner-friendly OOP foundation with constructors, methods, and inheritance.", blocks: [["Definition", "A class defines an init method for initialization. The first parameter of every method is self.", "class User:\n    fn init(self, name):\n        self.name = name\n\n    fn greet(self):\n        return \"Hello, \" + self.name"], ["Inheritance", "Use extends to inherit from a parent class. Methods can be overridden in the child class.", "class Dog extends Animal:\n    fn speak(self):\n        return \"woof\""], ["Instantiation", "Create a new object with the new function, passing the class name and any required arguments.", "let user = new(\"User\", \"Zap\")"]] },
    modules: { intro: "Modules keep Zap projects navigable and maintainable. Zap uses explicit module declarations and deterministic imports to avoid accidental exposure.", blocks: [["Declaration", "A source file declares its logical name with the module keyword. Only exported symbols are available to other modules.", "module app.core\nexport fn version():\n    return \"2.0\""], ["Imports", "Import a module by its dotted path and provide a local alias. Module resolution is relative to the project root.", "module app.main\nimport app.core as core\nsay core.version()"], ["Workspaces", "The zap.toml manifest defines the module root and entries. Circular dependencies are rejected during validation.", "[module]\nroot = \"modules\"\nentries = [\"app/core.zp\"]"]] },
    "built-ins": { intro: "The standard library provides a set of dependable building blocks for text, math, collections, and system operations.", blocks: [["Text & Math", "Helpers include upper, lower, trim, split, abs, min, max, pow, and sqrt.", "say upper(\"zap\")\nsay abs(-8)"], ["Collections", "Work with lists and maps using len, contains, keys, join, sort, reverse, and sum.", "say len([1, 2])\nsay contains(user, \"name\")"], ["System", "Access the environment, paths, and time using helpers like env, path_join, and now.", "say env(\"PATH\")\nsay now()"]] },
    "data-json": { intro: "JSON is the primary data exchange format for Zap. The standard library includes built-ins for encoding and decoding structured data.", blocks: [["Encoding", "The json function converts a Zap value (usually a map or list) into a JSON string.", "let data = {\"ok\": true}\nsay json(data)"], ["Decoding", "The from_json function parses a JSON string back into a Zap value. Use it for configuration or API responses.", "let user = from_json(\"{\\\"name\\\": \\\"Zap\\\"}\")\nsay user[\"name\"]"]] },
    http: { intro: "Zap provides a practical HTTP client for interacting with web services and APIs. Build requests, handle responses, and manage timeouts.", blocks: [["Requests", "The HTTP client supports common methods and header configuration. Timeouts are explicit to prevent stalled programs.", "let response = http.get(url, timeout: 5000)"], ["Responses", "Check the status code before processing the body. Use JSON helpers to decode the response payload.", "if response.status == 200:\n    let data = from_json(response.body)"]] },
    filesystem: { intro: "File I/O in Zap is explicit and workspace-confined. Read and write text or line-based data at the edge of your program.", blocks: [["Text files", "Use read_text and write_text for simple file access. Paths are resolved against the active project workspace.", "write_text(\"note.txt\", \"Zap\")\nsay read_text(\"note.txt\")"], ["Line-based I/O", "The read_lines and write_lines helpers work with lists of strings, automatically handling newlines.", "let items = read_lines(\"data.txt\")\nwrite_lines(\"out.txt\", [\"one\", \"two\"])"], ["Safety", "Runtime workspace confinement prevents reads and writes from escaping the project directory via parent traversal.", "let exists = exists(\"config.zp\")"]] },
    contributing: { intro: "Contributions are welcome for the Zap runtime, standard library, documentation, and tooling. The project favors readable syntax and deterministic diagnostics.", blocks: [["Workflow", "Fork the repository, create a branch, make your change, and add regression tests. Update both English and Burmese docs for user-visible changes.", "cargo test --manifest-path native/Cargo.toml"], ["Quality Gates", "Run local formatting, clippy, and tests before opening a pull request. Commits should use descriptive prefixes like feat: or fix:.", "cargo clippy\ncargo test"], ["Principles", "Zap favors readable syntax, safe handling of malformed input, bounded resource usage, and a clear path for beginners.", "git diff --check"]] },
    roadmap: { intro: "The Zap roadmap focuses on a stable language core, a welcoming learning path, and practical integrations for web, AI, and IoT.", blocks: [["Stable Core", "The P1 core includes the native Rust runtime, direct AST execution, and Result/Option foundations. P2 adds registry resolution and async foundations.", "zap --version"], ["Tooling", "Priorities include improving the LSP/editor integration, expanding the standard library, and hardening cross-platform release packaging."], ["Future", "Domain-specific libraries for web, mobile, and IoT will be built on top of the stable language core rather than being mixed into the syntax.", "v2.1 package reliability"]] },
    ecosystem: { intro: "The Zap ecosystem includes the official CLI, the VS Code extension, and a growing collection of community libraries and templates.", blocks: [["VS Code Extension", "The official Zap Language Support extension provides syntax highlighting, snippets, diagnostics, and LSP integration.", "code --install-extension ArkarYan.zap-language-support"], ["Registry", "Zap P2 provides deterministic registry resolution with exact and compatible version ranges and HTTPS transport.", "zap install"], ["Community", "Join the Discord or Telegram groups to share tools, ask questions, and follow the language development.", "https://discord.gg/j9DHdCtJE"]] },
  };
  const content: Lesson = lessonContent[slug] ?? { intro: `${doc.title} is part of the Zap field guide. This page collects the concepts, examples, and decisions you need to move forward with confidence.`, blocks: [["Keep it practical", "Read one concept, try one example, then use the adjacent pages to deepen your understanding."], ["Follow the route", "The sidebar keeps related topics close so you always have a clear next step."]] };
  return <div className="docs-page"><div className="docs-breadcrumb"><span>DOCS</span><ChevronRight size={14} /><span>{doc.section.toUpperCase()}</span><ChevronRight size={14} /><strong>{doc.title}</strong></div><div className="doc-title-row"><div><span className="eyebrow">{doc.section} / {String(allDocs.indexOf(doc) + 1).padStart(2, "0")}</span><h1>{doc.title}</h1></div><span className="read-time">6 min read · v2.1.0 syntax</span></div><p className="doc-intro">{content.intro}</p><div className="doc-rule" />{content.blocks.map(([title, body, code], index) => <section className="doc-section" key={title}><span className="doc-number">0{index + 1}</span><div><h2>{title}</h2><p>{body}</p>{code && <div className="inline-code"><span className="code-label">ZAP</span><code>{code}</code></div>}</div></section>)}<div className="doc-nav">{prev ? <Link href={`/docs/${prev.slug}`}><small>PREVIOUS</small><span>← {prev.title}</span></Link> : <span />}{next ? <Link href={`/docs/${next.slug}`}><small>NEXT</small><span>{next.title} →</span></Link> : <span />}</div></div>;
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
