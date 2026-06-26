'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">FindADoc</h3>
            <p className="text-sm text-text-muted">
              Connecting travelers with quality healthcare worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-text-muted hover:text-foreground">Home</Link></li>
              <li><Link href="/search" className="text-text-muted hover:text-foreground">Find Doctors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-text-muted hover:text-foreground">About Us</a></li>
              <li><a href="#" className="text-text-muted hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-text-muted hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-text-muted hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <p className="text-sm text-text-muted text-center">
            © 2024 FindADoc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
