import React from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const VideoCard: React.FC<Video> = ({ id, title, thumbnail }) => {
  return (
    <Link href={`/video/${id}`}>
      <div className="w-full md:w-1/2 xl:w-1/3 p-4">
        <OptimizedImage src={thumbnail} alt={title} width={400} height={256} className="w-full h-64 object-cover" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default VideoCard;
