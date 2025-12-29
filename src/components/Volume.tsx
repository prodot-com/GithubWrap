"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Database, Zap } from "lucide-react";
import { getVolumeCopy } from "../utils/VolumeCopy";

type IntroProps = {
    totalCommits: number,
    totalRepo: number;
    contributedRepo: number;
}

export default function VolumePage({totalCommits, totalRepo, contributedRepo} : IntroProps) {

    const count = useSpring(0, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, totalCommits, { duration: 3 });
        return controls.stop;
    }, [totalCommits]);

    const copy = getVolumeCopy(totalCommits);


    return (
            <div className="h-screen w-full  pb-10 bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background Grid Pattern (Subtle Tech Look) */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="z-10 text-center space-y-2">
            <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-fuchsia-500 font-black uppercase tracking-widest text-sm mb-4"
            >
            <Database size={16} /> Chapter 02: The Volume
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-bold italic text-neutral-400">
            {copy.title}
            </h2>

            {/* The Big Number */}
            <div className="relative inline-block">
            <motion.div 
                className="text-[120px] md:text-[180px] font-black tracking-tighter leading-none text-white selection:bg-fuchsia-500"
            >
                <motion.span>{rounded}</motion.span>
            </motion.div>
            
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 2 }}
                className="h-4 bg-fuchsia-500 absolute -bottom-2 left-0 -z-10"
            />
            </div>

            <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-xl md:text-2xl font-medium mt-6"
            >
            Total contributions across <span className="text-fuchsia-500 font-black">{totalRepo}</span> repositories.
            </motion.p>
        </div>

        {/* Narrative Footer */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="flex flex-col items-center gap-6 mt-3"
        >
            <p className="text-neutral-500 italic max-w-xs text-center">
            {copy.footer}
            </p>
            
        </motion.div>
        </div>
    );
}