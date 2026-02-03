"use client";

import { motion } from "framer-motion";

export default function AnimatedCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 shadow-xl"
    >
      {children}
    </motion.div>
  );
}
