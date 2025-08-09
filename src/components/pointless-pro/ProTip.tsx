import { Lightbulb } from 'lucide-react';

type ProTipProps = {
  tip: string;
};

export function ProTip({ tip }: ProTipProps) {
  return (
    <div className="my-8 bg-amber-100 text-amber-900 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105">
      <div className="flex items-start gap-4">
        <div className="bg-amber-400/50 text-amber-900 p-2 rounded-full mt-1">
            <Lightbulb className="h-6 w-6" />
        </div>
        <div>
            <h3 className="font-headline text-xl font-bold">Pro-Tip</h3>
            <p className="mt-1 text-lg">{tip}</p>
        </div>
      </div>
    </div>
  );
}
