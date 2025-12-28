"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BrainCircuit } from "lucide-react";

type quoteReqType ={
    persona: string,
    language: string,
    commitCount: number
}

export default function QuotePage({persona, language, commitCount}: quoteReqType) {
  const [quote, setQuote] = useState("");
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [status, setStatus] = useState("analyzing");

  useEffect(() => {
    // console.log(persona, language, commitCount)
    async function fetchAIVerdict() {
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          body: JSON.stringify({
            persona,
            language,
            commitCount
          }),
        });
        const data = await res.json();
        setQuote(data.quote);
        setStatus("typing");
      } catch (e) {
        setQuote("You code like a wizard, but your commit messages are pure chaos.");
        setStatus("typing");
      }
    }
    fetchAIVerdict();
  }, []);

  useEffect(() => {
    if (status === "typing" && quote) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedQuote(quote.slice(0, i));
        i++;
        if (i > quote.length) {
          clearInterval(interval);
          setStatus("finished");
        }
      }, 40); 
      return () => clearInterval(interval);
    }
  }, [status, quote]);

  return (
    <div className="h-screen w-full bg-neutral-950 text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] pointer-events-none" />
      
      <div className="z-10 text-center max-w-3xl flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-black border-2 border-fuchsia-500 px-4 py-1 mb-10 r-rotate-1 shadow-[4px_4px_0px_0px_rgba(217,70,239,1)]"
        >
          <p className="text-xs font-black tracking-[0.3em] text-fuchsia-500 flex items-center gap-2">
            <BrainCircuit size={14} /> SYSTEM.REFLECT(USER)
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "analyzing" ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 border-t-4 border-fuchsia-500 rounded-full animate-spin shadow-[0_0_20px_rgba(217,70,239,0.3)]" />
              <div className="space-y-2">
                <p className="text-2xl font-black italic animate-pulse">Scanning Midnight Commits...</p>
                <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">Groq LPU Engine Active</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="quote-reveal"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              {/* The AI Title */}
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 bg-white text-black px-6 py-2 shadow-[10px_10px_0px_0px_rgba(217,70,239,1)]">
                THE VERDICT
              </h2>

              {/* The Quote with Cursor */}
              <div className="relative p-8 bg-neutral-900 border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] max-w-2xl">
                <span className="text-3xl md:text-5xl font-black italic leading-tight block text-left">
                  "{displayedQuote}"
                  {status === "typing" && <span className="inline-block w-4 h-10 bg-fuchsia-500 ml-2 animate-pulse" />}
                </span>
                
                <Sparkles className="absolute -top-6 -right-6 text-fuchsia-500" size={48} />
              </div>

              {/* CTA Appear after typing */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: status === "finished" ? 1 : 0, y: status === "finished" ? 0 : 20 }}
                className="mt-16"
              >
            
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}