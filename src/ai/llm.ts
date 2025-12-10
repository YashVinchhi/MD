'use server';

import { generate } from '@genkit-ai/core';
import { configureGenkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { ollama } from 'genkitx/ollama';

type LlmTask = 'summarize' | 'predict' | 'tags' | 'mindmap';

async function getClient() {
  const provider = typeof window !== 'undefined' ? localStorage.getItem('llmProvider') : 'gemini';
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem('apiKey') : process.env.GEMINI_API_KEY;

  switch (provider) {
    case 'ollama':
      configureGenkit({
        plugins: [
          ollama({
            models: [{ name: 'gemma' }],
            serverAddress: 'http://127.0.0.1:11434',
          }),
        ],
        logLevel: 'debug',
        enableTracingAndMetrics: true,
      });
      return 'ollama/gemma';
    case 'qwen':
        configureGenkit({
            plugins: [
              ollama({
                models: [{ name: 'qwen2:0.5b' }],
                serverAddress: 'http://127.0.0.1:11434',
              }),
            ],
            logLevel: 'debug',
            enableTracingAndMetrics: true,
          });
          return 'ollama/qwen2:0.5b';
    case 'gemini':
    default:
      configureGenkit({
        plugins: [googleAI({ apiKey })],
        logLevel: 'debug',
        enableTracingAndMetrics: true,
      });
      return 'google/gemini-1.5-flash';
  }
}

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
  const model = await getClient();
  const prompt = prompts[task](content);

  const { text } = await generate({
    model,
    prompt,
  });

  return text;
}