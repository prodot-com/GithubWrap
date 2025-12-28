function getLocalDateString(ts: string): string {
  const d = new Date(ts);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}



export function getBusiestDay(commitDates: string[]) {
  const countByDay: Record<string, number> = {};

  commitDates.forEach((ts) => {
    const date = getLocalDateString(ts);
    countByDay[date] = (countByDay[date] || 0) + 1;
  });

  let busiestDate = "";
  let maxCommits = 0;

  for (const date in countByDay) {
    if (countByDay[date] > maxCommits) {
      maxCommits = countByDay[date];
      busiestDate = date;
    }
  }

  const formatted = new Date(busiestDate).toLocaleDateString(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});


  return {
    date: formatted,
    commits: maxCommits,
  };
}
