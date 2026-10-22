export const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: luxuryEase,
      delay: customDelay,
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: customDelay,
    },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const cardHover = {
  rest: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  hover: {
    y: -6,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const buttonTap = {
  tap: { scale: 0.97 },
  hover: { scale: 1.02 },
};
