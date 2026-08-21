"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { CodeBlock } from "@/components/CodeBlock";
import { findDocByPath, getAllDocPaths, docsSections } from "@/data/docs";

const HomePage = () => {
  const navigate = useNavigate();
  const allPaths = getAllDocPaths();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="home-main">
        <div className="home-hero">
          <div className="home-logo"><img src="/logo.jpg" alt="Zap logo" /></div>
          <h1 className="home-title">
            Zap Programming Language
          </h1>
          <p className="home-subtitle">
            A beginner-friendly, general-purpose programming language designed for Web, Mobile, AI, and IoT applications.
          </p>
          <div className="home-actions">
            <button
              onClick={() => navigate("/docs/introduction")}
              className="button-primary"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/docs/syntax")}
              className="button-secondary"
            >
              Language Guide
            </button>
          </div>
        </div>

        <div className="home-cards">
          {docsSections.map((section) => (
            <div
              key={section.title}
              className="home-card"
            >
              <h3 className="home-card-title">{section.title}</h3>
              <p className="home-card-meta">
                {section.items.length} article{section.items.length !== 1 ? "s" : ""}
              </p>
              <div className="space-y-2">
                {section.items.slice(0, 3).map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="home-card-link"
                  >
                    {item.title}
                  </button>
                ))}
                {section.items.length > 3 && (
                  <button
                    onClick={() => navigate(section.items[0].path)}
                    className="home-card-more"
                  >
                    +{section.items.length - 3} more
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="home-cta">
          <h2 className="home-cta-title">
            Ready to learn Zap?
          </h2>
          <p className="home-cta-copy">
            Start with the introduction or jump straight into syntax examples.
          </p>
          <div className="home-cta-links">
            {allPaths.slice(0, 6).map((path) => {
              const doc = findDocByPath(path);
              if (!doc) return null;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="home-cta-link"
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
      <div className="docs-shell">
        <Sidebar />
        <main className="docs-main">
          <div className="docs-content">{renderMarkdown(doc.content)}</div>
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
