"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Flame, Calendar, HardHat } from "lucide-react";
import { getGrindCopy } from "../utils/GrindCopy";

type grindType = {
    busiestDay: string,
    commitCount: number
} 

export default function GrindPage({busiestDay,commitCount}:grindType) {
  const grind = getGrindCopy(commitCount);

  return (
    <div className="h-screen pb-25 md:pb-0 w-full bg-neutral-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="z-10 text-center flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest text-sm mb-8"
        >
          <HardHat size={16} /> Chapter 04: The Grind
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-neutral-400 mb-6 italic">
          {grind.title}
        </h2>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(249,115,22,1)] rounded-xl mb-12"
        >
          <div className="flex items-center justify-center gap-0 w-full md:gap-4 text-orange-500 mb-2">
            <Flame  className="w-19 h-19 md:w-11 md:h-11 fill-current" />
            <span className="text-black font-black text-3xl md:text-5xl italic tracking-tighter">
              {busiestDay}
            </span>
          </div>
          <p className="text-black text-2xl font-bold">
            Was your busiest day of 2025 with <span className="underline decoration-4 decoration-orange-500">{commitCount} commits.</span>
          </p>
        </motion.div>

        <p className="text-xl text-neutral-500 max-w-sm italic">
          {grind.ai}
        </p>
      </div>

    </div>
  );
}