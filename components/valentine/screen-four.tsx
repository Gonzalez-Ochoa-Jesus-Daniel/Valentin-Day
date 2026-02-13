'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ScreenFourProps {
  audioUrl?: string;
}

export default function ScreenFour({ audioUrl }: ScreenFourProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;
    audio.volume = 0.7;
    audio.loop = true;
    const tryPlay = () => {
      audio.play().then(() => setAudioStarted(true)).catch(() => {});
    };
    tryPlay();
    const handler = () => { tryPlay(); window.removeEventListener('click', handler); };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [audioUrl]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

      {/* Fondo estático - SIN blur orbs */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-950 to-black -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/15 via-transparent to-amber-900/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.08)_0%,transparent_50%)]" />
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 gap-6"
      >
        {/* Top decorative line */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/80" />
          <span className="text-2xl">✨</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/80" />
        </motion.div>

        {/* "Te amo" - hero text con gradient animado (lightweight - solo background-position) */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.h1
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black leading-none tracking-tight"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #facc15, #fde68a, #ffffff, #fde68a, #facc15)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 60px rgba(250, 204, 21, 0.4)',
            }}
          >
            Te amo
          </motion.h1>
        </motion.div>

        {/* "mucho" */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.h2
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold"
            style={{
              backgroundImage: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            mucho
          </motion.h2>
        </motion.div>

        {/* Heart - estático con textShadow en lugar de drop-shadow + pulse rings */}
        <motion.div variants={itemVariants} className="my-4">
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl sm:text-7xl md:text-8xl inline-block"
            style={{ textShadow: '0 0 40px rgba(250, 204, 21, 0.6)' }}
          >
            💛
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="text-center max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl font-medium text-yellow-100/80"
          >
            Eres lo mejor que me ha pasado 💫
          </motion.p>
        </motion.div>

        {/* Bottom emojis - estáticos, SIN drop-shadow, SIN bounce */}
        <motion.div variants={itemVariants} className="flex gap-5 justify-center text-3xl mt-2">
          {['⭐', '💛', '✨', '🌟', '💫'].map((emoji, i) => (
            <span key={i}>{emoji}</span>
          ))}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/80" />
          <span className="text-2xl">✨</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/80" />
        </motion.div>

        {/* Tap to play hint */}
        {!audioStarted && audioUrl && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-yellow-300/60 text-sm mt-4"
          >
            Toca la pantalla para escuchar la música 🎵
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
