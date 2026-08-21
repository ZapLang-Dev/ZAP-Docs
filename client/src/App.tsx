// Voltage Editorial design: navigation-first layout, navy ink, Zap cyan, amber wayfinding, and DM Mono metadata.
import { useMemo, useState } from "react";
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

function Header({ onMenu }: { onMenu: () => void }) {
  const [, navigate] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => query ? allDocs.filter((doc) => `${doc.title} ${doc.section}`.toLowerCase().includes(query.toLowerCase())) : [], [query]);
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
        <button className="search-trigger" onClick={() => setSearchOpen((open) => !open)}><Search size={16} /><span>Search docs</span><kbd><Command size={11} /> K</kbd></button>
        <a className="github-link" href="https://github.com/hidecard/ZAP-Docs" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
      </div>
      {searchOpen && <><div className="search-backdrop" onClick={() => setSearchOpen(false)} /><div className="search-panel"><div className="search-panel-head"><Search size={17} /><input autoFocus placeholder="Search the Zap docs" value={query} onChange={(e) => setQuery(e.target.value)} /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={17} /></button></div>{query ? <div className="search-results">{results.length ? results.map((doc) => <button key={doc.slug} onClick={() => { navigate(`/docs/${doc.slug}`); setSearchOpen(false); setQuery(""); }}><span>{doc.title}</span><small>{doc.section}</small></button>) : <p>No matching pages.</p>}</div> : <p className="search-hint">Search by page title or topic.</p>}</div></>}
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
  const paragraphs: Record<string, { intro: string; blocks: [string, string][] }> = {
    introduction: { intro: "Zap is a small, expressive language designed to make the path from idea to working software feel direct. This guide is the starting point for learning its core patterns.", blocks: [["What you will learn", "Variables, functions, control flow, and the habits that make Zap code easy to read."], ["The first step", "Install the toolchain, run a hello-world program, then follow the syntax chapters in order."]] },
    syntax: { intro: "Zap keeps syntax compact and familiar. If you have used a modern programming language before, the shapes will feel recognizable while the defaults stay friendly.", blocks: [["Values first", "Use clear names and let the compiler infer the common cases. Explicit types are available whenever you want more control."], ["A readable rhythm", "Blocks use braces, functions use fn, and expressions are designed to scan quickly from left to right."]] },
    "quick-start": { intro: "The quickest way to understand Zap is to make something small. This walkthrough gets a working program on screen in three deliberate steps.", blocks: [["Create a file", "Save a new file as hello.zap and add a main function."], ["Run it", "Use zap run hello.zap to compile and execute the program locally."]] },
  };
  const content = paragraphs[slug] ?? { intro: `${doc.title} is part of the Zap field guide. This page collects the concepts, examples, and decisions you need to move forward with confidence.`, blocks: [["Keep it practical", "Read one concept, try one example, then use the adjacent pages to deepen your understanding."], ["Follow the route", "The sidebar keeps related topics close so you always have a clear next step."]] };
  return <div className="docs-page"><div className="docs-breadcrumb"><span>DOCS</span><ChevronRight size={14} /><span>{doc.section.toUpperCase()}</span><ChevronRight size={14} /><strong>{doc.title}</strong></div><div className="doc-title-row"><div><span className="eyebrow">{doc.section} / {String(allDocs.indexOf(doc) + 1).padStart(2, "0")}</span><h1>{doc.title}</h1></div><span className="read-time">6 min read</span></div><p className="doc-intro">{content.intro}</p><div className="doc-rule" />{content.blocks.map(([title, body], index) => <section className="doc-section" key={title}><span className="doc-number">0{index + 1}</span><div><h2>{title}</h2><p>{body}</p>{index === 0 && <div className="inline-code"><span className="code-label">ZAP</span><code><b>fn</b> main() {'{'} print(<i>"Hello, world."</i>) {'}'}</code></div>}</div></section>)}<div className="doc-nav">{prev ? <Link href={`/docs/${prev.slug}`}><small>PREVIOUS</small><span>← {prev.title}</span></Link> : <span />}{next ? <Link href={`/docs/${next.slug}`}><small>NEXT</small><span>{next.title} →</span></Link> : <span />}</div></div>;
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
