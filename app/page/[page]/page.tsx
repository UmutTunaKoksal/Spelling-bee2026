import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWordsForPage, isValidPage, getTotalPages, DEFAULT_WORD_SET, WordSetKey, WORD_SETS } from '@/lib/words';
import { TestPageContent } from '@/components/TestPageContent';
import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface TestPageProps {
  params: {
    page: string;
  };
  searchParams: {
    set?: string;
  };
}

export function generateStaticParams() {
  const pages = Array.from({ length: getTotalPages(DEFAULT_WORD_SET) }, (_, i) => ({
    page: String(i + 1),
  }));
  return pages;
}

export default function TestPage({ params, searchParams }: TestPageProps) {
  const pageNumber = parseInt(params.page, 10);
  const setKey: WordSetKey = (searchParams?.set && searchParams.set in WORD_SETS)
    ? searchParams.set as WordSetKey
    : DEFAULT_WORD_SET;