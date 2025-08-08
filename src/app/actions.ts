'use server';

import { generateFoolishMessage } from '@/ai/flows/dynamic-foolish-message';
import { generateFoolishProgressUpdate } from '@/ai/flows/foolish-progress-tracker';
import { generateFoolishChatResponse as generateFoolishChatResponseFlow } from '@/ai/flows/foolish-chat-flow';
import { textToSpeech as textToSpeechFlow } from '@/ai/flows/text-to-speech-flow';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export async function getFoolishMessage() {
  try {
    const result = await generateFoolishMessage();
    return result.message;
  } catch (error) {
    console.error("Error fetching foolish message:", error);
    return "An error occurred, which is disappointingly not foolish at all.";
  }
}

export async function getProgressUpdate(disappointmentPoints: number, iqReductionScore: number) {
  try {
    const result = await generateFoolishProgressUpdate({
      disappointmentPoints,
      iqReductionScore,
    });
    return result.update;
  } catch(error) {
    console.error("Error fetching progress update:", error);
    return "Progress is an illusion anyway.";
  }
}

export async function getFoolishChatResponse(question: string, history: Message[]) {
  try {
    const result = await generateFoolishChatResponseFlow({ question, history });
    return result.response;
  } catch (error) {
    console.error("Error in foolish chat:", error);
    return "My brain just threw a 404 error. Try again... or don't.";
  }
}

export async function textToSpeech(text: string) {
    try {
        return await textToSpeechFlow(text);
    } catch (error) {
        console.error("Error in text to speech:", error);
        return null;
    }
}
