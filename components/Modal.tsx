import React from 'react';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';
import { Show } from '../types';

interface ModalProps {
  show: Show | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  const bgImage = `https://picsum.photos/seed/${show.title.replace(/\s/g, '')}/800/400`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#181818] w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-in-out]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-[#181818] rounded-full p-2 hover:bg-[#2a2a2a]"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Hero Area */}
        <div className="relative h-[300px] md:h-[450px]">
          <img 
            src={bgImage} 
            alt={show.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent"></div>
          
          <div className="absolute bottom-12 left-8 md:left-12 max-w-xl">
             <h2 className="text-4xl md:text-5xl font-black netflix-font text-white mb-4 drop-shadow-lg">
                {show.title}
             </h2>
             <div className="flex items-center space-x-4">
                <button className="flex items-center px-6 md:px-8 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition">
                  <Play className="w-5 h-5 mr-2 fill-current" /> Play
                </button>
                <button className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full hover:border-white transition">
                  <Plus className="w-5 h-5 text-white" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full hover:border-white transition">
                  <ThumbsUp className="w-5 h-5 text-white" />
                </button>
             </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 text-white">
            <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4 text-sm font-semibold">
                   <span className="text-green-400">{show.rating} Match</span>
                   <span className="text-gray-400">2024</span>
                   <span className="border border-gray-500 px-1 text-[10px]">HD</span>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                        TOP 10
                    </span>
                    <span className="font-bold text-lg">#{show.rank} in TV Shows Today</span>
                </div>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {show.synopsis}
                    <br/><br/>
                    Join the millions watching this global phenomenon. From the genre of {show.genre.toLowerCase()}, this series has captivated audiences with its compelling storytelling and stunning visuals.
                </p>
            </div>
            <div className="w-full md:w-1/3 text-sm text-gray-400 space-y-3">
                <p><span className="text-gray-500">Genre:</span> <span className="text-white hover:underline cursor-pointer">{show.genre}</span></p>
                <p><span className="text-gray-500">Weeks in Top 10:</span> <span className="text-white">{show.weeksInTop10 || 1}</span></p>
                <p><span className="text-gray-500">Maturity Rating:</span> <span className="text-white border border-gray-500 px-1">TV-MA</span></p>
            </div>
        </div>
      </div>
    </div>
  );
};
