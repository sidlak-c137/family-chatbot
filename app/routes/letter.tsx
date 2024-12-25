import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import paperBackground from "~/components/assets/paper.webp";
import { useState, useEffect } from "react";
import { BackgroundElements } from "~/components/BackgroundElements";
import Carousel from "~/components/ui/carousel";
import { useNavigate } from "@remix-run/react";
import { MessageCircle } from "lucide-react";
import { Button } from "~/components/ui/button";


import img01 from "~/components/assets/letter/img01.jpg";
import img02 from "~/components/assets/letter/img02.jpg";
import img03 from "~/components/assets/letter/img03.jpg";
import img04 from "~/components/assets/letter/img04.jpg";
import img05 from "~/components/assets/letter/img05.jpg";
import img06 from "~/components/assets/letter/img06.jpg";
import img07 from "~/components/assets/letter/img07.jpg";
import img08 from "~/components/assets/letter/img08.jpg";
import img09 from "~/components/assets/letter/img09.jpg";
import img10 from "~/components/assets/letter/img10.jpg";
import img11 from "~/components/assets/letter/img11.jpg";
import img12 from "~/components/assets/letter/img12.jpg";
import img13 from "~/components/assets/letter/img13.jpg";
import img14 from "~/components/assets/letter/img14.jpg";
import img15 from "~/components/assets/letter/img15.jpg";
import img16 from "~/components/assets/letter/img16.jpg";
import img17 from "~/components/assets/letter/img17.jpg";
import img18 from "~/components/assets/letter/img18.jpg";
import img19 from "~/components/assets/letter/img19.jpg";
import img20 from "~/components/assets/letter/img20.jpg";
import img21 from "~/components/assets/letter/img21.jpg";
import img22 from "~/components/assets/letter/img22.jpg";


const LETTER_SECTIONS = {
  intro:
    "This was the year that Sidharth finished his MS degree and started a job in the Bay Area. Abi and Lak continue to get used to the empty nest lifestyle, and Sarada is getting closer to the end of her undergrad.",
  lak: "Lak has been enjoying the blessings of living in the lovely Pacific Northwest, by going hiking many weekends. He repeated the Enchantments through-hike this summer with three friends — one, a college buddy, another a ex-colleague, and the third a fellow writer. It’s always great when friendships last past the immediate circumstances. His work took him to Europe several times — Paris, Madrid, and Lyon, mostly, but he did visit a few other places. Lak continues to enjoy learning to cook new things — his Kenji wok phase is still going strong because stir fries are perfect when cooking for two, now that we are an empty nest. He recommends that you try his new favorite pasta sauce — mix gochujang with grated parmesan cheese, honey, and raw egg yolks. It’s the most amazing mix of hot, umami, sweet, and creamy. He continues to be passionate about Bridge; his team squeaked through the regional qualifier and got to play in the Grand National Teams event in Toronto but were quickly eliminated. One of the best things this year was celebrating important family milestones — besides celebrating Sidharth and Abi’s Masters graduations, we went to a nephew’s wedding in Atlanta in summer, a nephew’s graduation in Urbana Champaign, an extended family retreat in Detroit, graduation party in San Jose for two nieces who are now MDs, and an uncle’s 80th birthday in India. It was great to go visit the kids in the Bay Area and LA and see the lives they are building. It’s even nicer to have them back for the holidays.",
  abi: "Abi was very busy in the first half of the year as she was juggling a full-time job with a Masters program. She graduated with a degree in cybersecurity from the City University of Seattle. It was so nice that Abi’s parents could come for the graduation. She continues to work at Boeing. Her new hobby is basket weaving, and she’s made several nice new pieces. It gets lonely at home when Lak is traveling — the short trips are okay, but his long three-week-long trip over fall was hard. Walking every day, rain or shine, is what keeps her sane. Abi continues to enjoy theater — the season ticket to the Issaquah village theater gives us much needed date nights. It was also great to catch “Water for Elephants” in New York — Broadway is incomparable! She also enjoyed exploring Toronto with Sarada, celebrating Sidharth’s and Arun’s graduations, and showing her parents around Seattle. The best part of the year were the trips we made to see the kids and having the kids home for the holidays.",
  interlude:
    "Now we will make a jarring choice to change to first person, because us kids want to make this letter feel more personal and less like a Wikipedia article about strangers.",
  sidharth:
    "Hey folks, Sidharth coming to you live from SF! 2024 started with me fresh off my \"Great American Internship Tour\" (six months, multiple cities, countless coffee runs). The big revelation? College isn't about acing exams – it's about making friends who'll help you ace exams! Just kidding... sort of. I wrapped up my Masters degree like a scene from a B-grade college movie: late night escapades with friends, bunking lectures for other more interesting lectures (like Hermione), and the mandatory Vegas victory lap. What happened in Vegas... well, let's just say I had a blast. Speaking of fun, my \"last summer vacation ever\" (cue dramatic violin) kicked off with a family pit stop in Michigan before my parents shipped me off to India. The official mission? Temple-hopping and grandparent-blessing-collecting. The unofficial mission? Probably spiritual damage control for Vegas. But wait, there's more! I pulled a classic millennial move and \"found myself\" in Singapore (translation: I found every food stall within a 10-mile radius and stuffed my face hole). My \"solo\" adventure quickly turned into a buddy comedy when I befriended a local bartender who became my nightlife sherpa. Also linked up with my dad's childhood friend, who showed me the real Singapore – you know, the parts they don't put on postcards. Now I'm adulting in the Bay Area, working at Sutter Hill Ventures as a Software Engineer. Yes, I'm basically building the future while trying to figure out how to do my own laundry. Missing my Seattle crew, but hey – I'm making new friends AND actual money! (Though in Bay Area terms, that mostly translates to \"slightly better instant ramen\").",
  sarada:
    "This is Sarada :) I’m about to graduate from SC and am starting to feel the bittersweetness setting in. Traveling with all my friends to Michigan and Las Vegas have been some of my favorite collegiate memories. Like every college football fan, my hopes started so high and fell so quickly (after about the 4th USC loss…). I’m still studying psychology but added on a minor in gerontology (so most of you guys will be in good hands 🤝🏾). Over the summer, I roamed around Toronto and finally consciously saw Niagara Falls with my mom (they swear I went as a child but no pictures means that they're lying). [This is a sore point. We have so many baby pictures of our first child and so few of our second — Lak] We also finally got a dad's-side cousin meetup in Michigan which was a grand ol’ time. Oh yeah, and I went to Costa Rica at the beginning of the break for what was supposed to be a course (GERO 499: Finding the Key to a Long, Happy Life in Nicoya, Costa Rica’s Blue Zone) but turned out to be a 14 day “enjoy your time at the beach because we [the professors] just want a 50th honeymoon.” (which I guess I wasn't too mad about). After all these trips to Costa Rica, Toronto, and Michigan, I had to come back and start grinding on grad school apps (no one told me it would be as bad as college apps). Luckily, I was able to finish most of the work during the summer which allowed my fall semester to be filled with band (as per usual), research, and lots of time expanding my cafe list of LA. There's 53 and counting so let me know if you ever need a cafe rec. I have plenty! I've had a really fun year exploring cafes, new cities, and being with friends. Please manifest grad school with me as I continue into this new year 😁",
  ending:
    "Wishing you all a wonderful holiday season and a happy new year. Stay in touch.",
};

const LETTER_IMAGES = [
  img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22,
];

export default function Letter() {
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChatRedirect = () => {
    navigate('/');
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden"
      style={{
        background: `
          linear-gradient(to bottom, #0B1026 0%, #1B2642 80%, #243150 100%)
        `,
      }}
    >
      {isClient && <BackgroundElements />}

      <Card
        className="w-full h-full rounded-none sm:rounded-xl sm:w-[90%] sm:h-[90%] md:w-[80%] md:h-[80%] lg:w-[70%] lg:h-[80%] xl:w-[60%] max-w-4xl flex flex-col shadow-lg overflow-hidden relative backdrop-blur-sm"
        style={{ zIndex: 5 }}
      >
        <img
          src={paperBackground}
          alt="Paper background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
        />
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-grand-hotel">
                Lakshmanan Family Christmas Letter
              </h1>
              <Button
                onClick={handleChatRedirect}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-2 border-black bg-transparent hover:bg-transparent text-black transition-all duration-200 px-4 py-2 rounded-full shadow-sm hover:shadow-[inset_0_0_0_2px_#000000]"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="font-semibold">Chat</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <div className="space-y-6">
              {Object.entries(LETTER_SECTIONS).map(([key, content]) => (
                <section key={key} className="mb-6">
                  <p className="text-sm">{content}</p>
                </section>
              ))}
              <section className="mb-6">
                <p className="text-sm">- Lak, Abi, Sidharth, Sarada</p>
              </section>
            </div>
            <div className="mt-8">
              <Carousel>
                {LETTER_IMAGES.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Family pic ${index + 1}`}
                    className="max-h-[300px] w-full object-contain"
                    loading="lazy"
                  />
                ))}
              </Carousel>
            </div>
          </CardContent>
          <CardFooter>{/* Blank footer */}</CardFooter>
        </div>
      </Card>
    </div>
  );
}
