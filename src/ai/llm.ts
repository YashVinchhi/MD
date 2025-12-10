'use server';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { ollama } from 'genkitx-ollama';

// Configure Genkit once
const llmProvider = typeof window !== 'undefined' ? localStorage.getItem('llmProvider') : 'gemini';
const apiKey = typeof window !== 'undefined' ? localStorage.getItem('apiKey') : process.env.GEMINI_API_KEY;

let model: string;

const plugins: any[] = [];
switch (llmProvider) {
    case 'ollama':
        plugins.push(ollama({
            models: [{ name: 'gemma' }],
            serverAddress: 'http://127.0.0.1:11434',
        }));
        model = 'ollama/gemma';
        break;
    case 'qwen':
        plugins.push(ollama({
            models: [{ name: 'qwen2:0.5b' }],
            serverAddress: 'http://127.0.0.1:11434',
        }));
        model = 'ollama/qwen2:0.5b';
        break;
    case 'gemini':
    default:
        if (apiKey) {
            plugins.push(googleAI({ apiKey }));
        } else {
            plugins.push(googleAI());
        }
        model = 'google/gemini-1.5-flash-latest';
        break;
}

export const ai = genkit({
    plugins,
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});


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

export async function llm(task: LlmTask, content: string): Promise<string> {
  const prompt = prompts[task](content);

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
