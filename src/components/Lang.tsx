"use client";

import { motion } from "framer-motion";
import { Terminal, Code2 } from "lucide-react";
import { getLanguageInsight } from "../utils/LangInsight";

type LanguageUsage = {
  language: string;
  commits: number;
  color: string;
};

type LanguagePageProps = {
  languages: LanguageUsage[];
};

export default function LanguagePage({ languages }: LanguagePageProps) {
  if (!languages || languages.length === 0) return null;

  const totalCommits = languages.reduce((acc, curr) => acc + curr.commits, 0);
  const mainLang = languages[0];
  const mainPercentage = Math.round((mainLang.commits / totalCommits) * 100);
  const insight = getLanguageInsight(languages);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden px-5 py-16 md:py-0">

      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 md:w-150 h-75 md:h-150 blur-[100px] md:blur-[140px] rounded-full pointer-events-none opacity-30 md:opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: mainLang.color }}
      />

      <div className="z-10 text-center flex flex-col items-center w-full max-w-3xl pb-7">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-zinc-500 font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs mb-8 md:mb-10"
        >
          {/* <Terminal size={12} className="text-zinc-600 md:w-[14px]" />  */}
          Chapter 05: The Language
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-4xl font-serif italic text-zinc-400 mb-8 md:mb-12 tracking-tight px-2"
        >
          {insight.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full flex flex-col items-center mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4 mb-2">
             <h1 className="text-5xl md:text-9xl font-black tracking-tighter uppercase italic break-all md:break-normal">
               {mainLang.language}
             </h1>
             <span className="text-2xl md:text-5xl font-serif italic text-zinc-500">
               {mainPercentage}%
             </span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em]">
             <Code2 size={12} /> Primary Tech Stack 2025
          </div>
        </motion.div>

        <div className="w-full h-2.5 md:h-3 bg-white/5 rounded-full flex overflow-hidden mb-10 md:mb-12 border border-white/10 shadow-inner">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.language}
              initial={{ width: 0 }}
              animate={{ width: `${(lang.commits / totalCommits) * 100}%` }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1.5, ease: "circOut" }}
              style={{ backgroundColor: lang.color }}
              className="h-full relative group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 md:gap-x-12 w-full max-w-2xl px-2">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.language}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="flex items-center gap-2 md:gap-3"
            >
              <div
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0"
                style={{ backgroundColor: lang.color, boxShadow: `0 0 8px ${lang.color}` }}
              />
              <div className="text-left">
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-500 font-bold truncate max-w-20 md:max-w-none">
                  {lang.language}
                </p>
                <p className="text-base md:text-lg font-serif italic">
                  {lang.commits} <span className="text-[9px] not-italic text-zinc-600 tracking-tighter">Commits</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-12 md:mt-16 relative w-full flex justify-center"
        >
          <div className="absolute -inset-4 bg-white/2 blur-xl rounded-full" />
          <p className="relative text-zinc-400 font-light italic text-[15px] md:text-base max-w-70 md:max-w-md border-x border-white/35 md:border-zinc-700 px-2 md:px-4 py-2 text-center">
            “{insight.description}”
          </p>
        </motion.div>
      </div>
    </div>
  );
}