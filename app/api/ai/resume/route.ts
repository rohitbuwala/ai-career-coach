import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { resume } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a professional career coach.",
        },
        {
          role: "user",
          content: `Review this resume and give suggestions:\n${resume}`,
        },
      ],
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });

  } catch (error: any) {
    console.error("Groq Error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
