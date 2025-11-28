import React from 'react';
import { Play, Info } from 'lucide-react';
import { Show } from '../types';

interface HeroProps {
  topShow: Show | null;
}

export const Hero: React.FC<HeroProps> = ({ topShow }) => {
  if (!topShow) return (
      <div className="h-[50vh] md:h-[80vh] w-full bg-[#141414] animate-pulse flex items-center justify-center text-gray-700">
          Loading Trends...
      </div>
  );

  // Using a consistent seed for the image so it doesn't flicker on re-renders, based on title
  const bgImage = `https://picsum.photos/seed/${topShow.title.replace(/\s/g, '')}hero/1920/1080`;

  return (
    <div className="relative h-[60vh] md:h-[85vh] w-full text-white">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={bgImage} 
          alt={topShow.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-12 w-full md:w-2/3 lg:w-1/2 space-y-6 pt-20">
        <div className="flex items-center space-x-2">
            <span className="bg-red-600 text-white text-[10px] font-bold px-1 py-0.5 rounded-sm">TOP 10</span>
            <span className="uppercase text-sm font-bold tracking-wider text-gray-200">#1 in TV Shows Today</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black netflix-font leading-none drop-shadow-lg">
          {topShow.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 drop-shadow-md line-clamp-3">
          {topShow.synopsis}
        </p>
        
        <div className="flex items-center space-x-4 pt-4">
          <button className="flex items-center px-6 py-2.5 bg-white text-black font-bold rounded hover:bg-opacity-80 transition md:text-xl">
            <Play className="w-6 h-6 mr-2 fill-current" /> Play
          </button>
          <button className="flex items-center px-6 py-2.5 bg-gray-500/70 text-white font-bold rounded hover:bg-gray-500/50 transition md:text-xl">
            <Info className="w-6 h-6 mr-2" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};
