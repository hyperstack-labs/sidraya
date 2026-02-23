'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function Header({ isLoggedIn = false, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="flex justify-between items-center h-16 px-6 bg-background/70 backdrop-blur-xl border border-border/50 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-primary/5">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors"
            >
              <Image
                src="/sidraya-logo.jpg"
                alt="Sidraya Logo"
                fill
                className="object-cover"
              />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-foreground hidden sm:inline group-hover:text-primary transition-colors">
              Sidraya
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {!isLoggedIn ? (
              <>
                <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#creators" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Creators
                </Link>
                <div className="w-px h-4 bg-border/50 mx-2" />
                <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors px-2">
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/signup" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-shadow">
                    Get Started
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link href="/profile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Profile
                </Link>
                <div className="w-px h-4 bg-border/50 mx-2" />
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors px-2"
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>

          <button
            className="md:hidden p-2 rounded-full hover:bg-muted/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 p-4 rounded-2xl bg-card border border-border shadow-2xl backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-4">
              {!isLoggedIn ? (
                <>
                  <Link href="#features" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                    Features
                  </Link>
                  <Link href="#creators" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                    Creators
                  </Link>
                  <div className="h-px bg-border/50 my-2" />
                  <Link href="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                    Sign In
                  </Link>
                  <Link href="/signup" className="px-4 py-2 text-sm font-bold text-primary-foreground bg-primary text-center rounded-lg shadow-lg">
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                    Profile
                  </Link>
                  <div className="h-px bg-border/50 my-2" />
                  <button
                    onClick={onLogout}
                    className="text-left px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
