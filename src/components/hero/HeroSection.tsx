import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, UtensilsCrossed, Calendar } from 'lucide-react';
import { HeroVideoPlayer } from './HeroVideoPlayer';
import { fadeInUp, luxuryEase } from '../../utils/animations';

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
      {/* Background Ambient Glow with breathing animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[650px] rounded-full bg-[#D6A75D] blur-[160px]"
        />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D6A75D]/[0.03] blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Top Floating Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: luxuryEase }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141B]/90 border border-[#D6A75D]/30 backdrop-blur-md text-xs tracking-[0.2em] text-[#D6A75D] uppercase font-semibold shadow-lg">
            <span>Koppal, Karnataka</span>
            <span className="text-[#8E8B82]">·</span>
            <span>100% Pure Vegetarian</span>
            <span className="text-[#8E8B82]">·</span>
            <span>No Eggs</span>
          </div>
        </motion.div>

        {/* Seamless Cinematic Looping Dosa Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: luxuryEase, delay: 0.15 }}
          className="w-full max-w-6xl mx-auto mb-12"
        >
          <HeroVideoPlayer />
        </motion.div>

        {/* Hero Editorial Content & CTAs */}
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h1
            custom={0.25}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F5] tracking-tight leading-[1.1] mb-4 text-balance"
          >
            Pure Vegetarian Elegance, Crafted for Koppal
          </motion.h1>

          <motion.p
            custom={0.35}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-base sm:text-lg text-[#BFBAB0] max-w-2xl mx-auto leading-relaxed mb-8 font-light"
          >
            Enjoy 100% pure vegetarian cuisine in Koppal. From freshly brewed Regular Chai (₹15) and Special Chai (₹30) to soft set dosas, fried rice, and traditional sweets — prepared with complete vegetarian discipline and strictly no eggs.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            custom={0.45}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreMenu}
              className="px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded-md transition-shadow duration-200 shadow-[0_4px_24px_rgba(214,167,93,0.35)] hover:shadow-[0_6px_32px_rgba(214,167,93,0.5)] flex items-center gap-2 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Explore Menu</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookTable}
              className="px-8 py-3.5 text-sm font-semibold tracking-wide text-[#FAF8F5] bg-[#14141B] hover:bg-[#1E1E28] border border-[#D6A75D]/40 hover:border-[#D6A75D]/80 rounded-md transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4 text-[#D6A75D]" />
              <span>Book a Table</span>
            </motion.button>
          </motion.div>

          {/* Quick Guidance Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8E8B82]"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#D6A75D] animate-bounce" />
            <span>Scroll down to explore our 100% vegetarian menu & story</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
