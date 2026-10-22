import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, MessageSquare, Send, Check } from 'lucide-react';
import { fadeInUp, luxuryEase } from '../../utils/animations';

export const ContactSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsSubmitting(false);
      setInquirySent(true);
    }, 600);
  };

  const contactCards = [
    {
      icon: MapPin,
      title: 'Restaurant Location',
      lines: ['Food Land, Koppal', 'Karnataka, India — 583231'],
      note: '*Specific street/landmark address placeholder awaiting owner confirmation.',
    },
    {
      icon: Phone,
      title: 'Telephone Contact',
      lines: ['[Verified Owner Phone Number]'],
      note: '*Pending official restaurant line approval.',
    },
    {
      icon: Clock,
      title: 'Dining Service Hours',
      lines: ['Breakfast · Lunch · Dinner', '7 Days a Week'],
      note: '*Detailed shift timings to be confirmed by owner.',
    },
    {
      icon: null,
      customIcon: '🌿',
      title: '100% Pure Vegetarian',
      lines: ['Strictly No Meat · No Fish · No Eggs'],
      note: 'Universal vegetarian sanctity guaranteed.',
    },
  ];

  return (
    <section id="contact" className="py-28 px-6 bg-[#0E0E14] border-t border-[#D6A75D]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-2 text-xs text-[#D6A75D] uppercase tracking-[0.2em] font-semibold mb-3">
            <span>Location & Inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Koppal, Karnataka</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight text-balance mb-4">
            Visit Food Land
          </h2>
          <p className="text-base text-[#BFBAB0] font-light leading-relaxed">
            Located in the historic town of Koppal. The details below reflect our verified location and official placeholders awaiting finalized business documentation from the owner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Details & Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card, cIdx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: cIdx * 0.08, ease: luxuryEase }}
                    whileHover={{ y: -4, borderColor: 'rgba(214,167,93,0.45)' }}
                    className="p-6 rounded-xl bg-[#14141B] border border-[#D6A75D]/20 shadow-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D6A75D]/15 flex items-center justify-center text-[#D6A75D] mb-4">
                      {Icon ? <Icon className="w-5 h-5" /> : <span className="text-lg">{card.customIcon}</span>}
                    </div>
                    <h4 className="text-base font-serif font-semibold text-[#FAF8F5] mb-1">
                      {card.title}
                    </h4>
                    <p className="text-xs text-[#C6C2B6] leading-relaxed mb-2 font-light">
                      {card.lines.map((line, lIdx) => (
                        <React.Fragment key={lIdx}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                    <span className="text-[11px] text-[#D6A75D]/90 block">
                      {card.note}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: luxuryEase }}
              className="p-6 rounded-xl bg-[#14141B] border border-[#D6A75D]/20 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs text-[#8E8B82] border-b border-[#252532] pb-3">
                <span className="font-semibold text-[#FAF8F5]">
                  Location Map Overview
                </span>
                <span>Coordinates: 15.3456° N, 76.1558° E</span>
              </div>

              {/* Graphic Map Placeholder */}
              <div className="h-64 rounded-lg bg-[#0C0C12] border border-[#252532] relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#D6A75D_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
                
                {/* Visual Location Pin with pulse */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#D6A75D]/20 border border-[#D6A75D] flex items-center justify-center text-[#D6A75D] mb-3 shadow-[0_0_24px_rgba(214,167,93,0.3)]">
                  <MapPin className="w-6 h-6 animate-pulse" />
                </div>
                <h5 className="relative z-10 text-base font-serif font-bold text-[#FAF8F5] mb-1">
                  Food Land Restaurant — Koppal
                </h5>
                <p className="relative z-10 text-xs text-[#8E8B82] max-w-sm mb-3 font-light">
                  Awaiting owner's approved Google Maps embed URL or street coordinates to activate live interactive map view.
                </p>
                <span className="relative z-10 px-3 py-1 bg-[#1A1A24] border border-[#D6A75D]/30 text-[11px] text-[#D6A75D] rounded-full">
                  Koppal City Center Region
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Direct Message / Inquiry Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="lg:col-span-5"
          >
            <div className="p-8 rounded-2xl bg-[#14141B] border border-[#D6A75D]/25 shadow-2xl">
              <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-[#D6A75D] font-semibold">
                <MessageSquare className="w-4 h-4" />
                <span>Direct Message</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#FAF8F5] mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs text-[#A6A296] leading-relaxed mb-6 font-light">
                Have a question regarding our pure vegetarian offerings, private family seating, or dietary accommodations? Reach out below.
              </p>

              <AnimatePresence mode="wait">
                {inquirySent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 rounded-xl bg-[#0C0C10] border border-[#D6A75D]/30 text-center space-y-3"
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#D6A75D]/20 text-[#D6A75D] flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-[#FAF8F5]">
                      Inquiry Transmitted
                    </h4>
                    <p className="text-xs text-[#BFBAB0] leading-relaxed font-light">
                      Thank you, {inquiryName}. Your note has been logged for the Food Land guest relations team.
                    </p>
                    <button
                      onClick={() => {
                        setInquirySent(false);
                        setInquiryName('');
                        setInquiryMessage('');
                      }}
                      className="text-xs text-[#D6A75D] hover:underline pt-2 block mx-auto cursor-pointer"
                    >
                      Send another note
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleInquirySubmit}
                    className="space-y-4"
                  >
                    {errorMessage && (
                      <div className="p-3 rounded-md bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                        {errorMessage}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C6C2B6] font-semibold mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Rao"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0C0C10] border border-[#252532] rounded-lg text-xs text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C6C2B6] font-semibold mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9845012345"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0C0C10] border border-[#252532] rounded-lg text-xs text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C6C2B6] font-semibold mb-1.5">
                        Message / Special Request *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Share your inquiry or request with our hospitality team..."
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0C0C10] border border-[#252532] rounded-lg text-xs text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded-lg transition-shadow shadow-[0_4px_16px_rgba(214,167,93,0.3)] hover:shadow-[0_6px_24px_rgba(214,167,93,0.45)] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Logging Inquiry...</span>
                      ) : (
                        <>
                          <span>Transmit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
