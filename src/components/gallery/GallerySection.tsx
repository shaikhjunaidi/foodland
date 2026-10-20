import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, HeartHandshake, HelpCircle, X, ArrowRight } from 'lucide-react';
import { FoodVisual } from '../ui/FoodVisual';

interface AtmosphereFrame {
  id: string;
  category: 'interior' | 'craft' | 'dining';
  title: string;
  subtitle: string;
  description: string;
  visualId: string;
  aspect: '4/3' | '16/9';
}

const ATMOSPHERE_FRAMES: AtmosphereFrame[] = [
  {
    id: 'interior-hall',
    category: 'interior',
    title: 'Century Hall & Dining Area',
    subtitle: 'Dining in Koppal',
    description: 'A comfortable, clean, and welcoming vegetarian dining hall designed for families and visitors in Koppal. (Official photography pending owner verification).',
    visualId: 'restaurant-interior',
    aspect: '16/9'
  },
  {
    id: 'dosa-tawa',
    category: 'craft',
    title: 'Set Dosa',
    subtitle: '₹60* · 100% Vegetarian Offering',
    description: 'Freshly prepared soft fermented rice and lentil crepes served with coconut chutney and saagu. (*Provisional price estimate requiring owner approval).',
    visualId: 'set-dosa',
    aspect: '4/3'
  },
  {
    id: 'chai-davarah',
    category: 'craft',
    title: 'Chai Selection',
    subtitle: 'Regular ₹15 · Special ₹30',
    description: 'Freshly brewed hot tea prepared with milk and aromatic spices, available in Regular (₹15) and Special (₹30) at confirmed prices.',
    visualId: 'special-chai',
    aspect: '4/3'
  },
  {
    id: 'jamun-platter',
    category: 'craft',
    title: 'Gulab Jamun',
    subtitle: '₹45* · Sweet Confection',
    description: 'Classic sweet milk dumplings gently soaked in fragrant cardamom sugar syrup. (*Provisional price estimate requiring owner approval).',
    visualId: 'gulab-jamun',
    aspect: '4/3'
  },
  {
    id: 'rice-wok',
    category: 'craft',
    title: 'Vegetable Fried Rice',
    subtitle: '₹110* · 100% Vegetarian',
    description: 'Long-grain basmati rice cooked with fresh seasonal vegetables and aromatic seasonings. (*Provisional price estimate requiring owner approval).',
    visualId: 'fried-rice',
    aspect: '4/3'
  },
  {
    id: 'koppal-evening',
    category: 'dining',
    title: 'Century Hall Evening Hospitality',
    subtitle: 'Hospitality in Koppal',
    description: 'A peaceful, dignified dining atmosphere welcoming guests to enjoy pure vegetarian food in Koppal.',
    visualId: 'restaurant-interior',
    aspect: '16/9'
  }
];

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'interior' | 'craft' | 'dining'>('all');
  const [selectedFrame, setSelectedFrame] = useState<AtmosphereFrame | null>(null);
  const [showSubmissionGuide, setShowSubmissionGuide] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedFrame && !showSubmissionGuide) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFrame(null);
        setShowSubmissionGuide(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFrame, showSubmissionGuide]);

  const filteredFrames = ATMOSPHERE_FRAMES.filter((frame) => {
    if (activeFilter === 'all') return true;
    return frame.category === activeFilter;
  });

  return (
    <section id="gallery" className="py-28 px-6 bg-[#0A0A0C] border-t border-[#D6A75D]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#D6A75D] uppercase tracking-[0.2em] font-semibold mb-3">
              <span>Sensory Atmosphere</span>
              <span aria-hidden="true">·</span>
              <span>100% Vegetarian</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight text-balance">
              The Food Land Atmosphere
            </h2>
            <p className="text-sm sm:text-base text-[#BFBAB0] mt-3 font-light leading-relaxed">
              Experience Food Land in Koppal — where refined dark tones, warm golden accents, and 100% vegetarian culinary care unite for a memorable dining experience.
            </p>
          </div>

          {/* Filter segment */}
          <div className="flex items-center gap-1.5 p-1 bg-[#14141A] border border-[#D6A75D]/20 rounded-lg shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'all'
                  ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold'
                  : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
              }`}
            >
              All Views
            </button>
            <button
              onClick={() => setActiveFilter('craft')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'craft'
                  ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold'
                  : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
              }`}
            >
              Menu Delicacies
            </button>
            <button
              onClick={() => setActiveFilter('interior')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'interior'
                  ? 'bg-[#D6A75D] text-[#0A0A0C] font-semibold'
                  : 'text-[#C6C2B6] hover:text-[#FAF8F5]'
              }`}
            >
              Sanctuary
            </button>
          </div>
        </div>

        {/* Gallery Grid: Tasteful Abstract Visuals (No fake photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFrames.map((frame) => (
            <div
              key={frame.id}
              onClick={() => setSelectedFrame(frame)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-[#121217] border border-[#D6A75D]/20 hover:border-[#D6A75D]/60 transition-all duration-300 flex flex-col shadow-xl"
            >
              {/* Visual Frame */}
              <div className="relative aspect-[4/3] overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                <FoodVisual itemId={frame.visualId} altText={frame.title} aspectRatio="4/3" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-transparent to-black/30 pointer-events-none" />

                {/* Subtitle badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded bg-[#0A0A0E]/80 backdrop-blur-md text-[#D6A75D] text-[11px] font-medium border border-[#D6A75D]/30 tracking-wide">
                    {frame.subtitle}
                  </span>
                </div>

                {/* Title & Description at bottom of image */}
                <div className="absolute bottom-3 left-4 right-4 z-10">
                  <h4 className="text-lg font-serif font-bold text-[#FAF8F5] leading-tight drop-shadow-md">
                    {frame.title}
                  </h4>
                  <p className="text-xs text-[#C6C2B6] mt-1 line-clamp-2 drop-shadow font-light">
                    {frame.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Atmosphere Experience Card (Neutral, verified claims only) */}
        <div className="mt-14 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#14141E] via-[#101017] to-[#0A0A0E] border border-[#D6A75D]/25 relative overflow-hidden shadow-2xl">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#D6A75D]/[0.06] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D6A75D]/[0.04] rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D6A75D] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hospitality Ethos</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#FAF8F5] mb-4 leading-snug">
                Pure Vegetarian Dining for Koppal
              </h3>
              <p className="text-sm sm:text-base text-[#BFBAB0] font-light leading-relaxed max-w-2xl mb-6">
                Food Land is dedicated to 100% vegetarian culinary standards. With complete respect for traditional tastes and zero eggs served on premises, we welcome guests to a refined, tranquil dining environment.
              </p>

              {/* Three Verified Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#252535]">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#D6A75D] font-serif font-bold text-base">01.</span>
                  <div>
                    <h5 className="text-xs font-semibold text-[#FAF8F5]">100% Vegetarian</h5>
                    <p className="text-[11px] text-[#8E8B82] mt-0.5">Strictly vegetarian cuisine with zero meat or eggs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-[#D6A75D] font-serif font-bold text-base">02.</span>
                  <div>
                    <h5 className="text-xs font-semibold text-[#FAF8F5]">Koppal Hospitality</h5>
                    <p className="text-[11px] text-[#8E8B82] mt-0.5">A welcoming space for families, travelers, and groups.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-[#D6A75D] font-serif font-bold text-base">03.</span>
                  <div>
                    <h5 className="text-xs font-semibold text-[#FAF8F5]">Fresh Daily Preparations</h5>
                    <p className="text-[11px] text-[#8E8B82] mt-0.5">Dishes and chai prepared fresh throughout the day.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clear Media Submission Guide Button */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                onClick={() => setShowSubmissionGuide(true)}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded-md transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Media & Photography Guide</span>
              </button>
              <span className="text-[11px] text-[#8E8B82] mt-2 block lg:text-right">
                Information for restaurant management on providing official photography.
              </span>
            </div>
          </div>
        </div>

        {/* Detail Inspection Modal for Individual Frames */}
        {selectedFrame && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedFrame(null);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-frame-title"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-[#14141B] border border-[#D6A75D]/35 rounded-xl p-6 shadow-2xl cursor-default"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-[#D6A75D] uppercase tracking-wider font-semibold">
                    {selectedFrame.subtitle}
                  </span>
                  <h3 id="gallery-frame-title" className="text-2xl font-serif font-bold text-[#FAF8F5]">
                    {selectedFrame.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedFrame(null)}
                  className="text-[#8E8B82] hover:text-[#FAF8F5] text-sm p-1.5 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 border border-[#22222E]">
                <FoodVisual itemId={selectedFrame.visualId} altText={selectedFrame.title} aspectRatio="4/3" />
              </div>

              <p className="text-sm text-[#C6C2B6] leading-relaxed mb-6 font-light">
                {selectedFrame.description}
              </p>

              <div className="pt-4 border-t border-[#22222E] flex justify-end">
                <button
                  onClick={() => setSelectedFrame(null)}
                  className="px-5 py-2 text-xs font-semibold text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Photography Submission Guide Modal (Clean, honest, tested instructions) */}
        {showSubmissionGuide && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowSubmissionGuide(false);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full bg-[#14141B] border border-[#D6A75D]/35 rounded-xl p-7 shadow-2xl cursor-default"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-[#D6A75D] uppercase tracking-wider font-semibold">
                    Food Land Media Protocol
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#FAF8F5] mt-1">
                    Providing Official Restaurant Photos
                  </h3>
                </div>
                <button
                  onClick={() => setShowSubmissionGuide(false)}
                  className="text-[#8E8B82] hover:text-[#FAF8F5] text-sm p-1.5 cursor-pointer"
                  aria-label="Close submission guide"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#BFBAB0] leading-relaxed">
                <p>
                  To ensure complete accuracy, this website presents high-resolution commercial culinary photography representing dishes until verified on-location photography is supplied by Food Land management.
                </p>

                <div className="p-4 rounded-lg bg-[#0C0C10] border border-[#252535] space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D6A75D]">
                    How to submit official photos:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-xs text-[#C6C2B6]">
                    <li>
                      <strong className="text-[#FAF8F5]">Authentic Restaurant Subjects:</strong> High-resolution photographs of Food Land’s actual dining area, Century Hall, kitchen counter, or approved vegetarian dishes.
                    </li>
                    <li>
                      <strong className="text-[#FAF8F5]">Owner Verification:</strong> Submit digital files directly to the website engineering team during review milestones.
                    </li>
                    <li>
                      <strong className="text-[#FAF8F5]">Production Deployment:</strong> Once verified by the owner, approved authentic photos replace existing placeholders in the permanent asset registry.
                    </li>
                  </ol>
                </div>

                <div className="p-3 bg-[#0A0A0C] border border-[#252535] rounded text-xs text-[#8E8B82] leading-relaxed">
                  <strong>Informational Notice:</strong> In-browser visitor image uploads and automated owner notifications are not enabled. This modal serves strictly as an informational photography specification guide for restaurant stakeholders.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#22222E] flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href="#contact"
                  onClick={() => setShowSubmissionGuide(false)}
                  className="text-xs text-[#D6A75D] hover:underline flex items-center gap-1"
                >
                  <span>Go to Contact Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setShowSubmissionGuide(false)}
                  className="w-full sm:w-auto px-6 py-2 text-xs font-semibold text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded transition-colors cursor-pointer"
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
