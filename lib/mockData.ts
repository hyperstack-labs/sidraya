export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  creatorName: string;
  creatorAvatar: string;
  category: string;
  uploadedAt: string;
  description: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  videos: number;
  bio: string;
  isFollowing: boolean;
}

const generateColors = () => {
  const colors = [
    '#d4af37',
    '#c99f47',
    '#8b7a5e',
    '#3d3029',
    '#2d2620',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Learning Quranic Arabic Basics',
    thumbnail: '/thumbnails/learning-quranic-arabic.png',
    duration: '12:35',
    views: 15420,
    likes: 1204,
    creatorName: 'Fatima Al-Rashid',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    category: 'Education',
    uploadedAt: '2 days ago',
    description: 'A comprehensive guide to understanding the basics of Quranic Arabic for beginners.',
  },
  {
    id: '2',
    title: 'Sunset Prayer Reflections',
    thumbnail: '/thumbnails/sunset-prayer.png',
    duration: '8:42',
    views: 8920,
    likes: 672,
    creatorName: 'Muhammad Hassan',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    category: 'Spirituality',
    uploadedAt: '1 week ago',
    description: 'A personal reflection on the beauty and peace found in daily prayer.',
  },
  {
    id: '3',
    title: 'Halal Cooking Tutorial: Traditional Biryani',
    thumbnail: '/thumbnails/halal-cooking.png',
    duration: '18:20',
    views: 23840,
    likes: 1856,
    creatorName: 'Aisha Khan',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    category: 'Lifestyle',
    uploadedAt: '3 days ago',
    description: 'Step by step guide to making authentic biryani using halal ingredients.',
  },
  {
    id: '4',
    title: 'Islamic History: The Golden Age',
    thumbnail: '/thumbnails/islamic-history.png',
    duration: '25:10',
    views: 34200,
    likes: 2341,
    creatorName: 'Dr. Omar Al-Fazari',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    category: 'Education',
    uploadedAt: '5 days ago',
    description: 'Exploring the intellectual and cultural achievements of the Islamic Golden Age.',
  },
  {
    id: '5',
    title: 'Fitness Journey: Ramadan Edition',
    thumbnail: '/thumbnails/fitness-journey.png',
    duration: '14:55',
    views: 19760,
    likes: 1512,
    creatorName: 'Zahra Fitness',
    creatorAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2a04?w=400&h=400&fit=crop',
    category: 'Wellness',
    uploadedAt: '1 week ago',
    description: 'Safe and effective workouts designed for fasting periods.',
  },
  {
    id: '6',
    title: 'Arabic Calligraphy for Beginners',
    thumbnail: '/thumbnails/arabic-calligraphy.png',
    duration: '16:30',
    views: 12450,
    likes: 891,
    creatorName: 'Layla Al-Noor',
    creatorAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    category: 'Art',
    uploadedAt: '10 days ago',
    description: 'Learn the fundamentals of beautiful Arabic calligraphy.',
  },
];

export const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Fatima Al-Rashid',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    followers: 42500,
    videos: 48,
    bio: 'Arabic language educator and cultural storyteller',
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Muhammad Hassan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    followers: 28300,
    videos: 32,
    bio: 'Spiritual guide and wellness coach',
    isFollowing: false,
  },
  {
    id: '3',
    name: 'Aisha Khan',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    followers: 56200,
    videos: 64,
    bio: 'Home chef sharing halal cooking recipes',
    isFollowing: false,
  },
  {
    id: '4',
    name: 'Dr. Omar Al-Fazari',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    followers: 71800,
    videos: 52,
    bio: 'Historian and scholar of Islamic civilization',
    isFollowing: false,
  },
];

export const mockCategories = [
  'All',
  'Education',
  'Spirituality',
  'Lifestyle',
  'Wellness',
  'Art',
  'Music',
  'Sports',
];
