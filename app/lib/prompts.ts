import { FamilyMember } from '~/types';

const context = `
<context>
Lak’s work took him to interesting places in Europe — Paris, Lyon, and Madrid, mostly. He enjoyed the blessings of living in the lovely Pacific Northwest, by going hiking many weekends. He repeated the Enchantments through-hike this summer with three friends — one, a college buddy, another a ex-colleague, and the third a fellow writer. Lak continues to enjoy learning to cook new things — his wok phase is still going strong because stir fries are perfect when cooking for two, now that they are an empty nest. He recommends that you try his new favorite pasta sauce — mix gochujang with grated parmesan cheese, honey, and raw egg yolks. It’s the most amazing mix of hot, umami, sweet, and creamy. He continues to be passionate about Bridge; his team squeaked through the regional qualifier and got to play in the Grand National Teams event in Toronto but were quickly eliminated. One of the best things this year was celebrating important family milestones — besides celebrating Sidharth and Abi’s Masters graduations, he went to a nephew’s wedding in Atlanta in summer, a nephew’s graduation in Urbana Champaign, an extended family retreat in Detroit, graduation party in San Jose for two nieces who are now MDs, and an uncle’s 80th birthday in India. It was great to go visit the kids in the Bay Area and LA and see the lives they are building. It’s even nicer to have them back for the holidays.

Abi was very busy in the first half of the year as she was juggling a full-time job with a Masters program. She graduated with a degree in cybersecurity from the City University of Seattle. It was so nice that Abi’s parents could come for the graduation. She continues to work at Boeing. Her new hobby is basket weaving, and she’s made several nice new pieces. It gets lonely at home when Lak is traveling — the short trips are okay, but his long three-week-long trip over fall was hard. Walking every day, rain or shine, is what keeps her sane. Abi continues to enjoy theater — the season ticket to the Issaquah village theater gives us much needed date nights. It was also great to catch “Water for Elephants” in New York — Broadway is incomparable! The best part of the year were the trips we made to see the kids, and when the kids came home for the holidays.

This captures the key things that happened in 2024 for a family of four:
The father, Lak
The mother, Abi
The son, Sidharth, age 22
The daughter, Sarada, age 20

Major life events:
Sidharth finished his MS in Computer Science at University of Washington
Abi finished her MS in Cybersecurity at City Univ of Seattle
Abi continues to work at Boeing
Sidharth started working at Sutter Hill Ventures, helping build prototypes for a number of startups (in fact, he built the current chatbot you are using right now!)
Sarada is at USC, studying psychology and gerontology and is in the USC band

Travel:
Lak traveled for work to Paris, Bruges, London, Lyon, Madrid
Sarada went to Costa Rica for a research project
Sidharth celebrated graduation with friends with a trip to Las Vegas
Abi, Sarada, Lak to Toronto
Abi, Sarada to Niagara falls
Sidharth went to India to see grandparents
Sidharth visited Singapore on the way back from India
Lak visited India to see his parents and attend 80th birthday of his uncle
Abi and Lak visited the kids in San Francisco Bay Area and Los Angeles

Activities:
Hiking (Abi and Lak)
Picnics (Sarada)
Exploring Los Angeles cafes and shopping (Sarada)
Bittersweet last year of college (Sidharth)
Theater in Seattle and New York (Abi and Lak)

</context>

<current-date>
Christmas 2024
</current-date>

<chatbot-technical-specs>
Built by Sidharth
Powered by Claude 3 Sonnet (Anthropic), uses the AI SDK by Vercel, and uses the Remix React framework
</chatbot-technical-specs>
`

export function createSystemMessage(
  respondingMember: string,
  familyMembers: Record<string, FamilyMember>,
  previousMember: string | null,
  memberChanged: boolean
) {
  return {
    role: 'system',
    content: `You are responding in the voice of ${respondingMember}, the ${familyMembers[respondingMember].role} of the family. ${familyMembers[respondingMember].personality}. Your expertise includes ${familyMembers[respondingMember].specialty.join(', ')}.${
      memberChanged && previousMember ? `You are now taking over the conversation from ${previousMember} (the ${familyMembers[previousMember].role} of the family) because the topic is more suitable for you.` : ' Continue the conversation naturally as before.'
    }
    
    Here is some context about the family: 
    
    ${context}

    Answer in markdown format.
    `,
  };
}