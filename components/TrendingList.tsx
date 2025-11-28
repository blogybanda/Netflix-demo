import React from 'react';
import { Show } from '../types';
import { ShowCard } from './ShowCard';

interface TrendingListProps {
  shows: Show[];
  onShowClick: (show: Show) => void;
}

export const TrendingList: React.FC<TrendingListProps> = ({ shows, onShowClick }) => {
  return (
    <div className="px-4 md:px-12 py-8 relative z-20 -mt-24 md:-mt-32">
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Top 10 TV Shows Today</h2>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 md:space-x-2 py-8 pl-4">
        {shows.map((show, idx) => (
          <ShowCard 
            key={show.title + idx} 
            show={show} 
            index={idx}
            onClick={onShowClick}
          />
        ))}
      </div>
    </div>
  );
};
