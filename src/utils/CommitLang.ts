type RepoDetails = {
  repository: {
    name: string,
    owner: {
        login: string
    },
    primaryLanguage: {
      name: string;
      color: string;
} | null;
  };
  contributions: {
    totalCount: number;
  };
};

type LanguageUsage = {
  language: string;
  commits: number;
  color: string;
};


export function detectTopLanguages(
  repoDetails: RepoDetails[]
): LanguageUsage[] {
  const languageMap: Record<
    string,
    { commits: number; color: string }
  > = {};

  repoDetails.forEach((repo) => {
    const lang = repo.repository.primaryLanguage;
    if (!lang) return;

    if (!languageMap[lang.name]) {
      languageMap[lang.name] = {
        commits: 0,
        color: lang.color,
      };
    }

    languageMap[lang.name].commits += repo.contributions.totalCount;
  });

  const sorted = Object.entries(languageMap)
    .map(([language, data]) => ({
      language,
      commits: data.commits,
      color: data.color,
    }))
    .sort((a, b) => b.commits - a.commits);

  return sorted.slice(0, 3);
}
