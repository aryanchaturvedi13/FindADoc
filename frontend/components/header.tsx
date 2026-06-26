'use client';

import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">FindADoc</span>
        </Link>
      </div>
    </header>
  );
}
