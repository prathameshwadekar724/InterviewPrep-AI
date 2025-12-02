"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full overflow-x-hidden relative bg-linear-to-br from-[#0d0d0d] via-[#101830] to-[#050505] text-white px-4 py-16 flex flex-col items-center">

      {/* FORCE-CLIP ALL BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Glow circles */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600 opacity-20 blur-[150px] rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600 opacity-20 blur-[150px] rounded-full"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] opacity-10"></div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide z-10 text-center bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-xl">
        AI Interview Tutor
      </h1>

      <p className="text-base md:text-lg text-gray-300 max-w-2xl text-center mt-6 z-10 px-2">
        Prepare for real interviews with AI-powered question generation, instant scoring, personalized feedback, 
        and a detailed performance dashboard.
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-16 px-2 z-10">
        {[
          {
            title: "AI-generated Questions",
            desc: "Dynamic & role-based questions tailored to difficulty level.",
          },
          {
            title: "Instant Answer Evaluation",
            desc: "Receive real-time scoring and feedback for every response.",
          },
          {
            title: "Final Performance Report",
            desc: "Dashboard summarizing strengths, weaknesses & recommendations.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 bg-[#111] border border-gray-800 rounded-xl shadow-lg hover:shadow-blue-500/20 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <h2 className="text-3xl font-bold mt-20 z-10">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl mt-8 px-2 z-10">
        {[
          "Select your role",
          "Choose difficulty",
          "Pick interview type",
          "Answer 5 AI questions",
          "Get your detailed report",
        ].map((step, i) => (
          <div key={i} className="p-4 bg-[#0f0f0f] border border-gray-800 rounded-xl">
            <p className="text-2xl font-bold">{i + 1}</p>
            <p className="text-gray-300 mt-2">{step}</p>
          </div>
        ))}
      </div>

      {/* Start Button */}
      <button
        onClick={() => router.push("/interview")}
        className="mt-16 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-xl font-semibold shadow-lg shadow-blue-500/20 transition z-10"
      >
        Start Interview →
      </button>
    </main>
  );
}
