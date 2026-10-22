import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, HeartHandshake } from 'lucide-react';
import { fadeInUp, luxuryEase } from '../../utils/animations';

export const PhilosophySection: React.FC = () => {
  const tenets = [
    {
      icon: ShieldCheck,
      number: '01',
      title: '100% Vegetarian & No Eggs',
      description: 'Food Land is strictly 100% vegetarian. We maintain an uncompromising policy with zero meat, poultry, seafood, or eggs on the premises.',
      tags: ['100% Vegetarian', 'Strictly No Eggs', 'Pure Cooking'],
    },
    {
      icon: Sparkles,
      number: '02',
      title: 'Curated Menu Delicacies',
      description: 'From freshly prepared Set Dosa and Vegetable Fried Rice to Regular Chai (₹15), Special Chai (₹30), and sweet Gulab Jamun, our menu focuses on wholesome vegetarian favorites.',
      tags: ['Regular Chai ₹15', 'Special Chai ₹30', 'Fresh Batches'],
    },
    {
      icon: HeartHandshake,
      number: '03',
      title: 'Welcoming Haven in Koppal',
      description: 'Located in Koppal, Karnataka, Food Land offers families, residents, and travelers a comfortable, respectful dining atmosphere with dedicated vegetarian service.',
      tags: ['Koppal, Karnataka', 'Family Friendly', 'Dine-in Comfort'],
    },
  ];

  return (
    <section id="philosophy" className="py-28 px-6 bg-[#0E0E12] border-t border-[#D6A75D]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="max-w-3xl mb-16"
        >
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
        </motion.div>

        {/* 3 Core Tenets Grid with Staggered Entrance and Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tenets.map((tenet, idx) => {
            const Icon = tenet.icon;
            return (
              <motion.div
                key={tenet.number}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: luxuryEase, delay: idx * 0.15 }}
                whileHover={{ y: -8, borderColor: 'rgba(214,167,93,0.45)' }}
                className="group p-8 rounded-xl bg-[#14141A] border border-[#D6A75D]/15 transition-colors duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-lg bg-[#D6A75D]/10 border border-[#D6A75D]/25 flex items-center justify-center text-[#D6A75D] mb-6 shadow-md"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-xl font-serif font-semibold text-[#FAF8F5] group-hover:text-[#D6A75D] transition-colors mb-3">
                    {tenet.number}. {tenet.title}
                  </h3>
                  <p className="text-sm text-[#A6A296] leading-relaxed mb-6 font-light">
                    {tenet.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#8E8B82] pt-4 border-t border-[#25252F]">
                  {tenet.tags.map((tag, tIdx) => (
                    <React.Fragment key={tag}>
                      {tIdx > 0 && <span aria-hidden="true">·</span>}
                      <span>{tag}</span>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
