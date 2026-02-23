import { Word } from '@/types/spelling';
import wordsData from '@/data/spellig.json';

export const allWords: Word[] = wordsData as Word[];

export const WORDS_PER_PAGE = 10;
export const TOTAL_PAGES = Math.ceil(allWords.length / WORDS_PER_PAGE);

export function getWordsForPage(page: number): Word[] {
  const startIndex = (page - 1) * WORDS_PER_PAGE;
  const endIndex = startIndex + WORDS_PER_PAGE;
  return allWords.slice(startIndex, endIndex);
}

export function isValidPage(page: number): boolean {
  return page >= 1 && page <= TOTAL_PAGES;
}
