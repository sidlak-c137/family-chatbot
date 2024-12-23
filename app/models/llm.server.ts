import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const generate = async (prompt: string) => {
  const { text } = await generateText({
    model: anthropic('claude-3-5-sonnet-latest', {
      cacheControl: true,
    }),
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return text;
};
