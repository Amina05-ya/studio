'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getFoolishMessage } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function GrandFinale() {
  const [foolishMessage, setFoolishMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function loadMessage() {
        const message = await getFoolishMessage();
        setFoolishMessage(message);
        // Open the dialog only after the message is fetched.
        setIsDialogOpen(true);
    }
    loadMessage();
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-50 duration-1000">
        <div className="w-full h-full absolute inset-0 z-0">
          <Image
              src="https://placehold.co/1920x1080/f3e8ff/4c1d95"
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

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-3xl">Official Certificate of Pointlessness</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This certifies that you have successfully wasted a significant amount of time and mental energy. We couldn't be more proud... or indifferent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsDialogOpen(false)}>Acknowledge My Descent</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
