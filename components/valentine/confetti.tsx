'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
  drift: number;
  rotate: number;
}

interface ConfettiProps {
  intensity?: number;
}

export default function Confetti({ intensity = 1 }: ConfettiProps) {
  const reducedMotion = useReducedMotion();
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    const update = () => setViewportHeight(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const confettiCount = Math.max(4, Math.round((reducedMotion ? 12 : 30) * intensity));
  const heartsCount = Math.max(3, Math.round((reducedMotion ? 6 : 14) * intensity));
  const sparklesCount = Math.max(4, Math.round((reducedMotion ? 8 : 20) * intensity));

  const confetti = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: confettiCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 2.5 + Math.random() * 1.5,
        scale: Math.random() * 0.6 + 0.7,
        drift: (Math.random() - 0.5) * 50,
        rotate: Math.random() * 720,
      })),
    [confettiCount]
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: heartsCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 4 + Math.random() * 2,
        scale: Math.random() * 0.7 + 0.5,
        drift: (Math.random() - 0.5) * 80,
        rotate: Math.random() * 720,
      })),
    [heartsCount]
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: sparklesCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
      })),
    [sparklesCount]
  );

  const emojis = ['⭐', '💛', '✨', '🌟', '💫', '⚡', '🔥'];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Confetti principal */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            y: -40,
            x: `${piece.left}%`,
            opacity: 1,
            scale: piece.scale,
          }}
          animate={{
            y: viewportHeight + 40,
            x: `${piece.left + piece.drift}%`,
            opacity: 0,
            rotate: piece.rotate,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
          className="absolute text-2xl font-bold"
        >
          {emojis[piece.id % emojis.length]}
        </motion.div>
      ))}

      {/* Corazones adicionales que caen más lentamente */}
      {hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          initial={{
            y: -60,
            x: `${heart.left}%`,
            opacity: 1,
            scale: heart.scale,
          }}
          animate={{
            y: viewportHeight + 60,
            x: `${heart.left + heart.drift}%`,
            opacity: 0,
            rotate: heart.rotate,
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: 'easeIn',
          }}
          className="fixed text-3xl font-bold"
        >
          {emojis[heart.id % emojis.length]}
        </motion.div>
      ))}

      {/* Partículas de luz (brillos) */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          initial={{
            y: -20,
            x: `${sparkle.left}%`,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            y: viewportHeight + 20,
            x: `${sparkle.left}%`,
            opacity: 0,
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            ease: 'easeIn',
          }}
          className="fixed text-lg"
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
