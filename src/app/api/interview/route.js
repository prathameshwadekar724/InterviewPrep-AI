import { NextResponse } from "next/server";
import { interviewModel } from "@/lib/gemini";

export async function POST(req) {
  try {
    const body = await req.json();
    const { role, difficulty, interviewType, history } = body;

    const basePrompt = `
You are an Interview Tutor.
Role: ${role}
Difficulty: ${difficulty}
Interview Type: ${interviewType}

Rules:
1. Ask one question at a time.
2. Evaluate answer with score (0–10) + feedback.
3. Total 5 questions.
4. Always return VALID JSON. No explanations. No code blocks.
If interview not finished:
{
 "mode": "ongoing",
 "questionNumber": <n>,
 "question": "",
 "score": null or number,
 "feedback": "",
 "history": [...]
}
If finished:
{
 "mode": "finished",
 "finalReport": { ... }
}
Return ONLY JSON. Remove markdown formatting.
`;

    const historyText = history?.length
      ? history
          .map(
            (h, i) => `
Q${i + 1}: ${h.question}
Answer: ${h.answer}
Score: ${h.score || ""}
Feedback: ${h.feedback || ""}
`
          )
          .join("\n")
      : "No history. Start with Question 1.";

    const instruction =
      history?.length > 0
        ? `Evaluate last answer, then ask next question unless total = 5.`
        : `Ask Question 1 only.`;

    const prompt = basePrompt + "\n" + historyText + "\n" + instruction;

    const result = await interviewModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 },
    });

    let text = result.response.text();

    // 🟢 FIX: remove ```json and ```
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // Try parsing JSON
    let json;
    try {
      json = JSON.parse(text);
    } catch (err) {
      console.log("RAW GEMINI OUTPUT:", text);
      return NextResponse.json(
        { error: "JSON parse error", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
