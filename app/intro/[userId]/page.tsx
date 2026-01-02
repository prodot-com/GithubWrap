import axios from "axios";
import Intro from "@/src/components/Intro";
import ProgressBar from "@/src/components/progressBar";

type Props = {
  params: { userId: string };
};

export default async function UserIntroPage({ params }: Props) {
  const { userId } = await params;

   const response = await axios.get(
    `https://api.github.com/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );
  const user = response.data;

  

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <Intro user={user} userId={userId}/>
    </div>
  );
}