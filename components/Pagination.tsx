'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link key={i} href={`/test/${i}`}>
          <Button
            variant={i === currentPage ? 'default' : 'outline'}
            size="sm"
            className={
              i === currentPage
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'hover:bg-blue-50'
            }
          >
            {i}
          </Button>
        </Link>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Link
        href={currentPage > 1 ? `/test/${currentPage - 1}` : '#'}
        className={currentPage === 1 ? 'pointer-events-none' : ''}
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      </Link>

      {renderPageNumbers()}

      <Link
        href={currentPage < totalPages ? `/test/${currentPage + 1}` : '#'}
        className={currentPage === totalPages ? 'pointer-events-none' : ''}
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
