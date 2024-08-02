import Login from './components/Login';
import Questions from './components/Questions';
import Result from './components/Result';
import { useQuiz } from './contexts/QuizContext';

function App() {
  const { status } = useQuiz();

  return (
    <div className='flex flex-col items-center min-h-screen bg-gradient-to-t from-primary/70 to-white'>
      <div className='flex flex-col items-center justify-between'>
        <h1 className=' py-12 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Tebak Tebak QUIZ
        </h1>

        {status === 'ready' && <Login />}
        {status === 'active' && (
          <>
            <Questions />
          </>
        )}
        {status === 'finished' && <Result />}
      </div>
    </div>
  );
}

export default App;
