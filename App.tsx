
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FastGallery from './components/FastGallery';
import Overlay from './components/Overlay';
import { PROJECT_DATA, getDirectLink } from './components/Overlay';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'info' | 'portfolio' | 'selected' | 'privacy'>('home');
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    const preloadImages = () => {
      Object.values(PROJECT_DATA).forEach(project => {
        project.images.forEach(imgSource => {
          if (imgSource) {
            const img = new Image();
            img.src = getDirectLink(imgSource);
          }
        });
      });
    };
    
    const timer = setTimeout(preloadImages, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (view: 'home' | 'info' | 'portfolio' | 'selected' | 'privacy') => {
    setActiveView(view);
    setShowCredits(false);
  };

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full flex flex-col bg-white overflow-hidden">
      <Navbar onNavigate={handleNavigate} activeView={activeView} />
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden min-h-0">
        <FastGallery />
        
        {activeView !== 'home' && (
          <Overlay 
            type={activeView} 
            onClose={() => handleNavigate('home')} 
          />
        )}
      </main>

      <footer className="w-full flex flex-col bg-white z-50 shrink-0">
        <div className="w-full border-t border-black"></div>
        <div className="py-3 md:py-5 px-4 md:px-8 flex justify-between items-end">
          <div className="flex flex-col items-start">
            {showCredits && (
              <div className="flex flex-col text-[7px] uppercase tracking-[0.2em] mb-2 space-y-1 opacity-60 animate-in fade-in slide-in-from-bottom-1 duration-300">
                <span>Stefano Guglielmi</span>
                <span>Chiara Meoli</span>
                <span>PAF accademia</span>
                <span>Quarta Area</span>
                <span>Gelateria dei Mille</span>
              </div>
            )}
            <div className="flex gap-4 md:gap-6">
              <button 
                onClick={() => setShowCredits(!showCredits)}
                className="text-[9px] uppercase tracking-[0.3em] font-bold hover:line-through transition-all focus:outline-none"
              >
                {showCredits ? 'Close' : 'Credits'}
              </button>
              <button 
                onClick={() => handleNavigate('privacy')}
                className="text-[9px] uppercase tracking-[0.3em] font-bold hover:line-through transition-all focus:outline-none"
              >
                Privacy
              </button>
            </div>
          </div>

          <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-black select-none pointer-events-none text-right font-medium">
            gabriele cananzi
          </span>
        </div>
        <div className="w-full border-t border-black mb-1 md:mb-3"></div>
      </footer>
    </div>
  );
};

export default App;
