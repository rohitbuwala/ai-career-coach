import AnimatedCard from "@/components/AnimatedCard";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12 overflow-x-hidden w-full">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400 mt-1">
          Your AI career assistant dashboard
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* Progress */}
      <AnimatedCard>

        <h3 className="font-semibold mb-4 gradient-text flex items-center gap-2">
          📈 Your Progress
        </h3>

        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

          <div className="h-3 w-[65%] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse" />

        </div>

        <p className="text-sm text-slate-400 mt-2">
          65% completed
        </p>

      </AnimatedCard>

      {/* Tips */}
      <div>

        <h3 className="font-semibold mb-4 gradient-text">
          💡 AI Career Tips
        </h3>

        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar scroll-smooth">

          {[
            "Improve resume keywords",
            "Practice daily interviews",
            "Update GitHub profile",
            "Learn system design",
            "Build more projects",
            "Improve English speaking",
          ].map((tip, i) => (

            <div
              key={i}
              className="min-w-[220px] flex-shrink-0"
            >

              <AnimatedCard>

                <p className="text-sm text-slate-300">
                  💡 {tip}
                </p>

              </AnimatedCard>

            </div>

          ))}

        </div>

      </div>

      {/* Main Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        <Link href="/resume" className="block">

          <AnimatedCard>

            <h3 className="text-xl font-semibold mb-2 gradient-text flex items-center gap-2">
              📄 Resume Review
            </h3>

            <p className="text-slate-400">
              Analyze your resume
            </p>

          </AnimatedCard>

        </Link>

        <Link href="/interview" className="block">

          <AnimatedCard>

            <h3 className="text-xl font-semibold mb-2 gradient-text flex items-center gap-2">
              🎤 Mock Interview
            </h3>

            <p className="text-slate-400">
              Practice questions
            </p>

          </AnimatedCard>

        </Link>

        <AnimatedCard>

          <h3 className="text-xl font-semibold mb-2 gradient-text flex items-center gap-2">
            👤 Profile
          </h3>

          <p className="text-slate-400">
            View stats
          </p>

        </AnimatedCard>

      </div>

      {/* Activity + Suggestions */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">

        {/* Activity */}
        <AnimatedCard>

          <h3 className="font-semibold mb-4 gradient-text flex items-center gap-2">
            📊 Recent Activity
          </h3>

          <ul className="space-y-2 text-sm text-slate-400">

            <li>✅ Resume reviewed</li>
            <li>🎤 Interview practiced</li>
            <li>📊 Profile updated</li>
            <li>🧠 New AI feedback</li>

          </ul>

        </AnimatedCard>

        {/* Suggestions */}
        <AnimatedCard>

          <h3 className="font-semibold mb-4 gradient-text flex items-center gap-2">
            ⚡ AI Suggestions
          </h3>

          <ul className="space-y-2 text-sm text-slate-400">

            <li>⚡ Improve projects section</li>
            <li>⚡ Add certifications</li>
            <li>⚡ Practice behavioral Q&A</li>
            <li>⚡ Update LinkedIn</li>

          </ul>

        </AnimatedCard>

      </div>

    </div>
  );
}
