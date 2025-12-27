import axios from "axios";
import VolumePage from "@/src/components/Volume";
import ProgressBar from "@/src/components/progressBar";

type Props = {
    params: { userId: string };
};

export default async function UserIntroPage({ params }: Props) {
    const { userId } = await params;

    const query = "query ($username: String!) { user(login: $username) { repositories(privacy: PUBLIC) { totalCount } contributionsCollection(from: \"2025-01-01T00:00:00Z\", to: \"2025-12-31T23:59:59Z\") { contributionCalendar { totalContributions } totalCommitContributions totalPullRequestContributions totalIssueContributions totalRepositoryContributions } } }"

    const response = await axios.post("https://api.github.com/graphql",
        {
            query,
            variables: {
            username: userId,
            },
        },
        {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
    }
    );
    
    const data = response.data.data.user
    // console.log(data)

    const totalRepo = data.repositories.totalCount;
    const contributedRepo = data.contributionsCollection.totalRepositoryContributions;
    const totalCommits = data.contributionsCollection.totalCommitContributions;
    const totalPR = data.contributionsCollection.totalPullRequestContributions;
    const totalIssues = data.contributionsCollection.totalIssueContributions;
    const totalContributions = data.contributionsCollection.contributionCalendar.totalContributions;

    console.log(totalRepo,contributedRepo,totalCommits,totalPR, totalIssues, totalContributions)

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
            <VolumePage totalCommits={totalCommits} totalRepo={totalRepo} contributedRepo={contributedRepo}/>
            <ProgressBar step={1}/>
        </div>
    );
}