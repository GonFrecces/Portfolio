"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const backendSkills = ["Python", "FastAPI", "Django", "Flask", "C#", ".NET", "Node.js", "NestJS", "Express"]
const frontendSkills = ["React", "TypeScript", "Vue.js", "JavaScript", "HTML5", "Tailwind v4", "CSS3"]
const dbQueueSkills = ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "RabbitMQ"]
const devopsSkills = ["Docker", "GCP", "GitHub Actions", "CI/CD", "Git"]
const practiceSkills = ["TDD", "DDD", "Microservices", "WebSockets", "JWT", "GraphQL"]

const allSkills = [
  ...backendSkills.map(s => ({ label: s, color: "var(--accent)" })),
  ...frontendSkills.map(s => ({ label: s, color: "var(--accent-2)" })),
  ...dbQueueSkills.map(s => ({ label: s, color: "#ff9a57" })),
  ...devopsSkills.map(s => ({ label: s, color: "var(--accent-3)" })),
  ...practiceSkills.map(s => ({ label: s, color: "#ff5757" })),
]

const certs = [
  { title: "Tailwind v4", platform: "UDEMY", period: "Mayo 2025" },
  { title: "React Testing Library with Jest/Vitest", platform: "UDEMY", period: "Marzo 2025" },
]

export function ReadingMode() {
  const { theme, locale } = useTheme()
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  const isEs = locale === "es"

  const cellStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "16px",
    overflow: "hidden",
  }

  const bgCircleColor = theme === "dark"
    ? "radial-gradient(ellipse at center, rgba(232,255,87,0.15) 0%, transparent 65%)"
    : "radial-gradient(ellipse at center, rgba(12,12,12,0.2) 0%, transparent 65%)"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ paddingTop: "80px", paddingBottom: "24px" }}
    >
      <div className="reading-grid">

        {/* PHOTO */}
        <div style={{ ...cellStyle, gridArea: "photo", position: "relative", padding: 0, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: bgCircleColor,
              zIndex: 0,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/images/claudio_vargas2.png`}
            alt="Claudio Vargas"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", position: "relative", zIndex: 1 }}
            crossOrigin="anonymous"
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to top, var(--bg) 0%, var(--bg) 10%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "absolute", bottom: "12px", left: "12px", zIndex: 3 }}>
            <p style={{ fontSize: "16px", fontWeight: 800, color: "var(--text)", margin: "0 0 2px 0" }}>Claudio Vargas</p>
            <p style={{ fontSize: "11px", color: "var(--accent)", margin: 0, fontStyle: "italic" }}>&gt; Full Stack Developer</p>
          </div>
        </div>

        {/* BIO */}
        <div style={{ ...cellStyle, gridArea: "bio" }}>
          <span style={{ fontSize: "48px", lineHeight: 1, color: "var(--accent)", fontWeight: 900, display: "block", marginBottom: "4px" }}>&quot;</span>
          <p style={{ fontSize: "13px", lineHeight: 1.75, color: "var(--text)", margin: 0, fontStyle: "italic" }}>
            Profesional con experiencia inicial en el área de la salud, donde desarrollé habilidades de trabajo en equipo, responsabilidad y atención al detalle. Con el tiempo, orienté mi carrera hacia TI motivado por el interés en aprender, resolver problemas y mejorar procesos. Actualmente destaco por mi capacidad de adaptación, enfoque práctico y aprendizaje continuo.
          </p>
        </div>

        {/* SKILLS */}
        <div style={{ ...cellStyle, gridArea: "skills" }}>
          <p style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", fontWeight: 700, margin: "0 0 10px 0" }}>STACK</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {allSkills.map(s => (
              <span
                key={s.label}
                style={{
                  padding: "3px 8px",
                  borderRadius: "999px",
                  border: `1px solid ${s.color}`,
                  fontSize: "10px",
                  color: "var(--text)",
                  background: `${s.color}10`,
                  fontWeight: 500,
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* STATUS */}
        <div style={{ ...cellStyle, gridArea: "status", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", fontWeight: 700, margin: "0 0 6px 0" }}>CURRENT</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span className="pulse-dot" />
              <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--text)" }}>SCM LATAM</span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--accent)", margin: "0 0 2px 0", fontStyle: "italic" }}>Junior Developer</p>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>{isEs ? "Ago 2022 — Presente" : "Aug 2022 — Present"}</p>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", fontWeight: 700, margin: "0 0 6px 0" }}>{isEs ? "ANTERIOR" : "PREVIOUS"}</p>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", margin: "0 0 2px 0" }}>SoftCapture S.A.</p>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: "0 0 8px 0" }}>Nov 2021 — Ago 2022</p>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", margin: "0 0 2px 0" }}>CESFAM La Granja</p>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>Ago 2018 — Sep 2021</p>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", fontWeight: 700, margin: "0 0 6px 0" }}>{isEs ? "EDUCACION" : "EDUCATION"}</p>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", margin: "0 0 2px 0" }}>DUOC UC</p>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: "0 0 6px 0" }}>Analista Programador · 2019–2021</p>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", margin: "0 0 2px 0" }}>INACAP</p>
            <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>2012–2014</p>
          </div>
        </div>

        {/* EXP1 */}
        <div style={{ ...cellStyle, gridArea: "exp1" }}>
          <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "6px" }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text)", margin: 0 }}>SCM LATAM</p>
              <span style={{ padding: "2px 8px", borderRadius: "999px", border: "1px solid var(--accent)", fontSize: "10px", color: "var(--accent)", fontWeight: 600 }}>
                Ago 2022 — Presente
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--accent)", fontStyle: "italic", margin: "0 0 10px 0" }}>Junior Developer</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 10px 0", display: "flex", flexDirection: "column", gap: "4px" }}>
              {["Microservicios con comunicación asíncrona (RabbitMQ)", "Backend Python: FastAPI, Django, Flask", "Frontend React + TypeScript", "TDD, DDD, CI/CD con GitHub Actions", "Profiling y optimización de consultas SQL", "Integración JWT, roles y permisos"].map(b => (
                <li key={b} style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--accent)", marginRight: "6px" }}>→</span>{b}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {["FastAPI", "Django", "React", "TypeScript", "RabbitMQ", "Docker", "GCP"].map(t => (
                <span key={t} style={{ padding: "2px 7px", borderRadius: "999px", border: "1px solid var(--accent)", fontSize: "10px", color: "var(--accent)", background: "var(--accent)10" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* EXP2 */}
        <div style={{ ...cellStyle, gridArea: "exp2" }}>
          <div style={{ paddingLeft: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "6px" }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: "var(--text)", margin: 0 }}>SoftCapture S.A.</p>
              <span style={{ padding: "2px 8px", borderRadius: "999px", border: "1px solid var(--border-hover)", fontSize: "10px", color: "var(--text-muted)", fontWeight: 600 }}>
                Nov 2021 — Ago 2022
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", fontStyle: "italic", margin: "0 0 10px 0" }}>Software Developer / Support</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 10px 0", display: "flex", flexDirection: "column", gap: "4px" }}>
              {["Servicios backend para transacciones financieras en tiempo real", "Automatización de procesos batch (Windows Services)", "Sistemas de licencias con lógica compleja y ORM", "ASP.NET, Entity Framework, SQL Server", "Soporte a clientes sector financiero (Coopeuch)"].map(b => (
                <li key={b} style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--text-muted)", marginRight: "6px" }}>→</span>{b}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {["C#", ".NET", "ASP.NET", "Entity Framework", "SQL Server"].map(t => (
                <span key={t} style={{ padding: "2px 7px", borderRadius: "999px", border: "1px solid var(--border-hover)", fontSize: "10px", color: "var(--text-muted)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* TOOLS */}
        <div style={{ ...cellStyle, gridArea: "tools" }}>
          <p style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", fontWeight: 700, margin: "0 0 12px 0" }}>{isEs ? "HERRAMIENTAS" : "TOOLS"}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Backend »", skills: backendSkills, color: "var(--accent)" },
              { label: "Frontend »", skills: frontendSkills, color: "var(--accent-2)" },
              { label: "DB & Queue »", skills: [...dbQueueSkills, ...devopsSkills], color: "#ff9a57" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: row.color, minWidth: "80px" }}>{row.label}</span>
                {row.skills.map(s => (
                  <span key={s} style={{ padding: "2px 7px", borderRadius: "999px", border: `1px solid ${row.color}60`, fontSize: "10px", color: "var(--text-muted)", background: `${row.color}0a` }}>{s}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CERTS */}
        <div style={{ ...cellStyle, gridArea: "certs" }}>
          <p style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", fontWeight: 700, margin: "0 0 12px 0" }}>{isEs ? "CURSOS Y ENLACES" : "COURSES & LINKS"}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {certs.map(c => (
              <div key={c.title}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--text)", margin: 0 }}>{c.title}</p>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{c.period}</span>
                </div>
                <p style={{ fontSize: "10px", color: "var(--text-muted)", margin: 0 }}>{c.platform}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/GonFrecc" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/claudio-vargas-zapata/" },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  border: "1px solid var(--accent)",
                  color: "var(--text)",
                  fontSize: "11px",
                  fontWeight: 600,
                  textDecoration: "none",
                  background: "transparent",
                }}
              >
                <link.icon size={12} />{link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div style={{ ...cellStyle, gridArea: "contact", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", fontWeight: 700, marginRight: "4px" }}>{isEs ? "CONTACTO" : "CONTACT"} »</span>
          {[
            { icon: Mail, label: "claudio.a.vargas91@gmail.com", href: "mailto:claudio.a.vargas91@gmail.com" },
            { icon: Phone, label: "+56 951 211 558", href: "tel:+56951211558" },
            { icon: MapPin, label: "Santiago, Chile", href: "#" },
          ].map(c => (
            <a
              key={c.label}
              href={c.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontSize: "11px",
                fontWeight: 500,
                textDecoration: "none",
                background: "var(--bg)",
              }}
            >
              <c.icon size={11} />{c.label}
            </a>
          ))}
        </div>

      </div>
    </motion.div>
  )
}
