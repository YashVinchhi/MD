"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";
import { Skeleton } from "@/components/ui/skeleton";

interface MermaidProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: 'loose',
  themeVariables: {
    background: '#1B1B1B',
    primaryColor: '#7A8CB2',
    primaryTextColor: '#1B1B1B',
    lineColor: '#5F6A7A',
    textColor: '#FFFFFF'
  }
});

export function Mermaid({ chart }: MermaidProps) {
  const id = useId();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSvg(null);
    setError(null);
    
    if (chart) {
      try {
        mermaid.render(
            `mermaid-svg-${id}`,
            chart
        ).then(({ svg: renderedSvg }) => {
            setSvg(renderedSvg);
        }).catch(err => {
            console.error("Mermaid render error:", err);
            setError("Failed to render Mermaid diagram. Please check your syntax.");
        });
      } catch (e) {
        console.error("Mermaid parsing error:", e);
        setError("Invalid Mermaid syntax.");
      }
    }
  }, [chart, id]);

  if (error) {
    return (
      <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-sm text-destructive-foreground">
        <p className="font-bold">Mermaid Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (svg) {
    return <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
  }

  return <Skeleton className="h-48 w-full" />;
}
