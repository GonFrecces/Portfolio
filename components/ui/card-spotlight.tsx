"use client"

// Adaptado de "Card Spotlight" (21st.dev · manuarora700 / Aceternity).
// Se reemplazó el efecto de canvas (three.js) por un gradiente radial con los
// tokens del portafolio, para no sumar dependencias pesadas a un export estático.

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import React, { type MouseEvent as ReactMouseEvent } from "react"
import { cn } from "@/lib/utils"

export function CardSpotlight({
  children,
  radius = 320,
  color = "var(--spotlight-color)",
  className,
  style,
  ...props
}: {
  radius?: number
  color?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const mask = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`

  return (
    <div
      className={cn("group/spotlight relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        ...style,
      }}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{ background: color, maskImage: mask, WebkitMaskImage: mask }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
