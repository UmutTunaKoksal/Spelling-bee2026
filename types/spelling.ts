export interface Word {
  number: number;
  word: string;
  part_of_speech: string;
  pronunciation: string;
  definition: string;
  sentence: string;
}

export interface WordAnswer {
  wordNumber: number;
  word: string;
  studentAnswer: string;
  isCorrect: boolean | null;
}

export type AnswerStatus = 'correct' | 'incorrect' | 'unanswered';
