import React, { useEffect, useRef, useState } from 'react';

interface HeroVideoPlayerProps {
  videoSrc?: string;
  posterSrc?: string;
  videoId?: string;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  videoSrc = '/videos/foodland_dosa_cinematic.mp4',
  posterSrc = '/images/dosa_hero_poster.jpg',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Detect system reduced-motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    return () => mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // Enforce strict silent playback and autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Safe fallback in case of strict mobile autoplay restrictions
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, [prefersReducedMotion, videoSrc]);

  return (
    <div className="relative w-full aspect-video min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] max-w-6xl mx-auto rounded-xl overflow-hidden bg-[#070709] border border-[#D6A75D]/25 shadow-[0_12px_48px_rgba(0,0,0,0.85)]">
      {prefersReducedMotion ? (
        // High-resolution static fallback image respecting reduced motion
        <img
          src={posterSrc}
          alt="Food Land Pure Vegetarian Set Dosa Craftsmanship"
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          aria-label="Food Land signature South Indian Set Dosa continuous cinematic presentation"
        />
      )}

      {/* Cinematic subtle edge vignette and warm gold lighting ambiance */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/25" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(10,10,12,0.7)]" />

      {/* Clean status badge emphasizing pure vegetarian culinary craftsmanship */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0C0C12]/80 border border-[#D6A75D]/25 backdrop-blur-md text-[11px] text-[#E5D2B8] tracking-wider uppercase font-medium shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6A75D] animate-pulse" />
          <span>Set Dosa Culinary Experience</span>
          <span className="text-[#8E8B82]">·</span>
          <span>100% Pure Vegetarian</span>
        </div>
      </div>
    </div>
  );
};
