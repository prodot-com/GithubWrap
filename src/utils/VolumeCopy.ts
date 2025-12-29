export const getVolumeCopy = (commits: number) => {
  if (commits >= 1500) {
    return {
      title: "You were unstoppable.",
      subtitle: "This wasn’t coding — this was domination.",
      footer: "Our AI flagged this year as borderline legendary."
    };
  }

  if (commits >= 700) {
    return {
      title: "You shipped relentlessly.",
      subtitle: "Consistency met ambition.",
      footer: "A strong year with serious momentum."
    };
  }

  if (commits >= 500) {
    return {
      title: "You showed up.",
      subtitle: "Solid output with room to scale.",
      footer: "A dependable year of steady contributions."
    };
  }

  if (commits >= 300) {
    return {
      title: "You built when it mattered.",
      subtitle: "Not loud, but meaningful.",
      footer: "Quality over noise defined your year."
    };
  }

  return {
    title: "You planted the seeds.",
    subtitle: "Every journey starts with a first commit.",
    footer: "2026 looks promising already."
  };
};
