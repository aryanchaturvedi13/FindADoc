'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Check credentials
    if (email === 'demo@example.com' && password === 'demo123') {
      setTimeout(() => {
        setLoading(false);
        // Store demo user in localStorage
        const demoUser = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'demo@example.com',
          age: '28',
          gender: 'male',
          previousIllness: 'No serious conditions',
          photoPreview: '',
        };
        localStorage.setItem('user', JSON.stringify(demoUser));
        window.location.href = '/profile';
      }, 1000);
    } else {
      setTimeout(() => {
        setLoading(false);
        alert('Invalid credentials. Use demo@example.com / demo123');
      }, 1000);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 py-12 md:py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
              Welcome Back
            </h1>
            <p className="text-text-muted text-center mb-8">
              Sign in to your FindADoc account
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-text-muted" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-text-muted">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors mb-6"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-text-muted">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:text-primary/80 font-semibold">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Info */}
          <div className="bg-primary-light border border-primary rounded-lg p-4 mt-6 text-sm">
            <p className="text-foreground font-semibold mb-2">Demo Credentials:</p>
            <p className="text-text-muted">
              Email: <span className="font-mono text-foreground">demo@example.com</span>
            </p>
            <p className="text-text-muted">
              Password: <span className="font-mono text-foreground">demo123</span>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
