"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

type IntroProps = {
  user: {
    login: string;
    avatar_url: string;
  };
  userId: string;
};

const Intro = ({ user, userId }: IntroProps) => {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center justify-center overflow-hidden relative">
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-500/25 blur-[120px] rounded-full pointer-events-none" /> */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-500/25 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center text-center px-6 max-w-4xl">

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12"
        >
          <div className="relative p-[0.75] rounded-full overflow-hidden">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-white/10 transition-all duration-700 relative z-10 object-cover"
            />
            <BorderBeam
              size={150}
              duration={4}
              borderWidth={2}
              className="from-transparent via-blue-500 to-transparent"
            />
          </div>
        </motion.div>

        <div className="space-y-6 mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 font-mono tracking-[0.4em] uppercase text-[10px] md:text-xs flex items-center justify-center gap-3"
          >
            Chapter 01: The Collection
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-8xl font-serif italic tracking-tighter leading-[0.9] text-white"
          >
            2025 WAS <br /> 
            <span className="">SIGNIFICANT.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-zinc-400 text-lg md:text-xl font-light tracking-tight"
          >
            A digital archive of your journey, <span className="text-white font-medium underline underline-offset-7 decoration-zinc-700">@{user.login}</span>.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href={`/wrap/${userId}`}
            className="group relative flex items-center gap-1 bg-zinc-100 text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-2xl"
          >
            View Story
            <ChevronRight className="group-hover:translate-x-1 transition-transform w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <p className="text-[9px] font-mono tracking-[0.5em] uppercase text-zinc-500">Initialize Sequence</p>
        <div className="h-px w-48 bg-zinc-800 relative overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-400 to-transparent w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;