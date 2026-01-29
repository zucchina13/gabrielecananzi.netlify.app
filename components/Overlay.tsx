
import React, { useState } from 'react';

export interface Project {
  id: string;
  title: string;
  location: string;
  images: string[];
}

/**
 * Funzione per gestire i link delle immagini.
 */
export const getDirectLink = (source: string) => {
  if (!source) return '';
  if (source.startsWith('http') || source.startsWith('data:')) return source;
  return `https://lh3.googleusercontent.com/d/${source}`;
};

const PORTFOLIO_PDF_URL = 'https://drive.google.com/uc?export=download&id=1KY7uzWGzy4Di2Z44I-yJUWum7-213oR_';

export const PROJECT_DATA: Record<string, Project> = {
  'quarta': {
    id: 'quarta',
    title: 'Quarta Area',
    location: 'Altamura',
    images: [
      'https://i.postimg.cc/Cxmx8BMp/Condiviso-da-Lightroom-Mobile.jpg',
      'https://i.postimg.cc/xjvYHJgF/DSC8390.jpg',
      'https://i.postimg.cc/sXSzTvzd/DSC8382.jpg',
      'https://i.postimg.cc/90YhjKz1/Condiviso-da-Lightroom-Mobile-(1).jpg',
       'https://i.postimg.cc/28YkXFVS/DSC8404.jpg'
    ]
  },
  'portrait': {
    id: 'portrait',
    title: 'Portrait',
    location: 'Altamura',
    images: [
      '1dTn1Cw54m5lHJ_LFDDECZyB6Q0c6vQaK',
      '1dHCdov_i5tbxqJ7JsUBbyh_n6wqrBWkv',
      '1EovH_1BDzM6p-GyTbH4NgeZtOtYEZgOU',
      '10Mfqi_ucBcRU01XLFMVpXxEpvI4NYR-E'
    ]
  },
  'gelateria': {
    id: 'gelateria',
    title: 'Gelateria dei Mille',
    location: 'Altamura',
    images: [
      'https://i.postimg.cc/k4ws3yqt/DSC6916.jpg',
      'https://i.postimg.cc/C5Q4dLZj/DSC6697.jpg',
      'https://i.postimg.cc/SNHrhRby/DSC6764.jpg',
      'https://i.postimg.cc/j5q6XJPj/DSC7039.jpg'
    ]
  }
};

const CURSOR_LEFT = `url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 12 L8 21 L19 30 M9 21 L34 19" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>') 20 20, auto`;
const CURSOR_RIGHT = `url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12 L32 21 L21 30 M31 21 L6 19" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>') 20 20, auto`;

interface OverlayProps {
  type: 'info' | 'portfolio' | 'selected' | 'privacy';
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ type, onClose }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [cursorSide, setCursorSide] = useState<'left' | 'right'>('right');

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;
    setCursorSide(clientX < innerWidth / 2 ? 'left' : 'right');
  };

  const navigateGallery = (e: React.MouseEvent) => {
    if (!selectedProjectId) return;
    const project = PROJECT_DATA[selectedProjectId];
    const validImages = project.images.filter(img => img !== '');
    if (validImages.length <= 1) return;
    
    if (cursorSide === 'right') {
      setCurrentImageIdx((prev) => (prev + 1) % validImages.length);
    } else {
      setCurrentImageIdx((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  const closeProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProjectId(null);
    setCurrentImageIdx(0);
  };

  const getTitle = () => {
    switch(type) {
      case 'info': return 'Info';
      case 'portfolio': return 'Portfolio';
      case 'selected': return 'Selected Works';
      case 'privacy': return 'Privacy Policy';
      default: return '';
    }
  };

  const getContent = () => {
    if (type === 'selected' && selectedProjectId) {
      const project = PROJECT_DATA[selectedProjectId];
      const validImages = project.images.filter(img => img !== '');
      const hasImages = validImages.length > 0;
      
      return (
        <div 
          className="w-full h-full relative bg-white overflow-hidden"
          onMouseMove={handleMouseMove}
          onClick={navigateGallery}
          style={{ cursor: hasImages && validImages.length > 1 ? (cursorSide === 'left' ? CURSOR_LEFT : CURSOR_RIGHT) : 'default' }}
        >
          <div className="absolute top-4 md:top-6 left-4 md:left-8 right-4 md:right-8 flex justify-between items-baseline z-50 pointer-events-none">
            <div className="pointer-events-auto">
              <h2 className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">{project.title}</h2>
              <p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-50">{project.location}</p>
            </div>
            <button 
              onClick={closeProject}
              className="pointer-events-auto text-[8px] md:text-[9px] uppercase tracking-[0.2em] hover:line-through cursor-pointer bg-white/50 px-1"
            >
              Back
            </button>
          </div>

          <div className="w-full h-full flex items-center justify-center p-2 md:p-4 pointer-events-none relative">
            {hasImages ? (
              <img 
                key={`${project.id}-${currentImageIdx}`}
                src={getDirectLink(validImages[currentImageIdx])} 
                alt={project.title}
                className="w-full h-full object-contain select-none animate-in fade-in duration-500"
              />
            ) : (
              <div className="text-[9px] uppercase tracking-[0.4em] opacity-20">Gallery Empty</div>
            )}
          </div>
        </div>
      );
    }

    switch(type) {
      case 'info':
        return (
          <div className="w-full h-full flex flex-col px-6 md:px-8">
            <div className="flex-grow flex flex-col justify-center items-start">
              <div className="space-y-4">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em]">Based in Altamura</p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  Instagram: <a href="https://www.instagram.com/weird._.photographer?igsh=ZWw1YzUwZjB4NDNy" target="_blank" rel="noopener noreferrer" className="hover:line-through">weird._.photographer</a>
                </p>
              </div>
            </div>
          </div>
        );
      case 'portfolio':
        return (
          <div className="w-full h-full flex flex-col px-6 md:px-8">
            <div className="flex-grow flex flex-col justify-center items-center">
              <a href={PORTFOLIO_PDF_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs uppercase tracking-[0.3em] hover:line-through border-b border-black pb-1">
                Download Portfolio
              </a>
            </div>
          </div>
        );
      case 'selected':
        return (
          <div className="w-full h-full flex flex-col px-6 md:px-8 overflow-y-auto pb-24">
            <div className="flex-grow flex flex-col justify-center items-center">
              <div className="max-w-2xl w-full">
                <div className="space-y-4 md:space-y-6 py-4 md:py-10 mt-8 md:mt-12">
                  {Object.values(PROJECT_DATA).map((work) => (
                    <div 
                      key={work.id} 
                      className="group flex justify-between items-center border-b border-black/10 py-3 cursor-pointer hover:border-black transition-all"
                      onClick={() => setSelectedProjectId(work.id)}
                    >
                      <span className="text-xs md:text-base uppercase tracking-widest group-hover:pl-2 transition-all duration-300">
                        {work.title}
                      </span>
                      <span className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase opacity-30 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4">
                        {work.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="w-full h-full flex flex-col px-6 md:px-8 overflow-y-auto pb-24">
            <div className="max-w-2xl flex flex-col gap-6 md:gap-8 mt-8 md:mt-12">
              <section>
                <h3 className="text-[9px] uppercase tracking-widest font-bold mb-2">Titolare del Trattamento</h3>
                <p className="text-[10px] md:text-[11px] uppercase tracking-wider opacity-70 leading-relaxed">
                  Giuseppe Cananzi — Altamura (BA), Italia.
                </p>
              </section>
              <section>
                <h3 className="text-[9px] uppercase tracking-widest font-bold mb-2">Natura del Sito e Dati Raccolti</h3>
                <p className="text-[10px] md:text-[11px] uppercase tracking-wider opacity-70 leading-relaxed">
                  Questo sito web ha scopo puramente espositivo e di portfolio professionale. Non raccoglie dati personali identificativi tramite moduli di contatto, iscrizioni a newsletter o sistemi di registrazione utente.
                </p>
              </section>
              <section>
                <h3 className="text-[9px] uppercase tracking-widest font-bold mb-2">Cookie e Tracciamento</h3>
                <p className="text-[10px] md:text-[11px] uppercase tracking-wider opacity-70 leading-relaxed">
                  Non vengono utilizzati cookie di profilazione o di terze parti per finalità di marketing o tracciamento del comportamento dell'utente. Il sito è statico e rispetta la privacy dei visitatori secondo le direttive del GDPR (Regolamento UE 2016/679).
                </p>
              </section>
              <section>
                <h3 className="text-[9px] uppercase tracking-widest font-bold mb-2">Diritti dell'Interessato</h3>
                <p className="text-[10px] md:text-[11px] uppercase tracking-wider opacity-70 leading-relaxed">
                  Gli utenti possono esercitare i propri diritti ai sensi del GDPR (accesso, rettifica, cancellazione) contattando il Titolare direttamente tramite i canali social indicati nella sezione Info.
                </p>
              </section>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  /**
   * Navbar Bottom Line Positions:
   * Mobile: pt-2 (8px) + border-t (1px) + py-4 (16+16=32px) + logo (28px) = 69px
   * Desktop: pt-2 (8px) + border-t (1px) + py-4 (16+16=32px) + logo (36px) = 77px
   * Nota: usiamo 68px e 76px (1px in meno) per far sovrapporre il bordo superiore del bottone alla linea della navbar.
   */
  const navbarHeightMobile = '68px';
  const navbarHeightDesktop = '76px';

  return (
    <div className="absolute inset-0 bg-white z-[60] flex flex-col">
      {!selectedProjectId && (
        <>
          {/* Titolo in alto a sinistra, SOTTO la linea */}
          <div 
            style={{ top: '69px' }}
            className="fixed left-4 md:left-8 z-[70] pt-2 md:top-[77px]"
          >
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold bg-white pr-2">
              {getTitle()}
            </h2>
          </div>

          {/* Tasto Close in alto a destra, tocca perfettamente la linea (offset di 1px verso l'alto) */}
          <button 
            onClick={onClose}
            style={{ top: navbarHeightMobile }}
            className="fixed right-4 md:right-8 text-[9px] uppercase tracking-widest border-x border-b border-black px-4 py-2 hover:bg-black hover:text-white transition-all z-[70] bg-white md:top-[76px] flex items-center justify-center leading-none"
          >
            Close
          </button>
        </>
      )}
      {getContent()}
    </div>
  );
};

export default Overlay;
