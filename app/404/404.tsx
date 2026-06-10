'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Looks like this page doesn't exist. Let's get you back to the spelling bee!
        </p>
        <Link href="/">
          <Button className="bg-purple-600 hover:bg-purple-700 gap-2" size="lg">
            <Home className="h-5 w-5" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
