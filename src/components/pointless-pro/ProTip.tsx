import { Lightbulb } from 'lucide-react';

type ProTipProps = {
  tip: string;
};

export function ProTip({ tip }: ProTipProps) {
  return (
    <div className="my-8 bg-card border rounded-xl p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 text-primary p-2 rounded-full mt-1">
            <Lightbulb className="h-6 w-6" />
        </div>
        <div>
            <h3 className="font-headline text-xl font-bold">Pro-Tip</h3>
            <p className="mt-1 text-lg text-muted-foreground">{tip}</p>
        </div>
      </div>
    </div>
  );
}
