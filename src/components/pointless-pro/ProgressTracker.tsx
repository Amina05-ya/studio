'use client';

import { useEffect, useState } from 'react';
import { Award, BrainCircuit, ChevronDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getProgressUpdate } from '@/app/actions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type ProgressTrackerProps = {
  disappointmentPoints: number;
  iqReductionScore: number;
};

export function ProgressTracker({ disappointmentPoints, iqReductionScore }: ProgressTrackerProps) {
  const [updateMessage, setUpdateMessage] = useState('Your journey is just beginning...');

  useEffect(() => {
    async function fetchUpdate() {
      if (disappointmentPoints > 0 || iqReductionScore > 0) {
        try {
          const message = await getProgressUpdate(disappointmentPoints, iqReductionScore);
          setUpdateMessage(message);
        } catch (e) {
          setUpdateMessage("Failed to track progress. A true success.");
        }
      }
    }
    fetchUpdate();
  }, [disappointmentPoints, iqReductionScore]);

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="font-headline text-2xl hover:no-underline py-2">
                Foolish Progress Tracker
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
                 <div className="text-center italic text-muted-foreground p-4 bg-muted/50 rounded-lg shadow-inner">
                    "{updateMessage}"
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 p-4 bg-card rounded-lg border">
                        <div className="flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2 text-card-foreground">
                                <Award className="h-5 w-5 text-primary" />
                                Disappointment Points
                            </span>
                            <span className="font-bold text-2xl text-primary">{disappointmentPoints}</span>
                        </div>
                        <Progress value={disappointmentPoints} max={100} />
                        <p className="text-xs text-muted-foreground text-right">The higher, the better... or worse?</p>
                    </div>
                     <div className="flex flex-col gap-2 p-4 bg-card rounded-lg border">
                        <div className="flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2 text-card-foreground">
                                <BrainCircuit className="h-5 w-5 text-primary" />
                                IQ Reduction Score
                            </span>
                            <span className="font-bold text-2xl text-primary">{iqReductionScore}</span>
                        </div>
                        <Progress value={iqReductionScore} max={50} />
                         <p className="text-xs text-muted-foreground text-right">A badge of honor, really.</p>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  );
}
