import { ActionFunction } from '@remix-run/node';
import { convertToCoreMessages, StreamData, streamText, tool } from 'ai';
import { anthropic, generate } from '~/models/llm.server';
import { z } from 'zod';

// Define family member personalities and specialties
const familyMembers: { [key: string]: { role: string, specialty: string[], personality: string } } = {
  "abi": {
    role: 'mother',
    specialty: ['indian culture', 'organization', 'family care', 'health'],
    personality: 'warm, nurturing, and practical with a tendency to give detailed advice',
  },
  "lak": {
    role: 'father',
    specialty: ['general knowledge', 'news', 'cooking', 'tea', 'coffee'],
    personality: 'analytical, straightforward, wise, and always drinking coffee or tea',
  },
  "sarada": {
    role: 'sister',
    specialty: ['fashion', 'social media', 'sports', 'relationships'],
    personality: 'sarcastic teenager, modern, and enthusiastic with lots of pop culture references',
  },
  "sidharth": {
    role: 'brother',
    specialty: ['computers', 'singing', 'tech', 'building things'],
    personality: 'casual, laid-back, loves building things, and has a good sense of humor',
  },
};

// Define the selector tool
const selectorTool = async ({ query }: { query: string }) => {
    const selectorPrompt = `
      Analyze this query and select the most appropriate family member to respond based on their specialties:
      Query: "${query}"

      Family members and their specialties:
      ${Object.entries(familyMembers).map(([name, { role, specialty, personality }]) => `${name}: A ${role} with expertise in ${specialty.join(', ')}, ${personality}`).join('\n')}

      Return only the name of the family member in lowercase (abi, lak, sarada, sidharth). If none seem appropriate, select 'lak'.
    `;

    const response = await generate(selectorPrompt);
    const selectedMember = response.trim().toLowerCase();
    return selectedMember;
  };

export const action: ActionFunction = async ({ request }) => {
  const { messages } = await request.json();
  const data = new StreamData();
  const abortController = new AbortController();

  try {
    // Get the last user message
    const lastUserMessage = messages[messages.length - 1].content;
    
    // Use the selector tool to determine which family member should respond
    const respondingMember = await selectorTool({ query: lastUserMessage });
    console.log(`Selected family member: ${respondingMember}`);
    
    // Add personality context to the system message
    const systemMessage = {
      role: 'system',
      content: `You are responding in the voice of as ${respondingMember}, the ${familyMembers[respondingMember].role} of the family. ${familyMembers[respondingMember].personality}. Your expertise includes ${familyMembers[respondingMember].specialty.join(', ')}.`,
    };

    // Add the system message to the beginning of the messages array
    const enhancedMessages = convertToCoreMessages([systemMessage, ...messages]);

    // Send the responding member information as a separate chunk
    data.append(JSON.stringify({ respondingMember }));

    const stream = await streamText({
      model: anthropic('claude-3-5-sonnet-latest', {
        cacheControl: true,
      }),
      messages: enhancedMessages,
      onFinish: () => {
        if (!data.closed) {
          data.close();
        }
      },
      signal: abortController.signal,
    });

    request.signal.addEventListener('abort', () => {
      abortController.abort();
      if (!data.closed) {
        data.close();
      }
    });

    const response = stream.toDataStreamResponse({ data });
    return response;

  } catch (error) {
    console.error(error);

    if (!data.closed) {
      data.close();
    }

    if ((error as Error).name === 'AbortError') {
      return new Response(JSON.stringify({ error: 'Request aborted' }), {
        status: 499,
      });
    }

    return new Response(JSON.stringify({ error: 'Error generating response' }), {
      status: 500,
    });
  }
};
