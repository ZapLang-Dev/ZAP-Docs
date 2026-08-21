// Voltage Editorial design: navigation-first layout, navy ink, Zap cyan, amber wayfinding, and DM Mono metadata.
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, BookOpen, Check, ChevronRight, Command, Copy, Menu, Play, RotateCcw, Search, X } from "lucide-react";

const logoSrc = "/manus-storage/zap-logo_dbceddfd.jpg";
const heroTexture = "/manus-storage/zap-hero-field_fa9e733f.png";
const atlasTexture = "/manus-storage/zap-code-atlas_6bec9d95.png";
const sectionTexture = "/manus-storage/zap-section-pattern_e29d1e6c.png";

const sections = [
  { label: "Getting Started", count: "03", items: [["Introduction", "introduction"], ["Installation", "installation"], ["Quick Start", "quick-start"]] },
  { label: "Language Guide", count: "06", items: [["Syntax Basics", "syntax"], ["Control Flow", "control-flow"], ["Functions", "functions"], ["Types & Values", "types"], ["Classes", "classes"], ["Modules", "modules"]] },
  { label: "Standard Library", count: "04", items: [["Built-in Functions", "built-ins"], ["Data & JSON", "data-json"], ["HTTP Client", "http"], ["File System", "filesystem"]] },
  { label: "Community", count: "03", items: [["Contributing", "contributing"], ["Roadmap", "roadmap"], ["Ecosystem", "ecosystem"]] },
  { label: "Advanced Runtime", count: "06", items: [["Result & Option", "result-option"], ["Structured Errors", "errors"], ["Async & Await", "async"], ["Default Parameters", "defaults"], ["Diagnostics", "diagnostics"], ["Typed Payloads", "typed-payloads"]] },
  { label: "Tooling & Delivery", count: "05", items: [["CLI Workflow", "cli-workflow"], ["Testing & Assertions", "testing"], ["LSP & Editor Tools", "lsp"], ["Benchmark Harness", "benchmarks"], ["Package Registry", "packages"]] },
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
  "result-option": "result option ok err some option_none unwrap unwrap_or propagation errors",
  errors: "raise try catch structured errors ZapError diagnostics runtime failures",
  async: "async await Future deterministic runtime boundaries",
  defaults: "default parameters named arguments required optional functions methods",
  diagnostics: "check json diagnostics kind message file line column errors",
  "typed-payloads": "result number option text typed payload annotations generics",
  "cli-workflow": "zap run init check build fmt lint version command workflow",
  testing: "tests assertions assert fail-fast filter json formatter",
  lsp: "language server editor diagnostics completion hover VS Code",
  benchmarks: "benchmark harness performance measure repeat compare runtime",
  packages: "package registry dependencies version ranges lockfile HTTPS resolution",
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

function extractTestInputs(code: string) {
  return code.split(/\n/).flatMap((line) => {
    const match = line.trim().match(/^let\s+([A-Za-z_][\w]*)\s*(?::\s*([A-Za-z_][\w]*))?\s*=\s*(.+)$/);
    if (!match) return [];
    const [, name, annotation, raw] = match;
    const value = raw.trim();
    const type = annotation === "bool" || value === "true" || value === "false" ? "boolean" : (annotation === "text" || /^['\"]/.test(value) ? "text" : "number");
    return [{ name, type, defaultValue: value.replace(/^['\"]|['\"]$/g, "") }];
  }).slice(0, 4);
}

function runZapPreview(code: string, overrides: Record<string, unknown> = {}) {
  const values: Record<string, unknown> = {};
  const functions: Record<string, { params: string[]; body: string[] }> = {};
  const output: string[] = [];
  const evaluate = (expression: string): unknown => {
    const value = expression.trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) return value.slice(1, -1);
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "none") return "none";
    if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
    const comparison = value.match(/^(.+?)\s*(===|==|!=|>=|<=|>|<)\s*(.+)$/);
    if (comparison) {
      const left = evaluate(comparison[1]);
      const right = evaluate(comparison[3]);
      switch (comparison[2]) {
        case "===":
        case "==": return left === right;
        case "!=": return left !== right;
        case ">=": return Number(left) >= Number(right);
        case "<=": return Number(left) <= Number(right);
        case ">": return Number(left) > Number(right);
        case "<": return Number(left) < Number(right);
      }
    }
    if (value in values) return values[value];
    const call = value.match(/^([A-Za-z_][\w]*)\((.*)\)$/);
    if (call && functions[call[1]]) {
      const args = call[2].trim() ? call[2].split(/\s*,\s*/).map((part) => evaluate(part)) : [];
      const previous: Record<string, unknown> = {};
      functions[call[1]].params.forEach((param, position) => { previous[param] = values[param]; values[param] = args[position]; });
      const returnLine = functions[call[1]].body.find((line) => line.startsWith("return "));
      const result = returnLine ? evaluate(returnLine.slice(7)) : "none";
      functions[call[1]].params.forEach((param) => { if (previous[param] === undefined) delete values[param]; else values[param] = previous[param]; });
      return result;
    }
    const arithmetic = value.match(/^(.+?)\s*([+\-*/%])\s*(.+)$/);
    if (arithmetic) {
      const left = evaluate(arithmetic[1]);
      const right = evaluate(arithmetic[3]);
      if (arithmetic[2] === "+" && (typeof left === "string" || typeof right === "string")) return String(left) + String(right);
      const a = Number(left);
      const b = Number(right);
      if (Number.isFinite(a) && Number.isFinite(b)) {
        if (arithmetic[2] === "+") return a + b;
        if (arithmetic[2] === "-") return a - b;
        if (arithmetic[2] === "*") return a * b;
        if (arithmetic[2] === "/") return b === 0 ? "division by zero" : a / b;
        if (arithmetic[2] === "%") return a % b;
      }
    }
    if (value.startsWith("[") || value.startsWith("{")) {
      try { return JSON.parse(value.replace(/'/g, '"')); } catch { return value; }
    }
    return value;
  };
  const lines = code.split(/\n/);
  const format = (value: unknown) => typeof value === "object" ? JSON.stringify(value) : String(value);
  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index].trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const command = trimmed.match(/^zap\s+(.+)$/);
    if (command) {
      const argument = command[1];
      if (argument === "--version") output.push("Zap v2.1.7 · release preview");
      else if (argument === "--help") output.push("Zap CLI help · run, check, fmt, test, and init");
      else if (argument.startsWith("check")) output.push("Check complete · no blocking issues in this preview");
      else if (argument.startsWith("fmt")) output.push("Format preview complete · source would be normalized");
      else if (argument.startsWith("test")) output.push("Test preview complete · no test failures reported");
      else if (argument.startsWith("init")) output.push("Project scaffold preview created");
      else output.push(`Command preview · would run: zap ${argument}`);
      continue;
    }
    const functionDeclaration = trimmed.match(/^fn\s+([A-Za-z_][\w]*)\((.*?)\)(?:\s*->\s*[^:]+)?\s*:/);
    if (functionDeclaration) {
      let bodyEnd = index + 1;
      while (bodyEnd < lines.length && /^\s+/.test(lines[bodyEnd]) && lines[bodyEnd].trim()) bodyEnd += 1;
      functions[functionDeclaration[1]] = { params: functionDeclaration[2].split(/\s*,\s*/).filter(Boolean).map((param) => param.split(":")[0].trim()), body: lines.slice(index + 1, bodyEnd).map((line) => line.trim()) };
      index = bodyEnd - 1;
      continue;
    }
    const declaration = trimmed.match(/^let\s+([A-Za-z_][\w]*)\s*(?::[^=]+)?=\s*(.+)$/);
    if (declaration) { values[declaration[1]] = Object.prototype.hasOwnProperty.call(overrides, declaration[1]) ? overrides[declaration[1]] : evaluate(declaration[2]); continue; }
    const assignment = trimmed.match(/^([A-Za-z_][\w]*)\s*=\s*(.+)$/);
    if (assignment) { values[assignment[1]] = evaluate(assignment[2]); continue; }
    const loop = trimmed.match(/^for\s+([A-Za-z_][\w]*)\s+in\s+(\[.*\]|range\((\d+)\)):/);
    if (loop) {
      const items = loop[3] ? Array.from({ length: Number(loop[3]) }, (_, item) => item) : evaluate(loop[2]);
      const body = lines[index + 1]?.trim();
      if (body?.startsWith("say ")) (Array.isArray(items) ? items : [items]).forEach((item) => { values[loop[1]] = item; output.push(format(evaluate(body.slice(4)))); });
      continue;
    }
    if (/^(if|else if|else)\b/.test(trimmed)) {
      let cursor = index;
      let selected = false;
      while (cursor < lines.length) {
        const header = lines[cursor].trim();
        const ifMatch = header.match(/^if\s+(.+):$/);
        const elseIfMatch = header.match(/^else if\s+(.+):$/);
        const isElse = header === "else:";
        if (cursor !== index && !elseIfMatch && !isElse) break;
        const shouldRun = isElse ? !selected : Boolean(evaluate((ifMatch || elseIfMatch)?.[1] || "false"));
        const body = lines[cursor + 1]?.trim();
        if (shouldRun && !selected) {
          selected = true;
          if (body?.startsWith("say ")) output.push(format(evaluate(body.slice(4))));
        }
        cursor += 2;
      }
      index = cursor - 1;
      continue;
    }
    const say = trimmed.match(/^say\s+(.+)$/);
    if (say) { output.push(format(evaluate(say[1]))); continue; }
    const whileMatch = trimmed.match(/^while\s+(.+):$/);
    if (whileMatch) {
      let bodyEnd = index + 1;
      while (bodyEnd < lines.length && /^\s+/.test(lines[bodyEnd]) && lines[bodyEnd].trim()) bodyEnd += 1;
      const body = lines.slice(index + 1, bodyEnd).map((line) => line.trim());
      let guard = 0;
      while (Boolean(evaluate(whileMatch[1])) && guard < 20) {
        body.forEach((bodyLine) => {
          const bodyAssignment = bodyLine.match(/^([A-Za-z_][\w]*)\s*=\s*(.+)$/);
          const bodySay = bodyLine.match(/^say\s+(.+)$/);
          if (bodyAssignment) values[bodyAssignment[1]] = evaluate(bodyAssignment[2]);
          else if (bodySay) output.push(format(evaluate(bodySay[1])));
        });
        guard += 1;
      }
      index = bodyEnd - 1;
      continue;
    }
    continue;
  }
  if (!output.length) output.push("Preview completed · no console output in this snippet.");
  return output;
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [draft, setDraft] = useState(code);
  const [output, setOutput] = useState<string[] | null>(null);
  const testInputs = useMemo(() => extractTestInputs(code), [code]);
  const [testValues, setTestValues] = useState<Record<string, unknown>>(() => Object.fromEntries(testInputs.map((input) => [input.name, input.type === "number" ? Number(input.defaultValue) : input.type === "boolean" ? input.defaultValue === "true" : input.defaultValue])));
  useEffect(() => {
    setTestValues(Object.fromEntries(testInputs.map((input) => [input.name, input.type === "number" ? Number(input.defaultValue) : input.type === "boolean" ? input.defaultValue === "true" : input.defaultValue])));
  }, [testInputs]);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  const runExample = () => setOutput(runZapPreview(draft, testValues));
  const resetExample = () => { setDraft(code); setOutput(null); setTestValues(Object.fromEntries(testInputs.map((input) => [input.name, input.type === "number" ? Number(input.defaultValue) : input.type === "boolean" ? input.defaultValue === "true" : input.defaultValue]))); };
  return <div className="inline-code"><div className="inline-code-top"><span className="code-label">ZAP</span><div className="code-actions"><button className="run-code" onClick={() => setPlaygroundOpen((open) => !open)} type="button" aria-expanded={playgroundOpen}>{playgroundOpen ? <><X size={13} /> Close</> : <><Play size={13} /> Run example</>}</button><button className="copy-code" onClick={handleCopy} type="button" aria-label={copied ? "Code copied" : "Copy code"}>{copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}</button></div></div><pre><code>{highlightZap(code)}</code></pre>{playgroundOpen && <div className="playground"><div className="playground-head"><span>LIGHTWEIGHT PREVIEW</span><button className="playground-reset" onClick={resetExample} type="button"><RotateCcw size={12} /> Reset</button></div>{testInputs.length > 0 && <div className="test-cases"><div className="test-cases-heading"><span>TEST CASE</span><small>Change inputs, then run again</small></div><div className="test-cases-grid">{testInputs.map((input) => <label className="test-case-field" key={input.name}><span>{input.name}</span>{input.type === "boolean" ? <select value={String(testValues[input.name])} onChange={(event) => setTestValues((current) => ({ ...current, [input.name]: event.target.value === "true" }))}><option value="true">true</option><option value="false">false</option></select> : <input type={input.type === "number" ? "number" : "text"} value={String(testValues[input.name] ?? "")} onChange={(event) => setTestValues((current) => ({ ...current, [input.name]: input.type === "number" ? Number(event.target.value) : event.target.value }))} />}</label>)}</div></div>}<textarea value={draft} onChange={(event) => { setDraft(event.target.value); setOutput(null); }} spellCheck={false} aria-label="Editable Zap example" /><div className="playground-run"><button className="button-primary" onClick={runExample} type="button"><Play size={14} /> Run code</button><span>Browser preview · not the native runtime</span></div>{output && <pre className="playground-output"><code>{output.length ? output.join("\n") : "No output produced."}</code></pre>}</div>}</div>;
}

function DocsPage() {
  const [location] = useLocation();
  const slug = location.split("/")[2] || "introduction";
  const [language, setLanguage] = useState<"en" | "mm">("en");
  const [quizAnswer, setQuizAnswer] = useState("");
  useEffect(() => setQuizAnswer(""), [slug]);
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
  const extendedLessonContent: Record<string, Lesson> = {
    "result-option": { intro: "Zap uses Result and Option values to make success, failure, presence, and absence visible in the data model instead of hiding them in an unexpected crash.", blocks: [["Result values", "Use ok(value) for success and err(message) for failure. A caller can inspect the state with is_ok and is_err before choosing the next action.", "let success = ok(42)\nlet failure = err(\"not found\")\nsay is_ok(success)\nsay is_err(failure)"], ["Option values", "Use some(value) when a value exists and option_none() when it does not. unwrap_or gives a safe fallback at the boundary.", "let present = some(\"Zap\")\nlet missing = option_none()\nsay is_some(present)\nsay unwrap_or(missing, \"unknown\")"], ["Propagation", "The ? operator unwraps a successful Result and returns an error Result from the current function when it encounters err. Applying it to a non-Result is invalid.", "fn profile() -> Result:\n    let user = load_user()?\n    return ok(user)"], ["Practice", "Write a lookup function that returns ok for an existing map key and err for a missing key. Add a second function that uses ? to pass the failure outward."]] },
    errors: { intro: "Structured errors give Zap programs a deterministic way to raise a value, catch it at a known boundary, and preserve useful diagnostics for people and tools.", blocks: [["Raise a value", "raise evaluates its expression and immediately propagates the value through the current function, loop, and module boundary until a matching catch handles it.", "fn load_config():\n    raise \"configuration unavailable\""], ["Try and catch", "A try block must be followed by a same-level catch binding with an indented body. The raised value is available through that binding only inside the catch body.", "try:\n    load_config()\ncatch error:\n    say \"handled: \" + error"], ["Preserve control flow", "return, break, and continue keep their normal meaning inside catch blocks. If a catch raises again, the new value continues outward. An uncaught value reaches the process boundary as a raised error diagnostic."], ["Practice", "Raise a map containing code and message, print the code in an inner catch, then re-raise it and print the message in an outer catch."]] },
    async: { intro: "Zap async functions and await provide a deterministic Future boundary for code that may later use richer suspension or I/O scheduling.", blocks: [["Declare an async function", "Prefix a function declaration with async. Calling it returns a Future-like value, while the current runtime executes its body deterministically.", "async fn answer() -> number:\n    return 42\n\nlet pending = answer()"], ["Await the result", "Use await to unwrap the completed result. It is an expression and can be applied to a stored value or directly to a call.", "async fn load() -> number:\n    return 7\n\nsay (await load()) + 1"], ["Know the boundary", "The current runtime does not create background threads, timers, or cancellation points. Treat async as an explicit API boundary and consult the official async runtime guide before assuming concurrent behavior."], ["Practice", "Create an async function returning a number, await it, and combine the result with an ordinary arithmetic expression."]] },
    defaults: { intro: "Default and named parameters make small Zap APIs readable without forcing every caller to repeat common choices.", blocks: [["Default values", "A parameter may provide a default with =. Omitted arguments use the default, while supplied arguments override it.", "fn greet(name: text = \"World\", punctuation: text = \"!\"):\n    return \"Hello, \" + name + punctuation\n\nsay greet()\nsay greet(\"Zap\", \".\")"], ["Required and optional", "A function may mix required and defaulted parameters. Every required parameter still needs an argument.", "fn create_user(username: text, role: text = \"member\"):\n    return username + \" (\" + role + \")\"\n\nsay create_user(\"may\")\nsay create_user(\"may\", \"admin\")"], ["Named arguments", "Named arguments clarify intent for functions and methods. Keep parameter names stable when they form part of a public module API."], ["Practice", "Define a format_name function with a required first name and optional title and punctuation defaults. Call it positionally and with named arguments."]] },
    diagnostics: { intro: "Zap diagnostics are designed for both humans and automation. The checker can emit a structured JSON record with a stable kind, message, file, line, and column.", blocks: [["Check before run", "zap check . validates a project before execution. Use the JSON form in editors, scripts, and CI systems.", "zap check .\nzap check --json ."], ["Diagnostic fields", "A failed check can report kind such as TypeError, the source file, line and column, a readable message, and a combined error string. Keep these fields when displaying or forwarding failures."], ["ZapError boundary", "The native runtime classifies syntax, name, type, value, I/O, missing-file, permission, overflow, and project failures. The classification should guide the fix rather than be swallowed by a generic message.", "{\"ok\":false,\"kind\":\"TypeError\",\"file\":\"main.zp\",\"line\":4,\"column\":12}"], ["Practice", "Create a deliberate annotation mismatch, run zap check --json ., and identify the kind, file, line, and message in the returned diagnostic."]] },
    "typed-payloads": { intro: "Typed Result and Option payloads document what a successful, failed, present, or missing value is expected to carry.", blocks: [["Annotate a Result", "Use angle brackets after result to describe the payload type. The success value and the error path should remain meaningful to the caller.", "let answer: result<number> = ok(42)\nlet failure: result<text> = err(\"not found\")"], ["Annotate an Option", "Use option<T> when absence is valid but the present value has a known type.", "let user: option<text> = some(\"Zap\")\nlet missing: option<number> = option_none()"], ["Why the payload matters", "Payload annotations make boundaries easier to read and let the checker catch an incompatible value closer to its source. They complement, rather than replace, runtime validation."], ["Practice", "Declare a result<map> for a profile lookup and an option<number> for an optional score. Test both the success and missing cases."]] },
    "cli-workflow": { intro: "The Zap CLI is one consistent workflow: create a project, check it, format it, run it, test it, and inspect structured diagnostics when something fails.", blocks: [["Core commands", "Run a file directly, initialize a scaffold, check project structure, build readiness, format source, lint style, and execute tests.", "zap main.zp\nzap init hello-zap\nzap check .\nzap build .\nzap fmt main.zp\nzap lint main.zp\nzap test ."], ["A repeatable loop", "After each change, format the file, run the checker, then execute the smallest relevant test or example. This keeps feedback close to the change that caused it."], ["Machine-readable mode", "Use zap check --json . when an editor or CI process needs structured records. A usage error should not be confused with a failing test: unknown test options return exit code 2, while a failing test returns exit code 1."], ["Practice", "Initialize a project, add a main.zp file with one assertion, then run fmt, check, and test in that order."]] },
    testing: { intro: "Tests turn Zap examples into executable documentation. Keep each assertion focused, give failures a useful message, and include both normal and error paths.", blocks: [["Test naming", "Test files conventionally end in _test.zp. The test runner discovers them and reports the first useful failure for the project.", "fn add(a, b):\n    return a + b\n\nassert(add(2, 3) == 5, \"addition failed\")"], ["Narrow the run", "Use --filter to focus on a topic, --fail-fast to stop after the first failure, and --json for machine-readable results.", "zap test tests --filter arithmetic\nzap test tests --fail-fast\nzap test tests --json"], ["Test boundaries", "Check empty lists, missing map keys, wrong types, and error results as deliberately as the happy path. Assertions should verify behavior, not implementation trivia."], ["Practice", "Write three tests for is_even: zero, an even number, and an odd number. Include a message that identifies each failure clearly."]] },
    lsp: { intro: "Zap editor tooling connects the language to a faster feedback loop through syntax highlighting, diagnostics, completion, hover information, and LSP communication.", blocks: [["Install editor support", "The official VS Code extension provides syntax highlighting, snippets, diagnostics, and LSP integration. Open a .zp file and confirm the Zap language mode is active.", "code --install-extension ArkarYan.zap-language-support"], ["Use the checker as a foundation", "Editor diagnostics should agree with zap check --json . so the same kind, message, and source location guide both local editing and CI."], ["Keep editor feedback honest", "LSP support is a developer aid, not a replacement for running the native CLI. Always verify release-sensitive behavior against the installed Zap version."], ["Practice", "Open a small .zp file with an intentional type mismatch, inspect the editor diagnostic, then confirm it with zap check --json ."]] },
    benchmarks: { intro: "The official benchmark harness provides a repeatable way to compare runtime behavior without confusing a single noisy measurement with a language-level conclusion.", blocks: [["Measure a focused case", "Choose one small program with a clear input and output. Keep setup and output outside the timed region whenever the harness allows it.", "say \"benchmark target: list traversal\""], ["Compare carefully", "Run the same source, environment, and release mode across candidates. Record the Zap version, operating system, input size, and command used."], ["Read results as evidence", "A benchmark describes one workload. Use multiple sizes and repetitions before making a performance claim, and prefer a profile or regression test when a result changes unexpectedly."], ["Practice", "Create a list-processing example, run it repeatedly with small and larger inputs, and write down the version and environment beside each result."]] },
    packages: { intro: "Zap package and registry workflows are designed around deterministic resolution so a project can be reproduced by another developer or CI runner.", blocks: [["Declare project identity", "Keep package name, version, entry point, and supported Zap range explicit in the project manifest. A clear manifest is the boundary for tooling and contributors."], ["Resolve deliberately", "Prefer exact or compatible version ranges that match the package contract. Pin versions for reproducible applications and review lockfile changes as code."], ["Use trusted transport", "Registry resolution uses HTTPS. Treat package source, checksum, and supported runtime version as part of your supply-chain review."], ["Practice", "Sketch a small package manifest for a reusable math module, choose a version, and document which Zap versions it supports before publishing anything."]] },
  };
  const burmeseLessonContent: Record<string, Lesson> = {
    introduction: { intro: "Zap သည် .zp source file များကို အသုံးပြုသော ဖတ်ရလွယ်သည့် general-purpose programming language ဖြစ်သည်။ သင်ခန်းစာတစ်ခုစီတွင် အယူအဆတစ်ခုကို နားလည်ပြီး code တစ်ခုကို run လုပ်ကာ နောက်သင်ခန်းစာသို့ ဆက်သွားပါ။", blocks: [["Zap ၏ အခြေခံအမြင်", "Program သည် အပေါ်မှအောက်သို့ အစဉ်လိုက် run သည့် statement များဖြစ်သည်။ Block များကို colon နှင့် indentation ဖြင့် ဖော်ပြသည်။", "say \"Hello from Zap\""], ["ပထမဆုံးလေ့ကျင့်ခန်း", "hello.zp ဖိုင်ဖန်တီးပြီး message ကို ကိုယ်တိုင်ပြောင်းပါ။ Output ပြောင်းသွားပါက ပထမဆုံး feedback loop ကို ပြီးမြောက်ပါပြီ။", "zap hello.zp"]] },
    installation: { intro: "Zap ကို native executable အဖြစ် download လုပ်ပြီး PATH ထဲထည့်ပါ။ သင့် operating system နှင့် architecture ကိုက်ညီသော official release asset ကိုသာ ရွေးပါ။", blocks: [["Version စစ်ခြင်း", "Install ပြီးနောက် runtime နှင့် help output ကို စစ်ပါ။", "zap --version\nzap --help"], ["Release ကို အသုံးပြုခြင်း", "Linux၊ Windows နှင့် macOS အတွက် official release archive များကို GitHub Releases မှ ရယူနိုင်သည်။ မိမိထည့်သွင်းထားသော version နှင့် docs version မတူပါက example behavior ကို ပြန်စစ်ပါ။"]] },
    "quick-start": { intro: "Zap ကို စတင်လေ့လာရန် .zp ဖိုင်တစ်ခုထဲတွင် say statement ရေးပြီး CLI ဖြင့် run လုပ်ပါ။ Boilerplate မလိုအပ်ပါ။", blocks: [["ပထမဆုံး program", "Program သည် line တစ်ကြောင်းမှ စနိုင်သည်။ say သည် terminal တွင် value ကို ထုတ်ပြသည်။", "say \"မင်္ဂလာပါ Zap\""], ["Run၊ check၊ test", "Project ကြီးလာသောအခါ init ဖြင့် scaffold ဖန်တီးပြီး check၊ fmt နှင့် test ဖြင့် feedback ရယူပါ။", "zap init my-project\nzap check .\nzap fmt main.zp\nzap test ."]] },
    syntax: { intro: "Zap syntax တွင် comment ကို # ဖြင့်ရေးပြီး block ကို colon နောက်မှ indentation ဖြင့်ရေးသည်။ Indentation တစ်ဆင့်လျှင် spaces လေးခုကို အကြံပြုသည်။", blocks: [["Variables နှင့် values", "Variable အသစ်ကို let ဖြင့်ဖန်တီးပြီး ရှိပြီးသား value ကို assignment ဖြင့်ပြောင်းပါ။", "let name = \"Zap\"\nlet count: number = 3\ncount = count + 1"], ["စစ်ဆေးပြီးမှ run ပါ", "zap check . သည် syntax၊ name နှင့် type ပြဿနာများကို run မလုပ်မီ ပြပေးသည်။", "zap check .\nzap check --json ."]] },
    "control-flow": { intro: "Condition နှင့် loop များက program ကို ဆုံးဖြတ်ချက်ချစေပြီး အလုပ်များကို ပြန်လုပ်စေသည်။ if၊ else၊ for နှင့် while ကို colon နှင့် indentation ဖြင့် အသုံးပြုပါ။", blocks: [["If နှင့် else", "Condition မှန်လျှင် if block ကို run ပြီး မမှန်လျှင် else block ကို run သည်။", "let score = 85\nif score >= 80:\n    say \"အောင်မြင်သည်\"\nelse:\n    say \"ထပ်လေ့ကျင့်ပါ\""], ["Loop များ", "for သည် list သို့ range တစ်ခုကို လှည့်ပြီး while သည် condition မှန်နေသရွေ့ ပြန်လုပ်သည်။ Loop ထဲတွင် state ကို update မလုပ်ပါက မရပ်နိုင်ပါ။", "for item in [\"web\", \"ai\"]:\n    say item"]] },
    functions: { intro: "Function သည် code block တစ်ခုကို နာမည်ပေးပြီး ပြန်လည်အသုံးပြုစေသည်။ Parameter၊ return value၊ local scope နှင့် nested function များကို အသုံးပြုနိုင်သည်။", blocks: [["Function ရေးခြင်း", "fn ဖြင့် function တည်ဆောက်ပြီး return ဖြင့် result ပြန်ပေးပါ။", "fn add(a, b):\n    return a + b\n\nsay add(4, 6)"], ["လက်တွေ့လေ့ကျင့်ခန်း", "Number တစ်ခု even ဖြစ်မဖြစ် boolean ပြန်ပေးသည့် is_even function ရေးပါ။ ထို့နောက် 0၊ even နှင့် odd တန်ဖိုးများဖြင့် စမ်းပါ။"]] },
    types: { intro: "Zap တွင် text၊ number၊ bool၊ list၊ map၊ none နှင့် any တို့သည် အခြေခံ type များဖြစ်သည်။ Annotation သည် value တစ်ခု၏ မျှော်မှန်းထားသော type ကို ရှင်းလင်းစေသည်။", blocks: [["အခြေခံ types", "String ကို text၊ ကိန်းဂဏန်းကို number၊ true/false ကို bool၊ အစဉ်လိုက်တန်ဖိုးများကို list၊ key/value record ကို map အဖြစ် အသုံးပြုပါ။", "let title: text = \"Zap\"\nlet count: number = 3\nlet ready: bool = true"], ["Result နှင့် Option", "Result သည် အောင်မြင်မှု သို့မဟုတ် အမှားကို ကိုယ်စားပြုပြီး Option သည် value ရှိ/မရှိကို ကိုယ်စားပြုသည်။", "let answer: result<number> = ok(42)\nlet missing: option<text> = option_none()"]] },
    modules: { intro: "Module များသည် project ကို စနစ်တကျခွဲပေးပြီး export မလုပ်ထားသော private helper များကို အပြင်မှ မမြင်ရစေပါ။", blocks: [["Module နှင့် import", "Logical name ကို module ဖြင့်သတ်မှတ်ပြီး dotted path နှင့် alias ဖြင့် import လုပ်ပါ။", "module app.core\n\nexport fn greet(name):\n    return \"Hello, \" + name\n\nmodule app.main\nimport app.core as core\nsay core.greet(\"Zap\")"], ["လုံခြုံရေးစည်းမျဉ်း", "Absolute path၊ traversal-like path၊ missing entry၊ duplicate entry နှင့် circular import များကို runtime က reject လုပ်သည်။"]] },
  };
  const content: Lesson = (language === "mm" ? burmeseLessonContent[slug] : undefined) ?? lessonContent[slug] ?? extendedLessonContent[slug] ?? { intro: `${doc.title} is part of the Zap field guide. This page collects the concepts, examples, and decisions you need to move forward with confidence.`, blocks: [["Keep it practical", "Read one concept, try one example, then use the adjacent pages to deepen your understanding."], ["Follow the route", "The sidebar keeps related topics close so you always have a clear next step."]] };
  type LessonExtra = { objective: string; syntax: [string, string][]; output?: string; mistakes: string[]; exercise: string; quiz: { question: string; options: string[]; answer: string; explanation: string } };
  const lessonExtras: Record<string, LessonExtra> = {
    introduction: { objective: "Understand what Zap is, what a `.zp` file contains, and how the learn–run–change loop works.", syntax: [["Source file", "filename.zp"], ["Output", "say value"], ["Run", "zap filename.zp"]], output: "Hello from Zap", mistakes: ["Saving the file without the `.zp` extension.", "Expecting a browser playground to behave exactly like the native Rust runtime."], exercise: "Create `hello.zp`, print your name and one sentence about why you are learning Zap, then run it twice after changing the message.", quiz: { question: "Which command runs a Zap source file?", options: ["zap main.zp", "run zap main.zp", "zap --browser main.zp"], answer: "zap main.zp", explanation: "The official CLI runs a source file with `zap filename.zp`." } },
    syntax: { objective: "Learn the smallest building blocks of Zap syntax: statements, comments, indentation, variables, and annotations.", syntax: [["Comment", "# explanation"], ["Variable", "let name = value"], ["Annotation", "let name: type = value"], ["Block", "if condition:"]], output: "Zap", mistakes: ["Mixing tabs and spaces inside one block.", "Using `let` when you intend to reassign an existing variable."], exercise: "Write a program with one comment, one text variable, one number annotation, and two output statements.", quiz: { question: "What opens a Zap block?", options: ["A colon followed by indentation", "Curly braces", "The `begin` keyword"], answer: "A colon followed by indentation", explanation: "Zap uses a colon and consistent indentation to define blocks." } },
    types: { objective: "Identify Zap’s core value types and choose annotations when a boundary needs an explicit contract.", syntax: [["Text", "text"], ["Number", "number"], ["Boolean", "bool"], ["Collection", "list / map"], ["Empty value", "none"]], output: "number", mistakes: ["Assigning text such as `\"8080\"` to a `number` annotation.", "Treating a list index as a map key or vice versa."], exercise: "Create a learner map with a name, score, and completed flag. Add a list of two topics and print the first topic.", quiz: { question: "Which value represents an intentional empty value?", options: ["none", "empty", "null_value"], answer: "none", explanation: "Zap’s documented empty value is `none`." } },
    "control-flow": { objective: "Make decisions and repeat work with conditions, `for`, `while`, `break`, and `continue`.", syntax: [["Condition", "if condition:"], ["Alternative", "else:"], ["For loop", "for item in items:"], ["While loop", "while condition:"]], output: "Excellent", mistakes: ["Forgetting to update state in a `while` loop.", "Putting the body at the wrong indentation level."], exercise: "Print numbers from 0 to 9, skip 2, and stop before 7. Then label values greater than 5.", quiz: { question: "Which keyword skips the current loop iteration?", options: ["continue", "skip", "next"], answer: "continue", explanation: "`continue` moves to the next iteration; `break` ends the loop." } },
    functions: { objective: "Package reusable behavior in named functions with parameters, return values, defaults, and local scope.", syntax: [["Function", "fn name(args):"], ["Return type", "fn name(args) -> type:"], ["Return", "return expression"], ["Default", "name: text = \"World\""]], output: "10", mistakes: ["Forgetting `return` when the caller needs a value.", "Supplying fewer required arguments than the function declares."], exercise: "Write `is_even(number)` and test it with 0, 4, and 5. Add an assertion for each expected result.", quiz: { question: "What does a function without an explicit return produce?", options: ["none", "false", "The last printed value"], answer: "none", explanation: "The official guide states that a function without an explicit return produces `none`." } },
    modules: { objective: "Split a project into explicit modules while controlling which functions and values are public.", syntax: [["Module", "module app.core"], ["Import", "import app.core as core"], ["Public API", "export fn greet(name):"], ["Manifest", "[module] root = \"modules\""]], mistakes: ["Using absolute or traversal-like import paths.", "Assuming a private helper is visible without `export`."], exercise: "Create a `math.zp` module with an exported `square` function and call it from `main.zp`.", quiz: { question: "Which keyword exposes a function to importers?", options: ["export", "publicize", "share"], answer: "export", explanation: "Only names marked with `export` are available to importers." } },
    "result-option": { objective: "Represent success/failure and present/absent values explicitly so callers can handle them safely.", syntax: [["Success", "ok(value)"], ["Failure", "err(message)"], ["Present", "some(value)"], ["Absent", "option_none()"], ["Fallback", "unwrap_or(value, fallback)"]], mistakes: ["Calling `unwrap` without handling the missing or error case.", "Applying `?` to a value that is not a Result."], exercise: "Write a lookup function that returns `ok` for an existing key and `err` for a missing key.", quiz: { question: "Which helper supplies a safe fallback?", options: ["unwrap_or", "fallback_now", "default_result"], answer: "unwrap_or", explanation: "`unwrap_or` returns the contained value or the fallback." } },
    testing: { objective: "Turn examples into repeatable checks with `_test.zp` files, assertions, filters, and machine-readable output.", syntax: [["Test file", "feature_test.zp"], ["Assertion", "assert(condition, message)"], ["Filter", "zap test tests --filter name"], ["JSON output", "zap test tests --json"]], mistakes: ["Testing only the happy path.", "Writing assertions without a message that explains the failure."], exercise: "Create tests for `is_even` covering zero, an even number, and an odd number.", quiz: { question: "What suffix is conventionally used for Zap test files?", options: ["_test.zp", ".spec.zp", "test.zap"], answer: "_test.zp", explanation: "Zap’s learning guide conventionally names test files with `_test.zp`." } },
  };
  const extra = lessonExtras[slug];
  const officialSource = language === "mm" ? "https://raw.githubusercontent.com/hidecard/zap/master/docs/LEARN_ZAP_MM.md" : "https://raw.githubusercontent.com/hidecard/zap/master/docs/LEARN_ZAP_EN.md";
  return <div className="docs-page"><div className="docs-breadcrumb"><span>DOCS</span><ChevronRight size={14} /><span>{doc.section.toUpperCase()}</span><ChevronRight size={14} /><strong>{doc.title}</strong></div><div className="doc-title-row"><div><span className="eyebrow">{doc.section} / {String(allDocs.indexOf(doc) + 1).padStart(2, "0")}</span><h1>{doc.title}</h1></div><div className="doc-tools"><span className="read-time">6 min read · official source</span><div className="language-toggle" role="group" aria-label="Lesson language"><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} type="button">English</button><button className={language === "mm" ? "active" : ""} onClick={() => setLanguage("mm")} type="button">မြန်မာ</button></div></div></div><p className="doc-intro">{content.intro}</p>{extra && <div className="lesson-objective"><span className="lesson-badge">LEARN</span><div><strong>Lesson objective</strong><p>{extra.objective}</p></div></div>}{extra && <div className="syntax-table-wrap"><div className="lesson-mini-heading">Syntax at a glance</div><table className="syntax-table"><tbody>{extra.syntax.map(([term, form]) => <tr key={term}><th>{term}</th><td><code>{form}</code></td></tr>)}</tbody></table></div>}<a className="doc-source-link" href={officialSource} target="_blank" rel="noreferrer">View official {language === "mm" ? "Burmese" : "English"} guide <ArrowUpRight size={14} /></a><div className="doc-rule" />{content.blocks.map(([title, body, code], index) => <section className="doc-section" key={title}><span className="doc-number">0{index + 1}</span><div><h2>{title}</h2><p>{renderBody(body)}</p>{code && <CodeBlock code={code} />}</div></section>)}{extra && <><div className="lesson-output-row">{extra.output && <div className="expected-output"><span className="lesson-mini-heading">Expected output</span><code>{extra.output}</code></div>}<div className="lesson-mistakes"><span className="lesson-mini-heading">Common mistakes</span><ul>{extra.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></div></div><section className="practice-panel"><span className="lesson-badge">PRACTICE</span><div><h2>Try it yourself</h2><p>{extra.exercise}</p><span className="practice-note">Write the answer in a `.zp` file, then use the checker before running it.</span></div></section><section className="quiz-panel"><div><span className="lesson-badge">QUICK CHECK</span><h2>{extra.quiz.question}</h2></div><div className="quiz-options">{extra.quiz.options.map((option) => <button key={option} className={quizAnswer === option ? (option === extra.quiz.answer ? "correct" : "incorrect") : ""} onClick={() => setQuizAnswer(option)} type="button">{option}</button>)}</div>{quizAnswer && <p className={quizAnswer === extra.quiz.answer ? "quiz-feedback correct-text" : "quiz-feedback incorrect-text"}>{quizAnswer === extra.quiz.answer ? `Correct. ${extra.quiz.explanation}` : "Not quite. Read the syntax section again and try once more."}</p>}</section></>}<div className="doc-nav">{prev ? <Link href={`/docs/${prev.slug}`}><small>PREVIOUS</small><span>← {prev.title}</span></Link> : <span />}{next ? <Link href={`/docs/${next.slug}`}><small>NEXT</small><span>{next.title} →</span></Link> : <span />}</div></div>;
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
