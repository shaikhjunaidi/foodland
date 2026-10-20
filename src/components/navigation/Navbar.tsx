import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onBookTable: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onBookTable }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Menu', id: 'menu' },
    { label: 'Meal Times', id: 'mealtimes' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#D6A75D]/15 py-3.5 shadow-xl'
          : 'bg-gradient-to-b from-[#0A0A0C]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="text-2xl font-serif font-bold tracking-tight text-[#FAF8F5] hover:text-[#D6A75D] transition-colors whitespace-nowrap shrink-0"
        >
          FOOD LAND
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#C6C2B6]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-[#D6A75D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button
            onClick={onBookTable}
            className="px-5 py-2 text-xs font-semibold tracking-wider uppercase text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded-md transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Table</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#FAF8F5] hover:text-[#D6A75D] transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F14] border-b border-[#D6A75D]/20 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left py-2 text-base font-medium text-[#C6C2B6] hover:text-[#D6A75D] border-b border-[#25252F] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  onBookTable();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-[#0A0A0C] bg-[#D6A75D] rounded-md"
              >
                Book a Table
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
