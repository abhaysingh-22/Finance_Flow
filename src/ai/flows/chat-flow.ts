
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

const ChatInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  reply: z.string().describe('The chatbot reply to the user.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function simpleChat(input: ChatInput): Promise<ChatOutput> {
  // Temporary mock response for testing - replace with actual API when ready
  if (!process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_GENAI_API_KEY === 'PUT_YOUR_ACTUAL_API_KEY_HERE') {
    // Mock responses for testing
    const mockResponses = [
      "I'm here to help with your finances! What would you like to know?",
      "That's a great question about personal finance. Here are some tips...",
      "I can help you track expenses, create budgets, and manage your money better.",
      "Financial planning is important. Let me help you with that!",
      "Thank you for using FinanceFlow! How else can I assist you?"
    ];
    
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    return {
      reply: `🤖 [Mock Response] ${randomResponse} (Note: Please configure your Google AI API key to enable full AI features)`
    };
  }
  
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
