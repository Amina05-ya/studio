'use client';

import { Suspense, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { ProgressTracker } from '@/components/pointless-pro/ProgressTracker';
import { Stage } from '@/components/pointless-pro/Stage';
import { Quiz } from '@/components/pointless-pro/Quiz';
import { Reward } from '@/components/pointless-pro/Reward';
import { GrandFinale } from '@/components/pointless-pro/GrandFinale';
import { Rocket, Loader2, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { FoolishChat } from '@/components/pointless-pro/FoolishChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type GameState = 'intro' | 'stages' | 'stage1' | 'quiz1' | 'reward1' | 'stage2' | 'quiz2' | 'finale';

const stageContent = {
  '1': {
    title: 'C Basics: The Art of Pointless Pointers',
    content: (
        <>
        <p className="mb-4">Welcome to the magical world of C, where pointers are less about memory addresses and more about pointing out the futility of your own existence. A pointer, or `*`, is like a cosmic signpost to nowhere. </p>
        <p>Observe: `int* myPointer = NULL;`. This doesn't allocate memory; it allocates existential dread. By setting it to `NULL`, you are embracing the void. Congratulations, you have successfully done nothing, which is the first step to becoming a Pointless Pro.</p>
        </>
    ),
    proTip: "To simulate a memory leak, just keep opening new tabs in your browser. Your computer's despair is a feature, not a bug."
  },
  '2': {
    title: 'Pointers and Nulls: Mastering the Void',
    content: (
        <>
        <p className="mb-4">You have advanced to `NULL` pointers. `NULL` is not just a value; it's a state of mind. It's the Zen garden of C programming, where you can meditate on the absence of meaning. </p>
        <p>Dereferencing a `NULL` pointer is the C equivalent of asking, "What is the sound of one hand clapping?" The answer is a segmentation fault. This is not an error; it's the universe's way of telling you to take a coffee break.</p>
        </>
    ),
    proTip: "A 'pro-tip' for debugging `NULL` pointers is to blame the hardware. It's never your fault. Your code is perfect. The computer is simply not enlightened enough to run it."
  }
};


const stages = [
  { id: 'stage1', title: 'Stage 1: C Basics' },
  { id: 'stage2', title: 'Stage 2: Pointers and Nulls' },
  { id: 'stage3', title: 'Stage 3: Advanced Obfuscation', locked: true },
  { id: 'stage4', title: 'Stage 4: Quantum Computing (in Theory)', locked: true },
  { id: 'stage5', title: 'Stage 5: Writing Compilers for Fun', locked: true },
  { id: 'stage6', title: 'Stage 6: Achieving Singularity', locked: true },
];


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

  const handleQuizSubmit = (nextState: GameState) => {
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
                <div className="animate-in fade-in-50 duration-1000">
                    <h1 className="font-headline text-6xl md:text-8xl font-bold">Pointless Pro</h1>
                    <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl animate-in fade-in-50 delay-500 duration-1000">Welcome to Pointless Pro</p>
                </div>
                <div className="animate-in fade-in-0 delay-1000 duration-1000">
                <Button size="lg" className="mt-8" onClick={() => handleContinue('stages')}>
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5"/>
                </Button>
                </div>
            </div>
        );
      case 'stages':
        return (
            <div className="py-16 animate-in fade-in-50 duration-500">
              <header className="text-center mb-12">
                <h1 className="font-headline text-5xl font-bold">Course Stages</h1>
                <p className="mt-2 text-muted-foreground">Select a stage to begin your descent into wisdom.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {stages.map((stage, index) => (
                    <Card key={stage.id} className={`shadow-lg hover:shadow-2xl transition-shadow ${stage.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => !stage.locked && handleContinue(stage.id as GameState)}
                        style={{'--animation-delay': `${index * 100}ms`} as React.CSSProperties}
                    >
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{stage.title}</CardTitle>
                            {stage.locked && <CardDescription>Locked</CardDescription>}
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-end">
                                {!stage.locked && <Button variant="secondary">Begin</Button>}
                            </div>
                        </CardContent>
                    </Card>
                ))}
              </div>
            </div>
        );
      case 'stage1':
        return (
            <div className="py-16">
                <Stage 
                    stageNumber={1} 
                    title={stageContent['1'].title}
                    content={stageContent['1'].content}
                    proTip={stageContent['1'].proTip}
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
            <div className="py-16">
                <Stage 
                    stageNumber={2} 
                    title={stageContent['2'].title}
                    content={stageContent['2'].content}
                    proTip={stageContent['2'].proTip}
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
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-4xl">Invalid State</h1>
              <Button onClick={() => handleContinue('intro')}>Go Home</Button>
            </div>
        );
    }
  };

  return (
    <main>
      {gameState !== 'intro' && gameState !== 'finale' && gameState !== 'stages' && (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto p-4">
                <ProgressTracker 
                    disappointmentPoints={disappointmentPoints} 
                    iqReductionScore={iqReductionScore} 
                />
            </div>
        </header>
      )}
      <div className="container mx-auto">
        {renderContent()}
        {gameState !== 'intro' && gameState !== 'finale' && gameState !== 'stages' && <FoolishChat />}
      </div>
    </main>
  );
}
