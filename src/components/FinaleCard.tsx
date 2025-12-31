"use client";

import { WrappedCard } from "./wrapCard";
import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Download, Share2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

type WrappedCardProps = {
  username: string;
  avatarUrl?: string;
  totalCommits: number;
  persona: string;
  topLanguage: string;
  busiestDay: string;
  quote: string;
};

export default function FinalePage(props: WrappedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement("a");
      link.download = `github-wrapped-2025-${props.username}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center justify-start md:justify-center px-4 py-12 md:p-8 overflow-y-auto md:overflow-hidden">

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 mb-6 mt-10 md:mt-0 md:mb-10"
      >
        <h2 className="text-zinc-500 font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[10px] mb-2">
          Final Report // 2025
        </h2>
        <h1 className="text-3xl md:text-5xl text-zinc-400 font-serif italic tracking-tighter">
          The <span className="text-white">Developer</span> Archive
        </h1>
      </motion.div>

      <div className="relative w-full flex flex-col items-center justify-center">

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center z-10"
        >
          <div className="scale-100 md:scale-100 transition-transform duration-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <WrappedCard ref={cardRef} {...props} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-row md:flex-col gap-6 mt-12 md:mt-0 md:fixed md:right-112 md:bottom-7 z-20"
        >
          <button
            onClick={downloadCard}
            title="Download Card"
            className="group flex items-center justify-center bg-zinc-100 text-black
                     w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer 
                     hover:bg-white transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <Download className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${props.username}'s GitHub Wrapped`,
                  text: `My 2025 journey: ${props.persona}`,
                  url: window.location.href,
                });
              }
            }}
            title="Share with world"
            className="flex items-center justify-center bg-zinc-900 border border-white/10 text-white
                     w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer
                     hover:bg-zinc-800 transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <Share2 className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="mt-12 md:fixed md:bottom-8 md:left-1/2 md:-translate-x-1/2"
      >
        <p className="text-[8px] md:text-[9px] font-mono tracking-[0.4em] md:tracking-[0.8em] uppercase text-zinc-400">
          GithubwrapX 2025
        </p>
      </motion.div>
    </div>
  );
}