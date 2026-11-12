"use client"

// Trayectoria animada con GSAP + ScrollTrigger.
// El contenido sigue el currículum (public/cv-claudio-vargas.pdf).
// La página scrollea dentro de #portfolio-scroller (no en window), por eso
// todos los ScrollTrigger usan ese contenedor como `scroller`.

import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Briefcase, Calendar, ChevronDown, Code2, HeartPulse } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { SectionHeader } from "@/components/portfolio/section-header"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SCROLLER = "#portfolio-scroller"

type Lang = { es: string; en: string }
type Job = {
  company: string
  role: Lang
  period: Lang
  years: string
  current: boolean
  icon: typeof Code2
  techs: string[]
  bullets: Lang[]
}

const jobs: Job[] = [
  {
    company: "GoodRabbit",
    role: { es: "FullStack Developer Semi Senior", en: "Semi Senior FullStack Developer" },
    period: { es: "Ago 2022 — Actualidad", en: "Aug 2022 — Present" },
    years: "2022",
    current: true,
    icon: Code2,
    techs: ["Python", "FastAPI", "Django", "React", "TypeScript", "PostgreSQL", "RabbitMQ", "JWT", "TDD", "DDD", "GitHub Actions"],
    bullets: [
      { es: "Arquitecturas de microservicios con comunicación asíncrona mediante colas y eventos, con foco en escalabilidad y tolerancia a fallos.", en: "Microservice architectures with asynchronous queue- and event-based messaging, focused on scalability and fault tolerance." },
      { es: "Optimización de sistemas productivos: profiling, análisis de carga, consultas SQL y refactorización de servicios críticos.", en: "Production performance work: profiling, load analysis, SQL query tuning and refactoring of critical services." },
      { es: "Servicios backend en Python (FastAPI, Django) integrados con bases relacionales y mensajería.", en: "Python backend services (FastAPI, Django) integrated with relational databases and messaging." },
      { es: "Frontend con React y TypeScript: componentes reutilizables, gestión de estado y consumo eficiente de APIs.", en: "React and TypeScript frontends: reusable components, state management and efficient API consumption." },
      { es: "TDD y Domain Driven Design para asegurar la integridad de las reglas de negocio.", en: "TDD and Domain Driven Design to protect business-rule integrity." },
      { es: "Autenticación y autorización con JWT, roles y permisos.", en: "Authentication and authorization with JWT, roles and permissions." },
      { es: "Pruebas unitarias e integración en microservicios y pipelines CI/CD en GitHub Actions.", en: "Unit and integration tests across microservices and CI/CD pipelines on GitHub Actions." },
    ],
  },
  {
    company: "SoftCapture S.A.",
    role: { es: "Software Developer / Support", en: "Software Developer / Support" },
    period: { es: "Nov 2021 — Ago 2022", en: "Nov 2021 — Aug 2022" },
    years: "2021",
    current: false,
    icon: Briefcase,
    techs: ["C#", ".NET", "ASP.NET", "Entity Framework", "SQL Server", "Windows Services"],
    bullets: [
      { es: "Servicios backend para procesamiento de transacciones financieras en tiempo real.", en: "Backend services for real-time financial transaction processing." },
      { es: "Procesos batch para envío masivo de notificaciones con tareas programadas (Windows Services).", en: "Batch jobs for mass notifications using scheduled tasks (Windows Services)." },
      { es: "Sistemas de licencias con lógica de negocio compleja y persistencia mediante ORM.", en: "Licensing systems with complex business logic and ORM persistence." },
      { es: "Evolución de aplicaciones legacy hacia arquitecturas más mantenibles.", en: "Evolving legacy applications toward more maintainable architectures." },
      { es: "Soporte y resolución de incidencias en sistemas críticos del sector financiero (Coopeuch).", en: "Support and incident resolution for critical financial-sector systems (Coopeuch)." },
    ],
  },
  {
    company: "CESFAM La Granja",
    role: { es: "Asistente Dental", en: "Dental Assistant" },
    period: { es: "Ago 2018 — Sep 2021", en: "Aug 2018 — Sep 2021" },
    years: "2018",
    current: false,
    icon: HeartPulse,
    techs: ["Atención centrada en el paciente", "Equipos multidisciplinarios", "Protocolos clínicos", "Bioseguridad"],
    bullets: [
      { es: "Asistencia clínica en atención primaria: obturaciones, profilaxis y tratamientos preventivos.", en: "Clinical assistance in primary care: fillings, prophylaxis and preventive treatments." },
      { es: "Programas preventivos infantiles, como sellantes en primeros molares y aplicación de flúor en campañas escolares.", en: "Children's preventive programs, including sealants and fluoride campaigns in schools." },
      { es: "Esterilización de instrumental bajo protocolos de bioseguridad y control de infecciones.", en: "Instrument sterilization under biosafety and infection-control protocols." },
      { es: "Comité Paritario de Higiene y Seguridad y campañas de vacunación (influenza, VPH, COVID-19).", en: "Joint Health & Safety Committee and vaccination campaigns (influenza, HPV, COVID-19)." },
    ],
  },
]

const VISIBLE_BULLETS = 3

export function Experience() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"
  const t = (v: Lang) => (isEs ? v.es : v.en)
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<Record<string, boolean>>({})

  useGSAP(
    () => {
      // Se resuelve el elemento (no el selector) porque useGSAP limita los
      // selectores de texto al scope de la sección.
      const scroller = document.querySelector<HTMLElement>(SCROLLER) ?? window
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Línea de progreso que se dibuja con el scroll
        gsap.fromTo(
          ".xp-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".xp-list", scroller, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        )

        gsap.utils.toArray<HTMLElement>(".xp-item").forEach(item => {
          const card = item.querySelector(".xp-card")
          const marker = item.querySelector(".xp-marker")
          const year = item.querySelector(".xp-year")
          const pieces = item.querySelectorAll(".xp-reveal")

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              scroller,
              start: "top 78%",
              toggleActions: "play play play reverse", // también reproduce si se salta directo más abajo
              // Marca el hito activo mientras está en el centro de la vista
              onToggle: self => item.classList.toggle("is-active", self.isActive),
            },
          })

          tl.from(marker, { scale: 0, rotate: -90, duration: 0.5, ease: "back.out(2)" })
            .from(card, { x: 60, opacity: 0, duration: 0.7, ease: "power3.out" }, "<0.1")
            .from(pieces, { y: 14, opacity: 0, duration: 0.4, stagger: 0.035, ease: "power2.out" }, "<0.2")

          // Año gigante con parallax
          gsap.fromTo(
            year,
            { yPercent: 40 },
            {
              yPercent: -40,
              ease: "none",
              scrollTrigger: { trigger: item, scroller, start: "top bottom", end: "bottom top", scrub: true },
            },
          )

          ScrollTrigger.create({
            trigger: item,
            scroller,
            start: "top 55%",
            end: "bottom 45%",
            toggleClass: { targets: item, className: "is-current" },
          })
        })
      })

      // Inclinación sutil del card siguiendo el cursor (solo con puntero fino)
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cleanups: (() => void)[] = []
        gsap.utils.toArray<HTMLElement>(".xp-card").forEach(card => {
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" })
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" })
          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect()
            ry(((e.clientX - r.left) / r.width - 0.5) * 6)
            rx(-((e.clientY - r.top) / r.height - 0.5) * 6)
          }
          const leave = () => {
            rx(0)
            ry(0)
          }
          card.addEventListener("pointermove", move)
          card.addEventListener("pointerleave", leave)
          cleanups.push(() => {
            card.removeEventListener("pointermove", move)
            card.removeEventListener("pointerleave", leave)
          })
        })
        return () => cleanups.forEach(fn => fn())
      })
    },
    { scope: root, dependencies: [locale] },
  )

  const toggle = (company: string) => {
    const el = root.current?.querySelector<HTMLElement>(`[data-extra="${company}"]`)
    const willOpen = !open[company]
    setOpen(o => ({ ...o, [company]: willOpen }))
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (willOpen) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: reduce ? 0 : 0.45, ease: "power2.out", onComplete: () => ScrollTrigger.refresh() })
      gsap.from(el.querySelectorAll("li"), { x: -12, opacity: 0, stagger: 0.05, duration: reduce ? 0 : 0.3, delay: 0.1 })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: reduce ? 0 : 0.35, ease: "power2.in", onComplete: () => ScrollTrigger.refresh() })
    }
  }

  const accentText = theme === "dark" ? "var(--accent)" : "var(--text)"

  return (
    <section id="experience" ref={root} className="portfolio-section">
      <SectionHeader index="03" label={isEs ? "EXPERIENCIA" : "EXPERIENCE"} title={isEs ? "Trayectoria" : "Work history"} />

      <div className="xp-list relative ml-4 md:ml-6">
        <div className="absolute inset-y-0 left-0 w-px" style={{ background: "var(--border)" }} />
        <div className="xp-progress absolute inset-y-0 left-0 w-[2px] origin-top -translate-x-[0.5px]" style={{ background: "var(--accent)" }} />

        {jobs.map(job => {
          const Icon = job.icon
          const visible = job.bullets.slice(0, VISIBLE_BULLETS)
          const extra = job.bullets.slice(VISIBLE_BULLETS)
          const isOpen = !!open[job.company]

          return (
            <article key={job.company} className="xp-item relative pb-14 pl-10 last:pb-0 md:pl-16">
              <div className="xp-marker absolute left-0 top-2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full">
                <Icon size={16} style={{ color: "var(--text)" }} />
              </div>

              <span aria-hidden className="xp-year pointer-events-none absolute -top-6 right-0 select-none text-[5rem] font-black leading-none md:text-[7rem]">
                {job.years}
              </span>

              <div className="xp-card relative rounded-xl p-5 md:p-7" style={{ transformPerspective: 900 } as React.CSSProperties}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="xp-reveal">
                    <h3 className="m-0 text-xl font-extrabold" style={{ color: "var(--text)" }}>{job.company}</h3>
                    <p className="m-0 mt-1 text-xs italic" style={{ color: accentText }}>{t(job.role)}</p>
                  </div>
                  <span className="xp-reveal tag-pill" style={job.current ? { borderColor: "var(--accent)" } : undefined}>
                    {job.current && <span className="pulse-dot" style={{ width: 6, height: 6 }} />}
                    <Calendar size={11} />
                    {t(job.period)}
                  </span>
                </div>

                <ul className="m-0 mt-5 flex list-none flex-col gap-2 p-0">
                  {visible.map(b => (
                    <li key={b.es} className="xp-reveal xp-bullet">{t(b)}</li>
                  ))}
                </ul>

                {extra.length > 0 && (
                  <>
                    <div data-extra={job.company} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                      <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0">
                        {extra.map(b => (
                          <li key={b.es} className="xp-bullet">{t(b)}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(job.company)}
                      aria-expanded={isOpen}
                      className="xp-reveal mt-3 inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[11px] font-bold tracking-wider"
                      style={{ color: accentText, fontFamily: "inherit" }}
                    >
                      {isOpen ? (isEs ? "[ VER MENOS ]" : "[ SHOW LESS ]") : (isEs ? `[ +${extra.length} LOGROS ]` : `[ +${extra.length} MORE ]`)}
                      <ChevronDown size={13} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                    </button>
                  </>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.techs.map(tech => (
                    <span key={tech} className="xp-reveal tag-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
