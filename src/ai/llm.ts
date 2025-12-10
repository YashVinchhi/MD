'use server';

// LLM functions using Ollama HTTP API

const OLLAMA_SERVER = process.env.OLLAMA_SERVER || 'http://127.0.0.1:11434';
const MODEL = 'qwen2:0.5b'; // You can change to any available Ollama model

async function ollamaRequest(prompt: string): Promise<string> {
  const response = await fetch(`${OLLAMA_SERVER}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
    }),
  });
  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.statusText}`);
  }
  const data = await response.json();
  return data.response || '';
}

export async function predict(input: string): Promise<string> {
  const prompt = `Provide a single-line completion for the following text. Do not repeat the original text:\n\n${input}`;
  return ollamaRequest(prompt);
}

export async function summarize(text: string): Promise<string> {
  const prompt = `Summarize the following text:\n\n${text}`;
  return ollamaRequest(prompt);
}

export async function generateTags(text: string): Promise<string> {
  const prompt = `Generate 3-5 relevant tags for the following text. Provide them as a comma-separated list:\n\n${text}`;
  return ollamaRequest(prompt);
}

export async function generateMindmap(text: string): Promise<string> {
  const prompt = `Generate a Mermaid.js mind map for the following text. The output must be a valid Mermaid mindmap diagram, starting with \`mermaid\` and \`mindmap\`. Do NOT include any explanations, prose, Markdown headers, or extra text. Only return the Mermaid mindmap code block.\n\nExample:\n\`\`\`mermaid\nmindmap\n  root((Main Idea))\n    (Concept 1)\n      (Sub-concept A)\n      (Sub-concept B)\n    (Concept 2)\n\`\`\`\n\nText to analyze:\n${text}`;
  const response = await ollamaRequest(prompt);
  // Extract mermaid code block
  const match = response.match(/```mermaid[\s\S]*?```/);
  if (match) {
    return match[0].replace(/```mermaid\n?|```/g, '').trim();
  }
  // Fallback: return empty mindmap
  return 'mindmap\n  root((Main Idea))';
}
