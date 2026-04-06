"use client"

import { useEffect, useState } from "react"
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import { AnimatePresence, motion } from "framer-motion"
import { Navbar } from "@/components/portfolio/navbar"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Skills } from "@/components/portfolio/skills"
import { Experience } from "@/components/portfolio/experience"
import { Projects } from "@/components/portfolio/projects"
import { Contact } from "@/components/portfolio/contact"
import { ReadingMode } from "@/components/portfolio/reading-mode"
import { FaGithub, FaLinkedinIn, FaCodepen } from "react-icons/fa"
import { MdOutlineEmail } from "react-icons/md";


const contact = [
  {
    label: "GitHub",
    href: "https://github.com/GonFrecces",
    icon: FaGithub,
  },
  {
    label: "Email",
    href: "mailto:claudio.a.vargas91@gmail.com",
    icon: MdOutlineEmail
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/claudio-vargas-zapata/",
    icon: FaLinkedinIn
  },
  {
    label: "CodePen",
    href: "https://codepen.io/GonFrecces",
    icon: FaCodepen,
  },
]

const PORTFOLIO_CONTENT_FRAME = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 32px",
} as const

function PortfolioContent() {
  const { mode, locale, theme } = useTheme()
  const isEs = locale === "es"
  const [isAwayFromHero, setIsAwayFromHero] = useState(false)

  useEffect(() => {
    if (mode !== "portfolio") {
      setIsAwayFromHero(false)
      return
    }

    const hero = document.querySelector("#home")
    if (!hero) {
      setIsAwayFromHero(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAwayFromHero(!entry.isIntersecting || entry.intersectionRatio < 0.6)
      },
      { threshold: [0.1, 0.6, 0.9] }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [mode])

  const handleBackToHero = () => {
    document.querySelector("#home")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div
      style={{
        height: "calc(100vh - 24px)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Navbar />

      <div
        style={{
          position: "relative",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <AnimatePresence mode="wait">
          {mode === "portfolio" ? (
            <main
              key="portfolio"
              style={PORTFOLIO_CONTENT_FRAME}
            >
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>
          ) : (
            <div
              key="reading"
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 24px",
              }}
            >
              <ReadingMode />
            </div>
          )}
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {mode === "portfolio" && isAwayFromHero && (
          <motion.div
            key="center-back-to-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "28px",
              left: 0,
              right: 0,
              zIndex: 80,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                ...PORTFOLIO_CONTENT_FRAME,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <motion.button
                onClick={handleBackToHero}
                aria-label={isEs ? "Volver al inicio" : "Back to hero"}
                title={isEs ? "Volver al inicio" : "Back to hero"}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "999px",
                  border: theme === "dark" ? "1px solid #e8ff57" : "1px solid var(--border)",
                  background: theme === "dark" ? "rgba(12,12,12,0.72)" : "var(--surface)",
                  color: "var(--text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: theme === "dark" ? "0 0 0 1px rgba(232,255,87,0.18)" : "0 0 0 1px rgba(0,0,0,0.16)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  pointerEvents: "auto",
                }}
              >
                ↑
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="floating-contact-menu"
        style={{
          position: "absolute",
          top: "70px",
          right: "16px",
          zIndex: 90,
          display: mode === "portfolio" ? "flex" : "none",
          flexDirection: "column",
          gap: "4px",
          padding: "4px",
          borderRadius: "50px",
          border: "1px solid var(--border)",
          background: theme === "dark" ? "rgba(12,12,12,0.72)" : "rgba(245,244,240,0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: theme === "dark" ? "0 8px 24px rgba(232,255,87,0.18)" : "0 8px 24px rgba(0,0,0,0.16)",
        }}
      >

        {contact.map(item => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href}
            rel={item.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              padding: "8px",
              fontSize: "11px",
              fontWeight: 300,
              background: "var(--bg)",
              transition: "border-color 0.2s ease, color 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "var(--accent)" : "var(--border-hover)"
              ;(e.currentTarget as HTMLElement).style.color = theme === "dark" ? "var(--accent)" : "var(--text)"
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
              ;(e.currentTarget as HTMLElement).style.color = "var(--text)"
            }}
          >
            <item.icon size={20} />
            {/* {item.label} */}
          </motion.a>
        ))}
      </motion.aside>

      <style>{`
        @media (max-width: 1024px) {
          .floating-contact-menu {
            display: none !important;
          }
        }

        
      `}</style>

    </div>
  )
}

export default function Page() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}
