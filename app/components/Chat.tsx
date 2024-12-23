import { useChat } from "@ai-sdk/react";
import { Card } from "./ui/card";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import paperBackground from '~/components/assets/paper.webp';

export function Chat() {
  const { messages, append, isLoading, stop, data } = useChat({
    api: "/api/chat",
  });

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      append({ role: "user", content: message });
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 p-0 sm:p-4 md:p-6 lg:p-8">
      <Card className="w-full h-full rounded-none sm:rounded-xl sm:w-[90%] sm:h-[90%] md:w-[80%] md:h-[80%] lg:w-[70%] lg:h-[80%] xl:w-[60%] max-w-4xl flex flex-col shadow-lg overflow-hidden relative">
        <img 
          src={paperBackground} 
          alt="Paper background" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 flex flex-col h-full">
          <ChatHeader />
          <div className="flex-grow overflow-auto">
            <MessageList 
              messages={messages} 
              onQuestionClick={handleQuestionClick} 
              data={data} 
              isLoading={isLoading}
            />
          </div>
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onStop={stop}
          />
        </div>
      </Card>
    </div>
  );
}
