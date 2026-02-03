"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AnimatedCard from "@/components/AnimatedCard";

export default function InterviewPage() {
  const [question, setQuestion] = useState(
    "Click Start to begin interview"
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/ai/interview", {
        type: "start",
      });

      setQuestion(res.data.question);
      setFeedback("");
      setAnswer("");

    } finally {
      setLoading(false);
    }
  };

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
  <div className="min-h-[80vh] flex flex-col justify-center space-y-8">

    {/* Title */}
    <h1 className="text-4xl font-bold text-indigo-400 text-center">
      AI Mock Interview
    </h1>

    {/* Panels */}
    <div className="grid md:grid-cols-2 gap-8">

      {/* AI Panel */}
      <div className="gradient-card">
        <div className="text-center space-y-4">

          <div className="w-20 h-20 mx-auto rounded-full bg-indigo-600/20 flex items-center justify-center text-3xl">
            🤖
          </div>

          <h2 className="font-semibold text-lg">
            AI Interviewer
          </h2>

          <p className="text-slate-300 leading-relaxed">
            {question}
          </p>

        </div>
      </div>

      {/* User Panel */}
      <div className="gradient-card">
        <div className="space-y-4">

          <div className="w-20 h-20 mx-auto rounded-full bg-cyan-600/20 flex items-center justify-center text-3xl">
            👤
          </div>

          <h2 className="font-semibold text-lg text-center">
            You
          </h2>

          <Textarea
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="bg-black/40 border-white/10 min-h-[140px]"
          />

        </div>
      </div>

    </div>

    {/* Controls */}
    <div className="flex justify-center gap-4">

      <Button
        onClick={startInterview}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 glow-btn px-8"
      >
        {loading ? "Loading..." : "Start"}
      </Button>

      <Button
        onClick={submitAnswer}
        disabled={!answer || loading}
        variant="outline"
        className="px-8"
      >
        Submit
      </Button>

    </div>

    {/* Feedback */}
    {feedback && (

      <div className="gradient-card max-w-3xl mx-auto">
        <div>

          <h3 className="text-green-400 font-semibold">
            AI Feedback
          </h3>

          <p className="text-slate-300 mt-2 leading-relaxed">
            {feedback}
          </p>

        </div>
      </div>
    )}

  </div>
);

}
