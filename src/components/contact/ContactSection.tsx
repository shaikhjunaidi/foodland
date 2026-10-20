import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, MessageSquare, Send, Check } from 'lucide-react';

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

    // Simulate preview response without inventing arbitrary external endpoints
    setTimeout(() => {
      setIsSubmitting(false);
      setInquirySent(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-28 px-6 bg-[#0E0E14] border-t border-[#D6A75D]/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Details & Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address Card */}
              <div className="p-6 rounded-lg bg-[#14141B] border border-[#D6A75D]/20">
                <div className="w-10 h-10 rounded-md bg-[#D6A75D]/15 flex items-center justify-center text-[#D6A75D] mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-base font-serif font-semibold text-[#FAF8F5] mb-1">
                  Restaurant Location
                </h4>
                <p className="text-xs text-[#C6C2B6] leading-relaxed mb-2">
                  Food Land, Koppal<br />
                  Karnataka, India — 583231
                </p>
                <span className="text-[11px] text-[#D6A75D]/90 block">
                  *Specific street/landmark address placeholder awaiting owner confirmation.
                </span>
              </div>

              {/* Phone / Inquiries Card */}
              <div className="p-6 rounded-lg bg-[#14141B] border border-[#D6A75D]/20">
                <div className="w-10 h-10 rounded-md bg-[#D6A75D]/15 flex items-center justify-center text-[#D6A75D] mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-base font-serif font-semibold text-[#FAF8F5] mb-1">
                  Telephone Contact
                </h4>
                <p className="text-xs text-[#C6C2B6] leading-relaxed mb-2">
                  [Verified Owner Phone Number]
                </p>
                <span className="text-[11px] text-[#D6A75D]/90 block">
                  *Pending official restaurant line approval.
                </span>
              </div>

              {/* Operating Hours Card */}
              <div className="p-6 rounded-lg bg-[#14141B] border border-[#D6A75D]/20">
                <div className="w-10 h-10 rounded-md bg-[#D6A75D]/15 flex items-center justify-center text-[#D6A75D] mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-serif font-semibold text-[#FAF8F5] mb-1">
                  Dining Service Hours
                </h4>
                <p className="text-xs text-[#C6C2B6] leading-relaxed mb-2">
                  Breakfast · Lunch · Dinner<br />
                  7 Days a Week
                </p>
                <span className="text-[11px] text-[#D6A75D]/90 block">
                  *Detailed shift timings to be confirmed by owner.
                </span>
              </div>

              {/* Pure Veg Discipline Card */}
              <div className="p-6 rounded-lg bg-[#14141B] border border-[#D6A75D]/20">
                <div className="w-10 h-10 rounded-md bg-[#D6A75D]/15 flex items-center justify-center text-[#D6A75D] mb-4">
                  <span className="text-lg">🌿</span>
                </div>
                <h4 className="text-base font-serif font-semibold text-[#FAF8F5] mb-1">
                  100% Pure Vegetarian
                </h4>
                <p className="text-xs text-[#C6C2B6] leading-relaxed mb-2">
                  Strictly No Meat · No Fish · No Eggs
                </p>
                <span className="text-[11px] text-[#D6A75D]/90 block">
                  Universal vegetarian sanctity guaranteed.
                </span>
              </div>
            </div>

            {/* Koppal Region Map Frame */}
            <div className="p-6 rounded-lg bg-[#14141B] border border-[#D6A75D]/20 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 text-xs text-[#A6A296]">
                <span className="text-[#D6A75D] uppercase tracking-wider font-semibold">
                  Map View: Koppal, Karnataka
                </span>
                <span>Coordinates: 15.3456° N, 76.1558° E</span>
              </div>

              {/* Elegant Graphic Map Placeholder */}
              <div className="h-64 rounded-md bg-[#0C0C12] border border-[#252532] relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#D6A75D_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
                
                {/* Visual Location Pin */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#D6A75D]/20 border border-[#D6A75D] flex items-center justify-center text-[#D6A75D] mb-3 shadow-[0_0_24px_rgba(214,167,93,0.3)]">
                  <MapPin className="w-6 h-6 animate-pulse" />
                </div>
                <h5 className="relative z-10 text-base font-serif font-bold text-[#FAF8F5] mb-1">
                  Food Land Restaurant — Koppal
                </h5>
                <p className="relative z-10 text-xs text-[#8E8B82] max-w-sm mb-3">
                  Awaiting owner's approved Google Maps embed URL or street coordinates to activate live interactive map view.
                </p>
                <span className="relative z-10 px-3 py-1 bg-[#1A1A24] border border-[#D6A75D]/30 text-[11px] text-[#D6A75D] rounded">
                  Koppal City Center Region
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message / Inquiry Box */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-xl bg-[#14141B] border border-[#D6A75D]/25 shadow-xl">
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

              {inquirySent ? (
                <div className="p-6 rounded-lg bg-[#0C0C10] border border-[#D6A75D]/30 text-center space-y-3">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#D6A75D]/20 text-[#D6A75D] flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-[#FAF8F5]">
                    Inquiry Transmitted
                  </h4>
                  <p className="text-xs text-[#BFBAB0] leading-relaxed">
                    Thank you, {inquiryName}. Your note has been logged for the Food Land guest relations team.
                  </p>
                  <button
                    onClick={() => {
                      setInquirySent(false);
                      setInquiryName('');
                      setInquiryMessage('');
                    }}
                    className="text-xs text-[#D6A75D] hover:underline pt-2 block mx-auto"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
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
                      className="w-full px-4 py-2.5 bg-[#0C0C10] border border-[#252532] rounded-md text-xs text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D]"
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
                      className="w-full px-4 py-2.5 bg-[#0C0C10] border border-[#252532] rounded-md text-xs text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C6C2B6] font-semibold mb-1.5">
                      Message / Special Request *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ask about family gatherings, Jain meal options, catering, or visiting hours..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0C0C10] border border-[#252532] rounded-md text-xs text-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#D6A75D] resize-none"
                    />
                  </div>

                  <div className="text-[11px] text-[#8E8B82] flex items-center gap-1.5">
                    <span className="text-[#D6A75D]">✦</span>
                    <span>Development preview: Form submissions are simulated locally until the official owner endpoint is connected.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 text-xs font-semibold uppercase tracking-wider text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Transmitting Note...' : 'Transmit Inquiry'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
