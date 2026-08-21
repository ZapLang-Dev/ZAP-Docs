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
    <div className="sidebar-footer"><span className="status-dot" /> Zap v0.8 · stable preview</div>
  </aside>;
}

function Home() {
  const [, navigate] = useLocation();
  return <div className="home-page">
    <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(246,251,253,.96) 0%, rgba(246,251,253,.82) 55%, rgba(246,251,253,.35) 100%), url(${heroTexture})` }}><div className="hero-inner"><div className="hero-kicker"><span className="kicker-line" /> ZAP / LANGUAGE SYSTEM <span className="kicker-code">0.8.0</span></div><div className="hero-content"><div className="hero-mark"><img src={logoSrc} alt="Zap" /></div><h1>Build boldly.<br /><em>Learn clearly.</em></h1><p>A beginner-friendly language for Web, Mobile, AI, and IoT — with documentation that keeps the signal clear.</p><div className="hero-actions"><button className="button-primary" onClick={() => navigate("/docs/introduction")}>Start with the guide <ArrowUpRight size={17} /></button><button className="button-quiet" onClick={() => navigate("/docs/syntax")}>Explore syntax <ChevronRight size={17} /></button></div></div><div className="hero-index"><span>01</span><span>Learn the language</span><span>→</span></div></div></section>
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
    introduction: { intro: "Zap is a small, expressive language designed to make the path from idea to working software feel direct. This guide is the starting point for learning its core patterns.", blocks: [["What you will learn", "Variables, functions, control flow, and the habits that make Zap code easy to read.", "fn main() { print(\"Hello, world.\") }"], ["The learning route", "Start with installation, run the quick-start program, then move through values, control flow, and functions. Each lesson adds one idea without hiding the code behind ceremony."]] },
    installation: { intro: "The Zap toolchain is designed to stay out of your way. Install the command-line tool, confirm the version, and you are ready to create your first project.", blocks: [["Install the CLI", "Download the latest Zap release for your operating system, place the executable on your PATH, and open a new terminal so the shell can discover it.", "zap --version"], ["Check the toolchain", "A successful version response confirms that the compiler and runner are available. If the command is not found, reopen the terminal after updating PATH.", "zap doctor"]] },
    "quick-start": { intro: "The quickest way to understand Zap is to make something small. This walkthrough gets a working program on screen in three deliberate steps.", blocks: [["Create a file", "Save a new file as hello.zap and give it a main function. Zap programs begin with a readable entry point.", "fn main() {\n  print(\"Hello, Zap.\")\n}"], ["Run it", "Use zap run to compile and execute the file in one step. The command reports compiler errors beside the line that needs attention.", "zap run hello.zap"]] },
    syntax: { intro: "Zap keeps syntax compact and familiar. If you have used a modern programming language before, the shapes will feel recognizable while the defaults stay friendly.", blocks: [["Values first", "Use clear names and let the compiler infer common cases. Explicit types are available whenever you want more control over a public function or data boundary.", "let name = \"Mina\"\nlet visits: Int = 3"], ["A readable rhythm", "Blocks use braces, functions use fn, and expressions are designed to scan quickly from left to right. Keep one action per line when a statement carries meaningful work."]] },
    "control-flow": { intro: "Control flow lets a Zap program make decisions and repeat useful work. Conditions are expressions, while loops are explicit, and the syntax stays close to the shape of the logic.", blocks: [["Choose with if", "Use if when the program has a small number of branches. The final expression in a branch can become the value of the whole conditional.", "let label = if score >= 80 {\n  \"ready\"\n} else {\n  \"practice\"\n}"], ["Repeat with for", "A for loop walks over a range or collection. Prefer it when each iteration has a clear purpose and the loop can be read without hidden state.", "for item in items {\n  print(item)\n}"]] },
    functions: { intro: "Functions are Zap's main unit of reuse. Give each function a focused responsibility, name its inputs, and return a value when the caller needs a result.", blocks: [["Declare a function", "The fn keyword introduces a function. Parameter types make the contract visible, while the arrow marks the return type.", "fn greet(name: String) -> String {\n  return \"Hello, \" + name\n}"], ["Compose small actions", "A function can call another function, transform its result, and pass the value onward. Small functions are easier to test and easier to explain in a code review."]] },
    types: { intro: "Zap's type system helps you state intent without making small programs feel heavy. Use primitive values for everyday work and named types when a concept deserves a name.", blocks: [["Common values", "Strings, integers, decimals, booleans, and arrays cover the first layer of most programs. Choose the narrowest type that describes the value honestly.", "let active: Bool = true\nlet retries: Int = 3\nlet ratio: Float = 0.75"], ["Optional values", "When a value may be missing, model that possibility instead of using a magic sentinel. Handle the empty case where the data enters the program."]] },
    classes: { intro: "Classes group state and behavior around a meaningful concept. Keep the public surface small, initialize required data early, and let methods describe the actions the object owns.", blocks: [["Define a class", "A class declares its fields and methods together. The constructor establishes a valid initial state before other code can use the instance.", "class Counter {\n  let label: String\n  var value: Int\n}"], ["Protect invariants", "Methods should keep the object valid after every change. If a value cannot be negative, enforce that rule in one method rather than repeating checks across callers."]] },
    modules: { intro: "Modules keep a growing Zap project navigable. Put related functions and types together, export only the names other modules need, and import dependencies at the top of the file.", blocks: [["Create a module", "A module can expose a small public API while keeping implementation details private. Name files after the concept they contain.", "export fn parsePort(value: String) -> Int {\n  return Int(value) ?? 8080\n}"], ["Import intentionally", "Import the module where it is used and prefer explicit names. This makes a file's dependencies visible before a reader reaches the implementation."]] },
    "built-ins": { intro: "The standard library starts with a small set of dependable building blocks. These functions cover output, conversion, collections, and the everyday transformations programs need.", blocks: [["Print and inspect", "Use print for user-facing output and inspect when you need a quick representation while developing. Remove diagnostic output before shipping a library.", "print(\"server started\")\ninspect(config)"], ["Transform collections", "Map, filter, and reduce let you describe collection work as a pipeline. Keep each step named when the transformation is important to the reader."]] },
    "data-json": { intro: "JSON is a common boundary between Zap programs and web services. Decode into a known shape, validate required fields, and encode only data that belongs in the public response.", blocks: [["Decode a payload", "Keep parsing close to the input boundary so the rest of the program works with typed values instead of raw strings.", "let user = JSON.decode<User>(body)"], ["Encode a response", "Return a stable shape to callers and avoid leaking internal fields. A small response type is easier to version than a whole domain object.", "let body = JSON.encode(response)"]] },
    http: { intro: "The HTTP client gives Zap programs a clear path to APIs. Build a request, set the headers you need, send it, and handle non-success responses before decoding the body.", blocks: [["Make a request", "Keep the URL, method, and headers explicit. Timeouts belong in the request configuration so a stalled service cannot hold the whole program forever.", "let response = http.get(url, timeout: 5000)"], ["Handle the result", "Check the status before decoding. A useful error includes the status code and enough context to reproduce the failed call.", "if response.status != 200 {\n  return error(\"request failed\")\n}"]] },
    filesystem: { intro: "File access is intentionally explicit. Read and write at the edge of your program, check errors, and keep paths configurable so the same code can run in development and production.", blocks: [["Read a file", "Use a text read for configuration and a byte read for binary data. Treat missing files as an expected error when the file is optional.", "let source = fs.readText(\"config.zap\")?"], ["Write safely", "Write to a temporary path and move it into place when replacing important data. This avoids leaving a half-written file after an interrupted process."]] },
    contributing: { intro: "Contributions improve Zap when they arrive with a clear problem statement, a focused change, and a small example that demonstrates the behavior.", blocks: [["Start with an issue", "Describe the current behavior, the expected behavior, and the smallest example that shows the gap. A precise issue saves review time later."], ["Keep changes focused", "Update tests and documentation with the implementation. Small pull requests are easier to review and easier to revert when a design changes."]] },
    roadmap: { intro: "The Zap roadmap is organized around a stable core, a welcoming learning path, and practical integrations. Progress should make the language more useful without making its first steps harder.", blocks: [["Near-term focus", "Priorities include improving diagnostics, expanding the standard library, and making editor tooling more helpful for new users."], ["How to follow along", "Track milestones in the repository and use the documentation examples as the acceptance test for language changes."]] },
    ecosystem: { intro: "The Zap ecosystem grows through small tools that share the same language conventions. Libraries, templates, editor support, and examples all make the core language more useful.", blocks: [["Choose a library", "Prefer packages with clear ownership, examples, and a recent release history. Read the API surface before adding a dependency to a production project."], ["Share a tool", "A good ecosystem contribution explains the problem it solves, includes a small example, and documents the version of Zap it supports."]] },
  };
  const content: Lesson = lessonContent[slug] ?? { intro: `${doc.title} is part of the Zap field guide. This page collects the concepts, examples, and decisions you need to move forward with confidence.`, blocks: [["Keep it practical", "Read one concept, try one example, then use the adjacent pages to deepen your understanding."], ["Follow the route", "The sidebar keeps related topics close so you always have a clear next step."]] };
  return <div className="docs-page"><div className="docs-breadcrumb"><span>DOCS</span><ChevronRight size={14} /><span>{doc.section.toUpperCase()}</span><ChevronRight size={14} /><strong>{doc.title}</strong></div><div className="doc-title-row"><div><span className="eyebrow">{doc.section} / {String(allDocs.indexOf(doc) + 1).padStart(2, "0")}</span><h1>{doc.title}</h1></div><span className="read-time">6 min read</span></div><p className="doc-intro">{content.intro}</p><div className="doc-rule" />{content.blocks.map(([title, body, code], index) => <section className="doc-section" key={title}><span className="doc-number">0{index + 1}</span><div><h2>{title}</h2><p>{body}</p>{code && <div className="inline-code"><span className="code-label">ZAP</span><code>{code}</code></div>}</div></section>)}<div className="doc-nav">{prev ? <Link href={`/docs/${prev.slug}`}><small>PREVIOUS</small><span>← {prev.title}</span></Link> : <span />}{next ? <Link href={`/docs/${next.slug}`}><small>NEXT</small><span>{next.title} →</span></Link> : <span />}</div></div>;
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
