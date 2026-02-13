'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import ScreenOne from './screen-one';
import ScreenTwo from './screen-two';
import ScreenThree from './screen-three';
import ScreenFour from './screen-four';

type Screen = 'one' | 'two' | 'three' | 'four';

interface ValentineProposalProps {
  videoUrl?: string;
  audioUrl?: string;
}

export function ValentineProposal({ videoUrl, audioUrl }: ValentineProposalProps) {
  const reducedMotion = useReducedMotion();
  const heartCount = reducedMotion ? 3 : 5;
  const heartIndices = useMemo(() => Array.from({ length: heartCount }, (_, i) => i), [heartCount]);
  const [currentScreen, setCurrentScreen] = useState<Screen>('one');

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Gradiente de fondo oscuro elegante */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-950 to-black">
        {/* Overlay para contraste dorado */}
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/15 via-transparent to-amber-900/15"></div>
      </div>

      {/* Corazones dorados flotantes en el fondo - optimized */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {heartIndices.map((i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 10) + 5}%`,
              y: '120%',
              opacity: 0.4,
              scale: 0.6 + (i % 3) * 0.2,
            }}
            animate={{
              y: '-20%',
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear',
            }}
            className="absolute will-change-transform"
            style={{
              fontSize: `${2 + (i % 3)}rem`,
              filter: 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.5))',
            }}
          >
            💛
          </motion.div>
        ))}
      </div>

      {/* Efectos de luz dorados */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-[480px] h-[480px] bg-yellow-500/15 rounded-full blur-[120px] animate-float-rotate motion-reduce:animate-none"></div>
        <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-amber-400/15 rounded-full blur-[120px] animate-float-rotate motion-reduce:animate-none" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-yellow-300/10 rounded-full blur-[100px] animate-pulse motion-reduce:animate-none"></div>
      </div>

      {/* Contenedor principal con transiciones suaves */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentScreen === 'one' && (
            <motion.div
              key="screen-one"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <ScreenOne 
                onYes={() => setCurrentScreen('two')} 
                onNo={() => setCurrentScreen('one')} 
              />
            </motion.div>
          )}

          {currentScreen === 'two' && (
            <motion.div
              key="screen-two"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <ScreenTwo 
                onYes={() => setCurrentScreen('three')} 
                onNo={() => setCurrentScreen('one')} 
              />
            </motion.div>
          )}

          {currentScreen === 'three' && (
            <motion.div
              key="screen-three"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <ScreenThree videoUrl={videoUrl} onNext={() => setCurrentScreen('four')} />
            </motion.div>
          )}

          {currentScreen === 'four' && (
            <motion.div
              key="screen-four"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <ScreenFour audioUrl={audioUrl} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
