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
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { summarize } from "@/ai/llm";

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
  const [isLoading, setIsLoading] = useState(false);

  const fetchSummary = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const summaryText = await summarize(markdownText);
      setSummary(summaryText);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full overflow-auto" ref={ref} onScroll={onPreviewScroll}>
        <div className="p-6">
            <div className="flex items-center justify-end mb-4">
                <Button onClick={fetchSummary} disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Summarize
                </Button>
            </div>
            
            {summary && (
                <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5" />
                    Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{summary}</p>
                </CardContent>
                </Card>
            )}

            <article className="prose prose-invert max-w-none">
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
