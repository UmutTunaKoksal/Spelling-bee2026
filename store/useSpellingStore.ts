import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WordAnswer } from '@/types/spelling';

interface SpellingState {
  answers: Record<number, WordAnswer>;
  autoMode: boolean;
  setAnswer: (wordNumber: number, word: string, studentAnswer: string) => void;
  getAnswerStatus: (wordNumber: number) => 'correct' | 'incorrect' | 'unanswered';
  resetTest: () => void;
  getTotalCorrect: () => number;
  getTotalIncorrect: () => number;
  getIncorrectWords: () => WordAnswer[];
  setAutoMode: (enabled: boolean) => void;
}

export const useSpellingStore = create<SpellingState>()(
  persist(
    (set, get) => ({
      answers: {},
      autoMode: false,

      setAnswer: (wordNumber: number, word: string, studentAnswer: string) => {
        const trimmedAnswer = studentAnswer.trim().toLowerCase();
        const correctWord = word.toLowerCase();
        const isCorrect = trimmedAnswer === correctWord;

        set((state) => ({
          answers: {
            ...state.answers,
            [wordNumber]: {
              wordNumber,
              word,
              studentAnswer: studentAnswer.trim(),
              isCorrect,
            },
          },
        }));
      },

      getAnswerStatus: (wordNumber: number) => {
        const answer = get().answers[wordNumber];
        if (!answer) return 'unanswered';
        return answer.isCorrect ? 'correct' : 'incorrect';
      },

      resetTest: () => set({ answers: {} }),

      getTotalCorrect: () => {
        const answers = Object.values(get().answers);
        return answers.filter((a) => a.isCorrect === true).length;
      },

      getTotalIncorrect: () => {
        const answers = Object.values(get().answers);
        return answers.filter((a) => a.isCorrect === false).length;
      },

      getIncorrectWords: () => {
        const answers = Object.values(get().answers);
        return answers.filter((a) => a.isCorrect === false);
      },

      setAutoMode: (enabled: boolean) => set({ autoMode: enabled }),
    }),
    {
      name: 'spelling-test-storage',
    }
  )
);
