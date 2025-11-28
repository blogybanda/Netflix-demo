import React from 'react';
import { Show } from '../types';

interface ShowCardProps {
  show: Show;
  index: number;
  onClick: (show: Show) => void;
}

export const ShowCard: React.FC<ShowCardProps> = ({ show, index, onClick }) => {
  // We use the rank for the big number effect
  const rank = show.rank;
  const imageUrl = `https://picsum.photos/seed/${show.title.replace(/\s/g, '')}/400/600`;

  return (
    <div 
        className="relative flex-none w-[160px] md:w-[220px] cursor-pointer group"
        onClick={() => onClick(show)}
    >
      <div className="flex items-center">
          {/* Big Number */}
          <div className="relative -mr-6 z-10 h-[120px] md:h-[160px] flex items-center justify-center">
              <span className="text-[100px] md:text-[160px] font-bold netflix-font leading-none text-black text-stroke drop-shadow-2xl">
                {rank}
              </span>
          </div>

          {/* Poster Card */}
          <div className="relative rounded-md overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:z-20 w-full aspect-[2/3]">
            <img 
              src={imageUrl} 
              alt={show.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
               <h4 className="text-white font-bold text-sm md:text-base">{show.title}</h4>
               <p className="text-green-400 text-xs font-semibold">{show.rating}</p>
               <p className="text-gray-300 text-[10px] mt-1 line-clamp-2">{show.genre}</p>
            </div>
          </div>
      </div>
    </div>
  );
};
