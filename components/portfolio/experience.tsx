"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

const experiences = [
  {
    year: 2022,
    company: "SCM LATAM",
    role: "Junior Developer",
    start: "Ago 2022",
    end: "Actualidad",
    current: true,
    techs: ["FastAPI", "Django", "React", "TypeScript", "RabbitMQ", "PostgreSQL", "Docker", "GCP", "TDD", "DDD"],
    details: `Diseño y desarrollo de soluciones full stack basadas en microservicios, con comunicación asíncrona y foco en escalabilidad, resiliencia y mantenibilidad. Experiencia en optimización de sistemas productivos mediante análisis de rendimiento, mejora de consultas y refactorización de servicios críticos. Desarrollo backend en Python (FastAPI, Django) y frontend en React con TypeScript, aplicando TDD y DDD para asegurar calidad e integridad del negocio. Implementación de autenticación con JWT, pruebas automatizadas (unitarias e integración) y pipelines CI/CD con GitHub Actions, junto a buenas prácticas de documentación y testing continuo.`,
  },
  {
    year: 2021,
    company: "SoftCapture S.A.",
    role: "Software Developer / Support",
    start: "Nov 2021",
    end: "Ago 2022",
    current: false,
    techs: ["C#", ".NET Framework", "ASP.NET", "Entity Framework", "SQL Server"],
    details: "Desarrollo y mantenimiento de servicios backend orientados a procesamiento de transacciones financieras en tiempo real, junto con automatización de procesos batch para notificaciones masivas mediante tareas programadas. Implementación de sistemas de licenciamiento con lógica de negocio compleja y persistencia vía ORM. Participación en la modernización de aplicaciones legacy hacia arquitecturas más mantenibles. Experiencia en desarrollo con ASP.NET, Entity Framework y SQL Server, además de soporte y resolución de incidencias en sistemas críticos del sector financiero.",
  },
  {
    year: 2018,
    company: "CESFAM La Granja",
    role: "Asistente Dental",
    start: "Ago 2018",
    end: "Sep 2021",
    current: false,
    techs: ["Trabajo en equipo", "Atención al paciente", "Protocolos clínicos"],
    details: "Experiencia en atención primaria de salud odontológica en CESFAM, brindando apoyo clínico en procedimientos preventivos y restaurativos, junto con participación activa en programas de promoción y educación en salud bucal. Asistencia directa en tratamientos, aplicación de flúor y sellantes, y ejecución de campañas en entornos intramurales y extramurales. Manejo de instrumental bajo estrictos protocolos de bioseguridad y control de infecciones. Participación en iniciativas de salud pública y comités de seguridad, colaborando con equipos multidisciplinarios en contextos de alta demanda, con enfoque en atención centrada en el paciente y prevención.",
  },
]

export function Experience() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"
  const [activeIndex, setActiveIndex] = useState(0)

  const activeExperience = experiences[activeIndex]

  const translatePeriod = (value: string) =>
    isEs
      ? value
      : value
          .replace("Ago", "Aug")
          .replace("Sep", "Sep")
          .replace("Nov", "Nov")
          .replace("Actualidad", "Present")

  return (
    <section id="experience" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "48px" }}
      >
        <p style={{ fontSize: "11px", color: theme === "dark" ? "var(--accent)" : "var(--text)", letterSpacing: "0.15em", fontWeight: 700, margin: 0 }}>
          {isEs ? "03 - EXPERIENCIA" : "03 - EXPERIENCE"}
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
          {isEs ? "Trayectoria" : "Work history"}
        </h2>
      </motion.div>

      {/* Horizontal timeline */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "28px",
        }}
      >
        <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
          <div className="timeline-horizontal" style={{ minWidth: "640px" }}>
            <div className="timeline-horizontal-line" />
            {experiences.map((exp, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={exp.company}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className="timeline-year-btn"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    border: isActive ? "2px solid var(--accent)" : "1px solid var(--border-hover)",
                    background: isActive && theme === "dark" ?  "rgba(232,255,87,0.1)" :"var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive ? "0 0 0 4px rgba(232,255,87,0.15)" : "none",
                  }}
                  aria-label={`${isEs ? "Ver experiencia" : "View experience"} ${exp.company} ${exp.year}`}
                >
                  {exp.year}
                </button>
              )
            })}
          </div>
        </div>

        <motion.div
          key={activeExperience.company}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            marginTop: "22px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "20px",
            background: "var(--bg)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--text)", margin: "0 0 4px 0" }}>
                {activeExperience.company}
              </p>
              <p style={{ fontSize: "12px", color: theme === "dark" ? "var(--accent)" : "var(--text)", fontStyle: "italic", margin: 0 }}>
                {activeExperience.role}
              </p>
            </div>
            <p style={{ fontSize: "12px", color: theme === "dark" ? "var(--accent)" : "var(--text)", fontStyle: "italic", margin: 0 }}>
              {activeExperience.current ? (isEs ? `Actualmente trabajando (${new Date().getFullYear()})` : `Currently working (${translatePeriod(activeExperience.start)})`) : translatePeriod(activeExperience.start) + " - " + translatePeriod(activeExperience.end)}
            </p>
            <p style={{ fontSize: "14px", color: "var(--text)", fontStyle: "normal", margin: 0 }}>
              {activeExperience.details ? activeExperience.details : ""}
            </p>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "999px",
                border: "1px solid var(--border-hover)",
                fontSize: "10px",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
                fontWeight: 600,
              }}
            >
              {`${translatePeriod(activeExperience.start)} - ${translatePeriod(activeExperience.end)}`}
            </span>
          </div>

          <p style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.08em", margin: "14px 0 10px 0", fontWeight: 700 }}>
            {isEs ? "TECNOLOGIAS USADAS" : "TECHNOLOGIES USED"}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {activeExperience.techs.map(tech => (
              <span
                key={tech}
                style={{
                  padding: "3px 9px",
                  borderRadius: "999px",
                  border: "1px solid var(--border)",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  background: "var(--bg-secondary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .timeline-horizontal {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 8px 0;
        }

        .timeline-horizontal-line {
          position: absolute;
          left: 6px;
          right: 6px;
          top: 50%;
          height: 1px;
          background: var(--border);
          transform: translateY(-50%);
          z-index: 0;
        }

        .timeline-year-btn {
          position: relative;
          z-index: 1;
        }

        @media (width > 1000px) {
          #experience {
            padding-top: 120px !important;
          }  
        }

        @media (max-width: 768px) {
          .timeline-year-btn {
            width: 64px !important;
            height: 64px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}
