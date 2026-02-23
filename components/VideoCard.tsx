'use client';

import Image from 'next/image';
import { Video } from '@/lib/mockData';
import { Play, Heart } from 'lucide-react';
import { useState } from 'react';

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="relative aspect-video bg-secondary overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Play className="w-12 h-12 text-primary fill-primary" />
        </div>
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-foreground font-medium">
          {video.duration}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition">
          {video.title}
        </h3>

        <div className="flex items-center gap-3">
          <Image
            src={video.creatorAvatar}
            alt={video.creatorName}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              {video.creatorName}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatViews(video.views)} views
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">{video.uploadedAt}</span>
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition"
          >
            <Heart
              className="w-4 h-4"
              fill={isLiked ? 'currentColor' : 'none'}
              color={isLiked ? '#d4af37' : 'currentColor'}
            />
            <span className="text-xs">{formatViews(video.likes)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
