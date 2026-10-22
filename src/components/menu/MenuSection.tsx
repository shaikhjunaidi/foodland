import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { APPROVED_MENU_ITEMS } from '../../data/menuData';
import { MenuItem, MealCategory } from '../../types/restaurant';
import { FoodVisual } from '../ui/FoodVisual';
import { Utensils, Info } from 'lucide-react';
import { fadeInUp, luxuryEase } from '../../utils/animations';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MealCategory>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const categories: { id: MealCategory; label: string }[] = [
    { id: 'all', label: `All Items (${APPROVED_MENU_ITEMS.length})` },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'beverages-desserts', label: 'Beverages & Sweets' },
  ];

  const filteredItems = APPROVED_MENU_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'breakfast') return item.mealTimes.includes('breakfast');
    if (activeCategory === 'lunch') return item.mealTimes.includes('lunch');
    if (activeCategory === 'dinner') return item.mealTimes.includes('dinner');
    if (activeCategory === 'beverages-desserts') return item.category === 'beverages-desserts';
    return true;
  });

  return (
    <section id="menu" className="py-28 px-6 bg-[#0A0A0C] border-t border-[#D6A75D]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2 text-xs text-[#D6A75D] uppercase tracking-[0.2em] font-semibold mb-3">
              <span>Curated Pure Vegetarian Offerings</span>
              <span aria-hidden="true">·</span>
              <span>Koppal Kitchen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight text-balance">
              The Food Land Menu
            </h2>
            <p className="text-sm sm:text-base text-[#BFBAB0] mt-3 max-w-xl font-light">
              Crafted exclusively from client-approved vegetarian recipes. 100% pure vegetarian, eggless, and prepared fresh daily.
            </p>
          </motion.div>

          {/* Interactive Category Filter Segmented Control with animated indicator */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#14141A] border border-[#D6A75D]/20 rounded-lg">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive ? 'text-[#0A0A0C] font-semibold' : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMenuCategory"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-[#D6A75D] rounded-md shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid with Framer Motion Layout animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.45, ease: luxuryEase, delay: idx * 0.05 }}
                whileHover={{ y: -6, borderColor: 'rgba(214,167,93,0.45)' }}
                className="group overflow-hidden rounded-xl bg-[#121217] border border-[#D6A75D]/15 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Visual Image Header - Clickable for full details/preview */}
                  <div
                    onClick={() => setSelectedItem(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedItem(item);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View larger preview and details for ${item.name}`}
                    className="w-full relative overflow-hidden cursor-pointer group/cardimg focus:outline-none focus:ring-2 focus:ring-[#D6A75D]"
                  >
                    <div className="transform transition-transform duration-500 group-hover/cardimg:scale-105">
                      <FoodVisual
                        itemId={item.id}
                        customImageUrl={item.imageUrl}
                        altText={item.name}
                        aspectRatio="4/3"
                      />
                    </div>
                    {/* Subtle hover overlay hint */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/cardimg:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-full bg-black/80 border border-[#D6A75D]/40 text-[11px] text-[#FAF8F5] tracking-wider uppercase backdrop-blur-sm shadow-lg flex items-center gap-1.5">
                        <span className="text-[#D6A75D]">✦</span>
                        <span>View Details</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Header Row: Title & Indicative Price */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div
                        onClick={() => setSelectedItem(item)}
                        className="cursor-pointer"
                      >
                        <h3 className="text-xl font-serif font-bold text-[#FAF8F5] group-hover:text-[#D6A75D] transition-colors">
                          {item.name}
                        </h3>
                        {item.nativeName && (
                          <span className="text-xs text-[#8E8B82] block mt-0.5">
                            {item.nativeName}
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-lg font-serif font-bold text-[#D6A75D] block tabular-nums">
                          {item.price !== undefined ? `₹${item.price}` : item.priceLabel}
                        </span>
                        {item.isProvisionalPrice && (
                          <span className="text-[10px] text-[#8E8B82] block mt-0.5" title="Price estimate awaiting owner verification">
                            *Estimated
                          </span>
                        )}
                        {item.isProvisionalPrice === false && item.price !== undefined && (
                          <span className="text-[10px] text-[#4CAF50] block mt-0.5 font-medium">
                            Confirmed
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A6A296] leading-relaxed line-clamp-2 mb-4 font-light">
                      {item.description}
                    </p>

                    {/* Ingredients Mini Pill */}
                    <div className="flex items-center gap-2 text-xs text-[#8E8B82] pt-3 border-t border-[#1F1F28]">
                      <Utensils className="w-3.5 h-3.5 text-[#D6A75D]/70 shrink-0" />
                      <span className="truncate">{item.ingredientsSummary}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Strip */}
                <div className="px-6 py-3 bg-[#0E0E13] border-t border-[#1C1C24] flex items-center justify-between text-xs">
                  <span className="text-[#8E8B82] uppercase tracking-wider text-[10px] font-medium">
                    {item.category.replace('-', ' & ')}
                  </span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-[#D6A75D] hover:text-[#FAF8F5] transition-colors font-medium cursor-pointer"
                  >
                    Details & Ingredients →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Full Dish Details with AnimatePresence */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: luxuryEase }}
                className="relative z-10 w-full max-w-lg rounded-xl bg-[#14141C] border border-[#D6A75D]/30 p-6 sm:p-8 shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D6A75D] font-semibold block mb-1">
                      Dish Overview
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#FAF8F5]">
                      {selectedItem.name}
                    </h3>
                    {selectedItem.nativeName && (
                      <span className="text-xs text-[#8E8B82]">
                        {selectedItem.nativeName}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-[#8E8B82] hover:text-[#FAF8F5] text-sm p-1.5 cursor-pointer rounded-md hover:bg-white/5 transition-colors"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>

                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 border border-[#25252F]">
                  <FoodVisual
                    itemId={selectedItem.id}
                    customImageUrl={selectedItem.imageUrl}
                    altText={selectedItem.name}
                    aspectRatio="16/9"
                  />
                </div>

                <div className="space-y-4 text-sm text-[#C6C2B6] leading-relaxed">
                  <p>{selectedItem.description}</p>
                  <div className="p-3 bg-[#0A0A0C] rounded border border-[#25252F]">
                    <h4 className="text-xs uppercase tracking-wider text-[#D6A75D] font-semibold mb-1">
                      Ingredients
                    </h4>
                    <p className="text-xs text-[#A6A296]">{selectedItem.ingredientsSummary}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8E8B82] pt-2">
                    <div>
                      <span>Price: </span>
                      <strong className="text-[#D6A75D] font-mono tabular-nums text-sm">
                        {selectedItem.price !== undefined ? `₹${selectedItem.price}` : selectedItem.priceLabel}
                      </strong>
                      {selectedItem.isProvisionalPrice && (
                        <span className="text-[11px] text-[#A69B88] ml-2 block sm:inline">
                          (Provisional estimate requiring owner approval)
                        </span>
                      )}
                      {selectedItem.isProvisionalPrice === false && selectedItem.price !== undefined && (
                        <span className="text-[11px] text-[#4CAF50] ml-2 block sm:inline">
                          (Confirmed price)
                        </span>
                      )}
                    </div>
                    <span className="text-[#D6A75D]/80">100% Vegetarian · No Eggs</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#25252F] flex justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2 text-xs font-semibold text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
