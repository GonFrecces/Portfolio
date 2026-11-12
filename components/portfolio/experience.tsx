"use client"

// Estructura basada en "Experience Timeline" (21st.dev · shadcnui-blocks/timeline-02),
// adaptada a los tokens del portafolio y con revelado progresivo al hacer scroll.

import { motion } from "framer-motion"
import { Briefcase, Calendar, Code2, HeartPulse } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { SectionHeader } from "@/components/portfolio/section-header"

const experiences = [
  {
    company: "SCM LATAM",
    role: "Junior Developer",
    start: "Ago 2022",
    end: "Actualidad",
    current: true,
    icon: Code2,
    techs: ["FastAPI", "Django", "React", "TypeScript", "RabbitMQ", "PostgreSQL", "Docker", "GCP", "TDD", "DDD"],
    details: {
      es: "Diseño y desarrollo de soluciones full stack basadas en microservicios con comunicación asíncrona, foco en escalabilidad y mantenibilidad. Optimización de sistemas productivos (consultas, refactorización de servicios críticos), backend en Python (FastAPI, Django) y frontend en React + TypeScript aplicando TDD y DDD. JWT, pruebas unitarias e integración y pipelines CI/CD con GitHub Actions.",
      en: "Design and development of full stack solutions based on microservices with asynchronous messaging, focused on scalability and maintainability. Production performance work (queries, refactoring critical services), Python backends (FastAPI, Django) and React + TypeScript frontends with TDD and DDD. JWT, unit and integration tests and CI/CD pipelines with GitHub Actions.",
    },
  },
  {
    company: "SoftCapture S.A.",
    role: "Software Developer / Support",
    start: "Nov 2021",
    end: "Ago 2022",
    current: false,
    icon: Briefcase,
    techs: ["C#", ".NET Framework", "ASP.NET", "Entity Framework", "SQL Server"],
    details: {
      es: "Servicios backend para procesamiento de transacciones financieras en tiempo real y automatización de procesos batch para notificaciones masivas. Sistemas de licenciamiento con lógica de negocio compleja vía ORM, modernización de aplicaciones legacy y soporte de incidencias en sistemas críticos del sector financiero.",
      en: "Backend services for real-time financial transaction processing and batch automation for mass notifications. Licensing systems with complex business logic via ORM, legacy application modernization and incident support for critical financial systems.",
    },
  },
  {
    company: "CESFAM La Granja",
    role: "Asistente Dental",
    start: "Ago 2018",
    end: "Sep 2021",
    current: false,
    icon: HeartPulse,
    techs: ["Trabajo en equipo", "Atención al paciente", "Protocolos clínicos"],
    details: {
      es: "Atención primaria de salud odontológica: apoyo clínico en procedimientos preventivos y restaurativos, programas de promoción de salud bucal y manejo de instrumental bajo protocolos de bioseguridad, en equipos multidisciplinarios de alta demanda.",
      en: "Primary dental care: clinical support in preventive and restorative procedures, oral health promotion programs and instrument handling under biosafety protocols, within high-demand multidisciplinary teams.",
    },
  },
]

export function Experience() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"

  const tr = (value: string) => (isEs ? value : value.replace("Ago", "Aug").replace("Actualidad", "Present"))
  const accentText = theme === "dark" ? "var(--accent)" : "var(--text)"

  return (
    <section id="experience" className="portfolio-section">
      <SectionHeader index="03" label={isEs ? "EXPERIENCIA" : "EXPERIENCE"} title={isEs ? "Trayectoria" : "Work history"} />

      <div className="relative ml-4 md:ml-6">
        {/* Línea base + progreso */}
        <div className="absolute inset-y-0 left-0 w-px" style={{ background: "var(--border)" }} />
        <motion.div
          className="absolute inset-y-0 left-0 w-px origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ background: "var(--accent)" }}
        />

        {experiences.map(({ company, role, start, end, current, techs, details, icon: Icon }, index) => (
          <motion.div
            key={company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
            className="relative pb-10 pl-10 last:pb-0 md:pl-14"
          >
            {/* Marcador */}
            <div
              className="absolute left-0 top-1 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full"
              style={{
                background: "var(--bg)",
                border: current ? "2px solid var(--accent)" : "1px solid var(--border-hover)",
                boxShadow: current ? "0 0 0 4px rgba(232,255,87,0.15)" : "none",
              }}
            >
              <Icon size={15} style={{ color: "var(--text)" }} />
            </div>

            <div
              className="rounded-xl p-5 transition-colors md:p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="m-0 text-lg font-extrabold" style={{ color: "var(--text)" }}>{company}</h3>
                  <p className="m-0 mt-1 text-xs italic" style={{ color: accentText }}>{role}</p>
                </div>
                <span className="tag-pill" style={current ? { borderColor: "var(--accent)" } : undefined}>
                  <Calendar size={11} />
                  {tr(start)} — {tr(end)}
                </span>
              </div>

              <p className="mb-0 mt-4 text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {isEs ? details.es : details.en}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {techs.map(t => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
