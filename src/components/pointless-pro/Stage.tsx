import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProTip } from './ProTip';
import { Speaker } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type StageProps = {
  stageNumber: number;
  title: string;
  content: React.ReactNode;
  proTip: string;
};


export function Stage({ stageNumber, title, content, proTip }: StageProps) {
    const { toast } = useToast();

    const handleReadAloud = () => {
        toast({
            title: "Feature Not Implemented",
            description: "Reading this aloud would be far too productive. We can't have that.",
            variant: "destructive"
        })
    }
  return (
    <div className="container mx-auto py-12">
      <header className="text-center mb-12">
        <p className="text-primary font-bold tracking-widest uppercase">Stage {stageNumber}</p>
        <h1 className="font-headline text-5xl font-bold mt-2">{title}</h1>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-lg leading-relaxed">
              {content}
            </CardContent>
          </Card>
          <ProTip tip={proTip} />
        </div>

        <div className="md:col-span-1">
          <Card className="shadow-lg sticky top-28">
            <CardHeader>
              <CardTitle className="font-headline">Interactive Notes</CardTitle>
              <CardDescription>Jot down your epiphanies.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-4 bg-background border rounded-lg h-48 mb-4 flex items-center justify-center text-muted-foreground/50">
                  <p>...or don't. It's all the same.</p>
                </div>
                <Button variant="secondary" className="w-full" onClick={handleReadAloud}>
                    <Speaker className="mr-2 h-4 w-4"/>
                    Read Aloud
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
