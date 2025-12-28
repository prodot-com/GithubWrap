import axios from "axios";
import Slider from "./Slider";

type Props = {
  params: { userId: string };
};

export default async function UserIntroPage({ params }: Props) {
  const { userId } =await params;

  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  };

  const statsQuery = `
    query ($username: String!) {
      user(login: $username) {
        repositories(privacy: PUBLIC) {
          totalCount
        }
        contributionsCollection(
          from: "2025-01-01T00:00:00Z",
          to: "2025-12-31T23:59:59Z"
        ) {
          contributionCalendar {
            totalContributions
          }
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
          commitContributionsByRepository(maxRepositories: 5) {
            repository {
              name
              owner {
                login
              }
            }
          }
        }
      }
    }
  `;

  const timingQuery = `
    query ($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        defaultBranchRef {
          target {
            ... on Commit {
              history(
                since: "2025-01-01T00:00:00Z",
                until: "2025-12-31T23:59:59Z"
              ) {
                nodes {
                  authoredDate
                }
              }
            }
          }
        }
      }
    }
  `;


  const statsRes = await axios.post(
    "https://api.github.com/graphql",
    {
      query: statsQuery,
      variables: { username: userId },
    },
    { headers }
  );

  const user = statsRes.data.data.user;
//   console.log(user)
  const repos = user.contributionsCollection.commitContributionsByRepository ?? [];


    const commitTimings = await Promise.all(
    repos.map((repo: any) =>
        axios
        .post(
            "https://api.github.com/graphql",
            {
            query: timingQuery,
            variables: {
                owner: repo.repository.owner.login,
                name: repo.repository.name,
            },
            },
            { headers }
        )
        .then(
          (res) =>
            res.data.data.repository.defaultBranchRef?.target?.history?.nodes ?? []
        )
    )
  );

//   console.log(commitTimings)

  // Flatten commit timestamps
  const commitDates = commitTimings.flat().map(
    (c: any) => c.authoredDate
  );

  // console.log(commitDates)

const hours = commitDates.map(ts =>
  new Date(ts).getHours()
);


//   console.log(hours)

  return (
    <Slider
      totalRepo={user.repositories.totalCount}
      contributedRepo={
        user.contributionsCollection.totalRepositoryContributions
      }
      totalCommits={
        user.contributionsCollection.totalCommitContributions
      }
      totalPR={
        user.contributionsCollection.totalPullRequestContributions
      }
      totalIssues={
        user.contributionsCollection.totalIssueContributions
      }
      totalContributions={
        user.contributionsCollection.contributionCalendar
          .totalContributions
      }
      repoDetails={repos}
      commitHour={hours}
      commitDates= {commitDates}
    />
  );
}
