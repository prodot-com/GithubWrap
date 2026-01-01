"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VolumePage from "@/src/components/Volume";
import ProgressBar from "@/src/components/progressBar";
import PersonaPage from "@/src/components/Persona";
import { detectPersona } from "@/src/utils/persona";
import { getBusiestDay } from "@/src/utils/BusyDay";
import GrindPage from "@/src/components/Grind";
import { detectTopLanguages } from "@/src/utils/CommitLang";
import LanguagePage from "@/src/components/Lang";
import QuotePage from "@/src/components/Verdict";
import FinalePage from "@/src/components/FinaleCard";

type RepoType = {
  repository: {
    name: string,
    owner: {
        login: string
    },
    primaryLanguage: {
      name: string;
      color: string;
} | null;
  };
  contributions: {
    totalCount: number;
  };
};

type Props = {
  totalRepo: number;
  contributedRepo: number;
  totalCommits: number;
  totalPR: number;
  totalIssues: number;
  totalContributions: number;
  repoDetails: RepoType[];
  commitHour: number[];
  commitDates: string[];
  userName: string;
  avatarUrl: string;
};

export default function Slider(props: Props) {
  const [step, setStep] = useState<number>(1);
  const maxStep = 5;
  const [showNav, setShowNav] = useState<boolean>(true);
  const [quote, setQuote] = useState<string>("");

  const personaX = detectPersona(props.commitHour, props.commitDates, props.totalCommits);
  const busyDay = getBusiestDay(props.commitDates);
  const languages = detectTopLanguages(props.repoDetails);
  // console.log(languages)

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex items-center justify-center font-sans">
  
      <div className={`absolute inset-0 transition-colors duration-1000 opacity-20 pointer-events-none ${
        step % 2 === 0 ? 'bg-blue-900/10' : 'bg-emerald-900/10'
      }`} />

      <div className="flex w-full justify-center items-center z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-screen w-full"
          >
            {step === 1 && <VolumePage totalCommits={props.totalCommits} totalRepo={props.totalRepo} contributedRepo={props.contributedRepo}/>}
            {step === 2 && <PersonaPage persona={personaX} avatarUrl={props.avatarUrl}/>}
            {step === 3 && <GrindPage busiestDay={busyDay.date} commitCount={busyDay.commits}/>}
            {step === 4 && <LanguagePage languages={languages}/>}
            {step === 5 && (
                <QuotePage 
                  persona={personaX.type} 
                  language={languages[0]?.language ?? "Code"}
                  commitCount={props.totalCommits}
                  onQuoteGenerated={setQuote}
                />
            )}
            {step === 6 && (
                <FinalePage 
                  username={props.userName}
                  totalCommits={props.totalCommits}
                  topLanguage={languages[0]?.language ?? "Code"}
                  persona={personaX.type}
                  quote={quote}
                  busiestDay={busyDay.date}
                  avatarUrl={props.avatarUrl}
                />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {showNav && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 md:gap-6 px-6 py-3"
        >
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="p-2 md:text-zinc-500 cursor-pointer hover:text-white disabled:opacity-0 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <ProgressBar step={step} total={maxStep} />

          {step === maxStep ? (
            <button 
              onClick={() => {
                setStep((s) => s + 1);
                setShowNav(false);
              }}
              className="flex items-center gap-2 cursor-pointer bg-white text-black md:px-5 md:py-2 px-2 py-2 rounded-[5px] font-bold text-sm hover:bg-zinc-200 transition-all hover:scale-105"
            >
              <Sparkles size={16} />
              Finalize
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="p-2 cursor-pointer md:text-zinc-500 hover:text-white transition-all hover:scale-110"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}