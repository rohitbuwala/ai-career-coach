"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ResumePage() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");

  const handleReview = async () => {
    const res = await axios.post("/api/ai/resume", {
      resume,
    });

    setResult(res.data.result);
  };

  return (
    <>

    <div className="p-8 max-w-3xl mx-auto space-y-4">

      <h1 className="text-3xl font-bold">
        AI Resume Reviewer
      </h1>

      <Textarea
        placeholder="Paste your resume here..."
        rows={10}
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <Button onClick={handleReview}>
        Review with AI
      </Button>

      {result && (
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">
            AI Suggestions:
          </h2>

          <p className="whitespace-pre-line">
            {result}
          </p>
        </div>
      )}

    </div>
    </>
  );
}
