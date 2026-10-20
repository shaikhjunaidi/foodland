import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onBookTable: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBookTable }) => {
  return (
    <footer className="bg-[#08080A] border-t border-[#D6A75D]/15 text-[#A6A296] text-xs py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1C1C24]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[#FAF8F5] tracking-tight">
              FOOD LAND
            </h3>
            <p className="text-xs text-[#8E8B82] leading-relaxed max-w-sm">
              A premier 100% pure vegetarian culinary destination in Koppal, Karnataka. Dedicated to traditional gastronomy, pristine kitchen ethics, and luxury hospitality.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D6A75D] pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Strictly 100% Pure Veg · Zero Eggs on Premises</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#FAF8F5] font-semibold">
              Exploration
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#D6A75D] transition-colors cursor-pointer"
                >
                  3D Cinematic Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('philosophy')}
                  className="hover:text-[#D6A75D] transition-colors cursor-pointer"
                >
                  Pure Veg Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#D6A75D] transition-colors cursor-pointer"
                >
                  Approved Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mealtimes')}
                  className="hover:text-[#D6A75D] transition-colors cursor-pointer"
                >
                  Meal Schedules
                </button>
              </li>
            </ul>
          </div>

          {/* Story & Visuals */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#FAF8F5] font-semibold">
              Atmosphere
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#D6A75D] transition-colors cursor-pointer"
                >
                  Sanctuary Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D6A75D] transition-colors cursor-pointer"
                >
                  About Food Land
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#D6A75D] transition-colors cursor-pointer"
                >
                  Location & Map
                </button>
              </li>
              <li>
                <button
                  onClick={onBookTable}
                  className="text-[#D6A75D] hover:underline transition-colors cursor-pointer"
                >
                  Request Table Reservation
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hospitality */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#FAF8F5] font-semibold">
              Koppal Haven
            </h4>
            <p className="text-xs text-[#8E8B82] leading-relaxed">
              Koppal, Karnataka, India<br />
              Postal Code: 583231<br />
              Cuisine: 100% Pure Vegetarian
            </p>
            <div className="pt-2 text-[11px] text-[#7E7B73]">
              *Prepared for future MongoDB Atlas & WhatsApp integration.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E7B73]">
          <div>
            © {new Date().getFullYear()} Food Land. All rights reserved. 100% Pure Vegetarian Restaurant.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Koppal, Karnataka</span>
            <span>·</span>
            <span>Zero Meat · Zero Eggs</span>
            <span>·</span>
            <span className="text-[#D6A75D]">Pure Veg Sanctity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
