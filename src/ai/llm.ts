'use server';

import { ai } from './genkit';

type LlmTask = 'summarize' | 'predict' | 'tags' | 'mindmap';

const prompts: Record<LlmTask, (content: string) => string> = {
    summarize: (content: string) => `Summarize the following text:\n\n${content}`,
    predict: (content: string) => `Provide a single-line completion for the following text. Do not repeat the original text:\n\n${content}`,
    tags: (content: string) => `Generate 3-5 relevant tags for the following text. Provide them as a comma-separated list:\n\n${content}`,
    mindmap: (content: string) => `Generate a Mermaid.js mind map from the following text. The mindmap should represent the key concepts and their relationships.

    Example format:
    mindmap
      root((Main Idea))
        (Concept 1)
          (Sub-concept A)
          (Sub-concept B)
        (Concept 2)
    
    Text to analyze:
    ${content}`,
};

function getModel() {
  let llmProvider: string | null = null;
  if (typeof window !== 'undefined') {
    llmProvider = localStorage.getItem('llmProvider');
  }

  if (llmProvider === 'ollama') {
    return 'ollama/gemma';
  }
  if (llmProvider === 'qwen') {
    return 'ollama/qwen2:0.5b';
  }
  return 'google/gemini-1.5-flash';
}

export async function llm(task: LlmTask, content: string): Promise<string> {
  const prompt = prompts[task](content);
  const model = getModel();

  const { text } = await ai.generate({
    model,
    prompt,
  });

  return text;
}

export async function summarize(content: string) {
    'use server';
    return await llm('summarize', content);
}

export async function predict(content:string) {
    'use server';
    return await llm('predict', content);
}
