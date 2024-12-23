import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CardFooter } from './ui/card';
import { Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onStop: () => void;
}

export default function ChatInput({ onSendMessage, isLoading, onStop }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(input);
    setInput('');
  };

  return (
    <CardFooter className="sticky bottom-0 w-full p-4 border-t border-black">
      <form onSubmit={handleSubmit} className="flex w-full space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-grow shadow-sm border-black "
        />
        {isLoading ? (
          <Button 
            type="button" 
            onClick={onStop} 
            className="shadow-sm bg-white text-red-600 border border-red-600 hover:bg-red-50"
          >
            <Square className="h-4 w-4" />
            Stop
          </Button>
        ) : (
          <Button type="submit" className="shadow-sm bg-green-600 text-white hover:bg-green-700">
            Send
          </Button>
        )}
      </form>
    </CardFooter>
  );
}
