import { useQuiz } from '../contexts/QuizContext';
import { Button } from './ui/button';

function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <Button
        variant={'outline'}
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </Button>
    );

  if (index === numQuestions - 1)
    return (
      <Button
        variant={'outline'}
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </Button>
    );
}

export default NextButton;
