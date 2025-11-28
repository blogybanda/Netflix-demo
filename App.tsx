import React, { useEffect, useState } from 'react';
import { fetchTrendingSeries } from './services/geminiService';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrendingList } from './components/TrendingList';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { Show, GroundingSource } from './types';

function App() {
  const [shows, setShows] = useState<Show[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const { shows: trendingShows, sources: trendingSources } = await fetchTrendingSeries();
        setShows(trendingShows);
        setSources(trendingSources);
      } catch (err) {
        console.error(err);
        setError("Unable to load trending data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-t-4 border-red-600 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-light animate-pulse">Consulting Gemini for Netflix Trends...</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white p-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Whoops!</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  const topShow = shows.length > 0 ? shows[0] : null;

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      <Header />
      
      <main>
        <Hero topShow={topShow} />
        
        {/* Pass remaining shows including #1 to the list, as Netflix often shows #1 in list too */}
        <TrendingList shows={shows} onShowClick={setSelectedShow} />
        
        {/* Extra rows for aesthetics (static data simulation for fullness) */}
        <div className="px-4 md:px-12 pb-12">
            <h3 className="text-xl text-gray-400 font-semibold mb-2 mt-8">Trending Now</h3>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide opacity-50 pointer-events-none">
                 {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-[200px] h-[110px] bg-gray-800 rounded flex-none"></div>
                 ))}
            </div>
        </div>
      </main>

      <Footer sources={sources} />

      <Modal show={selectedShow} onClose={() => setSelectedShow(null)} />
    </div>
  );
}

export default App;
