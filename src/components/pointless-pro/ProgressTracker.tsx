'use client';

import { useEffect, useState } from 'react';
import { Award, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getProgressUpdate } from '@/app/actions';

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
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Foolish Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center italic text-muted-foreground p-4 bg-muted/50 rounded-md">
          "{updateMessage}"
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Disappointment Points
              </span>
              <span className="font-bold text-lg text-primary">{disappointmentPoints}</span>
            </div>
            <Progress value={disappointmentPoints} max={100} />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                IQ Reduction Score
              </span>
              <span className="font-bold text-lg text-primary">{iqReductionScore}</span>
            </div>
            <Progress value={iqReductionScore} max={50} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
