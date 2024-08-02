import { useState, useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

const Timer = () => {
  const { secondsRemaining, dispatch } = useQuiz();
  const [timeLeft, setTimeLeft] = useState(secondsRemaining);

  useEffect(() => {
    setTimeLeft(secondsRemaining);
  }, [secondsRemaining]);

  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch({ type: 'finish' });
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, dispatch]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

export default Timer;
