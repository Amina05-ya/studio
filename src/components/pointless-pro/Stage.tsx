'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProTip } from './ProTip';
import { Speaker, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { textToSpeech } from '@/app/actions';
import { useState, useTransition, Children, isValidElement } from 'react';
import { Textarea } from '@/components/ui/textarea';

type StageProps = {
  stageNumber: number;
  title: string;
  content: React.ReactNode;
  proTip: string;
};

// Helper function to extract text from React nodes
function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join(' ');

  if (isValidElement(node) && node.props.children) {
    return Children.map(node.props.children, getNodeText).join(' ');
  }
  
  return '';
}

export function Stage({ stageNumber, title, content, proTip }: StageProps) {
    const { toast } = useToast();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleReadAloud = () => {
        const textContent = getNodeText(content);
        
        startTransition(async () => {
            const result = await textToSpeech(textContent);
            if(result) {
                setAudioUrl(result);
                const audio = new Audio(result);
                audio.play();
                toast({
                    title: "Reading Aloud...",
                    description: "Please enjoy the soothing tones of synthetic nonsense.",
                })
            } else {
                toast({
                    title: "Audio Error",
                    description: "Couldn't generate the audio. The silence is probably more profound anyway.",
                    variant: "destructive"
                })
            }
        });
    }
  return (
    <div className="container mx-auto py-12">
      <header className="text-center mb-12">
        <p className="text-primary font-bold tracking-widest uppercase">Stage {stageNumber}</p>
        <h1 className="font-headline text-5xl font-bold mt-2">{title}</h1>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg bg-white">
            <CardContent className="p-8 text-lg leading-relaxed">
              {content}
            </CardContent>
          </Card>
          <ProTip tip={proTip} />
        </div>

        <div className="md:col-span-1">
          <Card className="shadow-lg sticky top-28 bg-white">
            <CardHeader>
              <CardTitle className="font-headline">Interactive Notes</CardTitle>
              <CardDescription>Jot down your epiphanies.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                  placeholder="Your brilliant, fleeting thoughts go here..."
                  className="h-48 resize-none mb-4 bg-background"
                  defaultValue={`- A pointer is a variable that has seen too much.\n- Debugging is the process of removing bugs, so programming must be the process of putting them in.\n- Note to self: Redefine 'success' to 'successfully failed.'`}
                />
                <Button className="w-full" onClick={handleReadAloud} disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Speaker className="mr-2 h-4 w-4"/>}
                    Read Aloud
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
