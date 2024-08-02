import { Label } from './ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuiz } from '@/contexts/QuizContext';
import Timer from './Timer';
import Options from './Options';
import NextButton from './NextButton';

function Questions() {
  const { questions, index, points, numQuestions, name } = useQuiz();

  const question = questions.at(index);

  return (
    <div className='w-[540px]'>
      <div className='flex items-center justify-center'>
        <Label className='text-2xl '>Good luck {name} 🥳</Label>
      </div>
      <Card className='mt-6 w-full rounded-xl border-4 border-slate-600 bg-slate-100'>
        <CardHeader>
          <div className='flex flex-row items-center justify-between mb-3'>
            <CardDescription className='font-semibold text-md text-black'>
              Question {index + 1}/{numQuestions}
            </CardDescription>
            <CardDescription className='font-semibold text-md text-black'>
              {' '}
              {points}/ 100
            </CardDescription>
          </div>

          <CardTitle>{question.question}</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-3 bg-green'>
          <Options question={question} />
        </CardContent>
      </Card>
      <div className='mt-6 flex flex-row items-center justify-between'>
        <Timer />
        <NextButton />
      </div>
    </div>
  );
}

export default Questions;
