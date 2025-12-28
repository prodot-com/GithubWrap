"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Flame, Calendar, HardHat } from "lucide-react";

type grindType = {
    busiestDay: string,
    commitCount: number
} 

export default function GrindPage({busiestDay,commitCount}:grindType) {
  // Mock Data: In production, fetch this from GitHub's contributionCalendar
//   const busiestDay = "October 14th";
//   const commitCount = 42;

  return (
    <div className="h-screen w-full bg-neutral-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background: Pulsing Heatmap Squares */}
      <div className="absolute inset-0 grid grid-cols-10 md:grid-cols-20 gap-2 opacity-5 p-4">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.5, 0.1],
              backgroundColor: i % 7 === 0 ? "#22c55e" : "#1e293b" 
            }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            className="aspect-square rounded-sm"
          />
        ))}
      </div>

      <div className="z-10 text-center flex flex-col items-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest text-sm mb-8"
        >
          <HardHat size={16} /> Chapter 04: The Grind
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-neutral-400 mb-2 italic">
          You never clocked out.
        </h2>

        {/* Busiest Day Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(249,115,22,1)] rounded-xl mb-12"
        >
          <div className="flex items-center justify-center gap-4 text-orange-500 mb-2">
            <Flame size={40} className="fill-current animate-bounce" />
            <span className="text-black font-black text-5xl italic tracking-tighter">
              {busiestDay}
            </span>
          </div>
          <p className="text-black text-2xl font-bold">
            Was your busiest day of 2025 with <span className="underline decoration-4 decoration-orange-500">{commitCount} commits.</span>
          </p>
        </motion.div>

        <p className="text-xl text-neutral-500 max-w-sm italic">
          "The AI noticed a massive spike in activity. Were you even sleeping that week?"
        </p>
      </div>

    </div>
  );
}