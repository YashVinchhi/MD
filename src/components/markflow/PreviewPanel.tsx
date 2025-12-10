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
import { Sparkles, Tags } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="h-full overflow-auto max-w-3xl mx-auto w-full" ref={ref} onScroll={onPreviewScroll}>
      <div className="p-6">
        <article className="prose prose-invert max-w-none break-words w-full">
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
      </div>
    </div>
  );
});

PreviewPanel.displayName = "PreviewPanel";
