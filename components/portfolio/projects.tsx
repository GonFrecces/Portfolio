"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { SectionHeader } from "@/components/portfolio/section-header"

type Project = {
  title: string
  thumbnail: string
  url: string
  stack: string[]
}

// Para agregar un proyecto: suma un objeto aquí. Las celdas restantes se
// rellenan con placeholders deshabilitados hasta completar la grilla.
const projects: Project[] = [
  {
    title: "Prioris",
    thumbnail: "/projects/prioris.jpg",
    url: "https://priorisdev.netlify.app",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind v4"],
  },
]

const GRID_SLOTS = 6

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className="project-tile group flex flex-col overflow-hidden"
    >
      <div className="aspect-[16/10] overflow-hidden" style={{ borderBottom: "1px solid var(--border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}${project.thumbnail}`}
          alt={isEs ? `Vista previa de ${project.title}` : `${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="m-0 text-lg font-extrabold" style={{ color: "var(--text)" }}>{project.title}</h3>

        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {project.stack.map(s => (
            <li key={s} className="tag-pill">{s}</li>
          ))}
        </ul>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold tracking-wider no-underline transition-transform hover:scale-[1.04]"
          style={{
            background: "var(--accent)",
            color: "#0c0c0c",
            border: theme === "dark" ? "none" : "1px solid rgba(12,12,12,0.75)",
          }}
        >
          {isEs ? "[ VISITAR APP ]" : "[ VISIT APP ]"}
          <ArrowUpRight size={13} />
        </a>
      </div>
    </motion.article>
  )
}

function PlaceholderCard({ index }: { index: number }) {
  const { locale } = useTheme()
  const isEs = locale === "es"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      aria-disabled="true"
      className="project-tile project-tile--empty flex flex-col overflow-hidden"
    >
      <div
        className="flex aspect-[16/10] items-center justify-center"
        style={{ borderBottom: "1px dashed var(--border-hover)", background: "var(--bg-secondary)" }}
      >
        <Plus size={22} style={{ color: "var(--text-muted)" }} />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="h-4 w-1/2 rounded" style={{ background: "var(--bg-secondary)" }} />
        <div className="flex gap-1.5">
          {[48, 64, 40].map(w => (
            <span key={w} className="h-5 rounded-full" style={{ width: w, background: "var(--bg-secondary)" }} />
          ))}
        </div>
        <span
          className="mt-auto inline-flex w-fit cursor-not-allowed items-center rounded-full px-4 py-2 text-[11px] font-bold tracking-wider"
          style={{ border: "1px dashed var(--border-hover)", color: "var(--text-muted)" }}
        >
          {isEs ? "[ PRÓXIMAMENTE ]" : "[ COMING SOON ]"}
        </span>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const { locale } = useTheme()
  const isEs = locale === "es"
  const placeholders = Math.max(GRID_SLOTS - projects.length, 0)

  return (
    <section id="projects" className="portfolio-section">
      <SectionHeader index="02" label={isEs ? "PROYECTOS" : "PROJECTS"} title={isEs ? "Proyectos" : "Projects"} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
        {Array.from({ length: placeholders }, (_, i) => (
          <PlaceholderCard key={`empty-${i}`} index={projects.length + i} />
        ))}
      </div>
    </section>
  )
}
