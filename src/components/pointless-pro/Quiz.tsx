'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { getFoolishMessage } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FormSchema = z.object({
  answer: z.string({
    required_error: 'You must pretend to choose an answer.',
  }),
});

export type QuizQuestion = {
  question: string;
  options: string[];
};

type QuizProps = {
  questions: QuizQuestion[];
  onSubmit: () => void;
};

export function Quiz({ questions, onSubmit }: QuizProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foolishMessage, setFoolishMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  function handleNextQuestion() {
    setFoolishMessage(null);
    setCurrentQuestionIndex((prev) => prev + 1);
    form.reset();
  }

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const message = await getFoolishMessage();
      setFoolishMessage(message);

      toast({
        title: "Analyzing your brilliant choice...",
        description: `You selected: ${data.answer}. A bold move.`,
      });

      if (isLastQuestion) {
        setTimeout(() => {
            onSubmit();
        }, 2000); // Give user time to read the message
      }
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl animate-in fade-in-50 zoom-in-90 duration-500">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{currentQuestion.question}</CardTitle>
        <CardDescription>Ponder this with the gravity it doesn't deserve. ({currentQuestionIndex + 1}/{questions.length})</CardDescription>
      </CardHeader>
      <CardContent>
        {foolishMessage ? (
          <div className="space-y-4 text-center">
            <Alert>
              <AlertTitle>Profound Feedback</AlertTitle>
              <AlertDescription className="text-lg">
                {foolishMessage}
              </AlertDescription>
            </Alert>
            <Button
              onClick={isLastQuestion ? onSubmit : handleNextQuestion}
              className="w-full"
              size="lg"
            >
              {isLastQuestion ? 'Complete the Ritual' : 'Next Absurdity'}
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-lg font-semibold">Your Choices:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        {currentQuestion.options.map((option, index) => (
                          <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option} />
                            </FormControl>
                            <FormLabel className="font-normal text-base">{option}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Finalize My Pointless Decision
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
