import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import ProgressBar from "./progressBar";

type IntroProps = {
  user: {
    login: string;
    avatar_url: string;
  };
  userId: string;
};

const Intro = ({user, userId}: IntroProps) => {
  return (
        <div className="w-full min-h-screen ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-500/25 blur-[120px] rounded-full pointer-events-none" />
            <div className="pt-25 md:pt-17 z-10 flex flex-col items-center text-center px-6">
        
                <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full" />
        
                    <div className="border border-transparent rounded-full flex justify-center items-center">
                        <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-49 h-49 rounded-full border border-black relative z-10"
                        />
               <BorderBeam
                size={80}
                initialOffset={20}
                borderWidth={1}
                className="from-transparent via-green-500 to-transparent"
              />
          </div>
     
        </div>

        <div className="space-y-4 mb-12">
          <p className="text-green-500 font-mono tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <Sparkles size={16} /> Chapter 01: The Arrival
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            2025 WAS A BIG <br /> YEAR FOR YOU.
          </h1>
          <p className="text-neutral-400 text-xl md:text-2xl font-medium">
            Let's unfold your story, <span className="text-white">@{user.login}</span>.
          </p>
        </div>

        <Link
          href={`/wrap/${userId}`}
          className="group relative flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Start the Journey
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="absolute bottom-15 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="h-1 w-56 rounded-full transition-all duration-300 bg-white"/>
      </div>
      </div>
  )
}

export default Intro
