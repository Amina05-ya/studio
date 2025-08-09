import { Lightbulb } from 'lucide-react';

type ProTipProps = {
  tip: string;
};

export function ProTip({ tip }: ProTipProps) {
  return (
    <div className="my-8 bg-black text-white rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105">
      <div className="flex items-start gap-4">
        <div className="bg-white/20 text-white p-2 rounded-full mt-1">
            <Lightbulb className="h-6 w-6" />
        </div>
        <div>
            <h3 className="font-headline text-xl font-bold">Pro-Tip</h3>
            <p className="mt-1 text-lg text-white/80">{tip}</p>
        </div>
      </div>
    </div>
  );
}
