'use client';

import { Video } from '@/lib/mockData';
import { X, Heart, Share2, Flag } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-foreground p-2 rounded-full transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative aspect-video bg-secondary">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-accent transition">
              <div className="w-0 h-0 border-l-8 border-l-primary-foreground border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{video.title}</h1>
            <p className="text-muted-foreground">{video.description}</p>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-border">
            <div className="flex items-center gap-4">
              <Image
                src={video.creatorAvatar}
                alt={video.creatorName}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-foreground">{video.creatorName}</p>
                <p className="text-sm text-muted-foreground">32.4K followers</p>
              </div>
            </div>
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                isSubscribed
                  ? 'bg-secondary text-foreground'
                  : 'bg-primary text-primary-foreground hover:bg-accent'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          <div className="flex items-center gap-6 py-4 border-b border-border">
            <div className="text-center">
              <p className="text-foreground font-semibold">{formatViews(video.views)}</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
            <div className="text-center">
              <p className="text-foreground font-semibold">{formatViews(video.likes)}</p>
              <p className="text-xs text-muted-foreground">Likes</p>
            </div>
            <div className="text-center">
              <p className="text-foreground font-semibold">{video.uploadedAt}</p>
              <p className="text-xs text-muted-foreground">Posted</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition"
            >
              <Heart
                className="w-5 h-5"
                fill={isLiked ? 'currentColor' : 'none'}
                color={isLiked ? '#d4af37' : 'currentColor'}
              />
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition">
              <Share2 className="w-5 h-5" />
              Share
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition">
              <Flag className="w-5 h-5" />
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
