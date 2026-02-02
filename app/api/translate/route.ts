import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, languageTo } = await req.json();

  const result = await streamText({
    model: google('gemini-2.5-flash'),

    system: `You are an expert senior software engineer.
    Your task is to translate code into the language: ${languageTo}.
    RULES:
    1. Only return the translated code. Do not include explanations or conversational text.
    2. If the code requires standard libraries of the new language, import them.
    3. Keep original comments if relevant.
    4. Use Markdown for the code block.`,

    messages,
  });

  return result.toDataStreamResponse();
}
