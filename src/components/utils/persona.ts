type PersonaType =
  | "Night Owl"
  | "Early Bird"
  | "Grinder"
  | "Balanced Hacker";

type PersonaResult = {
  type: PersonaType;
  stat: string;
};

export function detectPersona(
  commitDates: number[],
  totalCommits: number
): PersonaResult {

  let night = 0;
  let morning = 0;

  commitDates.forEach((dateStr) => {
    // const hour = new Date(dateStr).getHours();

    const hour = dateStr

    // Night: 10 PM – 5 AM
    if (hour >= 22 || hour < 5) {
      night++;
    }

    // Morning: 5 AM – 10 AM
    if (hour >= 5 && hour < 10) {
      morning++;
    }
  });

  const nightRatio = night / totalCommits;
  const morningRatio = morning / totalCommits;

  // 🌙 Night Owl
  if (nightRatio >= 0.55) {
    return {
      type: "Night Owl",
      stat: `${Math.round(nightRatio * 100)}% of your commits happened after 10 PM.`,
    };
  }

  // 🌞 Early Bird
  if (morningRatio >= 0.55) {
    return {
      type: "Early Bird",
      stat: `${Math.round(morningRatio * 100)}% of your commits happened before 10 AM.`,
    };
  }

  // ☕ Grinder (high volume)
  if (totalCommits >= 1500) {
    return {
      type: "Grinder",
      stat: `You pushed over ${totalCommits} commits this year.`,
    };
  }

  // ⚖️ Balanced
  return {
    type: "Balanced Hacker",
    stat: `Your work is evenly distributed across the day.`,
  };
}
