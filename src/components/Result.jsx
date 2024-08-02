import { useQuiz } from '../contexts/QuizContext';
import { Button } from './ui/button';

function Result() {
  const { points, dispatch, name } = useQuiz();

  const percentage = (points / 100) * 100;

  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🙃';
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div>
          <p className='text-xl font-medium'>
            {' '}
            Hey {name} <span>{emoji}</span>
          </p>
        </div>
        <div className='mt-2'>
          You scored <span className='font-bold'>{points}</span> out
          of {100} ({Math.ceil(percentage)}%)
        </div>
      </div>
      <Button
        className='mt-4'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart quiz
      </Button>
    </>
  );
}

export default Result;
