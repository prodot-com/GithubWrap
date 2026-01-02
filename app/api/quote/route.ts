import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const systemQuote = "You are a witty, slightly sarcastic narrator for a GitHub Wrapped-style experience. Write ONE sharp, memorable sentence (max 20 words). Tone: clever, confident, playful—not mean. Reference the developer’s persona, primary language, or coding habits subtly. Avoid emojis. Avoid clichés. Make it feel shareable."

type WrappedQuoteRequest = {
  persona: string;
  language: string;
  commitCount: number;
};

export async function POST(req: Request) {
  const body = (await req.json()) as WrappedQuoteRequest;
  const { persona, language, commitCount } = body;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: systemQuote,
        },
        {
          role: "user",
          content: `Persona: ${persona},Primary Language: ${language}, Commits: ${commitCount}.`,
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
