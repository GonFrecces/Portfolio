"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useCallback } from "react"
import { useTheme } from "@/components/theme-provider"

interface Project {
  id: string
  name: string
  category: string
  status: string
  accent: string
  stack: string[]
  description: string
  number: string
  gradient: string
}

const projects: Project[] = [
  {
    id: "minicrm",
    name: "MiniCRM",
    category: "CRM · SaaS",
    status: "Live",
    accent: "#57FFDB",
    stack: ["React", "shadcn/ui", "Supabase", "GraphQL", "TypeScript", "Tailwind"],
    description:
      "Dashboard CRM con kanban de pipelines, gestión de contactos y actividad en tiempo real. GraphQL sobre Supabase, Auth con RLS policies, DataTable con filtros y Real-time feed con Supabase subscriptions.",
    number: "01",
    gradient: "linear-gradient(135deg, #0a2a26 0%, #0f4a42 40%, #57FFDB18 100%)",
  },
  {
    id: "pulsehr",
    name: "PulseHR",
    category: "HR Tech · Platform",
    status: "Live",
    accent: "#E8FF57",
    stack: ["FastAPI", "PostgreSQL", "React", "Docker", "GCP", "RabbitMQ"],
    description:
      "Plataforma de RRHH con motor de reglas para acumulación de tiempo libre, procesamiento async con RabbitMQ, deploy GKE con Cloud Build CI/CD.",
    number: "02",
    gradient: "linear-gradient(135deg, #1a1a00 0%, #2d2d00 40%, #E8FF5718 100%)",
  },
  {
    id: "tradeflow",
    name: "TradeFlow",
    category: "FinTech · Analytics",
    status: "WIP",
    accent: "#FF5757",
    stack: ["Django", "TypeScript", "PostgreSQL", "WebSockets", "Redis"],
    description:
      "Dashboard de señales de trading con streaming en tiempo real via Django Channels, Redis pub/sub, y motor de backtesting con NumPy.",
    number: "03",
    gradient: "linear-gradient(135deg, #2a0000 0%, #4a0000 40%, #FF575718 100%)",
  },
  {
    id: "devops-commander",
    name: "DevOps Commander",
    category: "DevOps · Tooling",
    status: "Live",
    accent: "#B057FF",
    stack: ["NestJS", "Vue.js", "Docker", "GCP", "GitHub Actions"],
    description:
      "Pipeline manager visual con editor DAG, monitoreo GKE, webhooks de Cloud Build y streaming de logs con xterm.js.",
    number: "04",
    gradient: "linear-gradient(135deg, #140a2a 0%, #250f4a 40%, #B057FF18 100%)",
  },
  {
    id: "byteboard",
    name: "ByteBoard",
    category: "Productivity · Realtime",
    status: "Live",
    accent: "#FF9A57",
    stack: ["NestJS", "Socket.io", "Vue.js", "Redis", "PostgreSQL"],
    description:
      "Kanban colaborativo en tiempo real con WebSocket sync, presencia de usuarios, drag-and-drop, sprint analytics y estimación con IA.",
    number: "05",
    gradient: "linear-gradient(135deg, #2a1400 0%, #4a2200 40%, #FF9A5718 100%)",
  },
  {
    id: "medsync",
    name: "MedSync",
    category: "HealthTech · SaaS",
    status: "Live",
    accent: "#57FFB0",
    stack: ["Django", "PostgreSQL", "React", "JWT", "Celery"],
    description:
      "Sistema de agendamiento clínico con roles doctor/recepcionista/paciente, JWT con refresh rotation y notificaciones async via Celery + WhatsApp API.",
    number: "06",
    gradient: "linear-gradient(135deg, #002a18 0%, #004a28 40%, #57FFB018 100%)",
  },
]

function ProjectCard({ project, index, isEs }: { project: Project; index: number; isEs: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })
  const { theme } = useTheme()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const midX = rect.width / 2
      const midY = rect.height / 2
      rotateY.set(((x - midX) / midX) * 6)
      rotateX.set(-((y - midY) / midY) * 6)

      // Glare
      const glare = el.querySelector<HTMLElement>(".glare")
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, ${project.accent}22 0%, transparent 70%)`
      }
    },
    [rotateX, rotateY, project.accent]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    const el = cardRef.current
    const glare = el?.querySelector<HTMLElement>(".glare")
    if (glare) glare.style.background = "transparent"
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card"
      style={{
        perspective: 800,
        rotateX: springRotateX,
        rotateY: springRotateY,
        cursor: "pointer",
        height: "380px",
      }}
    >
      <div className="card-inner" style={{ position: "relative", height: "100%" }}>
        {/* Glare overlay */}
        <div
          className="glare"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            transition: "background 0.1s",
          }}
        />

        {/* TOP — Visual abstract */}
        <div
          style={{
            height: "40%",
            background: project.gradient,
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* Geometric shapes */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: `1.5px solid ${project.accent}60`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: `1px solid ${project.accent}30`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              width: 40,
              height: 40,
              background: `${project.accent}40`,
            }}
          />

          {/* Badges */}
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              padding: "4px 10px",
              borderRadius: "999px",
              border: `1px solid ${project.accent}80`,
              background: `${project.accent}18`,
              fontSize: "13px",
              color: project.accent,
              /* color: theme === "dark" ? `var(--accent)` : "var(--text)", */
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {project.category}
          </span>

          <span
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              padding: "4px 10px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.4)",
              fontSize: "10px",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
            }}
          >
            {project.status}
          </span>
        </div>

        {/* BOTTOM — Info */}
        <div
          style={{
            height: "60%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            position: "relative",
          }}
        >
          {/* Watermark number */}
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "16px",
              fontSize: "64px",
              fontWeight: 900,
              color: "var(--text)",
              opacity: 0.04,
              lineHeight: 1,
              userSelect: "none",
              letterSpacing: "-0.05em",
            }}
          >
            {project.number}
          </span>

          {/* Name */}
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "var(--text)",
              margin: 0,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>

          {/* Stack pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "auto" }}>
            {project.stack.slice(0, 4).map(s => (
              <span
                key={s}
                style={{
                  padding: "3px 8px",
                  borderRadius: "999px",
                  border: `1px solid ${project.accent}50`,
                  fontSize: "10px",
                  color: "var(--text)",
                  fontWeight: 500,
                  background: `${project.accent}10`,
                }}
              >
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span
                style={{
                  padding: "3px 8px",
                  borderRadius: "999px",
                  border: "1px solid var(--border)",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                }}
              >
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* View link */}
          <motion.span
            whileHover={{ x: 4 }}
            style={{
              fontSize: "12px",
              color: project.accent,
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              letterSpacing: "0.03em",
            }}
          >
            {isEs ? "→ Ver" : "→ View"}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"

  return (
    <section id="projects" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "32px" }}
      >
        <p style={{ fontSize: "11px", color: theme === "dark" ? "var(--accent)" : "var(--text)", letterSpacing: "0.15em", fontWeight: 700, margin: 0 }}>
          {isEs ? "04 - PROYECTOS" : "04 - PROJECTS"}
        </p>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
            fontWeight: 800,
            margin: "8px 0 0 0",
            color: "var(--text)",
            lineHeight: 1.1,
          }}
        >
          {isEs ? "Proyectos" : "Work"}
        </h2>
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
        className="projects-grid"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} isEs={isEs} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (width > 1000px) {
          #projects {
            padding-top: 120px !important;
          }  
        }

        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
