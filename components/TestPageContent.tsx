'use client';

import { useState } from 'react';
import { Word } from '@/types/spelling';
import { useSpellingStore } from '@/store/useSpellingStore';
import { WordCard } from '@/components/WordCard';
import { WordModal } from '@/components/WordModal';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface TestPageContentProps {
  words: Word[];
}

export function TestPageContent({ words }: TestPageContentProps) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const { autoMode, setAutoMode } = useSpellingStore();

  const handleCardClick = (word: Word) => {
    setSelectedWord(word);
  };

  const handleNext = () => {
    if (!selectedWord) return;

    const currentIndex = words.findIndex((w) => w.number === selectedWord.number);
    if (currentIndex < words.length - 1) {
      setSelectedWord(words[currentIndex + 1]);
    } else {
      setSelectedWord(null);
    }
  };

  return (
    <>
      <Card className="bg-white p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch
            id="auto-mode"
            checked={autoMode}
            onCheckedChange={setAutoMode}
          />
          <Label htmlFor="auto-mode" className="cursor-pointer">
            <div className="font-semibold">Auto-Advance Mode</div>
            <div className="text-sm text-gray-600">Automatically advance to next word after submitting</div>
          </Label>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {words.map((word) => (
          <div key={word.number} onClick={() => handleCardClick(word)}>
            <WordCard word={word} />
          </div>
        ))}
      </div>

      {selectedWord && (
        <WordModal
          word={selectedWord}
          open={!!selectedWord}
          onClose={() => setSelectedWord(null)}
          onNext={handleNext}
        />
      )}
    </>
  );
}
