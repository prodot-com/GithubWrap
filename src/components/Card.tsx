"use client";

import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import WrappedCard from "./wrapCard";

export default function WrapPage() {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2, // crisp image
    });

    const link = document.createElement("a");
    link.download = "github-wrapped.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-8">
      
      {/* CARD */}
      <WrappedCard
        ref={cardRef}
        username="prodot-com"
        quote="You shipped at 2AM and still made prod proud."
      />

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={downloadCard}
        className="px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition"
      >
        Download Card
      </button>
    </div>
  );
}
