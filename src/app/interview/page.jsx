"use client";

import { useState } from "react";

export default function InterviewPage() {
  const [step, setStep] = useState(1);

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [history, setHistory] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // NEW STATES
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [nextQuestion, setNextQuestion] = useState("");

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

    // Build temporary history entry (only Q + A)
    const tempEntry = { question: currentQuestion, answer };

    const res = await fetch("/api/interview", {
      method: "POST",
      body: JSON.stringify({
        role,
        difficulty,
        interviewType,
        history: [...history, tempEntry], // send this TEMP history
      }),
    });

    const data = await res.json();

    if (data.mode === "ongoing") {

      // Build the COMPLETED history item
      const finalEntry = {
        question: currentQuestion,
        answer,
        correctAnswer: data.correctAnswer,
        feedback: data.feedback,
        score: data.score,
      };

      // Update state history with fully evaluated item
      setHistory([...history, finalEntry]);

      // Display evaluation
      setCorrectAnswer(data.correctAnswer);
      setFeedback(data.feedback);
      setScore(data.score);
      setNextQuestion(data.question);
      setShowResult(true);
    }

    if (data.mode === "finished") {
      setFinalReport(data.finalReport);
      setStep(5);
    }

    setLoading(false);
  };



  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-[#0d0d0d] via-[#101830] to-[#050505] text-white px-6 py-12 flex flex-col items-center relative">

      {/* Glow circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600 opacity-20 blur-[120px] rounded-full"></div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[40px_40px] opacity-10 pointer-events-none"></div>

      {/* Title */}
      <h1 className="text-5xl font-bold mb-10 tracking-wide z-10 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        AI Interview Tutor
      </h1>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-[#0e0e0e]/80 border border-gray-800 p-8 rounded-2xl shadow-xl backdrop-blur-lg z-10">

        {/* STEP 1 — ROLE */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Enter Job Role</h2>
            <input
              className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white"
              placeholder="e.g. Backend Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <button
              onClick={() => role && setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
            >
              Next →
            </button>
          </div>
        )}

        {/* STEP 2 — DIFFICULTY */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Select Difficulty</h2>

            {["Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDifficulty(d);
                  setStep(3);
                }}
                className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800"
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 — INTERVIEW TYPE */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Select Interview Type</h2>

            {["Technical", "HR", "Behavioral", "Mixed"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setInterviewType(t);
                  startInterview();
                }}
                className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* STEP 4 — INTERVIEW */}
        {step === 4 && (
          <div className="space-y-6">

            {/* Current Question */}
            {!showResult && (
              <>
                <div className="bg-gray-900 p-5 border border-gray-700 rounded-lg">
                  <p className="text-gray-400">Question:</p>
                  <p className="text-lg mt-2">{currentQuestion}</p>
                </div>

                <textarea
                  className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white h-32"
                  placeholder="Type your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />

                <button
                  onClick={!loading ? sendAnswer : null}
                  disabled={loading}
                  className={`w-full p-3 rounded-lg font-semibold transition 
               ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {loading ? "Submitting..." : "Submit Answer →"}
                </button>
              </>
            )}

            {/* SHOW RESULT + NEXT BUTTON */}
            {showResult && (
              <div className="space-y-6">

                <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-400">Score: {score}/10</h3>
                  <p className="text-gray-300 mt-2">{feedback}</p>
                </div>

                <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-400">Correct Answer</h3>
                  <p className="text-gray-300 mt-2">{correctAnswer}</p>
                </div>

                <button
                  onClick={() => {
                    setCurrentQuestion(nextQuestion);
                    setShowResult(false);
                    setAnswer("");
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold"
                >
                  Next Question →
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 5 — FINAL REPORT */}
        {step === 5 && finalReport && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-blue-400">
              Final Interview Report
            </h2>

            {/* Score */}
            <div className="bg-gray-900 p-6 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Overall Score</h3>

              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-green-400">
                  {finalReport.overallScore}/10
                </div>

                <div className="flex-1 h-3 bg-gray-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${finalReport.overallScore * 10}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-gray-900 p-6 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-semibold text-green-400">Strengths</h3>
              <ul className="pl-6 mt-2 space-y-2 list-disc text-gray-300">
                {finalReport.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-gray-900 p-6 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-semibold text-yellow-400">
                Areas for Improvement
              </h3>
              <ul className="pl-6 mt-2 space-y-2 list-disc text-gray-300">
                {finalReport.areasForImprovement?.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-900 p-6 border border-gray-700 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-400">
                Recommendations
              </h3>
              <ul className="pl-6 mt-2 space-y-2 list-disc text-gray-300">
                {finalReport.recommendations?.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold"
            >
              Restart Interview
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
