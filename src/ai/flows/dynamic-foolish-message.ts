'use server';

/**
 * @fileOverview A flow that generates a random foolish message for quiz feedback, progress tracker updates, and the final message.
 *
 * - generateFoolishMessage - A function that returns a random foolish message.
 * - FoolishMessageOutput - The return type for the generateFoolishMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FoolishMessageOutputSchema = z.object({
  message: z.string().describe('A randomly selected foolish message.'),
});

export type FoolishMessageOutput = z.infer<typeof FoolishMessageOutputSchema>;

export async function generateFoolishMessage(): Promise<FoolishMessageOutput> {
  return generateFoolishMessageFlow();
}

const foolishMessagePrompt = ai.definePrompt({
  name: 'foolishMessagePrompt',
  output: {schema: FoolishMessageOutputSchema},
  prompt: `You are a generator of foolish and humorous messages.

  Select one of the following messages at random. Return ONLY the message, do not add any other text.

  - Remember, even a broken clock is right twice a day... but you're not a clock.
  - The path to failure is paved with good intentions... and your choices.
  - If at first you don't succeed, redefine success.
  - Dream big, fail bigger.
  - Every cloud has a silver lining... that's probably fool's gold.
  - Be the change you want to see in the world... or just stay the same, whatever.
  - Strive for mediocrity; it's less disappointing.
  - The early bird gets the worm, but the second mouse gets the cheese.
  - Learn from your mistakes; that's why pencils have erasers... which you'll need a lot.
  - Rome wasn't built in a day, but it was probably mismanaged just as quickly.
  `,
});

const generateFoolishMessageFlow = ai.defineFlow({
  name: 'generateFoolishMessageFlow',
  outputSchema: FoolishMessageOutputSchema,
}, async () => {
  const {output} = await foolishMessagePrompt({});
  return output!;
});