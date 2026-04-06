"use client"

import { useEffect, useRef } from "react";
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"


const panels = [
  {
    title: "Backend & DevOps",
    groups: [
      {
        label: "Backend",
        color: "var(--accent)",
        skills: ["Python", "FastAPI", "SQLAlchemy","Django", "Flask", "C#", "Node.js", "NestJS", "Express", ".NET Framework"],
        icons: ['/svg/python.svg', '/svg/fastapi.svg', '/svg/sqlalchemy.svg', '/svg/django.svg', '/svg/flask.svg', '/svg/csharp.svg', '/svg/node-js.svg', '/svg/nestjs.svg', '/svg/express.svg', '/svg/dotnet.svg'],
      },
      {
        label: "DevOps",
        color: "var(--accent-3)",
        skills: ["Docker", "GCP", "GitHub Actions", "Git", "Cloud Build"],
        icons: ['/svg/docker.svg', '/svg/google_cloud.svg', '/svg/github_actions.svg', '/svg/git.svg', '/svg/cloud-build.svg'],
      },
      {
        label: "Database & Queue",
        color: "#ff9a57",
        skills: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "Redis", "RabbitMQ", "Sqlite"],
        icons: ['/svg/postgresSQL.svg', '/svg/mysql.svg', '/svg/microsoft_SQL_Server.svg', '/svg/mongodb.svg', '/svg/redis.svg', '/svg/rabbitmq.svg', '/svg/sqlite.svg'],
      },
    ],
  },
  {
    title: "Frontend & Testing",
    groups: [
      {
        label: "Frontend",
        color: "var(--accent-2)",
        skills: ["React", "TypeScript", "JavaScript", "Vue.js", "HTML5", "CSS3", "Material-UI","Tailwind v4", "Vite", "Bootstrap", "Jquery"],
        icons: ['/svg/react.svg', '/svg/typescript.svg', '/svg/javascript.svg', '/svg/vue.js.svg', '/svg/html-5.svg', '/svg/css-3.svg', '/svg/material-ui.svg', '/svg/tailwind.svg', '/svg/vite.svg', '/svg/bootstrap.svg', '/svg/jquery.svg'],
      },
      {
        label: "Testing",
        color: "#ff5757",
        skills: ["Vite Test", "React Testing Library", "Jest", "Markdown"],
        icons: ['/svg/vitest.svg', '/svg/testing-library.svg', '/svg/jest.svg', '/svg/markdown.svg'],
      },
      {
        label: "Architecture",
        color: "var(--accent)",
        skills: ["GraphQL", "JWT", "Postman"],
        icons: ['/svg/graphql.svg', '/svg/jwt.svg', '/svg/postman.svg'],
      },
    ],
  },
]

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
}

function useBorderBeamStyle() {
  useEffect(() => {
    const id = "border-beam-global-style";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @property --beam-angle {
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
      }

      @keyframes border-beam-spin {
        to { --beam-angle: 360deg; }
      }

      .border-beam-card {
        /* El gradiente vive DENTRO del border, no necesita mask */
        border: 1px solid transparent !important;
        background-image:
          linear-gradient(var(--beam-card-bg, #111), var(--beam-card-bg, #111)),
          conic-gradient(
            from var(--beam-angle),
            transparent 55%,
            var(--beam-color-from, #7c3aed) 70%,
            var(--beam-color-to, #2563eb) 85%,
            transparent 95%
          );
        background-origin: border-box;
        background-clip: padding-box, border-box;
        animation: border-beam-spin var(--beam-duration, 6s) linear infinite;
      }
    `;
    document.head.appendChild(style);
  }, []);
}

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
        padding: "24px",
        gridColumn: `span ${cols}`,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

interface BorderBeamProps {
  children: React.ReactNode;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  bgColor: string;         // ← color real del fondo de tu card
  borderRadius?: string;
  style?: React.CSSProperties;
  className?: string;
  motionProps?: React.ComponentProps<typeof motion.div>;
}

const BorderBeamCard = ({
  children,
  duration = 6,
  colorFrom = "#7c3aed",
  colorTo = "#2563eb",
  bgColor,                 // ej: "#111111" o "rgb(17,17,17)"
  borderRadius = "12px",
  style,
  className,
  motionProps,
}: BorderBeamProps) => {
  useBorderBeamStyle();   // inyecta CSS una sola vez

  return (
    <motion.div
      {...motionProps}
      className={`border-beam-card ${className ?? ""}`}
      style={{
        // CSS vars que consume la clase .border-beam-card
        "--beam-card-bg": bgColor,
        "--beam-color-from": colorFrom,
        "--beam-color-to": colorTo,
        "--beam-duration": `${duration}s`,
        borderRadius,
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </motion.div>
  );
};

export function Skills() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"
  const allGroups = panels.flatMap(panel => panel.groups)

  const bentoOrder = [
    "Frontend",
    "Backend",
    "DevOps",
    "Database & Queue",
    "Testing",
    "Architecture",
  ] as const

  const bentoCols: Record<(typeof bentoOrder)[number], number> = {
    Frontend: 6,
    Backend: 6,
    DevOps: 4,
    "Database & Queue": 4,
    Testing: 4,
    Architecture: 12,
  }

  const groupLabelMap: Record<string, string> = {
    "Database & Queue": isEs ? "Base de Datos y Cola" : "Database & Queue",
    Architecture: isEs ? "Arquitectura" : "Architecture",
  }

  const orderedGroups = bentoOrder
    .map(label => allGroups.find(group => group.label === label))
    .filter((group): group is (typeof allGroups)[number] => Boolean(group))

  return (
    <section id="skills" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "32px" }}
      >
        <p style={{ fontSize: "11px", color: theme === "dark" ? "var(--accent)" : "var(--text)", letterSpacing: "0.15em", fontWeight: 700, margin: 0 }}>
          {isEs ? "02 - HABILIDADES" : "02 - SKILLS"}
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
          {isEs ? "Stack tecnologico" : "Tech stack"}
        </h2>
      </motion.div>

      
      {/* Grilla para los paneles por sección (Frontend, Backend, Devops, Base de datos y cola, testing, arquitectura) */}
      {/* Ejemplo: 
        * Frontend (Grilla de logos)
          - React (logo) Typescript (logo) JavaScript (logo) HTML (logo) CSS (logo) Tailwind (logo)
        * Backend (Grilla de logos)
          - Python (logo) FastAPI (logo) Django (logo) Flask (logo) C# (logo) Node.js (logo) NestJS (logo) Express (logo) .NET Framework (logo)
        * DevOps (Grilla de logos)
          - Docker (logo) GCP (logo) GitHub Actions (logo) CI/CD (icon) Git (logo) GKE (icon) Cloud Build (icon)
        * Base de datos y cola (Grilla de logos)
          - PostgreSQL (logo) SQL Server 2018 (logo) MongoDB (logo) Redis (logo) RabbitMQ (logo)
        * Testing (Grilla de logos)
          - Vite Test (logo) React Testing Library (logo) Jest (logo) Unit Tests (icon) Integration Tests (icon) TDD (icon)
        * Arquitectura (Grilla de logos)
          - GraphQL (logo) DDD (icon) Microservices (icon) REST APIs (icon) WebSockets (icon) JWT (icon)
       */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "12px",
        }}
        className="skills-bento-grid"
      >
        {orderedGroups.map((group, groupIndex) => (
          <BorderBeamCard
            key={group.label}
            bgColor="var(--background)"              // ← ponle el color exacto de tu card
            duration={6 + groupIndex * 0.7}
            colorFrom= {theme === "dark" ? "var(--accent)" : "var(--border)"}    // ← puedes usar un color distinto para cada card si quieres
            colorTo={theme === "dark" ? "var(--accent)" : "var(--border)"}    // ← puedes usar un color distinto para cada card si quieres
            borderRadius="12px"   // ← debe coincidir con tu CSS
            style={{
              gridColumn: `span ${bentoCols[group.label as (typeof bentoOrder)[number]]}`,
              padding: "24px",
            }}
            className="skills-bento-item"
            motionProps={{
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-100px" },
              transition: { duration: 0.55, ease: "easeOut" },
            }}
          >
            {/* Aquí tu contenido va directo, sin wrappers extra */}
            <h3
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase",
                margin: "0 0 14px 0",
              }}
            >
              {groupLabelMap[group.label] ?? group.label}
            </h3>

            <motion.div
              variants={staggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))",
                gap: "10px",
              }}
            >
              {group.skills.map((skill, index) => {
                const iconPath = group.icons[index];
                return (
                  <motion.div
                    key={`${group.label}-${skill}-${index}`}
                    variants={pillVariants}
                    whileHover={{ scale: 1.03 }}
                  >
                    <BentoCell
                      style={{
                        padding: "10px",
                        minHeight: "86px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      {iconPath && (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                            color: "var(--text)",
                            fontSize: "11px",
                            fontWeight: 500,
                          }}
                        >
                          <img
                            src={iconPath}
                            alt={skill}
                            style={{ width: 40, height: 40, objectFit: "contain" }}
                          />
                          <span>{skill}</span>
                        </motion.div>
                      )}
                    </BentoCell>
                  </motion.div>
                );
              })}
            </motion.div>
          </BorderBeamCard>
        ))}
      </div>

      <style>{`

        @media (width > 1000px) {
          #skills {
            padding-top: 120px !important;
          }  
        }

        @media (max-width: 1024px) {
          .skills-bento-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
          }

          .skills-bento-item {
            grid-column: span 6 !important;
          }
        }

        @media (max-width: 768px) {
          .skills-bento-grid { grid-template-columns: 1fr !important; }

          .skills-bento-item {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
