export function getGrindCopy(commitCount: number) {
  if (commitCount >= 50) {
    return {
      title: "You never clocked out.",
      ai: "The AI noticed a massive spike in activity. Were you even sleeping that week?"
    };
  }

  if (commitCount >= 25) {
    return {
      title: "You went all in.",
      ai: "Strong focus detected. That day carried serious momentum."
    };
  }

  if (commitCount >= 10) {
    return {
      title: "You showed up.",
      ai: "Consistent effort spotted. Progress beats perfection."
    };
  }

  return {
    title: "A calm grind.",
    ai: "Not every day is a sprint. Sometimes steady wins the year."
  };
}
