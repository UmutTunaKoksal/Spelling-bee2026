export interface Word {
  number: number;
  word: string;
  part_of_speech?: string;
  partOfSpeech?: string;
  pronunciation: string;
  definition: string;
  sentence: string;
  etymology?: string;
  index?: number;
}

export interface WordAnswer {
  wordNumber: number;
  word: string;
  studentAnswer: string;
  isCorrect: boolean | null;
}

export type AnswerStatus = 'correct' | 'incorrect' | 'unanswered';
