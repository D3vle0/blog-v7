"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Check, Copy } from "lucide-react";

function CodeBlock({ node, inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="relative group rounded-lg overflow-hidden my-6">
        <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <SyntaxHighlighter
          {...props}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
          }}
        />
      </div>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code: CodeBlock,
        img(props) {
          return (
            <Zoom>
              <img
                {...props}
                className="rounded-xl border border-border shadow-sm my-6 max-h-[600px] object-contain mx-auto"
                loading="lazy"
              />
            </Zoom>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
