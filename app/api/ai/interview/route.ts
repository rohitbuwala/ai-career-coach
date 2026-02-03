import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.type === "start") {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a professional interviewer. Ask one question.",
          },
        ],
      });

      return Response.json({
        question:
          completion.choices[0].message.content,
      });
    }

    if (body.type === "answer") {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Give feedback and ask next question.",
          },
          {
            role: "user",
            content: `
Question: ${body.question}
Answer: ${body.answer}
`,
          },
        ],
      });

      const text =
        completion.choices[0].message.content;

      const parts = text.split("\n\n");

      return Response.json({
        feedback: parts[0],
        nextQuestion:
          parts[1] || "Next question?",
      });
    }

    return Response.json(
      { error: "Invalid request" },
      { status: 400 }
    );

  } catch (err: any) {
    console.error(err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
