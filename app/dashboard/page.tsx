'use client';

import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';
import { mockVideos, mockCategories, Video } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, MoreVertical, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('sidraya_is_logged_in');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    let filtered = mockVideos;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((v) => v.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (v) =>
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVideos(filtered);
  }, [selectedCategory, searchQuery]);

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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Browse, follow, and engage with your favorite creators</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent transition">
              <Plus className="w-5 h-5" />
              Upload Video
            </button>
          </div>

          {/* Search and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search videos or creators"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <div className="p-4 rounded-lg bg-card border border-border space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Trending Now</span>
              </div>
              <p className="font-semibold text-foreground">Islamic History</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-min">
              {mockCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground hover:border-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">No videos found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-primary hover:text-accent transition font-semibold"
              >
                Clear search
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
