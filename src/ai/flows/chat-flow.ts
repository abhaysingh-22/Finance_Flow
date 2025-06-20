
'use server';
/**
 * @fileOverview A simple chatbot flow using Genkit.
 *
 * - simpleChat - A function that handles a user's message and returns a bot reply.
 * - ChatInputSchema - The input type for the simpleChat function.
 * - ChatOutputSchema - The return type for the simpleChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ChatInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  reply: z.string().describe('The chatbot reply to the user.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function simpleChat(input: ChatInput): Promise<ChatOutput> {
  return simpleChatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'simpleChatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for a personal finance application called FinanceFlow.
Keep your responses concise and helpful.
User message: {{{message}}}
Your reply:`,
});

const simpleChatFlow = ai.defineFlow(
  {
    name: 'simpleChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const {output} = await chatPrompt(input);
    return output!;
  }
);
