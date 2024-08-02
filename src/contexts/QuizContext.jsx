/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';

const SECS_PER_QUESTION = 30; // Define your constant

const QuizContext = createContext();

const initialState = {
  questions: [],
  name: null,
  status: 'ready',
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived': {
      const { payload } = action;

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const questions = payload.map((question) => {
        const allAnswers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        const shuffledAnswers = shuffleArray(allAnswers);

        return {
          ...question,
          all_answers: shuffledAnswers,
        };
      });

      return {
        ...state,
        questions,
        status: 'active',
        secondsRemaining: payload.length * SECS_PER_QUESTION,
      };
    }
    case 'start':
      return {
        ...state,
        status: 'start',
        name: action.payload,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer': {
      const question = state.questions[state.index];

      const points =
        action.payload === question.correct_answer ? 10 : 0;

      return {
        ...state,
        answer: action.payload,
        points: state.points + points,
      };
    }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };

    default:
      throw new Error('Unknown action type');
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numQuestions = state.questions.length;

  return (
    <QuizContext.Provider
      value={{
        ...state,
        numQuestions,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { QuizProvider, useQuiz };
