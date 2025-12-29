type ProgressBarProps = {
  step: number;
  total?: number;
};

export default function ProgressBar({ step, total = 5 }: ProgressBarProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1 w-8 rounded-full transition-all duration-300 ${
            index < step ? "bg-white" : "bg-neutral-800"
          }`}
        />
      ))}
    </div>
  );
}
