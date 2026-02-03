import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ================= START INTERVIEW =================
    if (body.type === "start") {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
You are a professional interviewer for beginners.

Rules:
- Ask only ONE short and simple question.
- Ask only common interview questions.
- Avoid difficult or unusual questions.
- Keep English easy.
- Be friendly and professional.

Ask questions like:
- Tell me about yourself.
- What are your skills?
- Why do you want this job?
- What are your strengths?
- Are you a fresher or experienced?

Start the interview now with the first question.
`,
          },
        ],
      });

      return Response.json({
        question: completion.choices[0].message.content,
      });
    }

    // ================= AFTER ANSWER =================
    if (body.type === "answer") {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
You are a professional interviewer.

Rules:
- First give short and polite feedback.
- Then ask ONE new short and simple question.
- Ask only common interview questions.
- Avoid hard English.
- Be friendly.

Format:
Feedback: <your feedback>
Question: <next question>
`,
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

      const text = completion.choices[0].message.content || "";


      const parts = text.split("\n");

      let feedback = "Good answer.";
      let nextQuestion = "Can you tell me more about yourself?";

      parts.forEach((line) => {
        if (line.toLowerCase().startsWith("feedback")) {
          feedback = line.replace("Feedback:", "").trim();
        }

        if (line.toLowerCase().startsWith("question")) {
          nextQuestion = line.replace("Question:", "").trim();
        }
      });

      return Response.json({
        feedback,
        nextQuestion,
      });
    }

    return Response.json(
      { error: "Invalid request type" },
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
