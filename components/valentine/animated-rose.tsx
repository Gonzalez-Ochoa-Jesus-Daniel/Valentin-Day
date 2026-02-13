'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedRoseProps {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export default function AnimatedRose({ size = 'md', animate = true }: AnimatedRoseProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animate && !reducedMotion;
  const sparkleCount = shouldAnimate ? 4 : 0;
  const sparkleIndices = Array.from({ length: sparkleCount }, (_, i) => i);
  const sizeMap = {
    sm: 'text-8xl',
    md: 'text-[10rem]',
    lg: 'text-[14rem]',
  };

  const roseVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 80,
      },
    },
    float: {
      y: [-25, 25, -25],
      x: [-10, 10, -10],
      rotate: [0, 12, -12, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      variants={roseVariants}
      initial="initial"
      animate={shouldAnimate ? ['animate', 'float'] : 'animate'}
      className="relative inline-block"
    >
      {/* Rosa emoji hermosa con efectos de glow */}
      <div className={`${sizeMap[size]} filter drop-shadow-2xl relative`}>
        <span 
          className="inline-block"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(250, 204, 21, 0.8)) drop-shadow(0 0 60px rgba(245, 158, 11, 0.6)) drop-shadow(0 0 90px rgba(217, 119, 6, 0.4))',
          }}
        >
          🌹
        </span>
      </div>

      {/* Brillos alrededor de la rosa - optimized */}
      {sparkleIndices.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.33,
            ease: 'easeInOut',
          }}
          className="absolute text-3xl will-change-transform"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-${size === 'lg' ? '140' : size === 'md' ? '100' : '70'}px)`,
            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))',
          }}
        >
          ✨
        </motion.div>
      ))}
    </motion.div>
  );
}
