"use client";

import { motion } from "framer-motion";
import { Flame, HardHat, Calendar } from "lucide-react";
import { getGrindCopy } from "../utils/GrindCopy";

type grindType = {
  busiestDay: string,
  commitCount: number
} 

export default function GrindPage({ busiestDay, commitCount }: grindType) {
  const grind = getGrindCopy(commitCount);

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center opacity-5 md:opacity-4 select-none pointer-events-none">
        <h1 className="text-[35vw] md:text-[30vw] font-black italic tracking-tighter">GRIND</h1>
      </div>

      <div className="z-10 text-center flex flex-col items-center px-6 pb-8 w-full">

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-zinc-500 font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs mb-8 md:mb-10"
        >
          Chapter 04: The Grind
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-2xl font-serif italic text-zinc-400 mb-3 md:mb-12"
        >
          {grind.title}
        </motion.h2>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 w-full"
        >
          <div className="flex flex-col items-center w-full">
            <Calendar size={28} className="text-zinc-700 mb-4 md:w-8 md:h-8" />
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none wrap-break-word px-2">
              {busiestDay}
            </h1>
          </div>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-px bg-orange-500" 
          />

          <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 md:gap-3 text-orange-500 mb-4 md:mb-2">
                <Flame size={18} className="fill-current md:w-5 md:h-5" />
                <span className="font-mono uppercase tracking-widest text-[10px] md:text-xs">Peak Velocity</span>
             </div>
             <p className="text-4xl md:text-6xl font-serif italic text-white">
               {commitCount} <span className="text-zinc-500 text-xl md:text-2xl not-italic">Commits</span>
             </p>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 md:mt-16 text-zinc-400 text-xs md:text-base font-light max-w-70 md:max-w-sm italic leading-relaxed"
        >
          {grind.insight}
        </motion.p>
      </div>

    </div>
  );
}