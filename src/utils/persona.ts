
export type PersonaType =
  | "Night Owl"
  | "Early Bird"
  | "Weekend Warrior"
  | "Marathon Runner"
  | "The Architect"
  | "The Closer"
  | "Consistent King"
  | "The Sprinter";

export type PersonaColor =
  | "fuchsia"
  | "yellow"
  | "orange"
  | "emerald"
  | "blue"
  | "neutral"
  | "purple"
  | "rose";

export type PersonaResult = {
  type: PersonaType;
  icon: string;
  description: string;
  stat: string;
  color: PersonaColor;
};

export function detectPersona(
  commitHours: number[],  
  commitDates: string[],   
  totalCommits: number
): PersonaResult {

  
  const total = commitHours.length || 1;

  // Time buckets
  let night = 0;
  let morning = 0;
  let midday = 0;
  let evening = 0;
  let weekend = 0;

  commitHours.forEach((hour, i) => {
    
    if (hour >= 22 || hour < 5) night++;
    else if (hour >= 5 && hour < 11) morning++;
    else if (hour >= 11 && hour < 17) midday++;
    else evening++;

    // Weekend detection
    const day = new Date(commitDates[i]).getDay(); // 0 = Sun, 6 = Sat
    if (day === 0 || day === 6) weekend++;
  });

  // Ratios
  const ratios = {
    night: night / total,
    morning: morning / total,
    midday: midday / total,
    evening: evening / total,
    weekend: weekend / total,
  };

  // =====================
  // PERSONA PRIORITY ORDER
  // =====================

  
  if (ratios.weekend >= 0.5) {
    return {
      type: "Weekend Warrior",
      icon: "🛡️",
      description: "Weekdays are quiet. Weekends are for shipping.",
      stat: `${Math.round(ratios.weekend * 100)}% of your commits landed on weekends.`,
      color: "purple",
    };
  }

  // 2️⃣ 🌙 Night Owl
  if (ratios.night >= 0.45) {
    return {
      type: "Night Owl",
      icon: "🦉",
      description: "The world sleeps, you ship. You thrive after dark.",
      stat: `${Math.round(ratios.night * 100)}% of your commits happened after 10 PM.`,
      color: "fuchsia",
    };
  }

  // 3️⃣ 🌅 Early Bird
  if (ratios.morning >= 0.45) {
    return {
      type: "Early Bird",
      icon: "🌅",
      description: "You conquer the day before the stand-up even begins.",
      stat: `${Math.round(ratios.morning * 100)}% of your commits happened before 11 AM.`,
      color: "orange",
    };
  }

  // 4️⃣ 🎯 The Closer (Evening finisher)
  if (ratios.evening >= 0.5) {
    return {
      type: "The Closer",
      icon: "🎯",
      description: "One last commit. Every night.",
      stat: "Most of your work wraps up during the evening hours.",
      color: "blue",
    };
  }

  // 5️⃣ ⚡ The Sprinter (High focus core hours)
  if (totalCommits > 500 && ratios.midday >= 0.6) {
    return {
      type: "The Sprinter",
      icon: "🏃",
      description: "High intensity. High focus. No wasted motion.",
      stat: "You dominate the core working hours with precision.",
      color: "yellow",
    };
  }

  // 6️⃣ 🏛️ The Architect (Huge volume)
  if (totalCommits >= 2000) {
    return {
      type: "The Architect",
      icon: "🏛️",
      description: "A monument of code. Your output speaks for itself.",
      stat: `You shipped ${totalCommits} commits this year. That’s legacy work.`,
      color: "emerald",
    };
  }

  // 7️ 🏃‍♂️ Marathon Runner (Long multi-phase days)
  if (
    totalCommits > 800 &&
    ratios.night >= 0.3 &&
    ratios.midday >= 0.3
  ) {
    return {
      type: "Marathon Runner",
      icon: "🏃‍♂️",
      description: "You code in long, unstoppable stretches.",
      stat: "Your activity spans multiple phases of the day.",
      color: "rose",
    };
  }

  // 8️ 👑 Consistent King (Fallback)
  return {
    type: "Consistent King",
    icon: "👑",
    description: "Steady hands. Steady mind. Perfect rhythm.",
    stat: "Your contribution pattern is balanced across the clock.",
    color: "neutral",
  };
}
