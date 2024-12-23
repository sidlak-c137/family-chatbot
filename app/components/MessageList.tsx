import { useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Markdown from "react-markdown";
import { CardContent } from "./ui/card";
import { JSONValue } from "ai";

// Import avatar images
import abiAvatar from "~/components/assets/abi.jpeg";
import lakAvatar from "~/components/assets/lak.jpeg";
import saradaAvatar from "~/components/assets/sarada.jpeg";
import sidharthAvatar from "~/components/assets/sidharth.jpeg";

const avatars: { [key: string]: string } = {
  abi: abiAvatar,
  lak: lakAvatar,
  sarada: saradaAvatar,
  sidharth: sidharthAvatar,
};

const potentialQuestions = [
  "Lak, what did the family do this year?",
  "Sarada, how is band going?",
  "Sidharth, did you enjoy your Master's?",
  "Abi, did you travel anywhere cool this year?",
];

interface MessageListProps {
  messages: { role: string; content: string }[];
  onQuestionClick: (question: string) => void;
  data: JSONValue[] | undefined;
  isLoading: boolean;
  error: string | null;
}

export default function MessageList({
  messages,
  onQuestionClick,
  data,
  isLoading,
  error,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleQuestionClick = (question: string) => {
    onQuestionClick(question);
  };

  const getRespondingMember = useCallback(
    (index: number) => {
      if (data) {
        console.log(data);
        for (let i = data.length - 1; i >= 0; i--) {
          const parsedData = JSON.parse(data[i] as string);
          if (parsedData.index === index + 1) {
            return {
              index: parsedData.index,
              name: parsedData.respondingMember,
              time: parsedData.time,
            };
          }
        }
      }
      return null;
    },
    [data]
  );

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <CardContent className="p-4 flex flex-col h-full">
      <ScrollArea className="flex-grow pr-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col max-w-[80%] ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`flex ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                } items-end`}
              >
                {message.role === "assistant" && (
                  <Avatar
                    className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-2 relative ${
                      isLoading && index === messages.length - 1 ? "animate-pulse" : ""
                    }`}
                  >
                    <AvatarImage
                      src={avatars[getRespondingMember(index)?.name || "lak"]}
                      alt="AI Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-800 text-white flex items-center justify-center text-sm font-semibold">
                      {(getRespondingMember(index)?.name || "AI")
                        .charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                    {isLoading && index === messages.length - 1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    )}
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-lg shadow ${
                    message.role === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-800 text-white rounded-bl-none"
                  }`}
                >
                  <Markdown className="prose dark:prose-invert max-w-full text-sm">
                    {message.content}
                  </Markdown>
                </div>
              </div>
              {message.role === "assistant" && (
                <div className="text-xs text-gray-800 mt-1 ml-12">
                  {(getRespondingMember(index)?.name || "AI").charAt(0).toUpperCase() + (getRespondingMember(index)?.name || "AI").slice(1)} • {formatTime(getRespondingMember(index)?.time || Date.now())}
                </div>
              )}
            </div>
          </div>
        ))}
        {error && (
          <div className="flex mb-4 justify-start">
            <div className="flex flex-col max-w-[80%] items-start">
              <div className="flex flex-row items-end">
                <Avatar
                  className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-2 relative"
                >
                  <AvatarImage
                      src={avatars["lak"]}
                      alt="AI Avatar"
                      className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-800 text-white flex items-center justify-center text-sm font-semibold">
                    E
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg shadow bg-gray-800 text-white rounded-bl-none">
                  <Markdown className="prose dark:prose-invert max-w-full text-sm">
                    {error}
                  </Markdown>
                </div>
              </div>
              <div className="text-xs text-gray-800 mt-1 ml-12">
                Error • {formatTime(Date.now())}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      {messages.length === 0 && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center font-grand-hotel">
            Suggested Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {potentialQuestions.map((question, index) => (
              <button
                key={index}
                className="border-2 border-gray-800 hover:shadow-[inset_0_0_0_2px_#1f2937]  p-4 rounded-lg shadow cursor-pointer transition-shadow"
                onClick={() => handleQuestionClick(question)}
              >
                <p className="text-sm text-black">{question}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </CardContent>
  );
}
