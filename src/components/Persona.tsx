"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Moon, Sun, Coffee, Sparkles } from "lucide-react";

type Persona = {
  type: string;
  stat: string;
};

type PersonaProps = {
  persona: Persona;
};

export default function PersonaPage({ persona }: PersonaProps) {
  // Logic: AI analyzes timestamps to pick the winning persona
  // const persona = {
  //   type: "Night Owl",
  //   icon: <Moon className="w-20 h-20 text-fuchsia-400" />,
  //   description: "Your best work happens when the world is silent.",
  //   stat: "62% of your commits happened after 10:00 PM.",
  //   bgGradient: "from-indigo-950 via-neutral-950 to-black",
  //   glowColor: "shadow-fuchsia-500/20"
  // };

  return (
    // <div className={`h-screen w-full bg-gradient-to-b ${persona.bgGradient} text-white flex flex-col items-center justify-center relative overflow-hidden`}>
    <div
      className={`h-screen w-full bg-gradient-to-b text-white flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Animated Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              y: [-20, -100],
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center flex flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-fuchsia-400 font-black uppercase tracking-widest text-sm mb-8"
        >
          <Sparkles size={16} /> Chapter 03: The Identity
        </motion.div>

        {/* The Animated Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          // className={`w-40 h-40 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mb-10 relative shadow-2xl ${persona.glowColor}`}
          className={`w-40 h-40 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center mb-10 relative shadow-2xl`}
        >
          {/* Neon Glow Rings */}
          <div className="absolute inset-0 rounded-full border border-fuchsia-500/50 animate-ping opacity-20" />
          <div className="absolute inset-2 rounded-full border border-fuchsia-500/30 animate-pulse" />
          {/* {persona.icon} */}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4"
        >
          {persona.type.toUpperCase()}
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          className="h-1 bg-fuchsia-500 mb-6 max-w-xs mx-auto"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl font-medium text-neutral-300 max-w-md"
        >
          {/* {persona.description} */}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 px-4 py-2 bg-white/10 rounded-lg border border-white/5 backdrop-blur-md"
        >
          <span className="text-fuchsia-400 font-bold">{persona.stat}</span>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 flex flex-col items-center gap-6"
      >
        <Link
          href={`/user/grind`}
          className="group flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-xl"
        >
          See The Grind
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
