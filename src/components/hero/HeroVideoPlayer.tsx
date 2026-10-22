import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';

interface HeroVideoPlayerProps {
  mp4Src?: string;
  webmSrc?: string;
  posterSrc?: string;
  altText?: string;
  className?: string;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  mp4Src = `${import.meta.env.BASE_URL}videos/foodland_dosa_cinematic.mp4`,
  webmSrc = `${import.meta.env.BASE_URL}videos/foodland_dosa_cinematic.webm`,
  posterSrc = `${import.meta.env.BASE_URL}images/dosa_hero_poster.jpg`,
  altText = 'Food Land Signature South Indian Set Dosa Craftsmanship',
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const p = video.play();
    if (p !== undefined) {
      p.then(() => setIsPlaying(true)).catch((err) => {
        console.log('Video autoplay deferred by browser policy:', err);
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    startPlayback();

    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('canplay', startPlayback);
    video.addEventListener('loadeddata', startPlayback);

    // Global listener for first user interaction (scroll or touch) to unlock autoplay if restricted
    const unlockAutoplay = () => {
      if (video.paused) {
        startPlayback();
      }
    };

    window.addEventListener('pointerdown', unlockAutoplay, { passive: true });
    window.addEventListener('touchstart', unlockAutoplay, { passive: true });
    window.addEventListener('scroll', unlockAutoplay, { passive: true, once: true });

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('canplay', startPlayback);
      video.removeEventListener('loadeddata', startPlayback);
      window.removeEventListener('pointerdown', unlockAutoplay);
      window.removeEventListener('touchstart', unlockAutoplay);
      window.removeEventListener('scroll', unlockAutoplay);
    };
  }, [startPlayback]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = true;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={togglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full aspect-video min-h-[360px] sm:min-h-[460px] lg:min-h-[560px] max-w-6xl mx-auto rounded-xl overflow-hidden bg-[#070709] border border-[#D6A75D]/30 hover:border-[#D6A75D]/60 transition-all duration-300 shadow-[0_12px_48px_rgba(0,0,0,0.85)] cursor-pointer select-none ${className}`}
      role="region"
      aria-label="Interactive Cinematic Dosa Video Presentation"
    >
      <video
        ref={videoRef}
        src={mp4Src}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover pointer-events-none"
        aria-label={altText}
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
        <img
          src={posterSrc}
          alt={altText}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </video>

      {/* Cinematic subtle edge vignette and warm gold lighting ambiance */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/25" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(10,10,12,0.7)]" />

      {/* Top Floating Badge: Mode & Interactive indicator */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C0C12]/85 border border-[#D6A75D]/35 backdrop-blur-md text-[11px] text-[#E5D2B8] tracking-wider uppercase font-medium shadow-lg transition-transform group-hover:scale-105">
          <Sparkles className="w-3.5 h-3.5 text-[#D6A75D] animate-spin-slow" />
          <span>Cinematic Animation</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Center Play/Pause Indicator (Shown when paused or momentarily hovered) */}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <div className="w-16 h-16 rounded-full bg-[#D6A75D] text-[#0A0A0C] flex items-center justify-center shadow-[0_0_30px_rgba(214,167,93,0.6)] transform hover:scale-110 transition-transform">
            <Play className="w-7 h-7 ml-1 fill-current" />
          </div>
        </div>
      )}

      {/* Status Badge in Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C0C12]/85 border border-[#D6A75D]/30 backdrop-blur-md text-[11px] text-[#E5D2B8] tracking-wider uppercase font-medium shadow-md">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#D6A75D] animate-ping' : 'bg-amber-500'}`} />
          <span>Set Dosa Craftsmanship</span>
          <span className="text-[#8E8B82]">·</span>
          <span>100% Pure Vegetarian</span>
          <span className="text-[#8E8B82]">·</span>
          <span className="text-[#D6A75D] font-mono">{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
        </div>
      </div>

      {/* Subtle hover control hint in bottom right */}
      {isHovered && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-[#D6A75D]/20 backdrop-blur-sm text-[10px] text-[#C6C2B6] tracking-wide">
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-[#D6A75D]" />
              <span>Click to pause</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#D6A75D]" />
              <span>Click to play</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
