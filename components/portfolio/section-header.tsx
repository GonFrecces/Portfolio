"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export function SectionHeader({ index, label, title }: { index: string; label: string; title: string }) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex items-end justify-between gap-4"
      style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}
    >
      <div>
        <p
          className="m-0 text-[11px] font-bold tracking-[0.15em]"
          style={{ color: "var(--accent)" }}
        >
          {index} - {label}
        </p>
        <h2
          className="m-0 mt-2 font-extrabold leading-tight"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "var(--text)" }}
        >
          {title}
        </h2>
      </div>
      <span
        aria-hidden
        className="hidden select-none text-6xl font-black leading-none sm:block"
        style={{ color: "var(--text)", opacity: 0.05, letterSpacing: "-0.05em" }}
      >
        {index}
      </span>
    </motion.div>
  )
}
