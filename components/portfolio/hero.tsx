"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useRef, useState } from "react"

const skills = [
  "Proactivo", "Trabajo en Equipo", "Resolución de Problemas", "Comunicación Efectiva", "Aprendizaje Continuo", "Adaptabilidad", "Pensamiento Crítico", "Gestión del Tiempo", "Atención al Detalle", "Creatividad"
]

function Counter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}</span>
}

export function Hero() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const nameChars = "CLAUDIO".split("")
  const lastnameChars = "VARGAS".split("")

  const charVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.04, ease: "easeOut" },
    }),
  }

  const bgCircleColor = theme === "dark"
    ? "radial-gradient(ellipse at center, rgba(232,255,87,0.18) 0%, transparent 70%)"
    : "radial-gradient(ellipse at center, rgba(12,12,12,0.42) 0%, transparent 70%)"

  return (
    <section
      id="home"
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "100px",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* ─── LEFT COLUMN ─── */}
        <motion.div
          className="hero-main-block"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: 0,
            width: "min(100%, 980px)",
            margin: "0 auto",
          }}
        >
          {/* Available badge */}
          <motion.div variants={itemVariants}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: "1px solid var(--accent)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "var(--text)",
                background: "transparent",
              }}
            >
              <span className="pulse-dot" />
              {isEs ? "[Disponible para nuevos proyectos]" : " [ AVAILABLE FOR WORK ]"}
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "16px",
              fontStyle: "italic",
              color: "var(--text-muted)",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            {isEs ? "Hola, soy" : "Hello, I am"}
          </motion.p>

          {/* Name */}
          <div style={{ lineHeight: 0.9, margin: 0 }}>
            {/* CLAUDIO — solid */}
            <div style={{ display: "flex", overflow: "hidden" }}>
              {nameChars.map((ch, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 7rem)",
                    fontWeight: 800,
                    color: "var(--text)",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
            {/* VARGAS — outlined */}
            <div style={{ display: "flex", overflow: "hidden", marginLeft: "305px" }}>
              {lastnameChars.map((ch, i) => (
                <motion.span
                  key={i}
                  custom={nameChars.length + i}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 7rem)",
                    fontWeight: 800,
                    WebkitTextStroke: "2px var(--text)",
                    color: "transparent",
                    display: "block",
                    lineHeight: 1,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            style={{
              color: "var(--text)",
              fontSize: "13px",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "480px",
            }}
          >
            {isEs
              ? <><span style={{ color: { light: "var(--text)", dark: "var(--accent)" }[theme], fontSize: "15px", fontWeight: 900, letterSpacing: "0.04em", margin: 0,}}>{"> Desarrollador Full Stack "}</span> <span>{" con 4 años de experiencia creando aplicaciones web eficientes y escalables"}</span></>
              : <><span style={{ color: { light: "var(--accent)", dark: "var(--accent)" }[theme], fontSize: "13px", fontWeight: 900, letterSpacing: "0.04em", margin: 0,}}>{"> Full Stack Developer "}</span> <span>{" with 4 years of experience building efficient and scalable web applications"}</span></>}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <motion.a
              href="#projects"
              onClick={e => {
                e.preventDefault()
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                border: theme === "dark" ? '' : "1px solid rgba(12,12,12,0.75)",
                backgroundColor: "var(--accent)",
                color: "#0c0c0c",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "inherit",
              }}
            >
              {isEs ? "[ VER PROYECTOS ]" : "[ VIEW PROJECTS ]"}
            </motion.a>

            <motion.a
              href="#contact"
              onClick={e => {
                e.preventDefault()
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                border: "1px solid var(--border-hover)",
                color: "var(--text)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "inherit",
                background: "transparent",
              }}
            >
              {isEs ? "[ CONTACTAME ]" : "[ CONTACT ME ]"}
            </motion.a>

            <motion.a
              href="/cv-claudio-vargas.pdf"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "inherit",
                background: "transparent",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = theme === "dark" ? "var(--accent)" : "var(--border-hover)"
                ;(e.currentTarget as HTMLElement).style.color = theme === "dark" ? "var(--accent)" : "var(--bg-first)"
                
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
                ;(e.currentTarget as HTMLElement).style.color = "var(--text-muted)"
              }}
            >
              {isEs ? "[ DESCARGAR CV ]" : "[ DOWNLOAD CV ]"}
            </motion.a>
          </motion.div>

          {/* Marquee */}
          <motion.div
            variants={itemVariants}
            style={{
              overflow: "hidden",
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              marginTop: "100px",
            }}
          >
            <div className="marquee-track">
              {[...skills, ...skills].map((skill, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                    marginRight: "0",
                    padding: "0 16px",
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                >
                  {skill}
                  <span style={{ marginLeft: "16px", color: "var(--accent)" }}>✦</span>
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hero-main-block {
            width: min(100%, 860px) !important;
          }
        }

        @media (max-width: 768px) {
          .hero-grid {
            gap: 20px !important;
            padding-left: 12px;
            padding-right: 12px;
          }

          .hero-main-block {
            width: 100% !important;
          }
        }

        @media (width > 1000px) {
          #home {
            padding-bottom: 0px !important;
          }  
        }
      `}</style>
    </section>
  )
}
