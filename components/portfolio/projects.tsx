"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { SectionHeader } from "@/components/portfolio/section-header"

type Stack = { backend: string[]; frontend: string[]; cloud: string[] }

type Project = {
  title: string
  thumbnail: string
  url: string
  stack: Stack
}

// Para agregar un proyecto: suma un objeto aquí. Las celdas restantes se
// rellenan con placeholders deshabilitados hasta completar la grilla.
const projects: Project[] = [
  {
    title: "Prioris",
    thumbnail: "/projects/prioris.jpg",
    url: "https://priorisdev.netlify.app",
    stack: {
      backend: ["Python", "FastAPI", "SQLModel", "PostgreSQL", "Redis", "JWT"],
      frontend: ["React", "TypeScript", "Vite", "Tailwind v4", "shadcn/ui"],
      cloud: ["Docker", "GitHub Actions", "Neon", "Render", "Netlify"],
    },
  },
]

const GRID_SLOTS = 6

const layerLabel = {
  backend: { es: "Backend", en: "Backend" },
  frontend: { es: "Frontend", en: "Frontend" },
  cloud: { es: "Nube y DevOps", en: "Cloud & DevOps" },
}

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
      <div className="project-thumb aspect-[16/10] shrink-0 overflow-hidden">
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

        <dl className="m-0 flex flex-col gap-2.5">
          {(["backend", "frontend", "cloud"] as const).map(layer => (
            <div key={layer} className="flex flex-col gap-1.5">
              <dt className="text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--text-muted)" }}>
                {layerLabel[layer][isEs ? "es" : "en"]}
              </dt>
              <dd className="m-0 flex flex-wrap gap-1.5">
                {project.stack[layer].map(s => (
                  <span key={s} className="tag-pill">{s}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold tracking-wider no-underline transition-transform hover:scale-[1.04]"
          style={{
            background: "var(--accent)",
            color: "var(--accent-contrast)",
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
        className="project-thumb flex aspect-[16/10] shrink-0 items-center justify-center"
        style={{ background: "var(--bg-secondary)" }}
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
      <SectionHeader index="03" label={isEs ? "PROYECTOS" : "PROJECTS"} title={isEs ? "Proyectos" : "Projects"} />

      <div className="grid grid-cols-1 gap-5 p-2 sm:grid-cols-2 sm:p-3 lg:grid-cols-3">
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
