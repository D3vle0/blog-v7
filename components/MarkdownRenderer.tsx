"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Check, Copy, AlertTriangle, Info, Lightbulb, Flame } from "lucide-react";

const ALERT_TYPES = {
  NOTE: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500" },
  TIP: { icon: Lightbulb, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500" },
  IMPORTANT: { icon: Flame, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500" },
  WARNING: { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500" },
  CAUTION: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500" },
};

const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_IMAGE_HEIGHT = 675;

const normalizeImageSrc = (src?: string) => {
  if (!src) return "";
  if (src.startsWith("/img/")) {
    return src.replace("/img/", "/images/posts/");
  }
  if (src.startsWith("img/")) {
    return `/${src.replace("img/", "images/posts/")}`;
  }
  return src;
};

const parseDimension = (value: unknown, fallback: number) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

function CustomBlockquote({ children, ...props }: any) {
  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length > 0) {
    // Usually the first child is a newline string followed by a <p> tag, so let's find the first element
    const firstElementIndex = childrenArray.findIndex(child => React.isValidElement(child) && (child as any).type === 'p');

    if (firstElementIndex !== -1) {
      const firstElement = childrenArray[firstElementIndex] as any;
      const pChildren = React.Children.toArray(firstElement.props.children);
      const firstPChild = pChildren[0];

      if (typeof firstPChild === "string") {
        const match = firstPChild.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([^\n]*)/i);

        if (match) {
          const alertType = match[1].toUpperCase() as keyof typeof ALERT_TYPES;
          const title = match[2].trim() || alertType;
          const config = ALERT_TYPES[alertType];
          const Icon = config.icon;

          const newPChildren = pChildren.map((child, index) => {
            if (index === 0 && typeof child === "string") {
              let str = child.slice(match[0].length);
              str = str.replace(/^\s*(?:\r\n|\r|\n)\s*/, "");
              return str;
            }
            return child;
          }).filter((child, index) => {
            if (index === 0 && typeof child === "string" && child.trim() === "") return false;
            if (index === 0 && React.isValidElement(child) && (child as any).type === "br") return false;
            return true;
          });

          // Extra safety: aggressively remove any leftover exact match in the first text node
          if (newPChildren.length > 0 && typeof newPChildren[0] === "string") {
            if (newPChildren[0].includes(match[0])) {
              newPChildren[0] = newPChildren[0].replace(match[0], "").trimStart();
            }
          }

          const hasImage = newPChildren.some((child) => {
            if (!React.isValidElement(child)) return false;
            const type = (child as any).type;
            return (
              type === "img" ||
              type === Zoom ||
              (typeof type === "function" && (type.name === "Zoom" || type.displayName === "Zoom"))
            );
          });

          const ElementType = hasImage ? "div" : "p";
          const newFirstElement = <ElementType key={firstElement.key || "callout-p"} className={(firstElement.props && firstElement.props.className) || ""}>{newPChildren}</ElementType>;
          const newChildren = [...childrenArray];
          newChildren[firstElementIndex] = newFirstElement;

          return (
            <div className={`my-6 border-l-4 rounded-r-lg px-4 py-4 ${config.bg} ${config.border}`}>
              <div className={`flex items-center gap-2 mb-2 text-[1.05rem] font-bold ${config.color}`}>
                <Icon className="w-5 h-5" />
                <span>{title}</span>
              </div>
              <div className="text-foreground/90 prose-p:my-1 prose-p:leading-relaxed text-[0.95rem]">
                {newChildren}
              </div>
            </div>
          );
        }
      }
    }
  }

  return (
    <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground my-6" {...props}>
      {children}
    </blockquote>
  );
}

function CodeBlockWithCopy({ children, language, ...props }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-6 bg-[#282c34] not-prose">
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
        children={String(children)}
        language={language}
        style={oneDark}
        showLineNumbers={true}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          background: "transparent",
          padding: "1.5rem",
          fontSize: "0.85rem",
          lineHeight: "1.5",
          textShadow: "none",
        }}
        codeTagProps={{
          style: {
            textShadow: "none",
            fontFamily: "inherit",
          },
        }}
      />
    </div>
  );
}

function CodeBlock({ node, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || "");

  if (match) {
    return (
      <CodeBlockWithCopy language={match[1]} {...props}>
        {String(children).replace(/\n$/, "")}
      </CodeBlockWithCopy>
    );
  }

  // Inline code - stylized to match theme and support light/dark modes
  return (
    <code className="bg-zinc-100 text-zinc-900 dark:bg-[#282c34] dark:text-[#abb2bf] px-1.5 py-0.5 rounded-md font-mono text-[0.9em] border border-black/5 dark:border-white/5" {...props}>
      {children}
    </code>
  );
}

function PreBlock({ children }: any) {
  if (React.isValidElement(children)) {
    // If it's a code block with a language, CodeBlock returned a CodeBlockWithCopy element
    if ((children as any).type === CodeBlockWithCopy) {
      return <>{children}</>;
    }

    // If it's a code block without a language, CodeBlock returned a standard <code> element
    if ((children as any).type === 'code') {
      const codeProps = (children as any).props;
      return (
        <CodeBlockWithCopy language="text">
          {String(codeProps.children).replace(/\n$/, "")}
        </CodeBlockWithCopy>
      );
    }
  }

  return <pre className="not-prose">{children}</pre>;
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      components={{
        blockquote: CustomBlockquote,
        pre: PreBlock,
        code: CodeBlock,
        p({ node, children }: any) {
          // Check if children contain an image via AST node or React children matching Zoom/img
          const hasImageInAST = node?.children?.some(
            (child: any) => child.type === "element" && child.tagName === "img"
          );

          const hasImageInChildren = React.Children.toArray(children).some((child) => {
            if (!React.isValidElement(child)) return false;
            const type = (child as any).type;
            return (
              type === "img" ||
              type === Zoom ||
              (typeof type === "function" && (type.name === "Zoom" || type.displayName === "Zoom"))
            );
          });

          if (hasImageInAST || hasImageInChildren) {
            return <div className="my-6">{children}</div>;
          }

          return <p>{children}</p>;
        },
        img({ src, alt, width, height, className, ...props }: any) {
          const normalizedSrc = normalizeImageSrc(src);
          if (!normalizedSrc) return null;

          const { node: _node, ...rest } = props;
          void _node;
          const imageWidth = parseDimension(width, DEFAULT_IMAGE_WIDTH);
          const imageHeight = parseDimension(height, DEFAULT_IMAGE_HEIGHT);
          const mergedClassName = [
            "rounded-xl border border-border shadow-sm max-h-[600px] object-contain mx-auto",
            className,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <Zoom>
              <Image
                {...rest}
                src={normalizedSrc}
                alt={alt ?? ""}
                width={imageWidth}
                height={imageHeight}
                sizes="(max-width: 768px) 100vw, 768px"
                className={mergedClassName}
                style={{ width: "100%", height: "auto" }}
                loading="lazy"
              />
            </Zoom>
          );
        },
        a({ href, children, ...props }: any) {
          const isAnchor = href?.startsWith("#");
          return (
            <a
              href={href}
              target={isAnchor ? undefined : "_blank"}
              rel={isAnchor ? undefined : "noopener noreferrer"}
              {...props}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
