'use client';

import { Suspense, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { ProgressTracker } from '@/components/pointless-pro/ProgressTracker';
import { Stage } from '@/components/pointless-pro/Stage';
import { Quiz } from '@/components/pointless-pro/Quiz';
import { Reward } from '@/components/pointless-pro/Reward';
import { GrandFinale } from '@/components/pointless-pro/GrandFinale';
import { Rocket, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type GameState = 'intro' | 'stage1' | 'quiz1' | 'reward1' | 'stage2' | 'quiz2' | 'finale';

const stage1Content = (
    <>
      <p className="mb-4">Welcome to Pointless Pro, the only self-help program that promises nothing and delivers less. Here, we'll hone your skills in corporate-grade nonsense and professional-sounding gibberish.</p>
      <p>Your first task is to embrace the void. Stare into the abyss of this paragraph and find meaning where there is none. This is not a test of intelligence, but a celebration of your ability to waste time productively.</p>
    </>
);

const stage2Content = (
    <>
      <p className="mb-4">You've made it to Stage 2, which is remarkably similar to Stage 1. This is intentional. Repetitive, circular logic is a cornerstone of professional pointlessness.</p>
      <p>In this stage, we will explore the art of 'Strategic Ambiguity'. Consider the following statement: "We must leverage our synergistic assets to actionize a paradigm shift." It sounds important, doesn't it? It means nothing. That's the goal.</p>
    </>
);

function RewardLoading() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Skeleton className="w-full max-w-2xl h-[600px]" />
    </div>
  );
}

function FinaleLoading() {
  return (
    <div className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  )
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [disappointmentPoints, setDisappointmentPoints] = useState(0);
  const [iqReductionScore, setIqReductionScore] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleQuizSubmit = async (nextState: GameState) => {
    startTransition(() => {
      setDisappointmentPoints((prev) => prev + Math.floor(Math.random() * 20) + 10);
      setIqReductionScore((prev) => prev + Math.floor(Math.random() * 10) + 5);
      setGameState(nextState);
    });
  };
  
  const handleContinue = (nextState: GameState) => {
    startTransition(() => {
      setGameState(nextState);
    });
  };

  const handleRestart = () => {
      startTransition(() => {
        setDisappointmentPoints(0);
        setIqReductionScore(0);
        setGameState('intro');
      });
  }

  const renderContent = () => {
    switch (gameState) {
      case 'intro':
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h1 className="font-headline text-6xl md:text-8xl font-bold">Pointless Pro</h1>
                <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl">Master the Art of Professional Pointlessness.</p>
                <Button size="lg" className="mt-8" onClick={() => handleContinue('stage1')} disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Rocket className="mr-2 h-5 w-5"/>}
                    Begin My Journey to Nowhere
                </Button>
            </div>
        );
      case 'stage1':
        return (
            <div className="py-8">
                <Stage 
                    stageNumber={1} 
                    title="The Illusion of Progress"
                    content={stage1Content}
                    proTip="To seem busy, constantly switch between two empty documents. Bonus points for sighing audibly."
                />
                <div className="text-center mt-8">
                    <Button size="lg" onClick={() => handleContinue('quiz1')} disabled={isPending}>
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Proceed to Pointless Quiz
                    </Button>
                </div>
            </div>
        );
      case 'quiz1':
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Quiz
                    question="Which color best represents the sound of a silent meeting?"
                    options={['Transparent', 'The scent of beige', 'Loud quietness', 'All of the above']}
                    onSubmit={() => handleQuizSubmit('reward1')}
                />
            </div>
        );
      case 'reward1':
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Suspense fallback={<RewardLoading />}>
                  <Reward />
                </Suspense>
                <Button size="lg" className="mt-8" onClick={() => handleContinue('stage2')} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Continue to More Pointlessness
                </Button>
            </div>
        );
      case 'stage2':
        return (
            <div className="py-8">
                <Stage 
                    stageNumber={2} 
                    title="Advanced Waffling"
                    content={stage2Content}
                    proTip="Use 'synergy' and 'paradigm' in the same sentence to achieve peak corporate enlightenment."
                />
                <div className="text-center mt-8">
                    <Button size="lg" onClick={() => handleContinue('quiz2')} disabled={isPending}>
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Take the Final, Futile Quiz
                    </Button>
                </div>
            </div>
        );
      case 'quiz2':
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Quiz
                    question="What is the optimal angle to lean back in your chair to signify deep thought?"
                    options={['42 degrees', 'Pi radians', 'A perfect right angle to the floor', 'The angle of existential dread']}
                    onSubmit={() => handleQuizSubmit('finale')}
                />
            </div>
        );
      case 'finale':
        return (
            <div>
                <Suspense fallback={<FinaleLoading/>}>
                  <GrandFinale />
                </Suspense>
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <Button size="lg" onClick={handleRestart} variant="secondary" disabled={isPending}>
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Start Over (Why?)
                    </Button>
                </div>
            </div>
        );

      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <main>
      {gameState !== 'intro' && gameState !== 'finale' && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto p-4">
                <ProgressTracker 
                    disappointmentPoints={disappointmentPoints} 
                    iqReductionScore={iqReductionScore} 
                />
            </div>
        </header>
      )}
      {renderContent()}
    </main>
  );
}
