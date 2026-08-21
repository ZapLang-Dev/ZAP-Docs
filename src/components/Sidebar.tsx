"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, ChevronDown, BookOpen, Github, ExternalLink } from "lucide-react";
import { docsSections } from "@/data/docs";

export function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(docsSections.map((s) => s.title));
  const navigate = useNavigate();
  const location = useLocation();
  const toggleSection = (title: string) => setExpandedSections((prev) => prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]);

  return (
    <aside className="docs-sidebar">
      <div className="sidebar-scroll">
        <div className="sidebar-kicker"><BookOpen size={14} /> Documentation</div>
        <nav className="sidebar-nav" aria-label="Documentation sections">
          {docsSections.map((section, index) => {
            const isExpanded = expandedSections.includes(section.title);
            const hasActive = section.items.some((item) => location.pathname === item.path);
            return <div key={section.title} className="sidebar-section">
              <button onClick={() => toggleSection(section.title)} className={`section-toggle ${hasActive ? "is-current" : ""}`}>
                <span><i>{String(index + 1).padStart(2, "0")}</i>{section.title}</span>
                {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              {isExpanded && <div className="section-items">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return <button key={item.path} onClick={() => navigate(item.path)} className={`sidebar-item ${isActive ? "is-active" : ""}`}><span className="item-dot" />{item.title}</button>;
                })}
              </div>}
            </div>;
          })}
        </nav>
        <div className="sidebar-resource">
          <span className="resource-icon"><Github size={17} /></span>
          <div><strong>Build with Zap</strong><p>Explore the source and releases.</p></div>
          <a href="https://github.com/zap-lang/zap" target="_blank" rel="noopener noreferrer" aria-label="Open Zap repository"><ExternalLink size={15} /></a>
        </div>
      </div>
    </aside>
  );
}
