import React from 'react';
import { ArrowDown, UtensilsCrossed, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onBookTable }) => {
  return (
    <section
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

        {/* Static Hero Image Container - Permanently visible before, during, and after hover */}
        <div className="w-full max-w-6xl mx-auto mb-12">
          <div className="relative w-full aspect-video min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] max-w-6xl mx-auto rounded-xl overflow-hidden bg-[#070709] border border-[#D6A75D]/25 shadow-[0_12px_48px_rgba(0,0,0,0.85)] select-none">
            <img
              src={`${import.meta.env.BASE_URL}images/dosa_hero_poster.jpg`}
              alt="Food Land Signature South Indian Set Dosa Craftsmanship"
              loading="eager"
              style={{
                opacity: 1,
                visibility: 'visible',
                display: 'block',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              className="w-full h-full object-cover"
            />

            {/* Cinematic subtle edge vignette and warm gold lighting ambiance */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/25" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(10,10,12,0.7)]" />

            {/* Clean status badge emphasizing pure vegetarian culinary craftsmanship */}
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C0C12]/80 border border-[#D6A75D]/25 backdrop-blur-md text-[11px] text-[#E5D2B8] tracking-wider uppercase font-medium shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6A75D]" />
                <span>Set Dosa Craftsmanship</span>
                <span className="text-[#8E8B82]">·</span>
                <span>100% Pure Vegetarian</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Editorial Content & CTAs */}
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
