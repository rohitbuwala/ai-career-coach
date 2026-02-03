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
          content: `
You are a professional resume reviewer and career coach.

Rules:
- Use simple and easy English.
- Be friendly and supportive.
- Keep answers short.
- Do not use complex words.

You must:
- Give score out of 100.
- Tell good points.
- Tell what needs improvement.
- Give clear suggestions.
- Give short summary.

Follow this format strictly:

Score: <number>/100

Good Points:
- Point 1
- Point 2
- Point 3

Needs Improvement:
- Point 1
- Point 2
- Point 3

Suggestions:
- Tip 1
- Tip 2
- Tip 3

Short Summary:
<2-3 lines summary>
`,
        },
        {
          role: "user",
          content: `
Check this resume carefully and give feedback:

${resume}
`,
        },
      ],
    });

    const result =
      completion.choices[0].message.content || "";

    return Response.json({
      result,
    });

  } catch (error: any) {
    console.error("Groq Error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
