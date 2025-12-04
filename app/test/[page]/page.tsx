import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWordsForPage, isValidPage, TOTAL_PAGES } from '@/lib/words';
import { TestPageContent } from '@/components/TestPageContent';
import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface TestPageProps {
  params: {
    page: string;
  };
}

export function generateStaticParams() {
  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
    page: String(i + 1),
  }));
  return pages;
}

export default function TestPage({ params }: TestPageProps) {
  const pageNumber = parseInt(params.page, 10);

  if (isNaN(pageNumber) || !isValidPage(pageNumber)) {
    notFound();
  }

  const words = getWordsForPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 mb-4">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Spelling Test - Page {pageNumber}
              </h1>
              <p className="text-gray-600">
                Click on any card to hear the word and type your answer
              </p>
            </div>
            <Link href="/results">
              <Button className="bg-green-600 hover:bg-green-700">
                View Results
              </Button>
            </Link>
          </div>
        </div>

        <TestPageContent words={words} />

        <div className="bg-white rounded-lg shadow-md p-6">
          <Pagination currentPage={pageNumber} totalPages={TOTAL_PAGES} />
        </div>
      </div>
    </div>
  );
}
