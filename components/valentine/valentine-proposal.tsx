'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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
  const [currentScreen, setCurrentScreen] = useState<Screen>('one');

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Fondo oscuro con gradiente dorado sutil - SIN blur */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-neutral-950 to-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/10 via-transparent to-amber-900/10" />
      </div>

      {/* Luz dorada sutil - radial gradient estático, sin blur */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-yellow-500/8 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-amber-500/6 to-transparent" />
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentScreen === 'one' && (
            <motion.div
              key="screen-one"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex items-center justify-center"
            >
              <ScreenThree videoUrl={videoUrl} onNext={() => setCurrentScreen('four')} />
            </motion.div>
          )}

          {currentScreen === 'four' && (
            <motion.div
              key="screen-four"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
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
