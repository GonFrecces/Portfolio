"use client"

import { useTheme } from "@/components/theme-provider"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function Navbar() {
  const { theme, toggleTheme, mode, toggleMode, locale, toggleLocale } = useTheme()
  const isEs = locale === "es"
  const [isAwayFromHero, setIsAwayFromHero] = useState(false)

  useEffect(() => {
    const hero = document.querySelector("#home")
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If hero is not mostly visible, enable "back to top" behavior.
        setIsAwayFromHero(!entry.isIntersecting || entry.intersectionRatio < 0.6)
      },
      { threshold: [0.1, 0.6, 0.9] }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { label: isEs ? "Sobre mi" : "About", href: "#about" },
    { label: isEs ? "Skills" : "Skills", href: "#skills" },
    { label: isEs ? "Proyectos" : "Projects", href: "#projects" },
    { label: isEs ? "Experiencia" : "Experience", href: "#experience" },
    { label: isEs ? "Contacto" : "Contact", href: "#contact" },
  ]

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleBackToTop = () => {
    document.querySelector("#home")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: "12px",
        left: "12px",
        right: "12px",
        zIndex: 100,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: theme === "dark" ? "rgba(12,12,12,0.75)" : "rgba(245,244,240,0.8)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        isolation: "isolate",
        clipPath: "inset(0 round var(--radius))",
        transform: "translateZ(0)",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
      }}
    >
      {/* Monogram */}
      <motion.button
        whileHover={isAwayFromHero ? { scale: 1.06 } : undefined}
        whileTap={isAwayFromHero ? { scale: 0.97 } : undefined}
        onClick={handleBackToTop}
        title={isEs ? "Volver arriba" : "Back to top"}
        aria-label={isEs ? "Volver arriba" : "Back to top"}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#0c0c0c",
          fontWeight: 800,
          fontSize: "13px",
          letterSpacing: "-0.5px",
          userSelect: "none",
          cursor: "pointer",
          opacity: isAwayFromHero ? 1 : 0.8,
          transition: "opacity 0.2s ease",
          border: theme === "dark" ? '' : "1px solid rgba(12,12,12,0.75)",
        }}
      >
        CV
      </motion.button>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {navLinks.map(link => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={e => handleNav(e, link.href)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "5px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.2s, background 0.2s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = "var(--text)"
              ;(e.currentTarget as HTMLElement).style.background = "var(--border)"
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = "var(--text-muted)"
              ;(e.currentTarget as HTMLElement).style.background = "transparent"
            }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      {/* Right buttons */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
        {/* Locale toggle */}
        <motion.button
          onClick={toggleLocale}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: "5px 12px",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text)",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          {locale.toUpperCase()}
        </motion.button>

        {/* Mode toggle */}
        <motion.button
          onClick={toggleMode}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: "5px 14px",
            borderRadius: "999px",
            border: theme === "dark" ? '' : "1px solid rgba(12,12,12,0.75)",
            background: "transparent",
            color: "var(--text)",
            fontSize: "11px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: "0.04em",
            transition: "background 0.2s, color 0.2s",
            whiteSpace: "nowrap",
            
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.background = "var(--accent)"
            ;(e.currentTarget as HTMLElement).style.color = "#0c0c0c"
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.background = "transparent"
            ;(e.currentTarget as HTMLElement).style.color = "var(--text)"
          }}
        >
          {mode === "portfolio"
            ? isEs
              ? "⊞ Lectura"
              : "⊞ Reading"
            : isEs
              ? "⬚ Portfolio"
              : "⬚ Portfolio"}
        </motion.button>

        {/* Theme toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          title={theme === "dark"
            ? (isEs ? "Cambiar a claro" : "Switch to light")
            : (isEs ? "Cambiar a oscuro" : "Switch to dark")}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {theme === "dark" ? "○" : "●"}
        </motion.button>

        {/* Hire me */}
        <motion.a
          href="#contact"
          onClick={e => handleNav(e as React.MouseEvent<HTMLAnchorElement>, "#contact")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: "5px 14px",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text)",
            fontSize: "11px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            letterSpacing: "0.04em",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            transition: "background 0.2s, color 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.background = "var(--text)"
            ;(e.currentTarget as HTMLElement).style.color = "var(--bg)"
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.background = "transparent"
            ;(e.currentTarget as HTMLElement).style.color = "var(--text)"
          }}
        >
          {isEs ? "[ CONTRATAME ]" : "[ HIRE ME ]"}
        </motion.a>
      </div>
    </motion.nav>
  )
}
