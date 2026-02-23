'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('sidraya_user_email', email);
    localStorage.setItem('sidraya_is_logged_in', 'true');
    router.push('/dashboard');
  };

  return (
    <>
      <Header isLoggedIn={false} />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-32 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                <Image
                  src="/sidraya-logo.jpg"
                  alt="Sidraya Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-primary hover:text-accent transition">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition">
            Continue with Google
          </button>

          <div className="mt-6 text-center text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-accent transition font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
