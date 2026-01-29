import React from 'react';

/**
 * ---------------------------------------------------------
 * CONFIGURAZIONE LOGO
 * ---------------------------------------------------------
 * Incolla qui sotto il link alla tua immagine logo (es. .png o .svg).
 * Se lasci vuoto '', apparirà il tuo nome come testo.
 */
const LOGO_URL = 'https://lh3.googleusercontent.com/d/1QiLcvXbVM7s3IDyfhjBGfUBTtFT5neJy'; 

interface NavbarProps {
  onNavigate: (view: 'home' | 'info' | 'portfolio' | 'selected') => void;
  activeView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeView }) => {
  return (
    <div className="w-full z-50 pt-2 bg-white">
      {/* Linea superiore */}
      <div className="w-full border-t border-black"></div>
      
      <nav className="w-full py-4 px-4 md:px-8 flex justify-between items-center bg-white">
        {/* Sinistra: Logo */}
        <div 
          className="cursor-pointer flex items-center shrink-0"
          onClick={() => onNavigate('home')}
        >
          {LOGO_URL ? (
            <img src={LOGO_URL} alt="Logo" className="h-7 md:h-9 w-auto object-contain" />
          ) : (
            <span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase">G. Cananzi</span>
          )}
        </div>

        {/* Menu: Gap ridotto su mobile per evitare l'andata a capo */}
        <div className="flex gap-4 md:gap-10 text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
          <button 
            onClick={() => onNavigate('selected')}
            className={`hover:opacity-50 transition-opacity font-normal ${activeView === 'selected' ? 'line-through' : ''}`}
          >
            Selected Works
          </button>
          
          <button 
            onClick={() => onNavigate('portfolio')}
            className={`hover:opacity-50 transition-opacity font-normal ${activeView === 'portfolio' ? 'line-through' : ''}`}
          >
            Portfolio
          </button>
          
          <button 
            onClick={() => onNavigate('info')}
            className={`hover:opacity-50 transition-opacity font-normal ${activeView === 'info' ? 'line-through' : ''}`}
          >
            Info
          </button>
        </div>
      </nav>
      {/* Linea sotto la navbar */}
      <div className="w-full border-t border-black"></div>
    </div>
  );
};

export default Navbar;