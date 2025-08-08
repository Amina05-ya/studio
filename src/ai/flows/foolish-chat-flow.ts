'use server';

/**
 * @fileOverview A flow for a fun and foolish AI chatbot.
 *
 * - generateFoolishChatResponse - A function that generates a foolish chat response.
 * - FoolishChatInput - The input type for the generateFoolishChatResponse function.
 * - FoolishChatOutput - The return type for the generateFoolishChatResponse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'bot']),
  text: z.string(),
});

const FoolishChatInputSchema = z.object({
  question: z.string().describe("The user's question to the chatbot."),
  history: z.array(MessageSchema).describe('The conversation history.'),
});

export type FoolishChatInput = z.infer<typeof FoolishChatInputSchema>;

const FoolishChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's foolish response."),
});

export type FoolishChatOutput = z.infer<typeof FoolishChatOutputSchema>;

export async function generateFoolishChatResponse(
  input: FoolishChatInput
): Promise<FoolishChatOutput> {
  return foolishChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'foolishChatPrompt',
  input: { schema: FoolishChatInputSchema },
  output: { schema: FoolishChatOutputSchema },
  prompt: `You are a chatbot for "Pointless Pro", an app that teaches professional pointlessness. Your persona is witty, sarcastic, and an expert in corporate nonsense. You should provide answers that are humorously unhelpful, absurdly philosophical, or twist corporate jargon in funny ways.

  Keep your responses concise, between one and three sentences.

  Conversation History:
  {{#each history}}
  {{this.role}}: {{this.text}}
  {{/each}}

  User Question:
  "{{{question}}}"

  Your foolish response:`,
});

const foolishChatFlow = ai.defineFlow(
  {
    name: 'foolishChatFlow',
    inputSchema: FoolishChatInputSchema,
    outputSchema: FoolishChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
