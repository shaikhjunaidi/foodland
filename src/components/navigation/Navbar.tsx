import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar } from 'lucide-react';
import { luxuryEase } from '../../utils/animations';

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
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: luxuryEase }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#D6A75D]/15 py-3.5 shadow-xl'
          : 'bg-gradient-to-b from-[#0A0A0C]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Brand Wordmark with subtle hover glow */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="text-2xl font-serif font-bold tracking-tight text-[#FAF8F5] hover:text-[#D6A75D] transition-colors whitespace-nowrap shrink-0"
        >
          FOOD LAND
        </motion.a>

        {/* Desktop Nav Links with animated hover underline */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#C6C2B6]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="relative hover:text-[#D6A75D] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D6A75D] transition-all duration-300 group-hover:w-full rounded-full" />
            </button>
          ))}
        </nav>

        {/* Primary Action Button */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBookTable}
            className="px-5 py-2 text-xs font-semibold tracking-wider uppercase text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded-md transition-shadow shadow-md hover:shadow-[0_4px_16px_rgba(214,167,93,0.4)] whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Table</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#FAF8F5] hover:text-[#D6A75D] transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            className="lg:hidden bg-[#0F0F14]/98 backdrop-blur-xl border-b border-[#D6A75D]/20 px-6 py-6 shadow-2xl overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                },
              }}
              className="flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left py-2 text-base font-medium text-[#C6C2B6] hover:text-[#D6A75D] border-b border-[#25252F] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#D6A75D]/60">→</span>
                </motion.button>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="pt-2"
              >
                <button
                  onClick={() => {
                    onBookTable();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-[#0A0A0C] bg-[#D6A75D] hover:bg-[#E2BA77] rounded-md transition-colors"
                >
                  Book a Table
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
