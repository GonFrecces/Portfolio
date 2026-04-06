"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const skillsByCategory = {
  Backend: ["C#", ".NET", "Python", "Django", "FastAPI", "Flask", "Node.js", "Express", "NestJS"],
  Frontend: ["React", "Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind v4"],
  Database: ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "RabbitMQ"],
  DevOps: ["Docker", "GCP", "GitHub Actions", "CI/CD", "Git"],
  Practices: ["TDD", "DDD", "Microservices", "REST APIs", "WebSockets"],
}

const categoryColors: Record<string, string> = {
  Backend: "var(--accent)",
  Frontend: "var(--accent-2)",
  Database: "#ff9a57",
  DevOps: "var(--accent-3)",
  Practices: "#ff5757",
}

const socials = [
  { label: "GitHub", icon: Github, href: "https://github.com/GonFrecc" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/claudio-vargas-zapata/" },
  { label: "Email", icon: Mail, href: "mailto:claudio.a.vargas91@gmail.com" },
  { label: "Phone", icon: Phone, href: "tel:+56951211558" },
]

function BentoCell({
  children,
  cols = 1,
  style = {},
}: {
  children: React.ReactNode
  cols?: number
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        /* padding: "24px", */
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "24px",
        gridColumn: `span ${cols}`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(232,255,87,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </div>
  )
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cellVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}

export function About() {
  const { theme, locale } = useTheme()
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  const isEs = locale === "es"

    const bgCircleColor = theme === "dark"
    ? "radial-gradient(ellipse at center, rgba(232,255,87,0.18) 0%, transparent 70%)"
    : "radial-gradient(ellipse at center, rgba(12,12,12,0.42) 0%, transparent 70%)"

  return (
    <section id="about" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "32px" }}
      >
        <p style={{ fontSize: "11px", color: theme === "dark" ? "var(--accent)" : "var(--text)", letterSpacing: "0.15em", fontWeight: 700, margin: 0 }}>
          {isEs ? "01 - SOBRE MI" : "01 - ABOUT"}
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
          {isEs ? "Quien soy" : "Who I am"}
        </h2>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
        className="about-grid"
      >
        {/* Cell A — Bio quote (2 cols) */}
        <motion.div variants={cellVariants} style={{ gridColumn: "span 3", overflow: "visible" }}>
          <BentoCell style={{ width: "100%", height: "auto", overflow: "visible" }}>
            <div
              className="about-bio-layout"
              style={{
                display: "grid",
                gridTemplateColumns: "1.35fr 1fr",
                gap: "20px",
                alignItems: "center",
                justifyContent: "stretch",
                minHeight: "360px",
              }}
            >
              <div
                className="about-bio-copy"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  
                  
                  padding: "8px 12px",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "var(--text)",
                    margin: 0,
                    fontStyle: "italic",
                    fontWeight: 500,
                    maxWidth: "640px",
                  }}
                >
                  {isEs
                    ? `
                \u201cDesarrollador Full Stack con formación técnica en salud e informática, lo que le permite abordar problemas con una visión analítica y orientada a resultados.\n
                Con experiencia en el desarrollo de soluciones web, ha trabajado en distintos entornos tecnológicos, participando en la construcción de aplicaciones escalables, integraciones y sistemas de gestión complejos.\n
                Me caracterizo por una sólida base en frontend y backend, adaptabilidad a nuevas tecnologías y enfoque en buenas prácticas de desarrollo.\n
                Mi experiencia me ha permitido comprender tanto la lógica de negocio como la importancia de la experiencia de usuario, aportando valor en cada etapa del desarrollo de software.\n
                Profesional comprometido, con capacidad para trabajar en equipo, resolver problemas y enfrentar desafíos técnicos, enfocado en seguir creciendo dentro del desarrollo de productos digitales.\u201d`
                    : "\u201cProfessional with experience in healthcare, where I developed teamwork, accountability, and attention to detail in demanding environments. Over time, I transitioned into IT driven by a passion for learning, solving problems, and improving processes.\u201d"}
                </p>
              </div>

              <motion.div
                className="about-bio-photo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{
                  minWidth: 0,
                  position: "relative",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  minHeight: "520px",
                  overflow: "visible",
                  marginTop: "-175px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "-100px",
                    background: bgCircleColor,
                    borderRadius: "50%",
                    zIndex: 0,
                    transition: "background 0.5s ease",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "90%",
                    maxWidth: "420px",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    transform: "translateX(36px)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}/images/claudio_vargas2.png`}
                    alt="Claudio Vargas — Full Stack Developer"
                    style={{
                      width: "95%",
                      height: "auto",
                      display: "block",
                      objectFit: "cover",
                      WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 58%, transparent 100%)",
                      maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 58%, transparent 100%)",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "100% 100%",
                      maskSize: "100% 100%",
                    }}
                    crossOrigin="anonymous"
                  />
                </div>
              </motion.div>
            </div>
          </BentoCell>
        </motion.div>
      </motion.div>

      <style>{`
        @media (width > 1000px) {
          #about {
            padding-top: 120px !important;
          }  
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > div[style*="span 2"] {
            grid-column: span 1 !important;
          }
          .about-bio-layout {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            min-height: auto !important;
          }
          .about-bio-copy {
            padding: 0 !important;
          }
          .about-bio-photo {
            margin-top: 0 !important;
            min-height: 420px !important;
            justify-content: center !important;
          }
          .about-bio-photo > div:last-child {
            width: 100% !important;
            max-width: 360px !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </section>
  )
}
