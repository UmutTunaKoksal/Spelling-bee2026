import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Award, Brain, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              <BookOpen className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          2026 Canada Spelling Bee
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practice spelling 200 words through fun, interactive cards. Click, listen, and spell your way to success!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-white border-2 border-blue-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                200 Words
              </h3>
              <p className="text-gray-600">
                Master spelling across 20 pages with 10 words each
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-purple-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-purple-100 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Audio Support
              </h3>
              <p className="text-gray-600">
                Hear each word pronounced clearly with text-to-speech
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-pink-200 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-pink-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600">
                See your results and review words you need to practice
              </p>
            </div>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <Link href="/page/1">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Spelling Bee
            </Button>
          </Link>

          <div>
            <Link href="/results">
              <Button variant="outline" size="lg" className="px-8">
                View My Results
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mt-12 p-6 bg-white/80 backdrop-blur">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <p className="text-gray-700">Click on a numbered card</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
              <p className="text-gray-700">Listen to the word</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">3</div>
              <p className="text-gray-700">Type your spelling</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">4</div>
              <p className="text-gray-700">Submit and continue</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
