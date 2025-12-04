'use client';

import { Word } from '@/types/spelling';
import { useSpellingStore } from '@/store/useSpellingStore';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';

interface WordCardProps {
  word: Word;
}

export function WordCard({ word }: WordCardProps) {
  const { getAnswerStatus } = useSpellingStore();

  const status = getAnswerStatus(word.number);

  const getCardColor = () => {
    switch (status) {
      case 'correct':
        return 'bg-green-500 hover:bg-green-600 border-green-600';
      case 'incorrect':
        return 'bg-red-500 hover:bg-red-600 border-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600 border-blue-600';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'correct':
        return <CheckCircle2 className="h-6 w-6" />;
      case 'incorrect':
        return <XCircle className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <Card
      className={`${getCardColor()} cursor-pointer transition-all duration-200 border-2 shadow-lg hover:shadow-xl transform hover:scale-105`}
    >
      <div className="flex flex-col items-center justify-center h-32 text-white">
        <div className="text-3xl font-bold mb-2">#{word.number}</div>
        {getIcon()}
      </div>
    </Card>
  );
}
