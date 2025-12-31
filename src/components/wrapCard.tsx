"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Github, Calendar, Code2, Terminal, Quote } from "lucide-react";

type WrappedCardProps = {
  username: string;
  avatarUrl?: string;
  totalCommits: number;
  persona: string;
  topLanguage: string;
  busiestDay: string;
  quote: string;
};

export const WrappedCard = forwardRef<HTMLDivElement, WrappedCardProps>(
  ({ username, avatarUrl, totalCommits, persona, topLanguage, busiestDay, quote }, ref) => {
    
    // Animation Variants
    const container = {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
      }
    };

    const item = {
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0 }
    };

    return (
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative w-[90vw] md:w-112.5 aspect-4/5 bg-[#0a0a0a] text-zinc-100 p-5 md:p-6 overflow-hidden 
        flex flex-col justify-between border-3 border-white/60 shadow-[0_0_50px_rgba(0,0,0,1)] font-sans"
      >
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/20 blur-[120px] rounded-full" />
           <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-600/20 blur-[120px] rounded-full" />
        </div>

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
                <img 
                    src={avatarUrl} 
                    alt={username} 
                    className="w-18 h-18 md:w-25 md:h-25 rounded-full object-cover border border-white/20 transition-all duration-500" 
                />
                <div className="absolute bottom-1 -right-1 md:-right-2 bg-white text-black rounded-full p-1">
                    <Github size={12} className="md:w-3.5" />
                </div>
            </div>
            <div>
              <p className="text-[10px] md:text-[12px] tracking-[0.3em] uppercase text-zinc-500 font-bold">Identity</p>
              <h3 className="text-[18px] md:text-[22px] font-bold tracking-tighter">@{username}</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] md:text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded uppercase tracking-widest text-zinc-400">
              Session 2025
            </span>
          </div>
        </div>

        <motion.div variants={item} className="z-10 mt-4 md:mt-5">
          <p className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-black mb-1">Character Class</p>
          <h1 className="text-[32px] md:text-[40px] font-black italic tracking-tighter leading-none bg-linear-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            {persona.toUpperCase()}
          </h1>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 z-10">
          <motion.div variants={item} className="group flex flex-col p-3 md:p-4 bg-white/3 border border-white/5 rounded-[5px] hover:bg-white/6 transition-colors">
            <div className="flex items-center gap-2 text-green-600 mb-1 md:mb-2">
                <Terminal size={14} />
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-green-600 font-bold">Total Commits</span>
            </div>
            <span className="text-[24px] md:text-[34px] font-serif italic text-zinc-400">{totalCommits.toLocaleString()}</span>
          </motion.div>

          <motion.div variants={item} className="group flex flex-col p-3 md:p-4 bg-white/3 border border-white/5 rounded-[5px] hover:bg-white/6 transition-colors">
            <div className="flex items-center gap-2 text-zinc-400 mb-1 md:mb-2">
                <Code2 size={14} />
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold">Top Syntax</span>
            </div>
            <span className="text-[24px] md:text-[34px] font-serif italic text-blue-400">{topLanguage}</span>
          </motion.div>
        </div>

        <motion.div variants={item} className="z-10 space-y-3 mt-2 md:mt-1 md:space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Calendar size={14} className="text-emerald-500 md:w-4" />
            <span className="text-[13px] md:text-[16px] font-medium tracking-tight">Your peak velocity was on <span className="text-white underline">{busiestDay}</span>.</span>
          </div>

          <div className="relative p-3 md:p-4 bg-linear-to-br from-zinc-800 via-black to-zinc-800 rounded-[5px] border-2 border-white/14 shadow-inner italic text-zinc-300 text-[13px] md:text-[15px] leading-relaxed text-center">
            <Quote size={16} className="absolute -top-2 -left-1 md:-top-3 md:-left-2 text-white/30 rotate-180" />
            "{quote}"
            <Quote size={16} className="absolute -bottom-2 -right-1 md:-bottom-3 md:-right-2 text-white/30" />
          </div>
        </motion.div>

        <div className="flex justify-between items-end z-10 pt-3 opacity-40">
            <div className="flex gap-1 h-6 md:h-8 items-end">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="bg-zinc-300 w-[1.5px] md:w-0.5" style={{ height: `${Math.floor(Math.random() * 100)}%` }} />
                ))}
            </div>
            <p className="text-[10px] md:text-[12px] font-mono tracking-wider">
             <span className="uppercase">Directed by</span> GithubwrapX
            </p>
        </div>
      </motion.div>
    );
  }
);

WrappedCard.displayName = "ExperimentalWrappedCard";