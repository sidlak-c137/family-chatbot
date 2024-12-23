import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import Markdown from 'react-markdown';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Square } from 'lucide-react'; // Import the Square icon

export function Chat() {
  const [input, setInput] = useState('');
  const [respondingMember, setRespondingMember] = useState<string | null>(null);
  const { messages, append, isLoading, stop, data } = useChat({
    api: "/api/chat",
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const latestData = data[data.length - 1];
      if (typeof latestData === 'string') {
        try {
          const parsedData = JSON.parse(latestData);
          if (parsedData.respondingMember) {
            setRespondingMember(parsedData.respondingMember);
          }
        } catch (error) {
          console.error('Error parsing data:', error);
        }
      }
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      append({ role: 'user', content: input });
      setInput('');
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/10 border-b">
        <CardTitle className="text-2xl font-bold text-center">Chat with AI</CardTitle>
        {respondingMember && (
          <div className="text-sm text-center text-gray-600">
            Currently responding: {respondingMember}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[60vh] pr-4 overflow-y-auto" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                <Avatar className={`w-8 h-8 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                  
                </Avatar>
                <div className={`p-3 rounded-lg shadow ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                    : 'bg-secondary text-secondary-foreground rounded-bl-none'
                }`}>
                  <Markdown className="prose dark:prose-invert max-w-full text-sm">{message.content}</Markdown>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-grow shadow-sm"
          />
          {isLoading ? (
            <Button 
              type="button" 
              onClick={stop} 
              className="shadow-sm bg-white text-black border border-black hover:bg-gray-100"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          ) : (
            <Button type="submit" className="shadow-sm">
              Send
            </Button>
          )}
        </form>
      </CardFooter>
    </Card>
  );
}
