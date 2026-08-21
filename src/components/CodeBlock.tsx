"use client";

import { useState } from "react";

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
    <div className="code-block">
      {caption && <div className="code-caption">{caption}</div>}
      <div className="code-toolbar">
        <span className="code-lang">{language}</span>
        <button onClick={handleCopy} className="code-copy">{copied ? "Copied" : "Copy code"}</button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
