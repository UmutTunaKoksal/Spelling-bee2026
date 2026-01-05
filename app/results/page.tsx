'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSpellingStore } from '@/store/useSpellingStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Home, RotateCcw, Award, XCircle } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const {
    getTotalCorrect,
    getTotalIncorrect,
    getIncorrectWords,
    resetTest,
  } = useSpellingStore();

  const totalCorrect = getTotalCorrect();
  const totalIncorrect = getTotalIncorrect();
  const totalAnswered = totalCorrect + totalIncorrect;
  const incorrectWords = getIncorrectWords();

  const handleRetake = () => {
    if (confirm('Are you sure you want to retake the spelling bee? This will clear all your answers.')) {
      resetTest();
      router.push('/page/1');
    }
  };

  const percentage = totalAnswered > 0 ? Math.round((totalCorrect / 200) * 100) : 0;

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

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Spelling Bee Results
          </h1>
          <p className="text-gray-600">
            Here's how you performed on the spelling bee
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white border-2 border-green-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Correct</p>
                <p className="text-3xl font-bold text-green-600">
                  {totalCorrect}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-red-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Incorrect</p>
                <p className="text-3xl font-bold text-red-600">
                  {totalIncorrect}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-blue-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <RotateCcw className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-3xl font-bold text-blue-600">
                  {percentage}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {incorrectWords.length > 0 && (
          <Card className="p-6 bg-white mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Words to Review
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Word #</TableHead>
                    <TableHead>Your Answer</TableHead>
                    <TableHead>Correct Spelling</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incorrectWords.map((word) => (
                    <TableRow key={word.wordNumber}>
                      <TableCell className="font-medium">
                        #{word.wordNumber}
                      </TableCell>
                      <TableCell className="text-red-600 font-medium">
                        {word.studentAnswer || '(no answer)'}
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {word.word}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {totalAnswered === 0 && (
          <Card className="p-8 bg-white text-center">
            <p className="text-gray-600 mb-4">
              You haven't answered any words yet. Start the spelling bee to see your results!
            </p>
            <Link href="/page/1">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Spelling Bee
              </Button>
            </Link>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRetake}
            className="bg-purple-600 hover:bg-purple-700 gap-2"
            size="lg"
          >
            <RotateCcw className="h-5 w-5" />
            Retake Spelling Bee
          </Button>
          <Link href="/page/1">
            <Button variant="outline" size="lg">
              Continue Bee
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
