"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import VolumePage from "@/src/components/Volume";
import ProgressBar from "@/src/components/progressBar";
import PersonaPage from "@/src/components/Persona";
import { detectPersona } from "@/src/utils/persona";
import { getBusiestDay } from "@/src/utils/BusyDay";
import GrindPage from "@/src/components/Grind";

type RepoType = {
  contribution: {
    totalcount: number;
  };
  repository: {
    name: string;
    owner: {
      login: string;
    };
    primaryLanguage: {
      name: string;
      color: string | null;
    } | null;
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
  commitDates
}: Props) {
  const [step, setStep] = useState<number>(1);
  const [repo, setRepo] = useState<RepoType[]>([]);

  const personaX = detectPersona(commitHour, commitDates, totalCommits);
//   console.log(personaX);

  const busyDay = getBusiestDay(commitDates);
  console.log(busyDay)

  return (
    <div className="min-h-screen bg-black text-white grid grid-cols-4 gap-4 relative overflow-hidden">
      <div className="flex justify-center items-center">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="cursor-pointer group p-3 rounded-full hover:bg-neutral-700
                        disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft
            className="transition-all duration-150
            enabled:group-hover:w-7 enabled:group-hover:h-7"
          />
        </button>
      </div>

      <div className="col-span-2">


        {step === 1 && (
            <VolumePage totalCommits={totalCommits} totalRepo={totalRepo} contributedRepo={contributedRepo}/>
        )}
        {step === 2 && 
            <PersonaPage persona={personaX} />}

        {step === 3 && (
            <GrindPage busiestDay={busyDay.date} commitCount={busyDay.commits}/>
        )}

        <ProgressBar step={step} />
      </div>


      <div className="flex justify-center items-center">
        <button
          onClick={() => setStep((s) => s + 1)}
          className="group p-3 cursor-pointer rounded-full hover:bg-neutral-700"
        >
          <ArrowRight
            className="transition-all duration-150
                group-hover:w-7 group-hover:h-7"
          />
        </button>
      </div>
    </div>
  );
}
