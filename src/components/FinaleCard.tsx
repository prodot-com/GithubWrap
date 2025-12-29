import { WrappedCard } from "./wrapCard";
import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";

WrappedCard.displayName = "WrappedCard";

type WrappedCardProps = {
  username: string;
  quote: string;
  persona?: string;
  topLanguage?: string;
  busiestDay?: string;
  totalCommits?: number;
  avatarUrl?: string
};

export default function FinalePage(props: WrappedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff"
      });

      const link = document.createElement("a");
      link.download = `github-wrapped-${props.username}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Oops, something went wrong!", err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-4 md:px-8 gap-8 ">
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-1 mt-5"
      >
        <h2 className="text-fuchsia-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-sm italic">
          Chapter 06: The Finale
        </h2>
        <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter leading-none">
          YOUR <span className="text-fuchsia-500">GITHUB-CARD</span>
        </h1>
      </motion.div>

      <div className="relative w-full flex flex-col items-center justify-center gap-1">

        {/* CARD – always centered */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-full flex justify-center"
        >
          <div className="scale-[0.85] sm:scale-90 md:scale-100 transition-transform">
            <WrappedCard ref={cardRef} {...props} />
          </div>
        </motion.div>

        {/* BUTTONS */}
        <div
          className="
            flex md:flex-col gap-4
            w-full max-w-sm
            md:fixed md:bottom-21 md:right-123
            md:w-auto md:max-w-none justify-center"
        >
          <button
            onClick={downloadCard}
            className="group flex items-center justify-center bg-fuchsia-500 text-black
                      px-6 md:px-4 py-3 md:py-3 border-transparent rounded-[4px] cursor-pointer hover:bg-fuchsia-700"
          >
            <Download  className="w-7 h-7"/>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My GitHub Wrapped",
                  text: "Check out my 2025 code journey!",
                  url: window.location.href,
                });
              }
            }}
            className="flex items-center justify-center gap-3 bg-white hover:bg-neutral-400 text-black
                      px-6 md:px-4 py-3 md:py-3 border-transparent rounded-[4px] cursor-pointer"
          >
            <Share2 className="w-7 h-7"/>
          </button>
        </div>
      </div>
    </div>
  );
}