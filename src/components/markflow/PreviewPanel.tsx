"use client";

import { useEditorStore } from "@/store/editorStore";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { forwardRef } from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";

interface PreviewPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPreviewScroll?: (event: any) => void;
}

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(({ onPreviewScroll }, ref) => {
  const { markdownText } = useEditorStore();

  return (
    <div className="h-full overflow-auto" ref={ref} onScroll={onPreviewScroll}>
      <article className="prose prose-invert max-w-none p-6">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeSanitize]}
          components={{
            code({ node, inline, className, children, ...props }) {
              return (
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
