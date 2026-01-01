"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
  avatarUrl: string;
};

const colorMap: Record<
  PersonaColor,
  { text: string; glow: string; accent: string; gradient: string }
> = {
  fuchsia: {
    text: "text-fuchsia-400",
    glow: "shadow-fuchsia-500/20",
    accent: "bg-fuchsia-500",
    gradient: "bg-gradient-to-b from-fuchsia-500/20 to-transparent",
  },
  yellow: {
    text: "text-yellow-400",
    glow: "shadow-yellow-500/20",
    accent: "bg-yellow-500",
    gradient: "bg-gradient-to-b from-yellow-500/20 to-transparent",
  },
  orange: {
    text: "text-orange-400",
    glow: "shadow-orange-500/20",
    accent: "bg-orange-500",
    gradient: "bg-gradient-to-b from-orange-500/20 to-transparent",
  },
  emerald: {
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    accent: "bg-emerald-500",
    gradient: "bg-gradient-to-b from-emerald-500/20 to-transparent",
  },
  blue: {
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
    accent: "bg-blue-500",
    gradient: "bg-gradient-to-b from-blue-500/20 to-transparent",
  },
  purple: {
    text: "text-purple-400",
    glow: "shadow-purple-500/20",
    accent: "bg-purple-500",
    gradient: "bg-gradient-to-b from-purple-500/20 to-transparent",
  },
  rose: {
    text: "text-rose-400",
    glow: "shadow-rose-500/20",
    accent: "bg-rose-500",
    gradient: "bg-gradient-to-b from-rose-500/20 to-transparent",
  },
  neutral: {
    text: "text-zinc-400",
    glow: "shadow-zinc-500/20",
    accent: "bg-zinc-500",
    gradient: "bg-gradient-to-b from-zinc-500/20 to-transparent",
  },
};


export default function PersonaPage({ persona, avatarUrl }: PersonaProps) {

  function getDeterministicColor(key: string) {
    const keys = Object.keys(colorMap) as (keyof typeof colorMap)[];
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colorMap[keys[Math.abs(hash) % keys.length]];
  }

  const styles = getDeterministicColor(persona.type);
  // console.log(styles)


  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className={`absolute inset-0 ${styles.gradient}`} />
      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white/30 rounded-full"
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
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

      <div className="z-10 pb-17 text-center flex flex-col items-center px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-zinc-500 font-mono uppercase tracking-[0.5em] text-[10px] md:text-xs mb-10"
        >
          {/* <Sparkles size={14} className="text-zinc-600" />  */}
          Chapter 03: The Persona
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-48 h-48 md:w-56 md:h-56 mb-5 group"
        >
          <div className={`absolute -inset-4 rounded-full bg-linear-to-tr ${styles.glow} to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
          
          <div className={`relative w-full h-full rounded-full border border-white/10 p-1 bg-black`}>
             <img 
               src={avatarUrl} 
               alt="profile" 
               className="w-full h-full object-cover rounded-full transition-all duration-1000"
             />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-8xl font-serif italic tracking-tighter text-white mb-2"
        >
          {persona.type}
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className={`h-px ${styles.accent} opacity-50 mb-4`}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-2xl font-light text-zinc-400 max-w-xl leading-relaxed mb-5"
        >
          {persona.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="px-8 py-3 bg-white/3 rounded-[5px] border border-white/10 backdrop-blur-md"
        >
          <p className="text-sm md:text-base tracking-tight text-zinc-300">
             <span className={`${styles.text} font-mono uppercase tracking-widest mr-2`}>Record:</span>
             {persona.stat}
          </p>
        </motion.div>
      </div>
    </div>
  );
}