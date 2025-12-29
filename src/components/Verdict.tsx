"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BrainCircuit, Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type quoteReqType = {
  persona: string,
  language: string,
  commitCount: number
}

export default function QuotePage({ persona, language, commitCount }: quoteReqType) {
  const [quote, setQuote] = useState("");
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [status, setStatus] = useState("idle"); // idle, analyzing, typing, finished
  const [isStarted, setIsStarted] = useState(false);

  const fetchAIVerdict = async () => {
    setIsStarted(true);
    setStatus("analyzing");
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
  };

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
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative md:px-5">
      
      {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%] pointer-events-none" /> */}
      
      <div className="pb-17 md:pb-0 z-10 text-center flex flex-col items-center w-full md:mx-auto">
        
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-black border-2 border-fuchsia-500 px-4 py-1 mb-12 md:mb-10 shadow-[4px_4px_0px_0px_rgba(217,70,239,1)]"
        >
          <p className="text-[10px] md:text-xs font-black tracking-[0.3em] text-fuchsia-500 flex items-center gap-2 uppercase">
            <BrainCircuit size={14} /> SYSTEM.REFLECT(USER)
          </p>
        </motion.div>

        {(status !== "analyzing" && status !== "idle") && (
                        <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter bg-white text-black px-4 md:px-6 py-2 shadow-[6px_6px_0px_0px_rgba(217,70,239,1)] md:shadow-[10px_10px_0px_0px_rgba(217,70,239,1)]">
                THE VERDICT
              </h2>
        )}

        <AnimatePresence mode="wait">
          {/* Responsive Container: Fixed height on desktop to prevent jump, auto on mobile */}
          <div className="w-full max-w-2xl min-h-[400px] md:h-[480px] flex justify-center items-center px-2">
          {!isStarted ? (
            /* START STATE */
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center w-full"
            >
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-8 text-white uppercase leading-tight">
                Ready for the <br/> AI Verdict?
              </h2>
              <button
                onClick={fetchAIVerdict}
                className="group relative bg-fuchsia-500 text-black font-black px-6 md:px-8 py-3 md:py-4 text-lg md:text-2xl italic tracking-tighter border-4 border-white hover:bg-white transition-colors shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <span className="flex items-center gap-3">
                  <Wand2 className="group-hover:rotate-12 transition-transform w-5 h-5 md:w-6 md:h-6" />
                  GET AI QUOTE
                </span>
              </button>
              <p className="mt-6 text-neutral-500 font-mono text-[10px] uppercase tracking-[0.2em]">Warning: AI might be brutally honest</p>
            </motion.div>
          ) : status === "analyzing" ? (
              /* ANALYZING STATE */
              <div className="flex flex-col gap-4 items-center w-full max-w-lg">
                <Skeleton className="h-6 md:h-7 w-[80%] rounded-[2px] bg-fuchsia-500/20 animate-pulse" />
                <Skeleton className="h-6 md:h-7 w-[95%] rounded-[2px] bg-fuchsia-500/10 animate-pulse delay-75" />
                <Skeleton className="h-6 md:h-7 w-[70%] rounded-[2px] bg-fuchsia-500/20 animate-pulse delay-150" />
                <Skeleton className="h-6 md:h-7 w-[85%] rounded-[2px] bg-fuchsia-500/10 animate-pulse delay-300" />
                <Skeleton className="h-6 md:h-7 w-[60%] rounded-[2px] bg-fuchsia-500/20 animate-pulse delay-500" />

                <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.3em] text-fuchsia-500/50 animate-bounce">
                  Processing Metadata...
                </p>
              </div>
          ) : (
            /* REVEAL STATE */
            <motion.div 
              key="quote-reveal"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center w-full"
            >


              <div className=" relative p-6 md:p-10 bg-neutral-900 border md:border-2 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] w-full">
                <span className="text-2xl md:text-4xl font-black italic leading-tight block text-left break-words">
                  "{displayedQuote}"
                  {status === "typing" && <span className="inline-block w-2 h-6 md:w-4 md:h-10 bg-fuchsia-500 ml-2 animate-pulse" />}
                </span>
                
                <Sparkles className="absolute -top-4 -right-4 md:-top-8 md:-right-8 text-fuchsia-500 w-8 h-8 md:w-16 md:h-16" />
              </div>

              {status === "finished" && (
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-10 text-fuchsia-500 font-mono text-[10px] uppercase tracking-[0.3em]"
                >
                  Analysis Complete // 2025_Wrapped_Final
                </motion.p>
              )}
            </motion.div>
          )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}