"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function InterviewPage() {

  const [question, setQuestion] = useState(
    "Click Start to begin your smart AI interview 🚀"
  );

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  // Start Interview
  const startInterview = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/ai/interview", {
        type: "start",
      });

      setQuestion(res.data.question);
      setAnswer("");
      setFeedback("");

    } finally {
      setLoading(false);
    }
  };

  // Submit Answer
  const submitAnswer = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/ai/interview", {
        type: "answer",
        question,
        answer,
      });

      setFeedback(res.data.feedback);
      setQuestion(res.data.nextQuestion);
      setAnswer("");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-[80vh] max-w-7xl mx-auto px-4 py-12 space-y-14">

      {/* Header */}
      <div className="text-center space-y-3">

        <h1 className="text-5xl font-bold gradient-animate glow-text">
          AI Mock Interview
        </h1>

        <p className="text-lg text-slate-400">
          Train with AI • Improve Confidence • Crack Interviews 💼🔥
        </p>

        <p className="text-sm text-slate-500">
          Real-time feedback • Smart questions • Career growth
        </p>

      </div>

      {/* Panels */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* AI Panel */}
        <div className="gradient-card">

          <div className="text-center space-y-5">

            <div className="w-24 h-20 mx-auto rounded-full bg-indigo-600/20 flex items-center justify-center text-4xl">
              🤖
            </div>

            <h2 className="font-semibold text-xl gradient-animate">
              AI Interviewer
            </h2>

            <p className="text-slate-300 leading-relaxed min-h-[80px]">
              {question}
            </p>

            <p className="text-xs text-slate-500">
              Powered by Smart AI Engine ⚡
            </p>

          </div>

        </div>

        {/* User Panel */}
        <div className="gradient-card">

          <div className="space-y-5">

            <div className="w-24 h-20 mx-auto rounded-full bg-cyan-600/20 flex items-center justify-center text-4xl">
              👤
            </div>

            <h2 className="font-semibold text-xl text-center gradient-animate">
              You
            </h2>

            <Textarea
              placeholder="Type your confident answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-black/40 border-white/10 min-h-[160px] resize-none text-slate-200"
            />

            <p className="text-xs text-slate-500 text-center">
              Tip: Answer clearly & confidently ✨
            </p>

          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-5">

        <Button
          onClick={startInterview}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 glow-btn px-10 py-6 text-lg"
        >
          {loading ? "Preparing AI..." : "🚀 Start Interview"}
        </Button>

        <Button
          onClick={submitAnswer}
          disabled={!answer || loading}
          variant="outline"
          className="px-10 py-6 text-lg border-indigo-500/50"
        >
          📤 Submit Answer
        </Button>

      </div>

      {/* Feedback */}
      {feedback && (

        <div className="gradient-card max-w-3xl mx-auto">

          <h3 className="font-semibold text-lg gradient-animate mb-3">
            AI Feedback & Improvement Tips 💡
          </h3>

          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {feedback}
          </p>

        </div>

      )}

    </div>
  );
}
