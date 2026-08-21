"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllDocPaths, findDocByPath } from "@/data/docs";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const allPaths = getAllDocPaths();
  const filteredPaths = searchQuery
    ? allPaths.filter((path) => {
        const doc = findDocByPath(path);
        return (
          doc?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          path.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-bold text-lg text-slate-900 hover:text-zap-700 transition-colors"
          >
            <div className="h-7 w-7 rounded-md bg-zap-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">Z</span>
            </div>
            Zap Docs
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {["/docs/introduction", "/docs/syntax", "/docs/stdlib", "/docs/cli"].map(
              (path) => {
                const doc = findDocByPath(path);
                return (
                  <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-zap-700 hover:bg-zap-50 rounded-md transition-colors"
                  >
                    {doc?.title}
                  </button>
                );
              }
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500">
                ⌘K
              </kbd>
            </button>

            {searchOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                />
                <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg">
                  <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search documentation..."
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                      autoFocus
                    />
                  </div>
                  {searchQuery && (
                    <div className="max-h-64 overflow-y-auto p-1">
                      {filteredPaths.length > 0 ? (
                        filteredPaths.map((path) => {
                          const doc = findDocByPath(path);
                          return (
                            <button
                              key={path}
                              onClick={() => {
                                navigate(path);
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="flex w-full flex-col gap-0.5 rounded-md px-3 py-2 text-left hover:bg-slate-50 transition-colors"
                            >
                              <span className="text-sm font-medium text-slate-900">
                                {doc?.title}
                              </span>
                              <span className="text-xs text-slate-500">{path}</span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="px-3 py-4 text-sm text-slate-500">
                          No results found.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <a
            href="https://github.com/zap-lang/zap"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-zap-700 transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
