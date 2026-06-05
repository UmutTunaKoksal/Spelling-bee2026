'use client';

import Link from 'next/link';
import { WORDS } from '@/lib/words';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function WordSetSelector() {
  return (
    <Card className="p-8 bg-white mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        2026 Canada Spelling Bee Words
      </h2>
      <div className="text-center mb-6">
        <p className="text-gray-600 mb-4">
          Complete all {WORDS.length} words to master the spelling bee challenge
        </p>
      </div>
      <div className="flex justify-center">
        <Link href="/page/1" className="block">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-2 text-lg">
            Start Spelling Bee
          </Button>
        </Link>
      </div>
    </Card>
  );
}
