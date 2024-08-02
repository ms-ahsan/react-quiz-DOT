import { useState } from 'react';
import { Loader } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useQuiz } from '@/contexts/QuizContext';
import axios from 'axios';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const { dispatch } = useQuiz();

  async function onSubmit(e) {
    setIsLoading(true);
    e.preventDefault();

    setTimeout(async () => {
      dispatch({ type: 'start', payload: name });
      const response = await axios.get(
        'https://opentdb.com/api.php?amount=10&category=27&difficulty=hard&type=multiple'
      );
      console.log('data respinse', response);
      const data = response.data.results;

      dispatch({ type: 'dataReceived', payload: data });
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='w-[540px] flex flex-col items-center justify-center space-y-6'>
          <div className='w-full space-y-3'>
            <Label className='font-medium' htmlFor='name'>
              Your Tebak Tebak name is....{' '}
            </Label>
            <Input
              id='name'
              placeholder='Enter your name'
              type='text'
              autoCapitalize='none'
              autoCorrect='off'
              disabled={isLoading}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <Button className='w-1/2' disabled={isLoading || !name}>
            {isLoading && (
              <Loader className='mr-2 h-4 w-4 animate-spin' />
            )}
            Start Game 🎮
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
