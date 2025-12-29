"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

export default function Slider({
  totalRepo,
  contributedRepo,
  totalCommits,
  commitHour,
  commitDates,
  repoDetails,
  userName,
  avatarUrl
}: Props) {
  const [step, setStep] = useState<number>(1);
  const maxStep = 5
  const [showNav, setShowNav] = useState<boolean>(true);
  const [quote, setQuote] = useState<string>("");

  const personaX = detectPersona(commitHour, commitDates, totalCommits);
  const busyDay = getBusiestDay(commitDates);
  const languages = detectTopLanguages(repoDetails)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">

     
        <div className=" flex w-full justify-center items-center">
          <div className=" h-screen px-4 md:px-0 w-full transition-all duration-500 ease-in-out">
            {step === 1 && (
                <VolumePage totalCommits={totalCommits} totalRepo={totalRepo} contributedRepo={contributedRepo}/>
            )}
            {step === 2 && 
                <PersonaPage persona={personaX} />}

            {step === 3 && (
                <GrindPage busiestDay={busyDay.date} commitCount={busyDay.commits}/>
            )}

            {step === 4 && (
                <LanguagePage languages={languages}/>
            )}

            {step === 5 && (
                <QuotePage 
                persona={personaX.type} 
                language={languages[0]?.language ?? "Code"}
                commitCount={totalCommits}
                onQuoteGenerated={setQuote}
                />
            )}

            {step === 6 && (
                <FinalePage 
                username={userName}
                totalCommits={totalCommits}
                topLanguage={languages[0]?.language ?? "Code"}
                persona={personaX.type}
                quote={quote}
                busiestDay={busyDay.date}
                avatarUrl={avatarUrl}
                />

            )}
          </div>

        </div>

        {showNav ? (
        <div className="fixed z-20 bottom-8 md:bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-10 w-[95%] max-w-2xl justify-between md:justify-center">

          {/* LEFT ARROW */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="group p-2 md:p-3 rounded-full hover:bg-neutral-800/50 backdrop-blur-sm
                        disabled:opacity-10 disabled:cursor-not-allowed
                        disabled:pointer-events-none transition-colors border border-transparent hover:border-neutral-700"
            >
              <ArrowLeft
                className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-150
                          group-enabled:group-hover:scale-110 text-white"
              />
            </button>
          </div>

          {/* CENTER PROGRESS (Flex-grow allows it to fill space on mobile) */}
          <div className="flex-1 md:flex-none flex justify-center items-center px-2">
            <ProgressBar step={step} />
          </div>

          {/* RIGHT ARROW / GET CARD */}
          <div className="flex justify-center items-center min-w-[60px] md:min-w-[80px]">
            {step === maxStep ? (
              <button 
                onClick={()=>
                  {setStep((s)=> s+1)
                    setShowNav(false)
                  }}
                className="bg-[#22c55e] text-black font-black px-3 py-2 md:px-4 md:py-2 rounded-[4px] 
                          border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] 
                          text-[14px] md:text-[19px] cursor-pointer uppercase italic tracking-tighter hover:bg-white transition-colors"
              >
                Get Card
              </button>
            ) : (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === maxStep}
                className="group p-2 md:p-3 rounded-full hover:bg-neutral-800/50 backdrop-blur-sm
                          disabled:opacity-10 disabled:cursor-not-allowed
                          disabled:pointer-events-none transition-colors border border-transparent hover:border-neutral-700"
              >
                <ArrowRight
                  className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-150
                            group-enabled:group-hover:scale-110 text-white"
                />
              </button>
            )}
          </div>
        </div>) :(<div></div>)}


    </div>
  );
}