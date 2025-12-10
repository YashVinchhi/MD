import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { ollama } from 'genkitx-ollama';

// This is a re-usable Genkit configuration.
// We read the provider and API key from localStorage if available,
// otherwise we fall back to environment variables.
let llmProvider: string | null = null;
let apiKey: string | null = null;

if (typeof window !== 'undefined') {
  llmProvider = localStorage.getItem('llmProvider');
  apiKey = localStorage.getItem('apiKey');
}

const plugins: any[] = [];
if (llmProvider === 'ollama') {
  plugins.push(
    ollama({
      models: [{ name: 'gemma' }],
      serverAddress: 'http://127.0.0.1:11434',
    })
  );
} else if (llmProvider === 'qwen') {
  plugins.push(
    ollama({
      models: [{ name: 'qwen2:0.5b' }],
      serverAddress: 'http://127.0.0.1:11434',
    })
  );
} else {
  // Default to Gemini
  plugins.push(googleAI({ apiKey: apiKey || process.env.GEMINI_API_KEY }));
}

export const ai = genkit({
  plugins,
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
