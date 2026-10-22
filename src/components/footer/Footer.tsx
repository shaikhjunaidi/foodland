import React from 'react';
import { motion } from 'motion/react';
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
            <p className="text-xs text-[#8E8B82] leading-relaxed max-w-sm font-light">
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
              {[
                { id: 'hero', label: 'Cinematic Experience' },
                { id: 'philosophy', label: 'Pure Veg Philosophy' },
                { id: 'menu', label: 'Approved Menu' },
                { id: 'mealtimes', label: 'Meal Schedules' },
              ].map((item) => (
                <li key={item.id}>
                  <motion.button
                    whileHover={{ x: 3 }}
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-[#D6A75D] transition-colors cursor-pointer text-left font-light"
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Story & Visuals */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#FAF8F5] font-semibold">
              Atmosphere
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'gallery', label: 'Sanctuary Gallery' },
                { id: 'about', label: 'About Food Land' },
                { id: 'contact', label: 'Location & Map' },
              ].map((item) => (
                <li key={item.id}>
                  <motion.button
                    whileHover={{ x: 3 }}
                    onClick={() => onNavigate(item.id)}
                    className="hover:text-[#D6A75D] transition-colors cursor-pointer text-left font-light"
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
              <li>
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={onBookTable}
                  className="text-[#D6A75D] hover:underline transition-colors cursor-pointer font-medium"
                >
                  Request Table Reservation →
                </motion.button>
              </li>
            </ul>
          </div>

          {/* Location & Hospitality */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#FAF8F5] font-semibold">
              Koppal Haven
            </h4>
            <p className="text-xs text-[#8E8B82] leading-relaxed font-light">
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
          <div className="flex items-center gap-4 text-xs font-light">
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
