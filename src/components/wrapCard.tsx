import React from "react";

type WrappedCardProps = {
  username: string;
  quote: string;
};

const WrappedCard = React.forwardRef<HTMLDivElement, WrappedCardProps>(
  ({ username, quote }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[400px] h-[400px] bg-black text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl"
      >
        <div>
          <p className="text-sm uppercase tracking-widest text-neutral-400">
            GitHub Wrapped 2025
          </p>
          <h1 className="text-3xl font-black mt-2">@{username}</h1>
        </div>

        <p className="text-xl italic font-semibold leading-tight">
          “{quote}”
        </p>

        <p className="text-xs text-neutral-500 text-right">
          github-wrapped.vercel.app
        </p>
      </div>
    );
  }
);

WrappedCard.displayName = "WrappedCard";

export default WrappedCard;
