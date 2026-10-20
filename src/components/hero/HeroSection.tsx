import React, { useEffect, useRef, useState } from 'react';
import { HeroVideoPlayer } from './HeroVideoPlayer';
import { CulinaryExplodeScene } from './CulinaryExplodeScene';
import { ArrowDown, UtensilsCrossed, Calendar, Film, Box } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onBookTable }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  // Default to cinematic video as requested by user
  const [heroMode, setHeroMode] = useState<'video' | '3d'>('video');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
      
      if (totalScrollableDistance <= 0) return;
      
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollableDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full bg-[#0A0A0C] pt-28 pb-20 px-4 sm:px-6 border-b border-[#D6A75D]/15 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#D6A75D]/[0.05] blur-[150px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D6A75D]/[0.03] blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Top Floating Kicker */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141B] border border-[#D6A75D]/25 text-xs tracking-[0.2em] text-[#D6A75D] uppercase font-semibold">
            <span>Koppal, Karnataka</span>
            <span className="text-[#8E8B82]">·</span>
            <span>100% Pure Vegetarian</span>
            <span className="text-[#8E8B82]">·</span>
            <span>No Eggs</span>
          </div>
        </div>

        {/* View Mode Toggle: Cinematic Video vs 3D Exploded Assemblage */}
        <div className="flex items-center gap-2 mb-6 p-1 bg-[#14141C] border border-[#D6A75D]/25 rounded-lg shadow-xl">
          <button
            onClick={() => setHeroMode('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              heroMode === 'video'
                ? 'bg-[#D6A75D] text-[#0A0A0C] shadow-md'
                : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic Video</span>
          </button>
          <button
            onClick={() => setHeroMode('3d')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              heroMode === '3d'
                ? 'bg-[#D6A75D] text-[#0A0A0C] shadow-md'
                : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Explode & Reassemble</span>
          </button>
        </div>

        {/* Hero Visual Container: Keeping Entire Video / 3D Scene Visible Without Unwanted Cropping */}
        <div className="w-full max-w-6xl mx-auto mb-12">
          {heroMode === 'video' ? (
            <HeroVideoPlayer
              videoSrc="/videos/foodland_dosa_cinematic.mp4"
              posterSrc="/images/dosa_hero_poster.jpg"
            />
          ) : (
            <div className="w-full h-[600px] lg:h-[680px] rounded-xl bg-[#070709] border border-[#D6A75D]/25 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.8)] relative">
              <CulinaryExplodeScene externalScrollProgress={scrollProgress} />
            </div>
          )}
        </div>

        {/* Hero Editorial Content & CTAs (Positioned Below the Video per prompt guidelines) */}
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F5] tracking-tight leading-[1.1] mb-4 text-balance">
            Pure Vegetarian Elegance, Crafted for Koppal
          </h1>
          <p className="text-base sm:text-lg text-[#BFBAB0] max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            Enjoy 100% pure vegetarian cuisine in Koppal. From freshly brewed Regular Chai (₹15) and Special Chai (₹30) to soft set dosas, fried rice, and traditional sweets — prepared with complete vegetarian discipline and strictly no eggs.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreMenu}
              className="px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded-md transition-all duration-200 shadow-[0_4px_24px_rgba(214,167,93,0.3)] flex items-center gap-2 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Explore Menu</span>
            </button>
            <button
              onClick={onBookTable}
              className="px-8 py-3.5 text-sm font-semibold tracking-wide text-[#FAF8F5] bg-[#14141B] hover:bg-[#1E1E28] border border-[#D6A75D]/40 hover:border-[#D6A75D]/80 rounded-md transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4 text-[#D6A75D]" />
              <span>Book a Table</span>
            </button>
          </div>

          {/* Quick Guidance Prompt */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8E8B82]">
            <ArrowDown className="w-3.5 h-3.5 text-[#D6A75D] animate-bounce" />
            <span>Scroll down to explore our 100% vegetarian menu & story</span>
          </div>
        </div>
      </div>
    </section>
  );
};
