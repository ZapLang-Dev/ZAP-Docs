"use client";

import { useState } from "react";
import { Search, ArrowUpRight, Command } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllDocPaths, findDocByPath } from "@/data/docs";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const logoPath = process.env.NODE_ENV === "production" ? "/ZAP-Docs/logo.jpg" : "/logo.jpg";
  const allPaths = getAllDocPaths();
  const filteredPaths = searchQuery
    ? allPaths.filter((path) => {
        const doc = findDocByPath(path);
        return doc?.title.toLowerCase().includes(searchQuery.toLowerCase()) || path.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : [];

  return (
    <header className="site-header">
      <div className="header-inner">
        <button onClick={() => navigate("/")} className="brand" aria-label="Go to Zap Docs home">
          <span className="brand-mark"><img src={logoPath} alt="Zap logo" /></span>
          <span className="brand-copy"><span className="brand-name">Zap</span><span className="brand-label">Documentation</span></span>
        </button>

        <nav className="header-nav" aria-label="Primary navigation">
          {["/docs/introduction", "/docs/syntax", "/docs/stdlib", "/docs/cli"].map((path) => {
            const doc = findDocByPath(path);
            return <button key={path} onClick={() => navigate(path)} className="header-link">{doc?.title}</button>;
          })}
        </nav>

        <div className="header-actions">
          <div className="search-wrap">
            <button onClick={() => setSearchOpen(!searchOpen)} className="search-trigger" aria-label="Search documentation">
              <Search size={16} /><span>Search docs</span><kbd><Command size={11} /> K</kbd>
            </button>
            {searchOpen && <>
              <div className="search-backdrop" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} />
              <div className="search-popover">
                <div className="search-input-row"><Search size={16} /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search documentation..." autoFocus /></div>
                {searchQuery && <div className="search-results">
                  {filteredPaths.length > 0 ? filteredPaths.map((path) => {
                    const doc = findDocByPath(path);
                    return <button key={path} onClick={() => { navigate(path); setSearchOpen(false); setSearchQuery(""); }} className="search-result"><span>{doc?.title}</span><small>{path}</small></button>;
                  }) : <div className="search-empty">No results found.</div>}
                </div>}
              </div>
            </>}
          </div>
          <a href="https://github.com/zap-lang/zap" target="_blank" rel="noopener noreferrer" className="github-link">GitHub <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </header>
  );
}
