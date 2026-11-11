"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Activity, ShieldCheck, ListOrdered, Gauge } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { SectionHeader } from "@/components/portfolio/section-header"

const PRIORIS_URL = "https://priorisdev.netlify.app"

const stack = [
  "React", "TypeScript", "Vite", "shadcn/ui", "Tailwind v4",
  "FastAPI", "SQLModel", "PostgreSQL · Neon", "JWT", "OpenTelemetry", "Docker", "GitHub Actions",
]

const queue = [
  { code: "P-014", label: "Control crónico", score: 92, level: "Alta" },
  { code: "P-027", label: "Derivación dental", score: 74, level: "Media" },
  { code: "P-031", label: "Curación", score: 58, level: "Media" },
  { code: "P-009", label: "Control sano", score: 31, level: "Baja" },
]

export function Projects() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"

  const highlights = [
    {
      icon: ListOrdered,
      title: isEs ? "Motor de priorización" : "Prioritization engine",
      text: isEs ? "Ordena la lista de espera con reglas clínicas explícitas y trazables." : "Orders the waiting list with explicit, traceable clinical rules.",
    },
    {
      icon: ShieldCheck,
      title: isEs ? "Roles y auditoría" : "Roles & audit",
      text: isEs ? "JWT verificado en el backend, permisos por centro y registro de eventos." : "Backend-verified JWT, per-center permissions and event log.",
    },
    {
      icon: Activity,
      title: isEs ? "Observabilidad" : "Observability",
      text: isEs ? "Trazas OpenTelemetry desde el navegador y request-id en la API." : "Browser OpenTelemetry traces and request IDs in the API.",
    },
    {
      icon: Gauge,
      title: isEs ? "Calidad" : "Quality",
      text: isEs ? "Pruebas unitarias e integración sobre Postgres real, CI/CD por capas." : "Unit and integration tests on real Postgres, layered CI/CD.",
    },
  ]

  return (
    <section id="projects" className="portfolio-section">
      <SectionHeader index="03" label={isEs ? "PROYECTOS" : "PROJECTS"} title={isEs ? "Proyecto destacado" : "Featured project"} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <CardSpotlight>
          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.25fr_1fr]">
            {/* Info */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag-pill tag-pill--accent">HealthTech · SaaS</span>
                <span className="tag-pill">
                  <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                  {isEs ? "En producción" : "Live"}
                </span>
              </div>

              <div>
                <h3 className="m-0 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: "var(--text)" }}>
                  Prioris
                </h3>
                <p className="mt-1 text-sm italic" style={{ color: "var(--text-muted)" }}>
                  Turno Justo
                </p>
              </div>

              <p className="m-0 max-w-xl text-[13px] leading-relaxed" style={{ color: "var(--text)" }}>
                {isEs
                  ? "Lista de espera priorizada para centros de atención primaria. Reemplaza el orden de llegada por criterios clínicos visibles, para que el equipo sepa a quién atender primero y por qué."
                  : "Prioritized waiting list for primary care centers. It replaces first-come ordering with visible clinical criteria, so staff know who to see first and why."}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {highlights.map(h => (
                  <div key={h.title} className="flex gap-3 rounded-lg p-3" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
                    <h.icon size={16} className="mt-0.5 shrink-0" style={{ color: theme === "dark" ? "var(--accent)" : "var(--text)" }} />
                    <div>
                      <p className="m-0 text-xs font-bold" style={{ color: "var(--text)" }}>{h.title}</p>
                      <p className="m-0 mt-1 text-[11px] leading-snug" style={{ color: "var(--text-muted)" }}>{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {stack.map(s => (
                  <span key={s} className="tag-pill">{s}</span>
                ))}
              </div>

              <div>
                <motion.a
                  href={PRIORIS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wider no-underline"
                  style={{
                    background: "var(--accent)",
                    color: "#0c0c0c",
                    border: theme === "dark" ? "none" : "1px solid rgba(12,12,12,0.75)",
                  }}
                >
                  {isEs ? "[ VER APP ]" : "[ OPEN APP ]"}
                  <ArrowUpRight size={14} />
                </motion.a>
              </div>
            </div>

            {/* Visual: cola priorizada (ilustrativa, sin imágenes) */}
            <div
              aria-hidden
              className="relative flex flex-col justify-center gap-2 rounded-xl p-5"
              style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.15em]" style={{ color: "var(--text-muted)" }}>
                  {isEs ? "LISTA DE ESPERA" : "WAITING LIST"}
                </span>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>score ↓</span>
              </div>
              {queue.map((row, i) => (
                <motion.div
                  key={row.code}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <span className="w-5 text-xs font-extrabold" style={{ color: "var(--text-muted)" }}>{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="m-0 truncate text-xs font-bold" style={{ color: "var(--text)" }}>{row.label}</p>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--bg-secondary)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: i === 0 ? "var(--accent)" : "var(--text-muted)" }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>{row.code}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </CardSpotlight>
      </motion.div>

      <p className="mt-4 text-[11px]" style={{ color: "var(--text-muted)" }}>
        {isEs ? "// Más proyectos en desarrollo." : "// More projects in progress."}
      </p>
    </section>
  )
}
