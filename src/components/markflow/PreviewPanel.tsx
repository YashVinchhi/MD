"use client";

import { useEditorStore } from "@/store/editorStore";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { forwardRef } from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { Mermaid } from "./Mermaid";
import "katex/dist/katex.min.css";
import 'highlight.js/styles/github-dark.css';

interface PreviewPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPreviewScroll?: (event: any) => void;
}

const rehypeSanitizeOptions = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), ['className', 'language-mermaid', 'language-math']],
    span: [...(defaultSchema.attributes?.span || []), ['className', 'line-numbers-rows']],
  },
};

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(({ onPreviewScroll }, ref) => {
  const { markdownText } = useEditorStore();

  return (
    <div className="h-full overflow-auto" ref={ref} onScroll={onPreviewScroll}>
      <article className="prose prose-invert max-w-none p-6">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[
            rehypeKatex,
            rehypeHighlight,
            [rehypeSanitize, rehypeSanitizeOptions],
          ]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              if (match && match[1] === "mermaid") {
                return (
                  <Mermaid chart={String(children).replace(/\n$/, "")} />
                );
              }
              return !inline && match ? (
                <code className={`${className || ''} font-code`} {...props}>
                  {children}
                </code>
              ) : (
                <code className={`${className || ''} font-code`} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdownText}
        </ReactMarkdown>
      </article>
    </div>
  );
});

PreviewPanel.displayName = "PreviewPanel";
