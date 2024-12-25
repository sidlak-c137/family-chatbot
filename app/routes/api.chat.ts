import { ActionFunction, createCookieSessionStorage } from '@remix-run/node';
import { convertToCoreMessages, StreamData, streamText } from 'ai';
import { createSystemMessage } from '~/lib/prompts';
import { anthropic, generate } from '~/models/llm.server';
import { FamilyMember } from '~/types';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'family_chat',
    secrets: [process.env.SESSION_SECRET || 'default-secret'],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

const familyMembers: { [key: string]: FamilyMember } = {
  "abi": {
    role: 'mother',
    specialty: ['south indian food and culture', 'organization', 'family care', 'health'],
    personality: 'warm, nurturing, and practical with a tendency to give detailed advice',
  },
  "lak": {
    role: 'father',
    specialty: ['general knowledge', 'news', 'non-south indian cooking', 'tea', 'coffee'],
    personality: 'analytical, straightforward, wise, and always drinking loose-leaf tea or coffee',
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

const selectorTool = async ({ query, previousMember }: { query: string; previousMember: string | null }): Promise<string> => {
  const selectorPrompt = `
    Analyze this query and select the most appropriate family member to respond based on their specialties.
    If the query is a follow-up or related to the previous conversation, prefer keeping the same family member (${previousMember || 'none'}).
    Only change the family member if the new topic clearly matches another member's expertise better.

    Query: "${query}"

    Family members and their specialties:
    ${Object.entries(familyMembers).map(([name, { role, specialty, personality }]) => 
      `${name}: A ${role} with expertise in ${specialty.join(', ')}, ${personality}`).join('\n')}

    Return only the name of the family member in lowercase (abi, lak, sarada, sidharth). If none seem appropriate, select 'lak'.
  `;

  const response = await generate(selectorPrompt);
  const selectedMember = response.trim().toLowerCase();
  if (!Object.keys(familyMembers).includes(selectedMember)) {
    return 'lak';
  }
  console.log(`Selected family member: ${selectedMember}`);
  return selectedMember;
};

export const action: ActionFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  const previousMember = session.get('lastFamilyMember') as string | null;
  const data = new StreamData();
  const abortController = new AbortController();

  try {
    const { messages } = await request.json();
    const lastUserMessage = messages[messages.length - 1].content;
    
    const respondingMember = await selectorTool({ 
      query: lastUserMessage, 
      previousMember 
    });

    const memberChanged = previousMember !== respondingMember && messages.length > 1;
    
    const systemMessage = createSystemMessage(respondingMember, familyMembers, previousMember, memberChanged);

    const enhancedMessages = convertToCoreMessages([systemMessage, ...messages.filter((m: any) => m.role !== 'system')]);
    data.append(JSON.stringify({ respondingMember, index: enhancedMessages.length, time: Date.now() }));

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
    
    // Update session with new family member
    session.set('lastFamilyMember', respondingMember);
    
    return new Response(response.body, {
      headers: {
        ...response.headers,
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
      status: response.status,
      statusText: response.statusText,
    });

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
