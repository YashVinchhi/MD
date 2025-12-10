'use server';

/**
 * @fileOverview Generates a Mermaid diagram from a textual description using AI.
 *
 * - generateMermaidDiagram - A function that generates a Mermaid diagram from a textual description.
 * - GenerateMermaidDiagramInput - The input type for the generateMermaidDiagram function.
 * - GenerateMermaidDiagramOutput - The return type for the generateMermaidDiagram function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMermaidDiagramInputSchema = z.object({
  description: z.string().describe('A textual description of the diagram to generate.'),
});

export type GenerateMermaidDiagramInput = z.infer<typeof GenerateMermaidDiagramInputSchema>;

const GenerateMermaidDiagramOutputSchema = z.object({
  mermaidCode: z.string().describe('The Mermaid code for the diagram.'),
});

export type GenerateMermaidDiagramOutput = z.infer<typeof GenerateMermaidDiagramOutputSchema>;

export async function generateMermaidDiagram(input: GenerateMermaidDiagramInput): Promise<GenerateMermaidDiagramOutput> {
  return generateMermaidDiagramFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMermaidDiagramPrompt',
  input: {schema: GenerateMermaidDiagramInputSchema},
  output: {schema: GenerateMermaidDiagramOutputSchema},
  prompt: `You are an expert in generating Mermaid diagrams.
  Given the following description, generate the Mermaid code for the diagram.

  Description: {{{description}}}

  The Mermaid code should be valid and well-formatted.
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateMermaidDiagramFlow = ai.defineFlow(
  {
    name: 'generateMermaidDiagramFlow',
    inputSchema: GenerateMermaidDiagramInputSchema,
    outputSchema: GenerateMermaidDiagramOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
