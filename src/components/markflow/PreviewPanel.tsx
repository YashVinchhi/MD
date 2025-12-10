"use client";

import { useEditorStore } from "@/store/editorStore";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { forwardRef, useState } from "react";
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
    input: [...(defaultSchema.attributes?.input || []), ['type', 'checked', 'disabled']],
  },
};

interface ExtraProps extends React.HTMLAttributes<HTMLElement> {
  node?: any;
  className?: string;
  children?: React.ReactNode;
  inline?: boolean;
}

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(({ onPreviewScroll }, ref) => {
  const { markdownText } = useEditorStore();
  const [summary, setSummary] = useState('');

  const fetchSummary = async () => {
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: markdownText }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

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
            code({ node, inline, className, children, ...props }: ExtraProps) {
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
      <button onClick={fetchSummary}>Summarize</button>
      {summary && (
        <div className="summary-box">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
});

PreviewPanel.displayName = "PreviewPanel";
