'use client';

import { useState } from 'react';
import { Word } from '@/types/spelling';
import { useSpellingStore } from '@/store/useSpellingStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Volume2, ChevronDown, ChevronUp } from 'lucide-react';

interface WordModalProps {
  word: Word;
  open: boolean;
  onClose: () => void;
  onNext?: () => void;
}

export function WordModal({ word, open, onClose, onNext }: WordModalProps) {
  const [answer, setAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [lastResult, setLastResult] = useState<boolean | null>(null);
  const { setAnswer: saveAnswer, getAnswerStatus, autoMode } = useSpellingStore();

  const status = getAnswerStatus(word.number);
  const isAnswered = status !== 'unanswered';

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      const trimmedAnswer = answer.trim().toLowerCase();
      const correctWord = word.word.toLowerCase();
      const isCorrect = trimmedAnswer === correctWord;

      saveAnswer(word.number, word.word, answer);
      setHasSubmitted(true);
      setLastResult(isCorrect);

      if (!autoMode) {
        setTimeout(() => {
          handleClose();
        }, 500);
      } else {
        setTimeout(() => {
          setAnswer('');
          setHasSubmitted(false);
        }, 800);
      }
    }
  };

  const handleNext = () => {
    setAnswer('');
    setHasSubmitted(false);
    setShowDescription(false);
    setLastResult(null);
    if (onNext) {
      onNext();
    }
  };

  const handleClose = () => {
    setAnswer('');
    setHasSubmitted(false);
    setShowDescription(false);
    setLastResult(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Word #{word.number}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex justify-center">
            <Button
              onClick={handleSpeak}
              size="lg"
              variant="outline"
              className="h-20 w-20 rounded-full hover:bg-blue-50"
            >
              <Volume2 className="h-8 w-8 text-blue-600" />
            </Button>
          </div>

          <Button
            onClick={() => setShowDescription(!showDescription)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            {showDescription ? (
              <>
                Hide Description
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show Description
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>

          {showDescription && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  Definition:
                </h4>
                <p className="text-gray-800">{word.definition}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-1">
                  Example Sentence:
                </h4>
                <p className="text-gray-800 italic">
                  {isAnswered ? (
                    word.sentence
                  ) : (
                    <>
                      {word.sentence.split(new RegExp(`(${word.word})`, 'gi')).map((part, index) => {
                        if (part.toLowerCase() === word.word.toLowerCase()) {
                          return (
                            <span
                              key={index}
                              className="inline-block bg-black text-black select-none px-1 rounded"
                              style={{ minWidth: '60px' }}
                            >
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </>
                  )}
                </p>
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Part of Speech:</span> {word.part_of_speech}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="spelling-input" className="text-sm font-medium">
              Type your spelling:
            </label>
            <Input
              id="spelling-input"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!isAnswered && !hasSubmitted) {
                    handleSubmit();
                  } else if (autoMode && (hasSubmitted || isAnswered)) {
                    handleNext();
                  }
                }
              }}
              placeholder="Enter spelling here..."
              disabled={isAnswered}
              className="text-lg"
              autoFocus
            />
          </div>

          {!autoMode ? (
            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={!answer.trim() || isAnswered}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isAnswered ? 'Submitted' : 'Submit'}
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              {!hasSubmitted && !isAnswered ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Next Word
                </Button>
              )}
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
            </div>
          )}

          {hasSubmitted && !autoMode && (
            <p className="text-center text-sm text-green-600 font-medium">
              Answer saved!
            </p>
          )}

          {hasSubmitted && autoMode && lastResult !== null && (
            <div className={`text-center text-sm font-medium p-3 rounded-lg ${
              lastResult
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {lastResult ? '✓ Correct!' : `✗ Incorrect - The word is "${word.word}"`}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
