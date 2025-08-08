'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getFoolishMessage } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export function Reward() {
  const [foolishMessage, setFoolishMessage] = useState<string | null>(null);

  useEffect(() => {
    getFoolishMessage().then(setFoolishMessage);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center shadow-xl animate-in fade-in-50 zoom-in-90 duration-500">
        <CardHeader>
          <CardTitle className="font-headline text-4xl">A Reward of Unspeakable Value</CardTitle>
          <CardDescription>Behold! The 'Aanamutta'.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
             <Image
                src="https://placehold.co/600x400/e6e6fa/4b0082"
                alt="The Legendary Aanamutta"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint="elephant egg"
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
