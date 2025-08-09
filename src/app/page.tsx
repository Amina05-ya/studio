'use client';

import { Suspense, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { ProgressTracker } from '@/components/pointless-pro/ProgressTracker';
import { Stage } from '@/components/pointless-pro/Stage';
import { Quiz, type QuizQuestion } from '@/components/pointless-pro/Quiz';
import { Reward } from '@/components/pointless-pro/Reward';
import { GrandFinale } from '@/components/pointless-pro/GrandFinale';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { FoolishChat } from '@/components/pointless-pro/FoolishChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type GameState = 'intro' | 'stages' | 'stage1' | 'quiz1' | 'reward1' | 'stage2' | 'quiz2' | 'reward2' | 'stage3' | 'quiz3' | 'reward3' | 'stage4' | 'quiz4' | 'reward4' | 'finale';

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
  },
  '3': {
    title: 'Advanced Obfuscation: Writing Unreadable Code',
    content: (
      <>
        <p className="mb-4">Welcome to advanced obfuscation. The goal is to write code that even you can't understand a week later. This ensures job security. If nobody can figure out what your code does, nobody can replace you.</p>
        <p>Use single-letter variable names, nested ternary operators, and macros that redefine basic keywords. For example: `#define if(x) if(!(x))`. This will make debugging a spiritual journey.</p>
      </>
    ),
    proTip: "Document your code with comments that are either wrong or completely irrelevant. For example: `// This loop calculates the meaning of life.`"
  },
  '4': {
    title: 'Quantum Computing: It\'s All in Your Head',
    content: (
        <>
        <p className="mb-4">Quantum computing is simple. A qubit can be a 0, a 1, or both at the same time. This is called superposition. Just like how you can be both productive and procrastinating by watching this course.</p>
        <p>To create a quantum computer, simply believe your regular computer is a quantum computer. Your belief will cause a superposition of states, making your code both work and not work simultaneously. This is the essence of modern software.</p>
        </>
    ),
    proTip: "If your quantum code doesn't work, you're probably observing it too closely. Try to run your program without looking at the screen."
    }
};

const quizContent: { [key: string]: QuizQuestion[] } = {
    '1': [
        {
            question: "What does the 'C' in 'C programming' stand for?",
            options: ['Confusion', 'Chaos', 'Corporate-approved procrastination', 'All of the above'],
        },
        {
            question: "What is the most common bug in any program?",
            options: ["A feature you didn't know you had", 'The user', 'A spider that crawled into the server rack', 'Monday mornings'],
        },
        {
            question: "How do you declare a variable that holds your enthusiasm for this quiz?",
            options: ['`int enthusiasm = 0;`', '`const char* will_to_live = NULL;`', '`bool has_given_up = true;`', '`void mind;`'],
        },
        {
            question: "What is the correct way to end a line of code?",
            options: ['With a dramatic sigh', 'By turning off the monitor', "With a semicolon, probably, who knows?", "You don't, it just keeps going"],
        }
    ],
    '2': [
        {
            question: "What is a `NULL` pointer pointing to?",
            options: ['The void', 'My motivation', 'The friends we made along the way', "The location of the office's good coffee"],
        },
        {
            question: "Dereferencing a `NULL` pointer causes a segmentation fault. This is:",
            options: ['A feature, not a bug', 'The computer trying to have a philosophical debate', 'A reason to take an early lunch', 'All of the above'],
        },
        {
            question: "What is the difference between a pointer and a reference?",
            options: ['One is pointless, the other is also pointless', "About 5 letters", "One requires a seance to debug, the other just a sacrifice", "You can't have a reference without a pointer, or is it the other way around?"],
        },
        {
            question: "How do you properly allocate memory?",
            options: ["Ask nicely", "Just keep opening Chrome tabs until your OS gives you some", "With `malloc()`, which stands for 'more agony, less logic, oh crap'", "Memory is a social construct"],
        }
    ],
    '3': [
        {
            question: "What is the ideal length for a variable name?",
            options: ['`x`', '`a_very_long_and_descriptive_name_that_is_ultimately_misleading`', 'A single, unpronounceable emoji', 'The length of your patience: short'],
        },
        {
            question: "Why do we use comments in code?",
            options: ['To tell lies to future developers', 'To leave passive-aggressive notes for colleagues', 'To remind yourself what you were thinking before the coffee wore off', 'To hide the secrets of the universe'],
        },
        {
            question: "The purpose of a ternary operator is to:",
            options: ['Fit an entire mental breakdown into one line of code', 'Confuse the junior developer', 'Prove you are smarter than the compiler', 'Make your code look like modern art'],
        },
        {
            question: "What is a 'code smell'?",
            options: ["The aroma of burnt coffee near the server room", "The feeling you get on a Sunday night", "Code that works perfectly but you didn't write it", "When the code is so bad you can almost taste the bugs"],
        }
    ],
    '4': [
        {
            question: "A qubit can be a 0, a 1, or both. This is useful for:",
            options: ['Making decisions', 'Having an opinion', 'Being both right and wrong at the same time', 'Calculating how many meetings could have been an email'],
        },
        {
            question: "What is 'quantum superposition'?",
            options: ["The state of your project: both on schedule and hopelessly behind", "When you are simultaneously working and watching cat videos", "The reason the printer never works", "A very fancy nap"],
        },
        {
            question: "Quantum entanglement is also known as 'spooky action at a distance'. This is similar to:",
            options: ["A manager watching your screen from across the office", "Thinking of a bug and having it appear on a different computer", "Getting an email notification on your phone, watch, and laptop at the same time", "All of the above"],
        },
        {
            question: "How do you debug a quantum computer?",
            options: ["You don't. You just vibe with it.", "By asking it very politely to work", "Flip a coin. If it lands on its side, the bug is fixed.", "Observe it, which changes the outcome, which fixes the problem. Or creates a new one."],
        }
    ]
};


const stages = [
  { id: 'stage1', title: 'Stage 1: C Basics' },
  { id: 'stage2', title: 'Stage 2: Pointers and Nulls' },
  { id: 'stage3', title: 'Stage 3: Advanced Obfuscation' },
  { id: 'stage4', title: 'Stage 4: Quantum Computing' },
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
                    <h1 className="font-headline text-6xl md:text-8xl font-bold bg-gradient-to-br from-primary via-primary/80 to-white text-transparent bg-clip-text">Pointless Pro</h1>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {stages.map((stage, index) => (
                    <Card key={stage.id} className="shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all cursor-pointer group"
                        onClick={() => handleContinue(stage.id as GameState)}
                        style={{'--animation-delay': `${index * 100}ms`} as React.CSSProperties}
                    >
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{stage.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-end">
                                <Button variant="secondary">Begin</Button>
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
                    questions={quizContent['1']}
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
                      Take the Next Futile Quiz
                    </Button>
                </div>
            </div>
        );
      case 'quiz2':
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Quiz
                    questions={quizContent['2']}
                    onSubmit={() => handleQuizSubmit('reward2')}
                />
            </div>
        );
      case 'reward2':
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Suspense fallback={<RewardLoading />}>
                  <Reward />
                </Suspense>
                <Button size="lg" className="mt-8" onClick={() => handleContinue('stage3')} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Continue to Even More Pointlessness
                </Button>
            </div>
        );
       case 'stage3':
        return (
            <div className="py-16">
                <Stage 
                    stageNumber={3} 
                    title={stageContent['3'].title}
                    content={stageContent['3'].content}
                    proTip={stageContent['3'].proTip}
                />
                <div className="text-center mt-8">
                    <Button size="lg" onClick={() => handleContinue('quiz3')} disabled={isPending}>
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Take Another Futile Quiz
                    </Button>
                </div>
            </div>
        );
      case 'quiz3':
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Quiz
                    questions={quizContent['3']}
                    onSubmit={() => handleQuizSubmit('reward3')}
                />
            </div>
        );
      case 'reward3':
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Suspense fallback={<RewardLoading />}>
                  <Reward />
                </Suspense>
                <Button size="lg" className="mt-8" onClick={() => handleContinue('stage4')} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Proceed to the Final Frontier
                </Button>
            </div>
        );
      case 'stage4':
        return (
            <div className="py-16">
                <Stage 
                    stageNumber={4} 
                    title={stageContent['4'].title}
                    content={stageContent['4'].content}
                    proTip={stageContent['4'].proTip}
                />
                <div className="text-center mt-8">
                    <Button size="lg" onClick={() => handleContinue('quiz4')} disabled={isPending}>
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Take the Final, Final, Futile Quiz
                    </Button>
                </div>
            </div>
        );
      case 'quiz4':
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Quiz
                    questions={quizContent['4']}
                    onSubmit={() => handleQuizSubmit('reward4')}
                />
            </div>
        );
      case 'reward4':
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Suspense fallback={<RewardLoading />}>
                  <Reward />
                </Suspense>
                <Button size="lg" className="mt-8" onClick={() => handleContinue('finale')} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Behold the Grand Finale
                </Button>
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
      {gameState !== 'intro' && gameState !== 'finale' && (
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
