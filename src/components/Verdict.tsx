"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BrainCircuit, Wand2 } from "lucide-react";

const ANALYZE_WORDS = [
  "Connecting Groq",
  "Decrypting Commits",
  "Analyzing Patterns",
  "Matching Persona",
  "Generating Verdict",
];


type quoteReqType = {
  persona: string,
  language: string,
  commitCount: number,
  onQuoteGenerated: (quote: string) => void;
}

export default function QuotePage({ persona, language, commitCount, onQuoteGenerated }: quoteReqType) {
  const [quote, setQuote] = useState("");
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [status, setStatus] = useState("idle");
  const [isStarted, setIsStarted] = useState(false);
  const [analyzeIndex, setAnalyzeIndex] = useState(0);

  const fetchAIVerdict = async () => {
    setIsStarted(true);
    setStatus("analyzing");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        body: JSON.stringify({ persona, language, commitCount }),
      });
      const data = await res.json();
      
      setTimeout(() => {
        setQuote(data.quote);
        onQuoteGenerated(data.quote);
        setStatus("typing");
      }, 4000);

    } catch (e) {
      setQuote("You code like a wizard, but your commit messages are pure chaos.");
      setStatus("typing");
    }
  };

  useEffect(() => {
    if (status !== "analyzing") return;

    const interval = setInterval(() => {
      setAnalyzeIndex((i) => (i + 1) % ANALYZE_WORDS.length);
    }, 1100);

    return () => clearInterval(interval);
  }, [status]);


  useEffect(() => {
    const speed = quote.length > 120 ? 25 : 40;
    if (status === "typing" && quote) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedQuote(quote.slice(0, i));
        i++;
        if (i > quote.length) {
          clearInterval(interval);
          setStatus("finished");
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [status, quote]);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      
      <div className="absolute inset-0 bg-linear-to-t from-green-900/50 to-transparent pointer-events-none" />

      <div className="z-10 text-center flex flex-col items-center w-full max-w-4xl pb-7">
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 md:gap-3 text-zinc-400 font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] text-[15px] md:text-xl mb-8 md:mb-12"
        >
          {/* <BrainCircuit size={12} className="text-zinc-600 md:w-3.5" />  */}
          Chapter 06: The Verdict
        </motion.div>

        <AnimatePresence mode="wait">
          {!isStarted ? (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <h2 className="text-4xl md:text-8xl font-serif italic tracking-tighter mb-8 md:mb-10 leading-tight md:leading-none">
                Ready for the <br/> <span className="text-zinc-500">Verdict?</span>
              </h2>
              
              <button
                onClick={fetchAIVerdict}
                className="group cursor-pointer flex items-center gap-3 md:gap-4 bg-white text-black px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                <Wand2 size={18} className="md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                Ask AI
              </button>
              
              <p className="mt-8 text-zinc-600 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] px-4">
                Warning: Decryption may be brutally honest
              </p>
            </motion.div>

          ) : status === "analyzing" ? 
          (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-48 md:w-64 h-px bg-zinc-800 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-400 to-transparent w-1/2"
                />
              </div>
              <p className="text-zinc-400 font-mono text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] animate-pulse">
                <motion.span
                  key={analyzeIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {ANALYZE_WORDS[analyzeIndex]}...
                </motion.span>
              </p>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 bg-zinc-500 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          ) 
          : (
            <motion.div 
              key="quote-reveal"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col items-center w-full px-2"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-zinc-500 font-mono text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8"
              >
                SYSTEM LOG - FINAL OUTPUT
              </motion.div>

              <div className="relative max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-serif italic leading-snug md:leading-tight text-center px-2">
                  "{displayedQuote}"
                  {status === "typing" && (
                    <span className="inline-block w-0.5 md:w-1 h-6 md:h-12 bg-zinc-400 ml-1 md:ml-2 animate-pulse align-middle" />
                  )}
                </h1>
                
                {status === "finished" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12 md:mt-16 flex flex-col items-center gap-4"
                  >
                    <div className="h-px w-8 md:w-12 bg-zinc-800" />
                    <p className="text-zinc-400 font-mono text-[9px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] px-4">
                      <span>OUTPUT</span> LOCKED - CONTINUE
                    </p>
                    <p className="text-zinc-400 font-mono text-[9px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] px-4">
                      Collect your <span className="text-white">Card</span> next
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}