"use client";

import { motion } from "framer-motion";

export default function AnimatedCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`
        relative overflow-hidden
        rounded-2xl
        border border-white/10
        bg-slate-900/60
        backdrop-blur-xl
        p-6
        shadow-lg
        hover:shadow-indigo-500/30
        hover:border-indigo-500/40
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
