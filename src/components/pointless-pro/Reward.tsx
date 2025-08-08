'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getFoolishMessage } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export function Reward() {
  const [foolishMessage, setFoolishMessage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getFoolishMessage().then(setFoolishMessage);
    toast({
        title: "Aanamutta Unlocked!",
        description: "You have been awarded with an aanamutta!",
    })
  }, [toast]);
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center shadow-xl animate-in fade-in-50 zoom-in-90 duration-500">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">A Reward of Unspeakable Value</CardTitle>
          <CardDescription>Behold! The 'Aanamutta'.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border">
             <video
                src="/aanamutta.mp4"
                width="600"
                height="400"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
          </div>
          <div className="p-4 bg-muted/50 rounded-md">
            <p className="font-mono text-left text-sm text-muted-foreground">
              [Audio Transcript]<br/>
              &gt; Elephant: "Is this... an egg?"<br/>
              &gt; Egg: "..."<br/>
              &gt; Elephant: "Profound."
            </p>
          </div>
           <div className="p-4 bg-secondary rounded-lg">
             {foolishMessage ? (
                <p className="text-lg font-medium text-secondary-foreground">{foolishMessage} 🎉</p>
             ) : (
                <Skeleton className="h-6 w-3/4 mx-auto" />
             )}
           </div>
        </CardContent>
        <CardFooter>
            {/* The continue button is rendered in the parent client component */}
        </CardFooter>
      </Card>
    </div>
  );
}
