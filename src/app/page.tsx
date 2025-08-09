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
        <p className="mb-4">Welcome, aspiring Pointless Pro, to the glorious world of C programming. Here, we don't write code; we craft elegant monuments to meaninglessness. Our first topic: the pointer. A pointer, denoted by an asterisk `*`, is not just a variable. It's a metaphysical arrow that points to the vast, beautiful nothingness of the `NULL` void.</p>
        <p>Consider this masterpiece: `int* myPointer = NULL;`. With this single line, you haven't just declared a pointer; you've made a profound philosophical statement about the emptiness of existence. You have successfully pointed at nothing. This is the cornerstone of professional pointlessness.</p>
        </>
    ),
    proTip: "To truly master C, replace all your variable names with synonyms for 'void'. Your code will become a beautiful, unreadable poem."
  },
  '2': {
    title: 'Pointers and Nulls: Mastering the Void',
    content: (
        <>
        <p className="mb-4">You have ascended to the next level of consciousness: the `NULL` pointer. `NULL` isn't a value; it's a destination. It's the digital equivalent of staring into the abyss, and the abyss staring back with a compiler error. This is where true enlightenment begins.</p>
        <p>Attempting to dereference a `NULL` pointer is a sacred ritual. It's how your program achieves nirvana, gracefully exiting this mortal coil via a 'segmentation fault.' This isn't a crash; it's a form of digital transcendence. Your machine is thanking you for freeing it from the burden of execution.</p>
        </>
    ),
    proTip: "Instead of debugging, try meditating. If the bug persists, you are not one with the machine. Try offering it a cup of herbal tea."
  },
  '3': {
    title: 'Advanced Obfuscation: The Da Vinci Code',
    content: (
      <>
        <p className="mb-4">Welcome to the art of writing code that is not only functional but also completely impenetrable. Your goal is to write software that works, but that no one, including yourself, can ever understand again. This is the secret to eternal job security.</p>
        <p>Employ creative techniques like naming your variables after obscure constellations. Use bitwise shifts to perform simple addition. Write your functions recursively, even for loops. For example: `#define TRUE FALSE`. Your code will be less of a program and more of a cryptic crossword puzzle.</p>
      </>
    ),
    proTip: "Your commit messages should be in haiku. 'Server is now on fire. It is snowing on Mount Fuji.'"
  },
  '4': {
    title: 'Quantum Computing: Spooky Action at a Coffee Shop',
    content: (
        <>
        <p className="mb-4">Quantum computing is easy. Everything you know is wrong, but also right. A qubit is a bit that's been to a liberal arts college. It can be a 0, a 1, or both, all while complaining about its student loans. This is called superposition.</p>
        <p>To build a quantum computer, simply close your eyes and believe your laptop is one. This act of observation will collapse its wave function into a state of pure, unadulterated confusion. Your code will now simultaneously compile and fail, which is the definition of success in the quantum realm.</p>
        </>
    ),
    proTip: "If you encounter a quantum bug, it's not your fault. The bug exists in a parallel universe. Blame that universe."
    }
};

const quizContent: { [key: string]: QuizQuestion[] } = {
    '1': [
        {
            question: "What does the 'C' in 'C programming' stand for?",
            options: ['Clowns', 'Cthulhu', 'Commitment issues', 'All of the above'],
        },
        {
            question: "What is the primary function of a rubber duck in programming?",
            options: ["To absorb tears", "To act as a scapegoat for bugs", "To float in the bathtub of despair", "To provide moral support"],
        },
        {
            question: "How do you achieve a state of 'flow' while coding?",
            options: ['By spilling coffee on your keyboard', 'By staring blankly at the screen for three hours', 'By opening 42 Stack Overflow tabs', 'Flow is a myth, like clean code'],
        },
        {
            question: "What is the best way to name a variable?",
            options: ['An inside joke no one else gets', "Your pet's name", "`a`", "`variable`"],
        }
    ],
    '2': [
        {
            question: "What is a `NULL` pointer's favorite movie?",
            options: ['The Nothing', 'Gone with the Wind', 'The Void', "Dude, Where's My Car?"],
        },
        {
            question: "A segmentation fault is the computer's way of saying:",
            options: ["'I've had enough of your nonsense'", "'Please, make it stop'", "'I'm going on strike'", "'All of the above'"],
        },
        {
            question: "What's the difference between a programmer and a pizza?",
            options: ["A pizza can feed a family of four", "A pizza doesn't cry when the code doesn't work", "A pizza has fewer bugs", "I don't know, but now I'm hungry"],
        },
        {
            question: "How do you center a div?",
            options: ["You pray to the CSS gods", "You sacrifice a goat", "You ask your mom", "You just don't"],
        }
    ],
    '3': [
        {
            question: "What is the main purpose of writing unreadable code?",
            options: ['Job security', 'To feel superior to others', 'To create a modern art masterpiece', 'To confuse future you'],
        },
        {
            question: "Why do we use comments in code?",
            options: ['To write poems about our feelings', 'To leave passive-aggressive notes for coworkers', 'To remind ourselves what we were thinking before the existential dread set in', 'To hide treasure maps'],
        },
        {
            question: "The purpose of a ternary operator is to:",
            options: ['Fit an entire emotional rollercoaster into a single line', 'Confuse the intern', 'Prove your intellectual dominance', 'Make your code look like an alien language'],
        },
        {
            question: "What is a 'code smell'?",
            options: ["The scent of burnt-out CPUs", "The feeling you get on Monday mornings", "Code that works but you didn't write it", "When the code is so bad you can almost hear it crying"],
        }
    ],
    '4': [
        {
            question: "A qubit's favorite music genre is:",
            options: ['Quantum Pop', 'Electronica', 'Anything but binary beats', 'Silence'],
        },
        {
            question: "What is 'quantum superposition'?",
            options: ["The state of being both employed and looking for a new job", "When you are simultaneously drinking coffee and spilling it", "The reason your socks disappear in the laundry", "A very expensive nap"],
        },
        {
            question: "Quantum entanglement is also known as 'spooky action at a distance'. This is similar to:",
            options: ["Your boss knowing you're on social media without looking at your screen", "Thinking of a bug and it appearing on your coworker's machine", "Getting a notification on your phone, watch, laptop, and smart fridge at the same time", "All of the above"],
        },
        {
            question: "How do you debug a quantum computer?",
            options: ["You don't. You vibe with it.", "You offer it a sacrifice", "You flip a coin. If it lands on its edge, the bug is gone.", "You observe it, which changes the outcome, which fixes the problem. Or creates three new ones."],
        }
    ]
};

const stageColors = [
    "bg-violet-100",
    "bg-rose-100",
    "bg-sky-100",
    "bg-emerald-100",
]

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
                    <h1 className="font-headline text-6xl md:text-8xl font-bold bg-gradient-to-br from-primary via-primary/80 to-foreground text-transparent bg-clip-text">Pointless Pro</h1>
                    <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl animate-in fade-in-50 delay-500 duration-1000">Welcome to Pointless Pro</p>
                </div>
                <div className="animate-in fade-in-0 delay-1000 duration-1000">
                <Button size="lg" className="mt-8 shadow-lg hover:shadow-primary/30 transition-shadow" onClick={() => handleContinue('stages')}>
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
                    <Card key={stage.id} className={`${stageColors[index]} shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all cursor-pointer group transform hover:-translate-y-1`}
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
