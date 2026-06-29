import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split content by code blocks: ```[lang] code ```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4 font-sans text-slate-700 leading-relaxed text-sm md:text-base">
      {parts.map((part, partIdx) => {
        if (part.startsWith("```")) {
          // It's a code block
          const match = part.match(/```(\w*)\n([\s\S]*?)```/);
          const lang = match ? match[1] : "";
          let code = match ? match[2] : part.slice(3, -3);
          // Trim trailing newlines
          code = code.trim();

          return <CodeBlock key={partIdx} code={code} language={lang} />;
        } else {
          // Plain text chunk - parse headers, lists, and inline formatting
          const lines = part.split("\n");
          return (
            <div key={partIdx} className="space-y-2">
              {lines.map((line, lineIdx) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={lineIdx} className="h-2" />;

                // Check for Headings
                if (trimmed.startsWith("### ")) {
                  return (
                    <h4 key={lineIdx} className="text-base md:text-lg font-display font-semibold text-slate-900 mt-4 mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-sky-500 rounded-full" />
                      {parseInlineFormatting(trimmed.slice(4))}
                    </h4>
                  );
                }
                if (trimmed.startsWith("## ")) {
                  return (
                    <h3 key={lineIdx} className="text-lg md:text-xl font-display font-bold text-slate-900 mt-6 mb-3 border-b border-slate-100 pb-1">
                      {parseInlineFormatting(trimmed.slice(3))}
                    </h3>
                  );
                }
                if (trimmed.startsWith("# ")) {
                  return (
                    <h2 key={lineIdx} className="text-xl md:text-2xl font-display font-black text-slate-900 mt-8 mb-4">
                      {parseInlineFormatting(trimmed.slice(2))}
                    </h2>
                  );
                }

                // Check for lists (bullet or dash)
                if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                  return (
                    <div key={lineIdx} className="flex items-start gap-2.5 pl-4 py-0.5">
                      <span className="text-sky-500 mt-1.5 select-none text-[10px]">●</span>
                      <span className="flex-1 text-slate-600">
                        {parseInlineFormatting(trimmed.slice(2))}
                      </span>
                    </div>
                  );
                }

                // Check for numbered lists
                const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
                if (numMatch) {
                  return (
                    <div key={lineIdx} className="flex items-start gap-2.5 pl-4 py-0.5">
                      <span className="text-sky-600 font-mono text-xs font-semibold mt-0.5 select-none">
                        {numMatch[1]}.
                      </span>
                      <span className="flex-1 text-slate-600">
                        {parseInlineFormatting(numMatch[2])}
                      </span>
                    </div>
                  );
                }

                // Default paragraph
                return (
                  <p key={lineIdx} className="text-slate-600 pl-0">
                    {parseInlineFormatting(trimmed)}
                  </p>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
}

// Helper to parse inline bold (**text**) and code (`code`)
function parseInlineFormatting(text: string): React.ReactNode[] {
  // Regex split by ** or `
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return tokens.map((token, idx) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code key={idx} className="px-1.5 py-0.5 bg-slate-100 text-rose-600 font-mono text-xs rounded border border-slate-200">
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
}

interface CodeBlockProps {
  key?: React.Key;
  code: string;
  language?: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = code.split("\n");

  return (
    <div className="relative rounded-xl border border-slate-800 bg-slate-900 text-slate-100 overflow-hidden my-4 shadow-md font-mono text-xs md:text-sm">
      {/* Header Panel */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-sky-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Display */}
      <div className="overflow-x-auto p-4 flex">
        {/* Line Numbers */}
        <div className="text-slate-500 pr-4 text-right select-none border-r border-slate-800 text-[11px] font-mono w-8">
          {codeLines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* Code Content */}
        <pre className="pl-4 flex-1 text-slate-200 text-[11px] leading-5">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
