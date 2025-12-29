"use client";

import React, { useRef, forwardRef } from "react";
import * as htmlToImage from "html-to-image";
import { Download, Share2, Github, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";

type WrappedCardProps = {
  username: string;
  quote: string;
  persona?: string;
  topLanguage?: string;
  busiestDay?: string;
  totalCommits?: number;
  avatarUrl?: string
};


//Neo-Brutalism
export const WrappedCard = forwardRef<HTMLDivElement, WrappedCardProps>(
  ({ username, quote, persona, topLanguage, busiestDay, totalCommits, avatarUrl }, ref) => {
    return (
      <div 
        ref={ref} 
        className="w-[400px] bg-white/92 border-[4px] border-black px-6 py-4 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col gap-6 font-mono"
      >
        <div className="flex justify-between items-center">
          <div className="bg-black text-yellow-300 px-3 py-1 font-black text-sm uppercase italic">
            2025 RECAP
          </div>
          <Github size={28} strokeWidth={3} className="text-black" />
        </div>

        <div className="flex gap-4 items-center">
          <img
            src={avatarUrl}
            alt="profile"
            className="w-29 h-29  object-cover border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
          <h1 className="text-3xl font-black italic tracking-tighter text-black uppercase break-all leading-none">
            @{username}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-fuchsia-400 border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            <p className="text-[12px] font-black uppercase">Commits</p>
            <p className="text-3xl font-black italic text-center">{totalCommits || 0}</p>
          </div>
          <div className="bg-yellow-300 border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
            <p className="text-[12px] font-black uppercase">Persona</p>
            <p className="text-lg font-black italic text-center">{persona || "Hacker"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center bg-emerald-400 border-[2px] border-black px-2 py-1">
            <span className="font-bold text-xs uppercase">Top Syntax</span>
            <span className="font-black italic text-sm">{topLanguage}</span>
          </div>
          <div className="flex justify-between items-center bg-blue-400 border-[2px] border-black px-2 py-1">
            <span className="font-bold text-xs uppercase">Peak Day</span>
            <span className="font-black italic text-sm">{busiestDay}</span>
          </div>
        </div>

        <div className="bg-black text-white p-4 relative">
          <Sparkles className="absolute -top-4 -right-3 text-yellow-400 fill-current" size={35} />
          <p className="text-sm font-bold italic leading-tight text-center">"{quote}"</p>
        </div>

        <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
          GITJOURNEY.IO
        </p>
      </div>
    );
  }
);
