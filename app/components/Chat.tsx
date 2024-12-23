import { useChat } from "@ai-sdk/react";
import { Card } from "./ui/card";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import paperBackground from "~/components/assets/paper.webp";
import { useEffect, useState } from "react";
import { BackgroundElements } from "./BackgroundElements";
import { useParams } from "@remix-run/react";

export function Chat() {
  const [error, setError] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const params = useParams();

  const { messages, append, isLoading, stop, data, setMessages, setData } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error);
      setError("Looks like the family is on vacation, please try again later...");
    },
  });

  const onRestart = () => {
    setMessages([]);
    setData([]);
    setError(null);
    setShareLink(null);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (params.id) {
      loadSharedConversation(params.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      setError(null);
      append({ role: "user", content: message });
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleShare = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "save");
      formData.append("conversationData", JSON.stringify({messages, data}));

      const response = await fetch("/api/share", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save conversation");
      }

      const { shareLink } = await response.json();
      setShareLink(shareLink);
    } catch (error) {
      console.error("Share error:", error);
      setError("Failed to create share link. Please try again.");
    }
  };

  const loadSharedConversation = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("action", "load");
      formData.append("id", id);

      const response = await fetch("/api/share", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to load conversation");
      }

      const { conversation } = await response.json();
      setMessages(conversation.messages);
      setData(conversation.data);
    } catch (error) {
      console.error("Load error:", error);
      setError("Failed to load shared conversation. It may have expired or been removed.");
    }
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
          <ChatHeader 
            onShare={handleShare} 
            shareLink={shareLink} 
            messageCount={messages.length}
          />
          <div className="flex-grow overflow-auto">
            <MessageList
              messages={messages}
              onQuestionClick={handleQuestionClick}
              data={data}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onStop={stop}
            onRestart={onRestart}
          />
        </div>
      </Card>
    </div>
  );
}
