"use client";

import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [history, setHistory] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [finalReport, setFinalReport] = useState(null);
  const [loading, setLoading] = useState(false);
  // Start interview
  const startInterview = async () => {
    const res = await fetch("/api/interview", {
      method: "POST",
      body: JSON.stringify({
        role,
        difficulty,
        interviewType,
        history: [],
      }),
    });

    const data = await res.json();
    setCurrentQuestion(data.question);
    setStep(4);
  };

  // Submit answer
  const sendAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    const newHistory = [
      ...history,
      { question: currentQuestion, answer: answer },
    ];

    const res = await fetch("/api/interview", {
      method: "POST",
      body: JSON.stringify({
        role,
        difficulty,
        interviewType,
        history: newHistory,
      }),
    });

    const data = await res.json();

    if (data.mode === "ongoing") {
      setHistory(data.history);
      setCurrentQuestion(data.question);
      setAnswer("");
    } else if (data.mode === "finished") {
      setFinalReport(data.finalReport);
      setStep(5);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen w-full bg-linear-to-br from-[#0d0d0d] via-[#101830] to-[#050505] text-white px-6 py-12 flex flex-col items-center relative overflow-hidden">

      {/* Glow circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600 opacity-20 blur-[120px] rounded-full"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[40px_40px] opacity-10 pointer-events-none"></div>

      {/* Title */}
      <h1 className="text-5xl font-bold mb-10 tracking-wide z-10 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        AI Interview Tutor
      </h1>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-[#0f0f0f]/80 border border-gray-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl z-10">

        {/* STEP 1 — ROLE */}
        {step === 1 && (
          <div className="space-y-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold">Enter Job Role</h2>

            <input
              className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Backend Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <button
              onClick={() => role && setStep(2)}
              className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold w-full"
            >
              Next →
            </button>
          </div>
        )}

        {/* STEP 2 — DIFFICULTY */}
        {step === 2 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold">Select Difficulty</h2>

            <div className="grid grid-cols-1 gap-4">
              {["Easy", "Medium", "Hard"].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDifficulty(d);
                    setStep(3);
                  }}
                  className="p-4 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800 transition"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — INTERVIEW TYPE */}
        {step === 3 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold">Select Interview Type</h2>

            <div className="grid grid-cols-1 gap-4">
              {["Technical", "HR", "Behavioral", "Mixed"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setInterviewType(t);
                    startInterview();
                  }}
                  className="p-4 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800 transition"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 — INTERVIEW CHAT */}
        {step === 4 && (
          <div className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold">Interview in Progress…</h2>

            <div className="bg-gray-900 border border-gray-700 p-5 rounded-lg">
              <p className="text-gray-400 mb-1">Question:</p>
              <p className="text-lg">{currentQuestion}</p>
            </div>

            <textarea
              className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="Type your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <button
              onClick={!loading ? sendAnswer : null}
              disabled={loading}
              className={`w-full p-3 rounded-lg font-semibold transition 
    ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Answer →"
              )}
            </button>

          </div>
        )}

        {/* STEP 5 — FINAL DASHBOARD REPORT */}
        {step === 5 && finalReport && (
          <div className="space-y-8">

            <h2 className="text-3xl font-bold text-blue-400">
              Final Interview Report
            </h2>

            {/* Overall Score */}
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Overall Score</h3>

              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-green-400">
                  {finalReport.overallScore}/10
                </div>

                <div className="flex-1 bg-gray-700 h-3 rounded overflow-hidden">
                  <div
                    className="h-3 bg-green-500"
                    style={{ width: `${finalReport.overallScore * 10}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-green-400">
                Strengths
              </h3>
              <ul className="space-y-2 list-disc pl-6 text-gray-300">
                {finalReport.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Improvement */}
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                Areas for Improvement
              </h3>
              <ul className="space-y-2 list-disc pl-6 text-gray-300">
                {finalReport.areasForImprovement?.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                Recommendations
              </h3>
              <ul className="space-y-2 list-disc pl-6 text-gray-300">
                {finalReport.recommendations?.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold w-full"
            >
              Restart Interview
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
