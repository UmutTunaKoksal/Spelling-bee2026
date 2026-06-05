import { Word } from '@/types/spelling';
import umutWordsData from '@/data/umut_spelling_bee_words.json';

export const WORDS: Word[] = (umutWordsData as any[]).map(word => ({
  ...word,
  number: word.index,
}));

export const WORDS_PER_PAGE = 10;

export function getTotalPages(): number {
  return Math.ceil(WORDS.length / WORDS_PER_PAGE);
}

export function getWordsForPage(page: number): Word[] {
  const startIndex = (page - 1) * WORDS_PER_PAGE;
  const endIndex = startIndex + WORDS_PER_PAGE;
  return WORDS.slice(startIndex, endIndex);
}

export function isValidPage(page: number): boolean {
  return page >= 1 && page <= getTotalPages();
}
