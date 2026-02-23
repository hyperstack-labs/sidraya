'use client';

import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';
import { mockVideos, mockCreators, Video } from '@/lib/mockData';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Video as VideoIcon, Gauge, Globe, Tv, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (selectedVideo) {
    return <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />;
  }

  // Fade up animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  if (isLoggedIn) {
    return (
      <>
        <Header isLoggedIn={true} onLogout={handleLogout} />
        <div className="min-h-screen bg-background pt-24 pb-12 relative overflow-hidden">
          {/* Subtle background glow for logged in users */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp}
              className="mb-12 text-center sm:text-left"
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">Your Feed</h1>
              <p className="text-lg text-muted-foreground">Discover videos from creators you follow</p>
            </motion.div>

            <motion.div
              variants={staggerContainer} initial="hidden" animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {mockVideos.map((video) => (
                <motion.div key={video.id} variants={fadeUp}>
                  <VideoCard
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Header isLoggedIn={false} />

      <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary overflow-x-hidden">
        <main>
          {/* Cinematic Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Massive Glowing Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8"
              >
                <VideoIcon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">A video platform for faith-based creators</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tighter leading-[1.1] mb-6"
              >
                Share Your Faith,<br />
                <span className="text-transparent bg-clip-text bg-linear-to-br from-primary via-[#FDE047] to-primary/50">
                  Inspire Others.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light mb-10"
              >
                Sidraya is where Muslim creators and viewers connect through videos that actually matter.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center"
              >
                <div onClick={() => setIsLoggedIn(true)} className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-linear-to-r from-primary to-[#FDE047] rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                  <button className="relative px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-base hover:scale-105 transition-transform flex items-center gap-2">
                    Start Watching
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <Link
                  href="#creators"
                  className="px-6 py-3 rounded-full font-bold text-base border border-border/50 bg-background/50 hover:bg-muted/50 transition-colors backdrop-blur-md text-foreground"
                >
                  Meet the Creators
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Featured Content (Bleeding Edge) */}
          <section className="py-24 relative z-20 bg-card/30 border-y border-border/50 backdrop-blur-sm">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
              >
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Trending Now</h2>
                  <p className="text-lg text-muted-foreground">What people are watching right now.</p>
                </div>
                <button onClick={() => setIsLoggedIn(true)} className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2 group">
                  View All Videos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.div
                variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {mockVideos.slice(0, 3).map((video) => (
                  <motion.div
                    key={video.id}
                    variants={fadeUp}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <VideoCard
                      video={video}
                      onClick={() => setSelectedVideo(video)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Cinematic Bento Grid "Why Join" */}
          <section id="features" className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">Built for real connection</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We focus on building an actual community instead of just chasing viral trends.</p>
            </motion.div>

            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
            >
              {/* Large Bento Cell */}
              <motion.div
                variants={fadeUp}
                className="md:col-span-2 relative rounded-3xl overflow-hidden bg-card border border-border group hover:border-primary/50 transition-colors"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full p-10 flex flex-col justify-end">
                  <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center border border-border shadow-lg mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">Grow your channel</h3>
                  <p className="text-lg text-muted-foreground w-3/4">Find viewers who actually care about your content and what you have to say.</p>
                </div>
              </motion.div>

              {/* Standard Bento Cell 1 */}
              <motion.div
                variants={fadeUp}
                className="relative rounded-3xl overflow-hidden bg-card border border-border group hover:border-primary/50 transition-colors p-8 flex flex-col justify-end"
              >
                <div className="absolute inset-0 bg-linear-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center border border-border shadow-lg mb-6 group-hover:rotate-12 transition-transform">
                  <Gauge className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Fast streaming</h3>
                <p className="text-muted-foreground">We make sure your videos load quickly everywhere.</p>
              </motion.div>

              {/* Standard Bento Cell 2 */}
              <motion.div
                variants={fadeUp}
                className="relative rounded-3xl overflow-hidden bg-card border border-border group hover:border-primary/50 transition-colors p-8 flex flex-col"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center border border-border shadow-lg mb-6 group-hover:-rotate-12 transition-transform">
                  <Tv className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">No ads, ever</h3>
                <p className="text-muted-foreground mt-auto">Just you and the videos you want to watch.</p>
              </motion.div>

              {/* Wide Bento Cell */}
              <motion.div
                variants={fadeUp}
                className="md:col-span-2 relative rounded-3xl overflow-hidden bg-linear-to-r from-primary/10 to-card border border-primary/20 group hover:border-primary/50 transition-colors p-10 flex flex-col justify-center"
              >
                <div className="flex justify-between items-center sm:flex-row flex-col gap-8 text-center sm:text-left">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">Tools for creators</h3>
                    <p className="text-lg text-muted-foreground">Everything you need to manage your channel and connect with your audience.</p>
                  </div>
                  <button className="px-6 py-3 bg-background rounded-full border border-border hover:border-primary text-foreground font-semibold flex items-center gap-2 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all">
                    Explore Tools
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

            </motion.div>
          </section>

          {/* Creators Section */}
          <section id="creators" className="py-32 relative">
            <div className="absolute inset-0 bg-primary/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">Top creators</h2>
                <p className="text-lg text-muted-foreground">Find people making great videos on Sidraya.</p>
              </motion.div>

              <motion.div
                variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {mockCreators.map((creator) => (
                  <motion.div
                    key={creator.id}
                    variants={fadeUp}
                    whileHover={{ y: -10 }}
                    className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors relative overflow-hidden group flex flex-col"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative w-24 h-24 mx-auto mb-6 rounded-full p-1 border-2 border-border group-hover:border-primary transition-colors">
                      <Image
                        src={creator.avatar}
                        alt={creator.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div className="text-center grow">
                      <h3 className="font-bold text-foreground text-xl mb-2">{creator.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{creator.bio}</p>
                    </div>

                    <div className="flex justify-between py-6 my-6 border-y border-border/50">
                      <div className="text-center px-4">
                        <p className="font-bold text-foreground text-lg">{creator.videos}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Videos</p>
                      </div>
                      <div className="w-px bg-border/50" />
                      <div className="text-center px-4">
                        <p className="font-bold text-foreground text-lg">{(creator.followers / 1000).toFixed(0)}K</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Followers</p>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-muted text-foreground rounded-2xl font-bold hover:bg-primary hover:text-primary-foreground group-hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all">
                      View Channel
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Floating Final CTA */}
          <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-[3rem] overflow-hidden border border-primary/20 shadow-[0_0_100px_rgba(251,191,36,0.1)]"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-card via-background to-primary/10" />
              <div className="relative py-16 px-6 sm:px-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Clapperboard className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                  Ready to start?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mb-10">
                  Join Sidraya and start sharing your videos today.
                </p>
                <div onClick={() => setIsLoggedIn(true)} className="relative group cursor-pointer inline-block">
                  <div className="absolute -inset-2 bg-linear-to-r from-primary to-[#FDE047] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                  <button className="relative px-10 py-4 bg-background border border-border group-hover:border-primary text-foreground rounded-full font-bold text-lg hover:scale-[1.02] transition-transform flex items-center gap-3">
                    Create Your Account
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Minimalist Premium Footer */}
          <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md pt-20 pb-10">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20 border-b border-border/50 pb-20">
                <div className="col-span-2 md:col-span-2 pr-8">
                  <Link href="/" className="flex items-center gap-3 mb-6">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                      <Image src="/sidraya-logo.jpg" alt="Sidraya Logo" fill className="object-cover" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-foreground">Sidraya</span>
                  </Link>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                    Empowering Muslim creators and audiences with a clean, focused platform built for great videos and community.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-foreground">Platform</h4>
                  <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                    <li><Link href="#" className="hover:text-primary transition-colors">Discover</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="font-bold text-foreground">Community</h4>
                  <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                    <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Creator Program</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Guidelines</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="font-bold text-foreground">Support</h4>
                  <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                    <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-muted-foreground gap-6">
                <p>&copy; 2026 Sidraya Inc. All rights reserved.</p>
                <div className="flex gap-8">
                  <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
                  <Link href="#" className="hover:text-primary transition-colors">YouTube</Link>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
