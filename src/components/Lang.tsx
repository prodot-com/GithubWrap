"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
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

  const totalCommits = languages.reduce(
    (acc, curr) => acc + curr.commits,
    0
  );

  const mainLang = languages[0];
  const mainPercentage = Math.round(
    (mainLang.commits / totalCommits) * 100
  );

  const insight = getLanguageInsight(languages)

  return (
    <div className="h-screen w-full pb-33 md:pb-20 bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-5">

    

      <div className="z-10 text-center flex flex-col items-center w-full max-w-2xl">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-fuchsia-500 font-black uppercase tracking-[0.2em] text-xs mb-10"
        >
          <Terminal size={14} /> Chapter 05: The Language
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-12">
          {insight.title}
        </h2>

        {/* Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-sm text-black relative"
        >
          <div className="absolute -top-5 -left-5 bg-black text-white px-4 py-2 font-black italic text-sm border-2 border-white rotate-[-5deg]">
            TOP TECH
          </div>

          <div className="flex justify-between items-end mb-6">
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-widest text-neutral-400">
                Main Syntax
              </p>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter">
                {mainLang.language}
              </h1>
            </div>
            <div className="text-4xl md:text-6xl font-black italic">
              {mainPercentage}%
            </div>
          </div>

          <div className="w-full h-12 bg-neutral-100 border-4 border-black flex mb-8">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.language}
                initial={{ width: 0 }}
                animate={{
                  width: `${(lang.commits / totalCommits) * 100}%`,
                }}
                transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                style={{ backgroundColor: lang.color }}
                className="h-full border-r-4 last:border-r-0 border-black flex items-center justify-center overflow-hidden"
              >
                {(lang.commits / totalCommits) > 0.2 && (
                  <span className="text-[10px] font-black uppercase text-black/70 truncate px-2">
                    {lang.language}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            {languages.map((lang) => (
              <div
                key={lang.language}
                className="flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 border-2 border-black"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-sm font-bold">
                  {lang.language}:{" "}
                  <span className="font-black italic">
                    {lang.commits} commits
                  </span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-10 p-4 border-2 border-dashed border-neutral-700 rounded-xl"
        >
          <p className="text-neutral-400 font-medium italic">
            {`“${insight.description}”`}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
