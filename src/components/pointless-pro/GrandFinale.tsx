'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getFoolishMessage } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

export function GrandFinale() {
  const [foolishMessage, setFoolishMessage] = useState<string | null>(null);

  useEffect(() => {
    getFoolishMessage().then(setFoolishMessage);
  }, []);

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-50 duration-1000">
      <div className="w-full h-full absolute inset-0 z-0">
         <Image
            src="https://placehold.co/1920x1080/09090b/e2e8f0"
            alt="Ironic grand finale"
            fill
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="abstract celebration"
          />
      </div>
      <div className="text-center z-10 space-y-8 flex flex-col items-center">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-9xl font-extrabold text-primary animate-pulse">
          You... Did It?
        </h1>
        <p className="max-w-2xl text-xl md:text-2xl text-foreground/80">
          Congratulations! You've successfully navigated the labyrinth of pointlessness. Your certificate of achievement is in the mail (it's not).
        </p>
        <div className="p-6 bg-card border rounded-lg shadow-2xl max-w-xl">
          {foolishMessage ? (
            <p className="text-2xl font-semibold">
              {foolishMessage}
            </p>
          ) : (
            <Skeleton className="h-8 w-3/4 mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
}
