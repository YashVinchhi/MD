"use client";

import { generateMermaidDiagram } from "@/ai/flows/generate-mermaid-diagram";
import { useEffect, useState } from "react";
import { Mermaid } from "./Mermaid";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";

interface MermaidGeneratorProps {
  description: string;
}

export function MermaidGenerator({ description }: MermaidGeneratorProps) {
  const [mermaidCode, setMermaidCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!description) {
        setIsLoading(false);
        setError("No description provided for diagram generation.");
        return;
    };

    setIsLoading(true);
    setError(null);
    setMermaidCode(null);

    generateMermaidDiagram({ description })
      .then((result) => {
        setMermaidCode(result.mermaidCode);
      })
      .catch((err) => {
        console.error("AI Mermaid Generation Error:", err);
        setError("Failed to generate diagram. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [description]);

  if (isLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Generation Failed</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (mermaidCode) {
    return <Mermaid chart={mermaidCode} />;
  }

  return null;
}
