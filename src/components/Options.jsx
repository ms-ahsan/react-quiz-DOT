/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useQuiz } from '@/contexts/QuizContext';

const Options = ({ question }) => {
  const { dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;
  console.log(question);
  return (
    <>
      {question.all_answers.map((option) => (
        <Button
          key={option}
          variant={
            hasAnswered
              ? option === question.correct_answer
                ? 'success'
                : 'destructive'
              : 'outline'
          }
          className={cn('border-2 rounded-sm ')}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({ type: 'newAnswer', payload: option })
          }
        >
          {option}
        </Button>
      ))}
    </>
  );
};

export default Options;
