"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "@/components/Header";
import { CodeBlock } from "@/components/CodeBlock";
import { findDocByPath, getAllDocPaths, docsSections } from "@/data/docs";

const HomePage = () => {
  const navigate = useNavigate();
  const allPaths = getAllDocPaths();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="text-center mb-16">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-zap-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Z</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Zap Programming Language
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            A beginner-friendly, general-purpose programming language designed for Web, Mobile, AI, and IoT applications.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/docs/introduction")}
              className="rounded-lg bg-zap-600 px-6 py-3 text-sm font-semibold text-white hover:bg-zap-700 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/docs/syntax")}
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Language Guide
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {docsSections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-slate-900 mb-2">{section.title}</h3>
              <p className="text-sm text-slate-600 mb-4">
                {section.items.length} article{section.items.length !== 1 ? "s" : ""}
              </p>
              <div className="space-y-2">
                {section.items.slice(0, 3).map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="block text-sm text-zap-700 hover:text-zap-800 hover:underline"
                  >
                    {item.title}
                  </button>
                ))}
                {section.items.length > 3 && (
                  <button
                    onClick={() => navigate(section.items[0].path)}
                    className="text-sm text-slate-500 hover:text-slate-700"
                  >
                    +{section.items.length - 3} more
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-zap-50 border border-zap-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to learn Zap?
          </h2>
          <p className="text-slate-600 mb-6">
            Start with the introduction or jump straight into syntax examples.
          </p>
          <div className="flex flex-wrap gap-3">
            {allPaths.slice(0, 6).map((path) => {
              const doc = findDocByPath(path);
              if (!doc) return null;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-zap-300 hover:text-zap-700 transition-colors"
                >
                  {doc.title}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

const DocPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doc = findDocByPath(location.pathname);

  if (!doc) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
            <p className="text-slate-600">The documentation page you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let pendingTableRows: React.ReactNode[] = [];

    const flushTable = () => {
      if (pendingTableRows.length > 0) {
        elements.push(
          <div key={elements.length} className="my-4 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <tbody>
                {pendingTableRows}
              </tbody>
            </table>
          </div>
        );
        pendingTableRows = [];
      }
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("```")) {
        flushTable();
        const lang = line.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <CodeBlock key={elements.length} code={codeLines.join("\n")} language={lang || "text"} />
        );
        i++;
        continue;
      }

      if (line.startsWith("# ")) {
        flushTable();
        elements.push(<h1 key={elements.length} className="text-3xl font-bold tracking-tight text-slate-900 mb-4">{line.slice(2)}</h1>);
      } else if (line.startsWith("## ")) {
        flushTable();
        elements.push(<h2 key={elements.length} className="text-2xl font-semibold tracking-tight text-slate-900 mt-10 mb-4">{line.slice(3)}</h2>);
      } else if (line.startsWith("### ")) {
        flushTable();
        elements.push(<h3 key={elements.length} className="text-xl font-semibold tracking-tight text-slate-900 mt-8 mb-3">{line.slice(4)}</h3>);
      } else if (line.startsWith("- ")) {
        flushTable();
        elements.push(<li key={elements.length} className="text-slate-600 ml-4">{line.slice(2)}</li>);
      } else if (line.startsWith("> ")) {
        flushTable();
        elements.push(<blockquote key={elements.length} className="border-l-4 border-zap-300 pl-4 italic text-slate-600 my-4">{line.slice(2)}</blockquote>);
      } else if (line.startsWith("| ")) {
        const cells = line.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
        if (cells.every(c => c.replace(/[-\s]/g, "") === "")) {
          pendingTableRows.push(<tr key={pendingTableRows.length}><td colSpan={cells.length} className="border border-slate-200 px-3 py-1 bg-slate-50"></td></tr>);
        } else {
          const nextLine = lines[i + 1];
          const isSeparator = nextLine?.startsWith("| ") && nextLine?.includes("---");
          if (isSeparator) {
            i++;
            pendingTableRows.push(
              <tr key={pendingTableRows.length}>
                {cells.map((cell, ci) => (
                  <th key={ci} className="border border-slate-200 px-3 py-2 bg-slate-50 font-semibold text-slate-700 text-left">{cell}</th>
                ))}
              </tr>
            );
          } else {
            pendingTableRows.push(
              <tr key={pendingTableRows.length}>
                {cells.map((cell, ci) => (
                  <td key={ci} className="border border-slate-200 px-3 py-2 text-slate-600 text-left">{cell}</td>
                ))}
              </tr>
            );
          }
        }
      } else if (line.trim() === "") {
        flushTable();
        elements.push(<br key={elements.length} />);
      } else if (line.startsWith("<") && line.endsWith(">")) {
        flushTable();
      } else {
        flushTable();
        elements.push(<p key={elements.length} className="text-slate-600 leading-relaxed mb-4">{line}</p>);
      }
      i++;
    }

    flushTable();

    return elements;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <aside className="w-64 shrink-0 border-r border-slate-200 bg-slate-50/50">
          <div className="h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
            <nav className="space-y-1">
              {docsSections.map((section) => {
                const hasActive = section.items.some((item) => item.path === location.pathname);
                return (
                  <div key={section.title} className="mb-2">
                    <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-900">
                      <span>{section.title}</span>
                      {hasActive && <div className="h-1.5 w-1.5 rounded-full bg-zap-500" />}
                    </div>
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
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
            {renderMarkdown(doc.content)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);

  useEffect(() => {
    setRouter(
      createBrowserRouter([
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/docs/*",
          element: <DocPage />,
        },
      ])
    );
  }, []);

  if (!router) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
