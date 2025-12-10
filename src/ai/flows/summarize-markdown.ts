'use server';

/**
 * @fileOverview A flow that summarizes a lengthy markdown document.
 *
 * - summarizeMarkdown - A function that summarizes a markdown document.
 * - SummarizeMarkdownInput - The input type for the summarizeMarkdown function.
 * - SummarizeMarkdownOutput - The return type for the summarizeMarkdown function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMarkdownInputSchema = z.object({
  markdownText: z
    .string()
    .describe('The lengthy markdown document to summarize.'),
});
export type SummarizeMarkdownInput = z.infer<typeof SummarizeMarkdownInputSchema>;

const SummarizeMarkdownOutputSchema = z.object({
  summary: z.string().describe('The summary of the markdown document.'),
});
export type SummarizeMarkdownOutput = z.infer<typeof SummarizeMarkdownOutputSchema>;

export async function summarizeMarkdown(
  input: SummarizeMarkdownInput
): Promise<SummarizeMarkdownOutput> {
  return summarizeMarkdownFlow(input);
}

const summarizeMarkdownPrompt = ai.definePrompt({
  name: 'summarizeMarkdownPrompt',
  input: {schema: SummarizeMarkdownInputSchema},
  output: {schema: SummarizeMarkdownOutputSchema},
  prompt: `Summarize the following markdown document:\n\n{{markdownText}}`,
});

const summarizeMarkdownFlow = ai.defineFlow(
  {
    name: 'summarizeMarkdownFlow',
    inputSchema: SummarizeMarkdownInputSchema,
    outputSchema: SummarizeMarkdownOutputSchema,
  },
  async input => {
    const {output} = await summarizeMarkdownPrompt(input);
    return output!;
  }
);
