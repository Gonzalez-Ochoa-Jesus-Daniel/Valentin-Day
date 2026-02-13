'use client';

import { motion } from 'framer-motion';
import DecryptedText from './decrypted-text';

interface ScreenThreeProps {
  videoUrl?: string;
  onNext: () => void;
}

export default function ScreenThree({ videoUrl, onNext }: ScreenThreeProps) {
  const effectiveVideoUrl = videoUrl ?? '/videos/video-10s.mp4';

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden relative">
      {/* Fondo oscuro - SIN blur orbs */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-950 to-black -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/10 via-transparent to-amber-900/10" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full min-h-full flex flex-col items-center justify-start py-12 px-6 gap-8"
      >
        {/* Texto SEGURISIMA */}
        <motion.div variants={itemVariants} className="text-center max-w-4xl flex-shrink-0 px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-wide text-balance">
            <DecryptedText
              text="SEGURISIMA"
              speed={70}
              animateOn="view"
              sequential
              className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
              encryptedClassName="text-yellow-200/60"
            />
          </h1>
        </motion.div>

        {/* Rosa simple */}
        <motion.div variants={itemVariants} className="flex-shrink-0">
          <span
            className="text-[8rem] md:text-[10rem] inline-block"
            style={{ textShadow: '0 0 30px rgba(250, 204, 21, 0.5)' }}
          >
            🌹
          </span>
        </motion.div>

        {/* Anuncio antes del video */}
        <motion.div variants={itemVariants} className="w-full max-w-3xl flex-shrink-0">
          <div className="rounded-2xl bg-neutral-900/60 border border-yellow-400/20 px-6 py-5 text-center">
            <p className="text-lg sm:text-xl font-semibold text-yellow-100/80">
              Espera viene un pequeno video y despues las gracias pero espera
            </p>
          </div>
        </motion.div>

        {/* Video - SIN blur, SIN shadow pesado */}
        <motion.div variants={itemVariants} className="w-full max-w-3xl flex-shrink-0 my-4">
          <div className="rounded-2xl overflow-hidden border border-yellow-400/20 bg-black">
            <div className="aspect-video">
              <video
                src={effectiveVideoUrl}
                className="w-full h-full"
                controls
                playsInline
                preload="auto"
              />
            </div>
          </div>
        </motion.div>

        {/* Gracias */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl flex-shrink-0 px-4">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-balance">
            <DecryptedText
              text="¡Gracias!"
              speed={60}
              animateOn="view"
              sequential
              className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
              encryptedClassName="text-yellow-200/60"
            />
          </h1>
        </motion.div>

        {/* Te amo */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 justify-center flex-shrink-0">
          <span className="text-4xl">⭐</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-balance">
            <DecryptedText
              text="Te amo"
              speed={60}
              animateOn="view"
              sequential
              className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
              encryptedClassName="text-yellow-200/60"
            />
          </h2>
          <span className="text-4xl">⭐</span>
        </motion.div>

        {/* Botón */}
        <motion.div variants={itemVariants} className="flex justify-center w-full my-4">
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black font-bold text-lg shadow-lg"
          >
            Ver la cancion 🎵
          </motion.button>
        </motion.div>

        {/* Emojis decorativos estáticos */}
        <motion.div variants={itemVariants} className="flex gap-4 justify-center text-3xl my-6 flex-shrink-0">
          {['⭐', '💛', '✨', '🌟', '💫'].map((emoji, i) => (
            <span key={i}>{emoji}</span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
