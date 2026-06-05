import { Word } from '@/types/spelling';
import spelligData from '@/data/spellig.json';
import spellingBeeWordsData from '@/data/spelling-bee-words.json';

export const WORD_SETS = {
  original: {
    name: 'Original (1-79)',
    data: spelligData as Word[],
  },
  extended: {
    name: 'Extended (80-100)',
    data: spellingBeeWordsData as Word[],
  },
} as const;

export type WordSetKey = keyof typeof WORD_SETS;

export const DEFAULT_WORD_SET: WordSetKey = 'original';

export const WORDS_PER_PAGE = 10;

export function getWordSet(setKey: WordSetKey): Word[] {
  return WORD_SETS[setKey].data;
}

export function getTotalPages(setKey: WordSetKey): number {
  return Math.ceil(getWordSet(setKey).length / WORDS_PER_PAGE);
}

export function getWordsForPage(page: number, setKey: WordSetKey = DEFAULT_WORD_SET): Word[] {
  const words = getWordSet(setKey);
  const startIndex = (page - 1) * WORDS_PER_PAGE;
  const endIndex = startIndex + WORDS_PER_PAGE;
  return words.slice(startIndex, endIndex);
}

export function isValidPage(page: number, setKey: WordSetKey = DEFAULT_WORD_SET): boolean {
  return page >= 1 && page <= getTotalPages(setKey);
}
