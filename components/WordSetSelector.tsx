'use client';

import Link from 'next/link';
import { useSpellingStore } from '@/store/useSpellingStore';
import { WORD_SETS, WordSetKey } from '@/lib/words';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function WordSetSelector() {
  const { activeWordSet, setActiveWordSet } = useSpellingStore();

  const handleSelectWordSet = (setKey: WordSetKey) => {
    setActiveWordSet(setKey);
  };

  return (
    <Card className="p-8 bg-white mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Select Word Set
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.entries(WORD_SETS) as Array<[WordSetKey, typeof WORD_SETS[WordSetKey]]>).map(
          ([setKey, set]) => (
            <div key={setKey}>
              <button
                onClick={() => handleSelectWordSet(setKey)}
                className={`w-full p-6 rounded-lg border-2 transition-all ${
                  activeWordSet === setKey
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{set.name}</h3>
                  <p className="text-sm text-gray-600">
                    {set.data.length} words
                  </p>
                </div>
              </button>
              {activeWordSet === setKey && (
                <Link href="/page/1" className="mt-3 block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Spelling Bee
                  </Button>
                </Link>
              )}
            </div>
          )
        )}
      </div>
    </Card>
  );
}
