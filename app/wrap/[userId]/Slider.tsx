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
import WrapPage from "@/src/components/FinaleCard";

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
  commitDates: string[]
};

export default function Slider({
  totalRepo,
  contributedRepo,
  totalCommits,
  commitHour,
  commitDates,
  repoDetails
}: Props) {
  const [step, setStep] = useState<number>(1);
  const [maxStep, setMaxStep] = useState<number>(5);

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
                <QuotePage persona={personaX.type} language={languages[0].language} commitCount={totalCommits}/>
            )}

            {step === 6 && (
                <WrapPage/>
            )}
          </div>

        </div>

      <div className="fixed z-20 bottom-12 md:bottom-9 flex gap-5 md:gap-19">
          <div className="flex justify-center items-center col-span-1">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="cursor-pointer group md:p-3 rounded-full hover:bg-neutral-700
                          disabled:opacity-10 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft
                className="w-8 h-8 md:w-8 md:h-8 transition-all duration-150
                         enabled:group-hover:scale-110"
            />
            </button>
          </div>

          <div className="flex justify-center items-center">
            <ProgressBar step={step} />
          </div>

          <div className="flex justify-center items-center col-span-1">
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={step === maxStep}
              className="group p-2 md:p-3 cursor-pointer rounded-full hover:bg-neutral-700
              disabled:opacity-10 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight
                className="w-8 h-8 md:w-8 md:h-8 transition-all duration-150
                   group-hover:scale-110"
              />
            </button>
          </div>
        </div>


    </div>
  );
}