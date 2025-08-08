'use server';
/**
 * @fileOverview A flow for generating ironic progress tracker updates, measuring 'Disappointment Points' and 'IQ Reduction Score'.
 *
 * - generateFoolishProgressUpdate - A function that generates the foolish progress update.
 * - FoolishProgressTrackerInput - The input type for the generateFoolishProgressUpdate function.
 * - FoolishProgressTrackerOutput - The return type for the generateFoolishProgressUpdate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FoolishProgressTrackerInputSchema = z.object({
  disappointmentPoints: z
    .number()
    .describe('The current number of disappointment points.'),
  iqReductionScore: z
    .number()
    .describe('The current IQ reduction score.'),
});
export type FoolishProgressTrackerInput = z.infer<typeof FoolishProgressTrackerInputSchema>;

const FoolishProgressTrackerOutputSchema = z.object({
  update: z.string().describe('The generated progress update message.'),
  progress: z.string().describe('A one-sentence summary of the progress.'),
});
export type FoolishProgressTrackerOutput = z.infer<typeof FoolishProgressTrackerOutputSchema>;

export async function generateFoolishProgressUpdate(
  input: FoolishProgressTrackerInput
): Promise<FoolishProgressTrackerOutput> {
  return foolishProgressTrackerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'foolishProgressTrackerPrompt',
  input: {schema: FoolishProgressTrackerInputSchema},
  output: {schema: FoolishProgressTrackerOutputSchema},
  prompt: `You are a progress tracker that ironically measures the user's increasing 'Disappointment Points' and 'IQ Reduction Score' throughout the quiz.

  Generate a short, one-sentence update message that reflects the user's progress, or lack thereof, in a humorous and subtly self-deprecating way. Only include a one-sentence update.

  Disappointment Points: {{{disappointmentPoints}}}
  IQ Reduction Score: {{{iqReductionScore}}}
  `,
});

const foolishProgressTrackerFlow = ai.defineFlow(
  {
    name: 'foolishProgressTrackerFlow',
    inputSchema: FoolishProgressTrackerInputSchema,
    outputSchema: FoolishProgressTrackerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output,
      progress: `Generated a progress tracker update reflecting the user's 'Disappointment Points' and 'IQ Reduction Score'.`,
    } as FoolishProgressTrackerOutput;
  }
);
