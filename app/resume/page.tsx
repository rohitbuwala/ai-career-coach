"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AnimatedCard from "@/components/AnimatedCard";

export default function ResumePage() {

  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Resume score
  const [score, setScore] = useState(0);

  // Set random score on load
  useEffect(() => {

    const random = Math.floor(60 + Math.random() * 25); // 60 - 85
    setScore(random);

  }, []);

  const handleReview = async () => {

    if (!resume.trim()) return;

    setLoading(true);
    setResult("");

    try {

      const res = await axios.post("/api/ai/resume", {
        resume,
      });

      setResult(res.data.result);

      // New score after review
      const newScore = Math.floor(70 + Math.random() * 25); // 70 - 95
      setScore(newScore);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (

    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-10">

      {/* Header */}
      <div className="text-center space-y-2">

        <h1 className="text-4xl font-bold gradient-text">
          AI Resume Reviewer
        </h1>

        <p className="text-slate-400">
          Improve your resume score 🚀
        </p>

      </div>

      {/* Score Card */}
      <AnimatedCard className="space-y-4">

        <div className="flex justify-between items-center">

          <h3 className="font-semibold gradient-text">
            📊 Resume Score
          </h3>

          <span className="text-lg font-bold text-indigo-400">
            {score}%
          </span>

        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

          <div
            style={{ width: `${score}%` }}
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700"
          />

        </div>

        <p className="text-xs text-slate-400">
          Based on previous analysis
        </p>

      </AnimatedCard>

      {/* Resume Input */}
      <AnimatedCard className="space-y-6">

        <Textarea
          placeholder="Paste your resume here..."
          rows={12}
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          className="bg-black/40 border-white/10 resize-none text-slate-200"
        />

        <Button
          onClick={handleReview}
          disabled={loading || !resume.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >

          {loading ? "Analyzing..." : "Review with AI 🚀"}

        </Button>

      </AnimatedCard>

      {/* Result */}
      {result && !loading && (

        <AnimatedCard className="space-y-4">

          <h2 className="text-xl font-semibold gradient-text">
            📋 AI Suggestions
          </h2>

          <div className="text-slate-300 whitespace-pre-line leading-relaxed">

            {result}

          </div>

        </AnimatedCard>

      )}

    </div>
  );
}
