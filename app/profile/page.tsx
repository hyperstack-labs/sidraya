'use client';

import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';
import { mockVideos, Video } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Edit2, Share2, Bell, Settings } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('sidraya_is_logged_in');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const name = localStorage.getItem('sidraya_user_name') || 'Content Creator';
    const email = localStorage.getItem('sidraya_user_email') || 'creator@sidraya.com';
    setUserName(name);
    setUserEmail(email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('sidraya_is_logged_in');
    localStorage.removeItem('sidraya_user_email');
    localStorage.removeItem('sidraya_user_name');
    router.push('/');
  };

  if (selectedVideo) {
    return <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />;
  }

  return (
    <>
      <Header isLoggedIn={true} onLogout={handleLogout} />
      <div className="min-h-screen bg-background">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          {/* Profile Header */}
          <div className="mb-12">
            <div className="h-32 bg-linear-to-r from-primary/20 to-accent/20 rounded-lg mb-6" />

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                alt={userName}
                width={120}
                height={120}
                className="rounded-full border-4 border-card -mt-16 sm:-mt-16"
              />

              <div className="flex-1">
                <div className="mb-4">
                  <h1 className="text-4xl font-bold text-foreground mb-1">{userName}</h1>
                  <p className="text-muted-foreground">{userEmail}</p>
                </div>

                <div className="flex flex-wrap gap-6 py-4 border-y border-border mb-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">6</p>
                    <p className="text-sm text-muted-foreground">Videos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12.4K</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">842</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">32.5K</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                </div>

                <p className="text-foreground mb-6 max-w-2xl">
                  Welcome to my Sidraya channel. I create content about faith, culture, and personal growth. Subscribe to join our growing community of learners and seekers.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition">
                    <Share2 className="w-4 h-4" />
                    Share Channel
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-8">
            <div className="flex gap-8">
              <button className="py-4 border-b-2 border-primary text-foreground font-semibold transition">
                My Videos
              </button>
              <button className="py-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition">
                Playlists
              </button>
              <button className="py-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition">
                Liked Videos
              </button>
            </div>
          </div>

          {/* Videos Grid */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">My Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVideos.slice(0, 3).map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <div className="mt-16 p-8 rounded-lg bg-card border border-border text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Ready to share more?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Upload your next video and reach thousands of viewers in our community.
            </p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition">
              Upload New Video
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
