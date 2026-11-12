"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { SectionHeader } from "@/components/portfolio/section-header"

type Skill = { name: string; icon: string }
type Group = { id: string; label: { es: string; en: string }; color: string; skills: Skill[] }

const groups: Group[] = [
  {
    id: "frontend",
    label: { es: "Frontend", en: "Frontend" },
    color: "var(--accent-2)",
    skills: [
      { name: "React", icon: "react.svg" },
      { name: "TypeScript", icon: "typescript.svg" },
      { name: "JavaScript", icon: "javascript.svg" },
      { name: "Vue.js", icon: "vue.js.svg" },
      { name: "HTML5", icon: "html-5.svg" },
      { name: "CSS3", icon: "css-3.svg" },
      { name: "Tailwind v4", icon: "tailwind.svg" },
      { name: "Material-UI", icon: "material-ui.svg" },
      { name: "Vite", icon: "vite.svg" },
      { name: "Bootstrap", icon: "bootstrap.svg" },
      { name: "jQuery", icon: "jquery.svg" },
    ],
  },
  {
    id: "backend",
    label: { es: "Backend", en: "Backend" },
    color: "var(--accent)",
    skills: [
      { name: "Python", icon: "python.svg" },
      { name: "FastAPI", icon: "fastAPI.svg" },
      { name: "SQLAlchemy", icon: "sqlalchemy.svg" },
      { name: "Django", icon: "django.svg" },
      { name: "Flask", icon: "flask.svg" },
      { name: "C#", icon: "csharp.svg" },
      { name: ".NET Framework", icon: "dotnet.svg" },
      { name: "Node.js", icon: "node-js.svg" },
      { name: "NestJS", icon: "nestjs.svg" },
      { name: "Express", icon: "express.svg" },
    ],
  },
  {
    id: "data",
    label: { es: "Base de datos y colas", en: "Databases & queues" },
    color: "#ff9a57",
    skills: [
      { name: "PostgreSQL", icon: "postgresSQL.svg" },
      { name: "MySQL", icon: "mysql.svg" },
      { name: "SQL Server", icon: "microsoft_SQL_Server.svg" },
      { name: "MongoDB", icon: "mongodb.svg" },
      { name: "Redis", icon: "Redis.svg" },
      { name: "RabbitMQ", icon: "RabbitMQ.svg" },
      { name: "SQLite", icon: "SQLite.svg" },
    ],
  },
  {
    id: "devops",
    label: { es: "DevOps y cloud", en: "DevOps & cloud" },
    color: "var(--accent-3)",
    skills: [
      { name: "Docker", icon: "docker.svg" },
      { name: "GCP", icon: "google_cloud.svg" },
      { name: "Cloud Build", icon: "cloud-build.svg" },
      { name: "GitHub Actions", icon: "github_actions.svg" },
      { name: "Git", icon: "git.svg" },
    ],
  },
  {
    id: "testing",
    label: { es: "Testing", en: "Testing" },
    color: "#ff5757",
    skills: [
      { name: "Vitest", icon: "vitest.svg" },
      { name: "Jest", icon: "Jest.svg" },
      { name: "Testing Library", icon: "testing-library.svg" },
    ],
  },
  {
    id: "apis",
    label: { es: "APIs y herramientas", en: "APIs & tooling" },
    color: "var(--accent)",
    skills: [
      { name: "GraphQL", icon: "GraphQL.svg" },
      { name: "JWT", icon: "jwt.svg" },
      { name: "Postman", icon: "Postman.svg" },
      { name: "Markdown", icon: "Markdown.svg" },
    ],
  },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

export function Skills() {
  const { locale } = useTheme()
  const isEs = locale === "es"
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  return (
    <section id="skills" className="portfolio-section">
      <SectionHeader index="02" label={isEs ? "HABILIDADES" : "SKILLS"} title={isEs ? "Stack tecnológico" : "Tech stack"} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: (gi % 3) * 0.06, ease: "easeOut" }}
            className="skill-panel flex flex-col p-6"
            style={{ ["--group-color" as string]: group.color } as React.CSSProperties}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="m-0 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--text)" }}>
                <span className="h-2 w-2 rounded-full" style={{ background: group.color }} />
                {isEs ? group.label.es : group.label.en}
              </h3>
              <span className="text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>
                {String(group.skills.length).padStart(2, "0")}
              </span>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="m-0 grid list-none grid-cols-2 gap-2 p-0"
            >
              {group.skills.map(skill => (
                <motion.li key={skill.name} variants={itemVariants} className="skill-chip">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${basePath}/svg/${skill.icon}`} alt="" aria-hidden width={20} height={20} loading="lazy" />
                  <span className="truncate">{skill.name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
