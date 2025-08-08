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
  const [isOpen, setIsOpen] = useState(false);
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
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const chatHistory = messages.map(m => `${m.role}: ${m.text}`).join('\n');
      const response = await getFoolishChatResponse(input, chatHistory);
      const botMessage: Message = { role: 'bot', text: response };
      setMessages((prev) => [...prev, botMessage]);
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={toggleChat} size="lg" className="rounded-full w-16 h-16 shadow-lg">
          <Bot className="h-8 w-8" />
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <Card className="w-96 shadow-2xl border bg-background/90 backdrop-blur-sm animate-in fade-in-20 slide-in-from-bottom-5 duration-300">
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
                          <Bot className="h-5 w-5 text-secondary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
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
                          <Bot className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div className="max-w-[75%] rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
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
                />
                <Button type="submit" disabled={isPending}>
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
