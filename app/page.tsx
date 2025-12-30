"use client"

import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUpRight, Github, HomeIcon, Linkedin} from 'lucide-react';
import { useEffect, useState } from 'react';
import pkg from "@/package.json";
import Link from 'next/link';

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
  const [userDetails, setUserDetails] = useState<userType | null>(null)
  const [error, setError] = useState<string>('')
  const [buttonEnable, setButtonEnable] = useState<boolean>(false)

  const checkUsername = (username: any): string => {
  if (!username) return "";

  return String(username)
    .trim()
    .replace(/^@+/, "");
};

  useEffect(() => {
    if (!username) {
      setUserDetails(null);
      setError("");
      return;
    }

  const timeout = setTimeout(async () => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        throw new Error("User not found");
      }

      const data = await res.json();
      if (!data || Object.keys(data).length === 0) {
        setUserDetails(null);
        return;
      }
      console.log(data)
     
      setUserDetails(data);
      //  console.log(userDetails)
      setError("");
    } catch (err) {
      setUserDetails(null);
      setError("No user found for this username");
    }
  }, 200);

  return () => clearTimeout(timeout);
}, [username]);

useEffect(() => {
  if (username.trim() && userDetails?.login && username.trim() === userDetails?.login) {
    setButtonEnable(true);
  } else {
    setButtonEnable(false);
  }
}, [username, userDetails]);

const rediretcHandler = () => {
  if (!username.trim()) {
    setError("Enter your username");
    return;
  }

  router.push(`/intro/${username}`);
};


return (
  <div className="bg-white selection:bg-fuchsia-300 min-h-screen overflow-x-hidden">
    <section 
      className="relative min-h-screen w-full flex flex-col items-center
              bg-[url('/back.png')] bg-cover bg-center"
    >
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      <div className='relative z-20 w-full'>
        <div className='h-10 mt-4 flex items-center justify-end px-4 md:px-0'>
          <div className='md:mr-5'>
            <Link href="https://github.com/prodot-com/GithubCard">
              <Github className='h-7 w-7 cursor-pointer hover:text-fuchsia-600 transition-all delay-75'/>
            </Link>
          </div>
        </div>

        <div className='flex flex-col min-h-[40vh] md:min-h-[52vh] justify-between py-1 px-4'>
          <div className="flex justify-center text-center">
            <p className="shadow-2xl px-4 border border-transparent py-3 text-5xl md:text-8xl instrument-serif-bold text-black backdrop-blur-xl rounded-[5px] wrap-break-words">
              Githubwrap<span className='instrument-serif-italic-bold'>X</span>
            </p>
          </div>

          <div className='flex justify-center text-center max-w-3xl mx-auto'>
            <p className='px-4 py-2 rounded-[5px] bg-fuchsia-300/20 backdrop-blur-2xl border border-transparent text-xl md:text-3xl instrument-serif-bold'>
              Your year in code. The ultimate 2025 GitHub Wrapped is here.<br/> Get AI qoute.
            </p>
          </div>

          <div className="flex justify-center w-full px-2">
            <div className="bg-fuchsia-300 border-2 border-black w-full max-w-2xl h-14 md:h-16 flex items-center rounded-full px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className='p-2'>
                <Github className='h-6 md:h-8'/>
              </div>
              <input 
                type="text"  
                placeholder="GitHub username..."
                value={username}
                onChange={e => {
                  setError("")
                  setUsername(checkUsername(e.target.value))
                }}
                className="flex-1 bg-transparent h-10 outline-none text-xl md:text-3xl instrument-serif-italic px-2"
              />
              <button
                onClick={() => rediretcHandler()}
                disabled={!buttonEnable}
                className="group cursor-pointer bg-black transition-colors rounded-full p-2 md:p-3 mr-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUpRight className="h-5 w-5 md:h-7 md:w-7 text-white transform transition-transform duration-300 group-hover:rotate-45 ease-in-out" />
              </button>
            </div>
          </div>
        </div>

        {userDetails?.login ? (
          <div className="mt-5 flex justify-center px-10 md:px-4">
            <div className="relative w-full max-w-100 rounded-[5px] bg-fuchsia-200/20 backdrop-blur-2xl border border-white/20 shadow-xl p-4 md:p-3">
              <div className="flex flex-row gap-7 items-center text-left">
                {userDetails?.avatarUrl && (
                  <img
                    src={userDetails.avatarUrl}
                    alt="profile"
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-black shadow-md w-20 h-20 md:w-24 md:h-24"
                  />
                )}

                <div className="flex flex-col cursor-pointer"
                onClick={()=>{
                  setUsername(userDetails?.login)
                }}
                >
                  <div className="flex flex-col md:gap-2 items-start">
                    {userDetails?.login && (
                      <p className="text-xl font-bold text-black leading-tight flex items-center">
                        @{userDetails.login}
                      </p>
                    )}

                    {userDetails?.name && (
                      <p className="text-[16px] font-bold italic text-black/70">
                        {userDetails.name}
                      </p>
                    )}
                  </div>

                  <div>
                    {userDetails?.followers?.totalCount !== undefined && (
                      <p className="text-sm pt-1 font-bold italic text-black/70">
                        Followers: {userDetails.followers.totalCount}
                      </p>
                    )}

                    {userDetails?.following?.totalCount !== undefined && (
                      <p className="text-sm pt-1 font-bold italic text-black/70">
                        Following: {userDetails.following.totalCount}
                      </p>
                    )}

                    {userDetails?.repositories?.totalCount !== undefined && (
                      <p className="text-sm pt-1 font-bold italic text-black/70">
                        Repositories: {userDetails.repositories.totalCount}
                      </p>
                    )}

                    {userDetails?.location && (
                      <p className="mt-2 text-xs font-medium text-black/60 flex items-center gap-1">
                        <HomeIcon className="w-4 h-4" />
                        {userDetails.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {userDetails?.bio && (
                <div className="mt-4 border-t border-black/10 pt-1">
                  <p className="text-sm text-black font-medium italic text-center">
                    {`"${userDetails?.bio}"`}
                  </p>
                </div>
              )}
            </div>
          </div>
        ):(<div className='text-xl flex justify-center items-center mt-10'>
          <p className='instrument-serif backdrop-blur-2xl py-1 px-2 rounded-[5px] text-white/75 tracking-wider'>Example: <span className='underline instrument-serif-italic tracking-normal cursor-pointer'
          onClick={()=>
            setUsername("prodot-com")
          }
          >prodot-com</span></p>
          </div>)}
      </div>

      <div className="absolute bottom-20 md:bottom-10 animate-bounce ">
        <p className="text-fuchsia-200 font-bold uppercase tracking-widest text-xs">
          <ArrowDown/>
        </p>
      </div>
    </section>

    <footer className="bg-white p-6 md:p-10 md:px-20 md:pb-9 border-t-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="space-y-1 max-w-sm">
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter">
            GITHUB-<span className="text-fuchsia-500">WRAPPED</span>
          </h2>
          <p className="text-lg md:text-xl font-medium leading-tight tracking-tighter italic">
            Visualize your commit history, discover your coding persona, and share your year in review.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto">
          <div className="flex gap-4">
            <Link href="https://github.com/prodot-com" target="_blank" className="p-3 md:p-4 border-2 border-black rounded-xl hover:bg-fuchsia-300 hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="p-3 md:p-4 border-2 border-black rounded-xl hover:bg-fuchsia-300 hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="https://linkedin.com/in/ghoshprobal" target="_blank" className="p-3 md:p-4 border-2 border-black rounded-xl hover:bg-fuchsia-300 hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest">
            ©2025 • Probal Ghosh
          </p>
        </div>
      </div>

      <div className="mt-10 pt-5 border-t-2 border-black/10 flex flex-wrap gap-x-4 md:gap-x-8 gap-y-4 text-xs md:text-sm font-black italic uppercase">
        <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0">
          <Link href="https://github.com/prodot-com/GithubCard" target='_blank'>Github</Link>
        </span>
        <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0" onClick={() => window.scrollTo({top:0, behavior: "smooth"})}>
          Start Building
        </span>
        <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0">
          <Link href="https://github.com/prodot-com/GithubCard/blob/main/README.md" target='_blank'>Docs</Link>
        </span>
        <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0">
          <Link href="https://probalghosh.dev" target='_blank'>Contact</Link>
        </span>
        <span className="cursor-pointer transition-all duration-300 hover:text-fuchsia-500 hover:-translate-y-1 active:translate-y-0">
          <Link href="https://github.com/prodot-com/GithubCard/blob/main/LICENSE" target='_blank'>License</Link>
        </span>

        <span className="ml-auto bg-black text-white px-3 py-1 rounded cursor-default">
          V{pkg.version}
        </span>
      </div>
    </footer>
  </div>
  );
}