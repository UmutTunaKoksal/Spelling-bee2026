import { Word } from '@/types/spelling';
import CSSBQData from '@/data/spellig.json';
import CSSBNData from '@/data/CSSB_bee_words_2026.json';

export const WORD_SETS = {
  Canada_Super_Spelling_Bee_Qualifications: {
    name: 'Canada Super Spelling Bee Qualifications (1-200)',
    data: CSSBQData as Word[],
  },
  Canada_National_Super_Spelling_Bee : {
    name: 'Canada National Super Spelling Bee (1-450)',
    data: CSSBNData as Word[],
  },
} as const;

export type WordSetKey = keyof typeof WORD_SETS;

export const DEFAULT_WORD_SET: WordSetKey = 'Canada_Super_Spelling_Bee_Qualifications';

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
