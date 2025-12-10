'use server';

/**
 * @fileOverview A flow that summarizes a lengthy markdown document.
 *
 * - summarizeMarkdownDocument - A function that summarizes a markdown document.
 * - SummarizeMarkdownDocumentInput - The input type for the summarizeMarkdownDocument function.
 * - SummarizeMarkdownDocumentOutput - The return type for the summarizeMarkdownDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMarkdownDocumentInputSchema = z.object({
  markdownText: z
    .string()
    .describe('The lengthy markdown document to summarize.'),
});
export type SummarizeMarkdownDocumentInput = z.infer<typeof SummarizeMarkdownDocumentInputSchema>;

const SummarizeMarkdownDocumentOutputSchema = z.object({
  summary: z.string().describe('The summary of the markdown document.'),
});
export type SummarizeMarkdownDocumentOutput = z.infer<typeof SummarizeMarkdownDocumentOutputSchema>;

export async function summarizeMarkdownDocument(
  input: SummarizeMarkdownDocumentInput
): Promise<SummarizeMarkdownDocumentOutput> {
  return summarizeMarkdownDocumentFlow(input);
}

const summarizeMarkdownDocumentPrompt = ai.definePrompt({
  name: 'summarizeMarkdownDocumentPrompt',
  input: {schema: SummarizeMarkdownDocumentInputSchema},
  output: {schema: SummarizeMarkdownDocumentOutputSchema},
  prompt: `Summarize the following markdown document:\n\n{{markdownText}}`,
});

const summarizeMarkdownDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeMarkdownDocumentFlow',
    inputSchema: SummarizeMarkdownDocumentInputSchema,
    outputSchema: SummarizeMarkdownDocumentOutputSchema,
  },
  async input => {
    const {output} = await summarizeMarkdownDocumentPrompt(input);
    return output!;
  }
);
