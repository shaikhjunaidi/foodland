import React from 'react';
import { MapPin, Shield } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 px-6 bg-[#0E0E14] border-t border-[#D6A75D]/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs text-[#D6A75D] uppercase tracking-[0.2em] font-semibold mb-3">
              <span>Our Roots & Story</span>
              <span aria-hidden="true">·</span>
              <span>Koppal, Karnataka</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight text-balance mb-6">
              Born from a passion for uncompromising vegetarian purity.
            </h2>
            <div className="space-y-4 text-base text-[#BFBAB0] font-light leading-relaxed">
              <p>
                In the historic land of Koppal, Karnataka, <strong>Food Land</strong> was envisioned as a sanctuary where timeless regional recipes meet refined modern hospitality. For us, pure vegetarianism is not an afterthought or an alternative menu category — it is our sole, sacred devotion.
              </p>
              <p>
                We believe that the simplest wholesome foods — naturally aged rice, stone-ground lentils, cold-pressed oils, freshly drawn milk, and aromatic whole spices — contain infinite culinary depth when honored with time and craftsmanship.
              </p>
              <p>
                Whether you arrive for a morning breakfast of freshly made set dosas and hot chai, or an evening meal of vegetable fried rice and sweet gulab jamun, every plate that leaves our kitchen is guaranteed 100% vegetarian, eggless, and made with care.
              </p>
            </div>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#22222D]">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#D6A75D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#FAF8F5]">Strict Pure-Veg Guarantee</h4>
                  <p className="text-xs text-[#8E8B82] mt-0.5">Absolute zero meat, poultry, seafood, or eggs on premises.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D6A75D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#FAF8F5]">Local Koppal Heart</h4>
                  <p className="text-xs text-[#8E8B82] mt-0.5">Proudly serving families, travelers, and the Koppal community.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural & Brand Identity Showcase */}
          <div className="lg:col-span-5">
            <div className="p-8 md:p-10 rounded-xl bg-[#14141C] border border-[#D6A75D]/25 relative shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6A75D]/10 rounded-bl-full pointer-events-none blur-xl" />

              <div className="text-center pb-8 border-b border-[#252532]">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D6A75D] font-semibold block mb-2">
                  The Food Land Seal
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#FAF8F5] tracking-tight">
                  FOOD LAND
                </h3>
                <p className="text-xs text-[#8E8B82] mt-1">
                  Koppal, Karnataka · India
                </p>
              </div>

              {/* Verified Tenets List */}
              <div className="py-6 space-y-4 text-xs text-[#C6C2B6]">
                <div className="flex items-center justify-between">
                  <span className="text-[#8E8B82]">Cuisine Type</span>
                  <span className="font-medium text-[#FAF8F5]">100% Pure Vegetarian</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8E8B82]">Eggless Discipline</span>
                  <span className="font-medium text-[#D6A75D]">Strictly No Eggs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8E8B82]">Approved Offerings</span>
                  <span className="font-medium text-[#FAF8F5]">Set Dosa, Fried Rice, Chai & Sweets</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8E8B82]">Chai Pricing</span>
                  <span className="font-medium text-[#D6A75D]">Regular ₹15 · Special ₹30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8E8B82]">Atmosphere</span>
                  <span className="font-medium text-[#FAF8F5]">Clean Dark & Gold Aesthetic</span>
                </div>
              </div>

              {/* Owner Note Placeholder */}
              <div className="p-4 rounded-lg bg-[#0C0C10] border border-[#22222C] text-[11px] text-[#8E8B82] leading-relaxed">
                <span className="text-[#D6A75D] font-semibold block mb-0.5">Founders Note:</span>
                "We built Food Land so every guest can savor genuine vegetarian craft without questioning kitchen practices. Come sit at our table."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
