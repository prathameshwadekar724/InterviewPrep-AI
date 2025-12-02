import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing in .env.local");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const interviewModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
