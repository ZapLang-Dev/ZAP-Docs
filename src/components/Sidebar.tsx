"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";
import { docsSections, findDocByPath } from "@/data/docs";

export function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    docsSections.map((s) => s.title)
  );
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-slate-50/50">
      <div className="h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
        <nav className="space-y-1">
          {docsSections.map((section) => {
            const isExpanded = expandedSections.includes(section.title);
            return (
              <div key={section.title} className="mb-2">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <span>{section.title}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="ml-2 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
                    {section.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`flex w-full items-center rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                            isActive
                              ? "bg-zap-100 text-zap-800 font-medium"
                              : "text-slate-600 hover:text-zap-700 hover:bg-slate-100"
                          }`}
                        >
                          {item.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-8 border-t border-slate-200 pt-4">
          <p className="px-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
            Resources
          </p>
          <div className="mt-2 space-y-0.5">
            <a
              href="https://github.com/zap-lang/zap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-600 hover:text-zap-700 hover:bg-slate-100 transition-colors"
            >
              GitHub Repository
            </a>
            <a
              href="https://github.com/zap-lang/zap/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-600 hover:text-zap-700 hover:bg-slate-100 transition-colors"
            >
              Releases
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
