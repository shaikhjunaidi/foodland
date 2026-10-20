import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-28 px-6 bg-[#0E0E12] border-t border-[#D6A75D]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs text-[#D6A75D] uppercase tracking-[0.2em] font-semibold mb-3">
            <span>The Food Land Standard</span>
            <span aria-hidden="true">·</span>
            <span>Est. in Koppal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight text-balance mb-6">
            A sanctuary of 100% pure vegetarian culinary excellence.
          </h2>
          <p className="text-base sm:text-lg text-[#BFBAB0] font-light leading-relaxed">
            At Food Land, we view vegetarian cooking not as a restriction, but as an expansive, refined art form. Every dish on our curated menu is prepared with absolute purity, reverence for traditional techniques, and the generous warmth of Karnataka hospitality.
          </p>
        </div>

        {/* 3 Core Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-lg bg-[#14141A] border border-[#D6A75D]/15 hover:border-[#D6A75D]/35 transition-all">
            <div className="w-12 h-12 rounded-md bg-[#D6A75D]/10 border border-[#D6A75D]/25 flex items-center justify-center text-[#D6A75D] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#FAF8F5] mb-3">
              01. 100% Vegetarian & No Eggs
            </h3>
            <p className="text-sm text-[#A6A296] leading-relaxed mb-4">
              Food Land is strictly 100% vegetarian. We maintain an uncompromising policy with zero meat, poultry, seafood, or eggs on the premises.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8E8B82] pt-4 border-t border-[#25252F]">
              <span>100% Vegetarian</span>
              <span aria-hidden="true">·</span>
              <span>Strictly No Eggs</span>
              <span aria-hidden="true">·</span>
              <span>Pure Cooking</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-lg bg-[#14141A] border border-[#D6A75D]/15 hover:border-[#D6A75D]/35 transition-all">
            <div className="w-12 h-12 rounded-md bg-[#D6A75D]/10 border border-[#D6A75D]/25 flex items-center justify-center text-[#D6A75D] mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#FAF8F5] mb-3">
              02. Curated Menu Delicacies
            </h3>
            <p className="text-sm text-[#A6A296] leading-relaxed mb-4">
              From freshly prepared Set Dosa and Vegetable Fried Rice to Regular Chai (₹15), Special Chai (₹30), and sweet Gulab Jamun, our menu focuses on wholesome vegetarian favorites.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8E8B82] pt-4 border-t border-[#25252F]">
              <span>Regular Chai ₹15</span>
              <span aria-hidden="true">·</span>
              <span>Special Chai ₹30</span>
              <span aria-hidden="true">·</span>
              <span>Fresh Batches</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-lg bg-[#14141A] border border-[#D6A75D]/15 hover:border-[#D6A75D]/35 transition-all">
            <div className="w-12 h-12 rounded-md bg-[#D6A75D]/10 border border-[#D6A75D]/25 flex items-center justify-center text-[#D6A75D] mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-[#FAF8F5] mb-3">
              03. Welcoming Haven in Koppal
            </h3>
            <p className="text-sm text-[#A6A296] leading-relaxed mb-4">
              Located in Koppal, Karnataka, Food Land offers families, residents, and travelers a comfortable, respectful dining atmosphere with dedicated vegetarian service.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#8E8B82] pt-4 border-t border-[#25252F]">
              <span>Koppal, Karnataka</span>
              <span aria-hidden="true">·</span>
              <span>Family Friendly</span>
              <span aria-hidden="true">·</span>
              <span>Dine-in Comfort</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
