"use client";

import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUpRight, Github, GithubIcon, LinkedinIcon, Loader} from 'lucide-react';
import { useEffect, useState } from 'react';
import BrokenArrowIcon from '@/src/components/BrokenArrow';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type userType = {
  avatarUrl: string,
  login: string,
  name: string,
  location: string,
  bio: string,
  followers: {totalCount: number};
  following: {totalCount: number};
  repositories: {totalCount: number};
}

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [userDetails, setUserDetails] = useState<userType | null>(null);
  const [error, setError] = useState('');
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  const checkUsername = (name: any): string => {
    if (!name) return "";
    const username =  String(name).trim().replace(/^@+/, "");
    return username.toLocaleLowerCase()
  };

  useEffect(() => {
    if (!username) {
      setUserDetails(null);
      setError("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setloading(true)
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUserDetails(data);
        setError("");
        setloading(false)
      } catch (err) {
        setUserDetails(null);
        setError("User not identified");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

  useEffect(() => {
    setButtonEnable(!!(username.trim() && userDetails?.login === username.trim()));
  }, [username, userDetails]);

  // const redirectHandler = () => {
  //   if (!username.trim()) return;
  //   router.push(`/intro/${username}`);
  // };

const redirectHandler = async () => {
  setloading(true)
  const cleanUsername = username.trim();
  if (!cleanUsername) return;

  try {
    await fetch("/api/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: cleanUsername,
      }),
    });
  } catch (error) {
    console.error("API failed, redirecting anyway:", error);
  
  } finally {

    if(!username.trim()) return;
    router.push(`/intro/${username}`);
    
  }
};



  return (
    <div className="bg-black selection:bg-zinc-500 min-h-screen overflow-x-hidden font-sans">
      <section 
        className="relative min-h-screen w-full flex flex-col items-center
                   bg-[url('/back.png')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black backdrop-blur-[1px]"></div>
        
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        
        <div className='relative z-20 w-full p-6 flex justify-end items-center mx-auto'>
          <Link href="https://github.com/prodot-com/GithubCard">
            <Github className='h-6 w-6 hover:text-black/60 text-black transition-all'/>
          </Link>
        </div>

        <div className='relative z-20 flex flex-col items-center pt-12 md:pt-10 flex-1 w-full px-4 gap-8 md:gap-12'>

          <div className="text-center space-y-5">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-[100px] border-transparent rounded-[5px] px-3 py-3 backdrop-blur-sm font-serif italic text-white tracking-tighter leading-none"
            >
              Githubwrap<span className='not-italic'>X</span><span className="text-zinc-900 pl-1 md:pl-2 text-2xl md:text-[60px]">25</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='max-w-xl mx-auto text-black border-transparent rounded-[5px] py-1 backdrop-blur-sm text-base md:text-xl font-light tracking-tight px-2'
            >
              The ultimate 2025 GitHub Wrapped. <br className="hidden md:block"/>
              Identify your persona and generate your digital verdict.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl px-2"
          >
            <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full p-1.5 md:p-2 pl-4 md:pl-6 shadow-2xl transition-all focus-within:border-white/20">
              <GithubIcon className="h-4 w-4 md:h-5 md:w-5 text-zinc-400 md:text-zinc-500 mr-2 md:mr-4" />
              <input 
                type="text"  
                placeholder="Enter GitHub username..."
                value={username}
                onChange={e => {
                  setError("");
                  setUsername(checkUsername(e.target.value))
                }}
                className="flex-1 bg-transparent h-10 md:h-12 outline-none text-base md:text-2xl font-light text-white placeholder-white/75 md:placeholder:text-zinc-500"
              />
              {loading ? (
                <button
                  className="group cursor-pointer flex items-center justify-center bg-white/15 text-black/45 rounded-full w-10 h-10 md:w-14 md:h-14 disabled:opacity-20 disabled:grayscale transition-all hover:scale-105 active:scale-95 shrink-0"
                >
                  <Loader className="h-5 w-5 md:h-8 md:w-8 transform transition-transform animate-spin" />
              </button>
              ):(
              <button
                onClick={redirectHandler}
                disabled={!buttonEnable}
                className="group cursor-pointer flex items-center justify-center bg-white text-black rounded-full w-10 h-10 md:w-14 md:h-14 disabled:opacity-20 disabled:grayscale transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 transform transition-transform group-hover:rotate-45" />
              </button>
              )}

            </div>
            {error && <p className="text-red-500 text-[10px] font-mono mt-3 text-center uppercase tracking-widest">{error}</p>}
          </motion.div>

          <div className="min-h-40 flex items-center pb-12 justify-center w-full">
            <AnimatePresence mode="wait">
              {userDetails?.login ? (
                <motion.div 
                  key="user"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setUsername(userDetails.login)}
                  className="flex flex-row items-center gap-5 bg-white/3 backdrop-blur-xl border border-white/10 p-5 pr-10 rounded-[5px] cursor-pointer hover:bg-white/6 transition-all group"
                >
                  <div className="relative">
                    <img
                      src={userDetails.avatarUrl}
                      alt="profile"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white text-black rounded-full p-1">
                      <Github size={10} />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-white tracking-tight">@{userDetails.login}</p>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mt-1">{userDetails.location || "Location Unknown"}</p>
                    <div className="flex gap-4 mt-3">
                       <div className="flex flex-col">
                          <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Repos</span>
                          <span className="text-sm font-serif italic text-zinc-300">{userDetails.repositories.totalCount}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Followers</span>
                          <span className="text-sm font-serif italic text-zinc-300">{userDetails.followers.totalCount}</span>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ) : !username && (
                <div className='flex flex-col items-center instrument-serif-italic-bold'>
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1 }}
                    className="flex items-center gap-3 text-[13px] md:text-[15px] font-mono tracking-[0.2em] text-zinc-200"
                  >
                    <span>
                      Try: 
                      <span 
                        onClick={() => setUsername("prodot-com")}
                        className="text-zinc-300 underline underline-offset-4 cursor-pointer hover:text-white transition-colors tracking-[0.5] ml-1"
                      >
                        prodot-com
                      </span>
                    </span>
                  </motion.div>
                  <motion.div 
                  initial={{opacity:0}}
                  animate={{opacity: 1}}
                  transition={{delay: 1}}
                  className='hidden md:block absolute bottom-34 right-[42%] rotate-y-180 rotate-10'>
                      <BrokenArrowIcon className='w-12 h-12 text-white'/>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-26 md:bottom-10 animate-bounce">
          <ArrowDown className="text-white w-5 h-5" />
        </div>
      </section>

      <footer className="bg-[#050505] pt-16 md:pt-20 pb-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-12">
          <div className="space-y-1 md:space-y-2 max-w-sm">
            <h2 className="text-3xl md:text-4xl font-serif italic text-white">
              GithubwrapX<span className="text-zinc-600 text-xl md:text-2xl">25</span>
            </h2>
            <p className="text-[16px] md:text-[16px] text-zinc-500 font-light leading-relaxed">
              Visualize your evolution, identify your persona, and generate your 2025 digital verdict.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-start md:items-end w-full md:w-auto">
            <div className="flex gap-3">
                <Link href="https://github.com/prodot-com" target='_blank' className="p-3 rounded-full bg-white/3 border border-white/5 hover:bg-white/10 transition-all">
                  <GithubIcon className="h-5 w-5 text-white/60" />
                </Link>
                <Link href="https://linkedin.com/in/ghoshprobal" target='_blank' className="p-3 rounded-full bg-white/3 border border-white/5 hover:bg-white/10 transition-all">
                  <LinkedinIcon className="h-5 w-5 text-white/60" />
                </Link>
                <Link href="#" target='_blank' className="p-3 rounded-full bg-white/3 border border-white/5 hover:bg-white/10 transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="currentColor"
                    className='w-5 h-5 text-white/60'
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
            </div>
            <p className="text-[10px] ml-3 md:ml-0 md:text-[9px] font-mono tracking-[0.3em] md:tracking-[0.4em] uppercase text-zinc-600">
              ©2025 PROBAL GHOSH
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-7 md:mt-12 pt-8 border-t border-white/30 flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-start">
          {[
            { name: "Github", href: "https://github.com/prodot-com/GithubWrap" },
            { name: "Start-Building", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
            { name: "Docs", href: "https://github.com/prodot-com/GithubWrap/blob/main/README.md" },
            { name: "Contact", href: "https://probalghosh.dev" },
            { name: "License", href: "https://github.com/prodot-com/GithubWrap/blob/main/LICENSE" },
          ].map((link) => (
            <span 
              key={link.name}
              className="group relative cursor-pointer"
              onClick={link.onClick}
            >
              {link.href ? (
                <Link 
                  href={link.href} 
                  target="_blank" 
                  className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 transition-all duration-500 group-hover:text-white"
                >
                  {link.name}
                </Link>
              ) : (
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 transition-all duration-500 group-hover:text-white">
                  {link.name}
                </span>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-400 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
