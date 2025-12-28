import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

type WrappedQuoteRequest = {
  persona: string;
  language: string;
  commitCount: number;
};

export async function POST(req: Request) {
  const body = (await req.json()) as WrappedQuoteRequest;
  const { persona, language, commitCount } = body;

  // console.log(persona, language, commitCount)

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "You are a witty AI narrator for a GitHub Wrapped app. Write a 1-sentence snarky vibe check. Max 25 words.",
        },
        {
          role: "user",
          content: `Persona: ${persona}, Language: ${language}, Commits: ${commitCount}.`,
        },
      ],
    });

    const quote =
      completion.choices[0]?.message?.content ??
      "Your code is a mystery even to the AI.";

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate quote" },
      { status: 500 }
    );
  }
}
