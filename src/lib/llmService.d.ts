declare module "@/lib/llmService" {
  export function getPrediction(content: string): Promise<string>;
}