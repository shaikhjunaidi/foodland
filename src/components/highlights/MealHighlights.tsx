import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEAL_SECTION_OVERVIEWS, APPROVED_MENU_ITEMS } from '../../data/menuData';
import { MenuItem } from '../../types/restaurant';
import { FoodVisual } from '../ui/FoodVisual';
import { Sun, CloudSun, Moon, X } from 'lucide-react';
import { fadeInUp, luxuryEase } from '../../utils/animations';

export const MealHighlights: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!selectedDish) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDish(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDish]);

  const currentOverview = MEAL_SECTION_OVERVIEWS[selectedMeal];
  const featuredDishes = APPROVED_MENU_ITEMS.filter((item) =>
    currentOverview.featuredItemIds.includes(item.id)
  );

  const mealTabs = [
    {
      id: 'breakfast' as const,
      icon: Sun,
      period: 'Morning Hours',
      title: 'Breakfast',
      subtitle: 'Fresh set dosas & steaming estate chai',
    },
    {
      id: 'lunch' as const,
      icon: CloudSun,
      period: 'Midday Repast',
      title: 'Lunch',
      subtitle: 'Aromatic vegetable fried rice & crisp garden salad',
    },
    {
      id: 'dinner' as const,
      icon: Moon,
      period: 'Evening Sanctuary',
      title: 'Dinner',
      subtitle: 'Wholesome delicacies & warm shahi gulab jamun',
    },
  ];

  return (
    <section id="mealtimes" className="py-28 px-6 bg-[#0E0E14] border-t border-[#D6A75D]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-2 text-xs text-[#D6A75D] uppercase tracking-[0.2em] font-semibold mb-3">
            <span>Rhythms of the Day</span>
            <span aria-hidden="true">·</span>
            <span>All-Day Pure Veg Dining</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight text-balance">
            Breakfast, Lunch & Twilight Dining
          </h2>
          <p className="text-base text-[#BFBAB0] mt-3 font-light leading-relaxed">
            From the crack of dawn to tranquil evening hours in Koppal, discover how our kitchen adapts to your day.
          </p>
        </motion.div>

        {/* Meal Time Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {mealTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedMeal === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMeal(tab.id)}
                className={`p-5 rounded-xl border text-left transition-colors cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#181822] border-[#D6A75D] shadow-[0_8px_24px_rgba(214,167,93,0.15)]'
                    : 'bg-[#121217] border-[#22222D] hover:border-[#D6A75D]/40'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-[#D6A75D]' : 'text-[#8E8B82]'}`} />
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#8E8B82]">
                    {tab.period}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#FAF8F5]">{tab.title}</h3>
                <span className="text-xs text-[#A6A296] block mt-1 font-light">
                  {tab.subtitle}
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="activeMealIndicator"
                    className="absolute bottom-0 left-6 right-6 h-[2px] bg-[#D6A75D] rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Period Feature Showcase with smooth AnimatePresence transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMeal}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
            className="p-8 md:p-10 rounded-xl bg-[#14141C] border border-[#D6A75D]/25 relative overflow-hidden shadow-2xl"
          >
            <div className="max-w-2xl mb-8">
              <span className="text-xs text-[#D6A75D] uppercase tracking-wider font-semibold block mb-1">
                {currentOverview.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F5] mb-3">
                {currentOverview.title}
              </h3>
              <p className="text-sm sm:text-base text-[#BFBAB0] leading-relaxed font-light">
                {currentOverview.description}
              </p>
            </div>

            {/* Curated Dishes for this period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredDishes.map((dish, dIdx) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: dIdx * 0.08, ease: luxuryEase }}
                  whileHover={{ y: -5, borderColor: 'rgba(214,167,93,0.5)' }}
                  onClick={() => setSelectedDish(dish)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedDish(dish);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View larger preview and details for ${dish.name}`}
                  className="overflow-hidden rounded-xl bg-[#0C0C10] border border-[#252530] flex flex-col justify-between group transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D6A75D] shadow-lg"
                >
                  <div className="w-full aspect-[16/9] overflow-hidden relative">
                    <div className="transform transition-transform duration-500 group-hover:scale-105">
                      <FoodVisual
                        itemId={dish.id}
                        customImageUrl={dish.imageUrl}
                        altText={dish.name}
                        aspectRatio="16/9"
                      />
                    </div>
                    {/* Subtle hover overlay hint */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-full bg-black/80 border border-[#D6A75D]/40 text-[11px] text-[#FAF8F5] tracking-wider uppercase backdrop-blur-sm shadow-lg flex items-center gap-1.5">
                        <span className="text-[#D6A75D]">✦</span>
                        <span>View Details</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <h4 className="text-lg font-serif font-semibold text-[#FAF8F5] group-hover:text-[#D6A75D] transition-colors">
                          {dish.name}
                        </h4>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm text-[#D6A75D] font-mono tabular-nums font-semibold">
                            {dish.price !== undefined ? `₹${dish.price}${dish.isProvisionalPrice ? '*' : ''}` : dish.priceLabel}
                          </span>
                          {dish.isProvisionalPrice && (
                            <span className="text-[9px] text-[#A69B88] block">
                              *Provisional
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-[#8E8B82] leading-relaxed mb-3 font-light">
                        {dish.description}
                      </p>
                    </div>
                    <div className="text-[11px] text-[#D6A75D]/80 pt-2 border-t border-[#1C1C24] flex items-center justify-between">
                      <span>{dish.dietaryTags.join(' · ')}</span>
                      {dish.isProvisionalPrice && (
                        <span className="text-[10px] text-[#8E8B82]">*Owner verification pending</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dish Detail Preview Modal with AnimatePresence */}
        <AnimatePresence>
          {selectedDish && (
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedDish(null);
              }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-pointer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="meal-dish-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.3, ease: luxuryEase }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-lg w-full bg-[#14141A] border border-[#D6A75D]/35 rounded-xl p-6 shadow-2xl cursor-default"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs text-[#D6A75D] uppercase tracking-wider font-semibold">
                      Dish Preview
                    </span>
                    <h3 id="meal-dish-title" className="text-2xl font-serif font-bold text-[#FAF8F5]">
                      {selectedDish.name}
                    </h3>
                    {selectedDish.nativeName && (
                      <span className="text-xs text-[#8E8B82]">
                        {selectedDish.nativeName}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedDish(null)}
                    className="text-[#8E8B82] hover:text-[#FAF8F5] text-sm p-1.5 cursor-pointer rounded-md hover:bg-white/5 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 border border-[#25252F]">
                  <FoodVisual
                    itemId={selectedDish.id}
                    customImageUrl={selectedDish.imageUrl}
                    altText={selectedDish.name}
                    aspectRatio="16/9"
                  />
                </div>

                <div className="space-y-4 text-sm text-[#C6C2B6] leading-relaxed">
                  <p>{selectedDish.description}</p>
                  <div className="p-3 bg-[#0A0A0C] rounded border border-[#25252F]">
                    <h4 className="text-xs uppercase tracking-wider text-[#D6A75D] font-semibold mb-1">
                      Ingredients
                    </h4>
                    <p className="text-xs text-[#A6A296]">{selectedDish.ingredientsSummary}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8E8B82] pt-2">
                    <div>
                      <span>Price: </span>
                      <strong className="text-[#D6A75D] font-mono tabular-nums text-sm">
                        {selectedDish.price !== undefined ? `₹${selectedDish.price}` : selectedDish.priceLabel}
                      </strong>
                      {selectedDish.isProvisionalPrice && (
                        <span className="text-[11px] text-[#A69B88] ml-2 block sm:inline">
                          (Provisional estimate requiring owner approval)
                        </span>
                      )}
                      {selectedDish.isProvisionalPrice === false && selectedDish.price !== undefined && (
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
                    onClick={() => setSelectedDish(null)}
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
