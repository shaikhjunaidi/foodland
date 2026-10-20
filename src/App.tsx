import React, { useCallback } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { PhilosophySection } from './components/philosophy/PhilosophySection';
import { MenuSection } from './components/menu/MenuSection';
import { MealHighlights } from './components/highlights/MealHighlights';
import { GallerySection } from './components/gallery/GallerySection';
import { AboutSection } from './components/about/AboutSection';
import { ReservationSection } from './components/reservation/ReservationSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';

export default function App() {
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleBookTable = useCallback(() => {
    scrollToSection('reservation');
  }, [scrollToSection]);

  const handleExploreMenu = useCallback(() => {
    scrollToSection('menu');
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F3F1EC] selection:bg-[#D6A75D]/30 selection:text-[#FAF8F5]">
      {/* Sticky Navigation adhering to Top Bar Contract */}
      <Navbar
        onNavigate={scrollToSection}
        onBookTable={handleBookTable}
      />

      <main>
        {/* Cinematic Hero Section with 3D Explode-and-Reassemble Animation */}
        <HeroSection
          onExploreMenu={handleExploreMenu}
          onBookTable={handleBookTable}
        />

        {/* Restaurant Philosophy: 100% Pure Vegetarian & Koppal Roots */}
        <PhilosophySection />

        {/* Approved Menu Section: Strictly 7 Verified Dishes */}
        <MenuSection />

        {/* Meal Schedules: Breakfast, Lunch, and Twilight Dining */}
        <MealHighlights />

        {/* Atmosphere & Visual Gallery: Authentic Placeholders Awaiting Owner Photos */}
        <GallerySection />

        {/* About Us: Heritage & Pure Vegetarian Hospitality */}
        <AboutSection />

        {/* Table Reservation Form with Validation & Status Handling */}
        <ReservationSection />

        {/* Contact and Koppal Location Section */}
        <ContactSection />
      </main>

      {/* Elegant Footer */}
      <Footer
        onNavigate={scrollToSection}
        onBookTable={handleBookTable}
      />
    </div>
  );
}
