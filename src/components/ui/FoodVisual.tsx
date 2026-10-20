import React, { useState } from 'react';

interface FoodVisualProps {
  itemId: string;
  className?: string;
  aspectRatio?: '4/3' | '16/9' | '1/1';
  customImageUrl?: string;
  altText?: string;
}

/**
 * Photorealistic Commercial Food Photography Registry
 * Maps each approved Food Land vegetarian delicacy to verified, authentic photography.
 * Strictly 100% vegetarian, egg-free dishes.
 */
const PHOTOGRAPHIC_ASSET_REGISTRY: Record<
  string,
  { src: string; alt: string; nativeName?: string; isInteriorPlaceholder?: boolean }
> = {
  'set-dosa': {
    src: '/images/food/set_dosa.jpg',
    alt: 'Authentic South Indian set dosa served with coconut chutney and saagu',
    nativeName: 'ಸೆಟ್ ದೋಸೆ'
  },
  'fried-rice': {
    src: '/images/food/fried_rice.jpg',
    alt: 'Authentic 100% vegetarian fried rice with long-grain basmati rice and vegetables',
    nativeName: 'ವೆಜ್ ಫ್ರೈಡ್ ರೈಸ್'
  },
  'regular-chai': {
    src: '/images/food/regular_chai.jpg',
    alt: 'Freshly brewed hot Indian cutting chai in traditional glass cup',
    nativeName: 'ರೆಗ್ಯುಲರ್ ಚಹಾ'
  },
  'special-chai': {
    src: '/images/food/special_chai.jpg',
    alt: 'Freshly simmered aromatic special chai served in authentic terracotta kulhad cups',
    nativeName: 'ಸ್ಪೆಷಲ್ ಚಹಾ'
  },
  'chai': {
    src: '/images/food/regular_chai.jpg',
    alt: 'Freshly brewed hot Indian milk tea in traditional glass cup',
    nativeName: 'ಚಹಾ'
  },
  'fruit-juice': {
    src: '/images/food/fruit_juice.jpg',
    alt: 'Freshly squeezed natural citrus fruit juice in glass with fresh citrus fruit',
    nativeName: 'ತಾಜಾ ಹಣ್ಣಿನ ರಸ'
  },
  'salad': {
    src: '/images/food/salad.jpg',
    alt: 'Fresh garden salad with crisp cucumbers, ripe tomatoes, and herbs',
    nativeName: 'ಹಸಿ ತರಕಾರಿ ಸಲಾಡ್'
  },
  'gulab-jamun': {
    src: '/images/food/gulab_jamun.jpg',
    alt: 'Glistening syrup-glazed golden gulab jamun sweet dessert dumplings with pistachio garnish',
    nativeName: 'ಗುಲಾಬ್ ಜಾಮೂನ್'
  },
  'cold-drinks': {
    src: '/images/food/cold_drinks.jpg',
    alt: 'Chilled sparkling refreshment with ice cubes and lime slice',
    nativeName: 'ತಂಪು ಪಾನೀಯಗಳು'
  },
  'restaurant-interior': {
    src: '',
    alt: 'Food Land Dining Sanctuary, Koppal',
    nativeName: 'ಫುಡ್ ಲ್ಯಾಂಡ್',
    isInteriorPlaceholder: true
  }
};

/**
 * Photorealistic Food Visual Component for Food Land
 * Features:
 * 1. Persistent visibility: Images remain 100% visible before, during, and after hover.
 * 2. No hover-dependent fade-out, hide, or blink logic.
 * 3. Neutral, dignified architectural placeholder for Century Hall / Interior until verified owner photos arrive.
 * 4. 100% vegetarian badge.
 */
export const FoodVisual: React.FC<FoodVisualProps> = ({
  itemId,
  className = '',
  aspectRatio = '4/3',
  customImageUrl,
  altText
}) => {
  const [hasError, setHasError] = useState(false);

  const matchedAsset = PHOTOGRAPHIC_ASSET_REGISTRY[itemId] || {
    src: '/images/food/set_dosa.jpg',
    alt: 'Food Land Pure Vegetarian Delicacy'
  };

  const isInterior = matchedAsset.isInteriorPlaceholder || itemId === 'restaurant-interior';
  const imageSrc = customImageUrl || matchedAsset.src;
  const resolvedAlt = altText || matchedAsset.alt;

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  // Neutral, elegant placeholder for Century Hall / Restaurant Interior
  // Strictly avoids fictional buildings or fake luxury claims
  if (isInterior && !customImageUrl) {
    return (
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-lg bg-[#0E0E14] border border-[#D6A75D]/25 select-none flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        {/* Subtle geometric gold ambient accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#181824] via-[#0E0E14] to-[#0A0A0E] pointer-events-none" />
        <div className="absolute inset-0 border border-[#D6A75D]/10 rounded-lg pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-xs">
          <div className="w-10 h-10 mb-3 rounded-full border border-[#D6A75D]/40 flex items-center justify-center bg-[#D6A75D]/10">
            <span className="text-[#D6A75D] text-lg font-serif">✦</span>
          </div>
          <span className="text-[#D6A75D] text-xs font-serif tracking-[0.25em] uppercase font-semibold mb-1">
            Food Land · Koppal
          </span>
          <h4 className="text-base sm:text-lg font-serif font-bold text-[#FAF8F5] mb-1">
            Century Hall & Dining Area
          </h4>
          <p className="text-xs text-[#8E8B82] leading-relaxed mb-3">
            Welcoming pure vegetarian dining space in Koppal, Karnataka.
          </p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#14141E] border border-[#D6A75D]/20 text-[10px] text-[#C6C2B6] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
            Official Century Hall photo awaiting owner verification
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-lg bg-[#0C0C12] select-none ${className}`}
      style={{ isolation: 'isolate' }}
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-[#0A0A0E] -z-10" />

      {/* Photorealistic Commercial Photography Asset - Guaranteed persistent visibility */}
      {!hasError && imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={resolvedAlt}
            referrerPolicy="no-referrer"
            loading="eager"
            onError={() => setHasError(true)}
            style={{
              opacity: 1,
              visibility: 'visible',
              display: 'block',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105 group-hover:scale-105 will-change-transform"
          />

          {/* Subtle cinematic vignette that enhances luxury and never obscures food */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </>
      ) : (
        /* Neutral Luxury Fallback if image path fails */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#12121A] border border-[#D6A75D]/20">
          <span className="text-[#D6A75D] text-xs font-serif tracking-widest uppercase mb-1">
            Food Land Kitchen
          </span>
          <p className="text-sm font-serif text-[#FAF8F5]">{resolvedAlt}</p>
          <span className="text-[10px] text-[#8E8B82] mt-2">100% Pure Vegetarian · No Eggs</span>
        </div>
      )}

      {/* Discreet 100% Pure Vegetarian Badge */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A0A0E]/85 border border-[#D6A75D]/30 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase text-[#EAD8BF] shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] ring-1 ring-[#4CAF50]" />
          <span>100% Pure Veg</span>
        </span>
      </div>

      {/* Elegant gold accent rim */}
      <div className="absolute inset-0 pointer-events-none border border-[#D6A75D]/15 rounded-lg group-hover:border-[#D6A75D]/40 transition-colors duration-500" />
    </div>
  );
};
