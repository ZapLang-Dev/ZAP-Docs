"use client";

import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
}

export function CodeBlock({ code, language = "zap", caption }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-slate-200">
      {caption && (
        <div className="bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500 border-b border-slate-200">
          {caption}
        </div>
      )}
      <div className="relative">
        <div className="flex items-center justify-between bg-slate-900 px-4 py-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
