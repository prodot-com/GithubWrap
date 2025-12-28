"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

// Types preserved from your code
export type PersonaType = "Night Owl" | "Early Bird" | "Weekend Warrior" | "Marathon Runner" | "The Architect" | "The Closer" | "Consistent King" | "The Sprinter";
export type PersonaColor = "fuchsia" | "yellow" | "orange" | "emerald" | "blue" | "neutral" | "purple" | "rose";

export type PersonaResult = {
  type: PersonaType;
  icon: string;
  description: string;
  stat: string;
  color: PersonaColor;
};

type PersonaProps = {
  persona: PersonaResult;
};

// Map color strings to specific Tailwind CSS classes
const colorMap: Record<PersonaColor, { text: string; bg: string; border: string; glow: string; gradient: string }> = {
  fuchsia: { text: "text-fuchsia-400", bg: "bg-fuchsia-500", border: "border-fuchsia-500", glow: "shadow-fuchsia-500/40", gradient: "from-fuchsia-950" },
  yellow: { text: "text-yellow-400", bg: "bg-yellow-500", border: "border-yellow-500", glow: "shadow-yellow-500/40", gradient: "from-yellow-950" },
  orange: { text: "text-orange-400", bg: "bg-orange-500", border: "border-orange-500", glow: "shadow-orange-500/40", gradient: "from-orange-950" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500", glow: "shadow-emerald-500/40", gradient: "from-emerald-950" },
  blue: { text: "text-blue-400", bg: "bg-blue-500", border: "border-blue-500", glow: "shadow-blue-500/40", gradient: "from-blue-950" },
  purple: { text: "text-purple-400", bg: "bg-purple-500", border: "border-purple-500", glow: "shadow-purple-500/40", gradient: "from-purple-950" },
  rose: { text: "text-rose-400", bg: "bg-rose-500", border: "border-rose-500", glow: "shadow-rose-500/40", gradient: "from-rose-950" },
  neutral: { text: "text-slate-400", bg: "bg-slate-500", border: "border-slate-500", glow: "shadow-slate-500/40", gradient: "from-slate-900" },
};

export default function PersonaPage({ persona }: PersonaProps) {
  const styles = colorMap[persona.color] || colorMap.neutral;

  return (
    <div className={`h-screen w-full bg-gradient-to-b ${styles.gradient} to-black text-white flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000`}>
      
      {/* Animated Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              y: [0, -120],
              opacity: [0, 0.7, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
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

      <div className="z-10 text-center flex flex-col items-center px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 ${styles.text} font-black uppercase tracking-widest text-sm mb-8`}
        >
          <Sparkles size={16} /> Chapter 03: The Identity
        </motion.div>

        {/* The Animated Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className={`w-44 h-44 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center mb-10 relative shadow-2xl ${styles.glow}`}
        >
          {/* Neon Glow Rings */}
          <div className={`absolute inset-0 rounded-full border-2 ${styles.border} animate-ping opacity-20`} />
          <div className={`absolute inset-4 rounded-full border ${styles.border} animate-pulse opacity-40`} />
          
          {/* Displaying the Emoji Icon */}
          <span className="text-7xl drop-shadow-lg select-none">{persona.icon}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 uppercase"
        >
          {persona.type}
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "240px" }}
          transition={{ delay: 0.7, duration: 1 }}
          className={`h-2 ${styles.bg} mb-8 shadow-lg shadow-black/50`}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-2xl md:text-3xl font-bold text-neutral-100 leading-tight mb-6"
        >
          {persona.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="px-6 py-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl"
        >
          <p className="text-lg md:text-xl font-medium">
            AI Insight: <span className={`${styles.text} font-black`}>{persona.stat}</span>
          </p>
        </motion.div>
      </div>

      
    </div>
  );
}