'use client';

import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from './decrypted-text';
import CardSwap, { Card } from './card-swap';
import { useState } from 'react';

interface ScreenTwoProps {
  onYes: () => void;
  onNo: () => void;
}

export default function ScreenTwo({ onYes, onNo }: ScreenTwoProps) {
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 350;
    const randomY = (Math.random() - 0.5) * 350;
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    if (!showSecondQuestion) {
      setShowSecondQuestion(true);
    } else {
      onYes();
    }
  };

  const handleNo = () => {
    if (showSecondQuestion) {
      setShowSecondQuestion(false);
      setNoButtonPosition({ x: 0, y: 0 });
    } else {
      onNo();
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start py-10 px-6 gap-8 md:gap-12"
    >
      {/* Rosa con glow CSS puro */}
      <motion.div variants={itemVariants} className="flex-shrink-0 mt-6">
        <span
          className="text-[8rem] md:text-[10rem] inline-block"
          style={{ textShadow: '0 0 40px rgba(250, 204, 21, 0.6)' }}
        >
          🌹
        </span>
      </motion.div>

      {/* Separador */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-yellow-400/60 rounded-full" />
        <span className="text-3xl">💭</span>
        <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-amber-400/60 rounded-full" />
      </motion.div>

      {/* Preguntas con transición */}
      <AnimatePresence mode="wait">
        {!showSecondQuestion ? (
          <motion.div
            key="first-question"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-3xl flex-shrink-0 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
              <DecryptedText
                text="¿Estás seguro/a?"
                speed={60}
                animateOn="view"
                sequential
                className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
                encryptedClassName="text-yellow-200/60"
              />
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="second-question"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-3xl flex-shrink-0 px-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
              <DecryptedText
                text="¿O me mientes?"
                speed={60}
                animateOn="view"
                sequential
                className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
                encryptedClassName="text-amber-200/60"
              />
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Separador */}
      <motion.div variants={itemVariants} className="flex items-center gap-4">
        <div className="h-0.5 w-20 bg-gradient-to-r from-transparent to-amber-400/60 rounded-full" />
        <span className="text-2xl">✨</span>
        <div className="h-0.5 w-20 bg-gradient-to-l from-transparent to-yellow-400/60 rounded-full" />
      </motion.div>

      {/* CardSwap con animación ligera */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-lg flex-shrink-0 my-6 relative"
        style={{ height: '340px', minHeight: '340px' }}
      >
        {/* Sparkles decorativas alrededor de las fotos */}
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -top-4 -right-2 text-xl z-20 pointer-events-none"
        >
          ✨
        </motion.span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -top-4 -left-2 text-xl z-20 pointer-events-none"
        >
          💛
        </motion.span>
        <motion.span
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-lg z-20 pointer-events-none"
        >
          ⭐
        </motion.span>

        {/* Glow sutil detrás de las cards (radial gradient, sin blur filter) */}
        <div className="absolute inset-0 -m-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.12)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <CardSwap
            cardDistance={40}
            verticalDistance={50}
            delay={5500}
            pauseOnHover={true}
            easing="linear"
            width="100%"
            height="300px"
          >
            <Card customClass="rounded-3xl bg-neutral-900/80 border border-yellow-400/30 shadow-lg shadow-yellow-500/10 overflow-hidden">
              <div className="w-full h-full">
                <img src="/images/two2.jpg" alt="Foto 4" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
            </Card>
            <Card customClass="rounded-3xl bg-neutral-900/80 border border-yellow-400/30 shadow-lg shadow-yellow-500/10 overflow-hidden">
              <div className="w-full h-full">
                <img src="/images/two1.jpg" alt="Foto 5" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
            </Card>
            <Card customClass="rounded-3xl bg-neutral-900/80 border border-yellow-400/30 shadow-lg shadow-yellow-500/10 overflow-hidden">
              <div className="w-full h-full">
                <img src="/images/two3.jpg" alt="Foto 6" className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
            </Card>
          </CardSwap>
        </motion.div>
      </motion.div>

      {/* Separador */}
      <motion.div variants={itemVariants} className="flex items-center gap-4 my-4">
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-yellow-400/60 rounded-full" />
        <span className="text-3xl">💛</span>
        <div className="h-0.5 w-24 bg-gradient-to-l from-transparent to-amber-400/60 rounded-full" />
      </motion.div>

      {/* Botones */}
      <motion.div variants={itemVariants} className="flex gap-6 flex-wrap justify-center items-center my-6 mb-12 flex-shrink-0">
        <motion.button
          onClick={handleYes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-black rounded-full font-bold text-xl shadow-lg"
        >
          {showSecondQuestion ? '¡Claro que sí! 💛' : '¡Sí, seguro! 💛'}
        </motion.button>

        <motion.button
          animate={noButtonPosition}
          onHoverStart={handleNoHover}
          onClick={handleNo}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-neutral-900 text-yellow-400 border border-yellow-500/30 rounded-full font-bold text-xl shadow-lg cursor-pointer"
        >
          {showSecondQuestion ? 'No, es mentira 😅' : 'Ehh... no 😬'}
        </motion.button>
      </motion.div>

      {/* Indicador de progreso - sin animación */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="px-8 py-3 rounded-full bg-neutral-900/60 border border-yellow-400/20">
          <p className="text-base font-semibold text-yellow-100/80">
            {showSecondQuestion ? '✨ ¡Casi lo tienes! ✨' : '💛 Vamos, atrévete... 💛'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
