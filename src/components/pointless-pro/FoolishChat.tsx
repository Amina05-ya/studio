'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, User, Loader2, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getFoolishChatResponse } from '@/app/actions';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export function FoolishChat() {
  const [isOpen, setIsOpen] = useState(true); // Keep it open by default now
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    startTransition(async () => {
      const response = await getFoolishChatResponse(input, messages);
      const botMessage: Message = { role: 'bot', text: response };
      setMessages((prev) => [...prev, botMessage]);
    });
  };
  
  if (!isOpen) {
    return (
       <div className="my-8 flex justify-center">
            <Button onClick={toggleChat} size="lg">
              <Bot className="mr-2 h-5 w-5" />
              Open Foolish Chat
            </Button>
       </div>
    )
  }

  return (
    <div className="my-16">
        <Card className="w-full max-w-2xl mx-auto shadow-2xl border bg-background/90 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-2xl">Foolish Chat</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
            <X className="h-6 w-6" />
            </Button>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-80 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
                {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                    {message.role === 'bot' && (
                    <div className="p-2 bg-secondary rounded-full h-fit">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    )}
                    <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white text-foreground'
                    }`}
                    >
                    <p className="text-sm">{message.text}</p>
                    </div>
                    {message.role === 'user' && (
                    <div className="p-2 bg-muted rounded-full h-fit">
                        <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    )}
                </div>
                ))}
                {isPending && (
                    <div className="flex gap-3 justify-start">
                    <div className="p-2 bg-secondary rounded-full h-fit">
                        <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="max-w-[75%] rounded-lg px-4 py-2 bg-white text-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                    </div>
                )}
            </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something pointless..."
                disabled={isPending}
                className="bg-white"
            />
            <Button type="submit" disabled={isPending}>
                Send
            </Button>
            </form>
        </CardContent>
        </Card>
    </div>
  );
}
