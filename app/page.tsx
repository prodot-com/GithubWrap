import { ArrowUpRight, Github } from 'lucide-react';

export default function Home() {
  return (
    <div className="h-screen flex flex-col ">
      <div className='h-10 mt-4 flex items-center justify-end'>
        <div className='mr-5'>
          <Github className='h-7 w-7 cursor-pointer '/>
        </div>
      </div>
      <div className="flex justify-center pt-20">
        <p
          className="shadow-2xl px-4 border border-transparent py-3 text-8xl instrument-serif-italic-bold text-black backdrop-blur-xl
        rounded-[5px]"
        >
          Github-Wrapped
        </p>
      </div>

      <div className="pt-30 flex justify-center ">
        <div className="bg-fuchsia-300 border-2 border-black min-w-2xl h-16 flex items-center justify-between rounded-full px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <input 
            type="text"  
            placeholder="GitHub username..."
            className="ml-4 w-[80%] bg-transparent h-10 outline-none text-3xl instrument-serif-italic"
          />
          
          <button className="group cursor-pointer bg-black  transition-colors rounded-full p-3 mr-1">
            <ArrowUpRight className="h-7 w-7 text-white transform transition-transform duration-300 group-hover:rotate-45 ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  );
}
