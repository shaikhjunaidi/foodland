import React, { useState, useEffect } from 'react';
import { APPROVED_MENU_ITEMS } from '../../data/menuData';
import { MenuItem, MealCategory } from '../../types/restaurant';
import { FoodVisual } from '../ui/FoodVisual';
import { Utensils, Info } from 'lucide-react';

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
          <div>
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
          </div>

          {/* Interactive Category Filter Segmented Control (Valid functional buttons per constitution) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#14141A] border border-[#D6A75D]/20 rounded-lg">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold shadow-sm'
                  : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
              }`}
            >
              All Items ({APPROVED_MENU_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveCategory('breakfast')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'breakfast'
                  ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold shadow-sm'
                  : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
              }`}
            >
              Breakfast
            </button>
            <button
              onClick={() => setActiveCategory('lunch')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'lunch'
                  ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold shadow-sm'
                  : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
              }`}
            >
              Lunch
            </button>
            <button
              onClick={() => setActiveCategory('dinner')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'dinner'
                  ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold shadow-sm'
                  : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
              }`}
            >
              Dinner
            </button>
            <button
              onClick={() => setActiveCategory('beverages-desserts')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'beverages-desserts'
                  ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold shadow-sm'
                  : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
              }`}
            >
              Beverages & Sweets
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl bg-[#121217] border border-[#D6A75D]/15 hover:border-[#D6A75D]/45 transition-all duration-300 flex flex-col justify-between shadow-xl"
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
                  <FoodVisual
                    itemId={item.id}
                    customImageUrl={item.imageUrl}
                    altText={item.name}
                    aspectRatio="4/3"
                  />
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/cardimg:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-black/75 border border-[#D6A75D]/40 text-[11px] text-[#FAF8F5] tracking-wider uppercase backdrop-blur-sm shadow-lg flex items-center gap-1.5">
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
                        <span className="text-xs text-[#8E8B82] block font-light">
                          {item.nativeName}
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-serif font-semibold text-[#D6A75D] font-mono tabular-nums">
                        {item.price !== undefined ? `₹${item.price}` : item.priceLabel}
                        {item.isProvisionalPrice ? '*' : ''}
                      </span>
                      {item.isProvisionalPrice ? (
                        <span className="text-[9px] text-[#A69B88] block uppercase tracking-wider max-w-[120px] text-right">
                          Provisional Estimate*
                        </span>
                      ) : item.price !== undefined ? (
                        <span className="text-[10px] text-[#4CAF50] block uppercase tracking-wider">
                          Confirmed Price
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#8E8B82] block uppercase tracking-wider">
                          Upon Request
                        </span>
                      )}
                    </div>
                  </div>

                {/* Description */}
                <p className="text-sm text-[#AFAAA0] leading-relaxed my-3 font-light">
                  {item.description}
                </p>

                  {/* Ingredients / Craft summary */}
                  <div className="text-xs text-[#8E8B82] py-2 border-t border-[#1F1F27] leading-normal">
                    <span className="text-[#C6C2B6] font-medium">Ingredients: </span>
                    {item.ingredientsSummary}
                  </div>
                </div>
              </div>

              {/* Unboxed Metadata Footer (NO PILLS per frontend constitution) */}
              <div className="px-6 pb-6 pt-3 border-t border-[#1F1F27] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#D6A75D]/90">
                  {item.dietaryTags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {idx < item.dietaryTags.length - 1 && (
                        <span className="text-[#555560]" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="text-xs text-[#8E8B82] hover:text-[#FAF8F5] transition-colors flex items-center gap-1 cursor-pointer"
                  title="View item details"
                >
                  <Info className="w-3.5 h-3.5 text-[#D6A75D]" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informational Notice Banner for Restaurant Owner & Guests */}
        <div className="mt-12 p-4 rounded-lg bg-[#14141B] border border-[#D6A75D]/15 flex items-start sm:items-center gap-3 text-xs text-[#A6A296]">
          <span className="text-[#D6A75D] text-base shrink-0 mt-0.5 sm:mt-0">✦</span>
          <p className="leading-relaxed">
            <strong className="text-[#FAF8F5]">Strict Purity & Pricing Notice:</strong> Food Land is 100% pure vegetarian (strictly no eggs). Regular Chai (₹15) and Special Chai (₹30) are confirmed prices. Food meal prices (marked with *) are provisional estimates requiring owner approval. Fresh Fruit Juice and Cold Drinks are available on request at the restaurant counter.
          </p>
        </div>

        {/* Dish Detail Modal */}
        {selectedItem && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedItem(null);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-dialog-title"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-[#14141A] border border-[#D6A75D]/35 rounded-xl p-6 shadow-2xl cursor-default"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-[#D6A75D] uppercase tracking-wider font-semibold">
                    Menu Item Details
                  </span>
                  <h3 id="menu-dialog-title" className="text-2xl font-serif font-bold text-[#FAF8F5]">
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
                  className="text-[#8E8B82] hover:text-[#FAF8F5] text-sm p-1.5 cursor-pointer"
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
