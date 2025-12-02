import { NextResponse } from "next/server";
import { interviewModel } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { role, difficulty, interviewType, history } = await req.json();

    const basePrompt = `
You are an AI Interview Tutor.
Role: ${role}
Difficulty: ${difficulty}
Interview Type: ${interviewType}

Rules:
1. Ask ONE question at a time.
2. For each answer, evaluate with:
   - score (0–10)
   - feedback (1–2 lines)
   - correctAnswer (ideal industry-standard answer)
3. Interview has TOTAL 5 questions.
4. ALWAYS return ONLY VALID JSON. No markdown. No extra text.

ONGOING FORMAT:
{
 "mode": "ongoing",
 "questionNumber": <n>,
 "question": "",
 "correctAnswer": "",
 "score": <number>,
 "feedback": "",
 "history": [...]
}

FINISHED FORMAT:
{
 "mode": "finished",
 "finalReport": {
    "overallScore": number,
    "strengths": [],
    "areasForImprovement": [],
    "recommendations": []
 }
}

Return ONLY valid JSON.
`;

    // Convert history into readable prompt
    let historyBlock = "No previous questions. Start with Question 1.";

    if (history && history.length > 0) {
      historyBlock = history
        .map(
          (h, i) => `
Q${i + 1}: ${h.question}
User Answer: ${h.answer}
Correct Answer: ${h.correctAnswer || ""}
Score: ${h.score || ""}
Feedback: ${h.feedback || ""}
`
        )
        .join("\n");
    }

    // Instruction for next step
    const instruction =
      history?.length >= 1 && history.length < 5
        ? "Evaluate the last answer and ask the next question."
        : history.length >= 5
        ? "Generate the FINAL REPORT only."
        : "Ask Question 1.";

    const finalPrompt = `${basePrompt}\n${historyBlock}\n${instruction}`;

    // Gemini API call
    const result = await interviewModel.generateContent({
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      generationConfig: { temperature: 0.5 },
    });

    let output = result.response.text();

    // CLEAN OUTPUT → remove ```json / ```
    output = output
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Parse safely
    let json;
    try {
      json = JSON.parse(output);
    } catch (err) {
      console.log("⛔ RAW GEMINI OUTPUT:", output);
      return NextResponse.json(
        {
          error: "AI returned invalid JSON",
          raw: output,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(json);
  } catch (err) {
    console.log("SERVER ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
