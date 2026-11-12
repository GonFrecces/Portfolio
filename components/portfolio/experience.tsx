"use client"

// Trayectoria como ruta serpenteante con estela de luz (GSAP + ScrollTrigger + MotionPath).
// - Ruta de desarrollo por defecto; la ruta de salud es opcional (toggle).
// - El camino SVG se calcula midiendo la posición real de cada hito, así se adapta
//   a cualquier ancho. La estela se dibuja con el scroll y un "cometa" la recorre.
// - La página scrollea dentro de #portfolio-scroller: los ScrollTrigger reciben ese
//   elemento como `scroller`.

import { useCallback, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { useGSAP } from "@gsap/react"
import {
  Briefcase, ChevronDown, Code2, Flag, GraduationCap, HeartPulse, MapPin, Stethoscope, type LucideIcon,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { SectionHeader } from "@/components/portfolio/section-header"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP)

type Lang = { es: string; en: string }
type Stop = {
  id: string
  kind: "edu" | "job" | "now"
  icon: LucideIcon
  title: string
  role: Lang
  period: Lang
  place?: Lang
  bullets?: Lang[]
  techs?: string[]
  /** Fecha de inicio (para calcular duración) y fin opcional; sin fin = hasta hoy */
  from?: [number, number]
  to?: [number, number]
}

type RouteId = "dev" | "health"

// ─── Datos (basados en el CV y en lo que indicó Claudio) ───
const devRoute: Stop[] = [
  {
    id: "duoc",
    kind: "edu",
    icon: GraduationCap,
    title: "Duoc UC",
    role: { es: "Técnico Analista Programador", en: "Programmer Analyst Technician" },
    period: { es: "Titulación · Jun 2021", en: "Graduated · Jun 2021" },
    bullets: [
      { es: "Formación en desarrollo de software, bases de datos y análisis de sistemas (2019 — 2021).", en: "Training in software development, databases and systems analysis (2019 — 2021)." },
    ],
  },
  {
    id: "softcapture",
    kind: "job",
    icon: Briefcase,
    title: "SoftCapture S.A.",
    role: { es: "Soporte y Desarrollo", en: "Support & Development" },
    period: { es: "Nov 2021 — Ago 2022", en: "Nov 2021 — Aug 2022" },
    from: [2021, 11],
    to: [2022, 8],
    techs: ["C#", ".NET", "ASP.NET", "Entity Framework", "SQL Server"],
    bullets: [
      { es: "Servicios backend para procesamiento de transacciones financieras en tiempo real.", en: "Backend services for real-time financial transaction processing." },
      { es: "Procesos batch para notificaciones masivas con tareas programadas (Windows Services).", en: "Batch jobs for mass notifications with scheduled tasks (Windows Services)." },
      { es: "Sistemas de licencias con lógica de negocio compleja y persistencia mediante ORM.", en: "Licensing systems with complex business logic and ORM persistence." },
      { es: "Evolución de aplicaciones legacy hacia arquitecturas más mantenibles.", en: "Evolving legacy apps toward more maintainable architectures." },
      { es: "Soporte de sistemas críticos para el sector financiero (Coopeuch).", en: "Support for critical financial-sector systems (Coopeuch)." },
    ],
  },
  {
    id: "goodrabbit",
    kind: "job",
    icon: Code2,
    title: "GoodRabbit",
    role: { es: "FullStack Developer Semi Senior", en: "Semi Senior FullStack Developer" },
    period: { es: "Ago 2022 — Hoy", en: "Aug 2022 — Today" },
    from: [2022, 8],
    techs: ["Python", "FastAPI", "Django", "React", "TypeScript", "PostgreSQL", "RabbitMQ", "JWT", "TDD", "DDD", "GitHub Actions"],
    bullets: [
      { es: "Microservicios con comunicación asíncrona mediante colas y eventos, con foco en escalabilidad y tolerancia a fallos.", en: "Microservices with asynchronous queue/event messaging, focused on scalability and fault tolerance." },
      { es: "Optimización de sistemas productivos: profiling, análisis de carga, consultas SQL y refactorización.", en: "Production performance work: profiling, load analysis, SQL tuning and refactoring." },
      { es: "Backend en Python (FastAPI, Django) integrado con bases relacionales y mensajería.", en: "Python backends (FastAPI, Django) with relational databases and messaging." },
      { es: "Frontend con React y TypeScript: componentes reutilizables, estado y consumo de APIs.", en: "React and TypeScript frontends: reusable components, state and API consumption." },
      { es: "TDD y Domain Driven Design para proteger las reglas de negocio.", en: "TDD and Domain Driven Design to protect business rules." },
      { es: "Autenticación y autorización con JWT, roles y permisos.", en: "Authentication and authorization with JWT, roles and permissions." },
      { es: "Pruebas unitarias e integración y pipelines CI/CD en GitHub Actions.", en: "Unit and integration tests and CI/CD pipelines on GitHub Actions." },
    ],
  },
  {
    id: "dev-now",
    kind: "now",
    icon: Flag,
    title: "",
    role: { es: "Construyendo Prioris y nuevos proyectos", en: "Building Prioris and new projects" },
    period: { es: "Hoy", en: "Today" },
  },
]

const healthRoute: Stop[] = [
  {
    id: "inacap",
    kind: "edu",
    icon: GraduationCap,
    title: "INACAP",
    role: { es: "Técnico en Odontología", en: "Dental Technician" },
    period: { es: "Titulación · 2014", en: "Graduated · 2014" },
    bullets: [
      { es: "Formación técnica en odontología (2012 — 2014).", en: "Technical training in dentistry (2012 — 2014)." },
    ],
  },
  {
    id: "clinicas",
    kind: "job",
    icon: Stethoscope,
    title: "Cruz Roja y clínicas particulares",
    role: { es: "Asistente Dental", en: "Dental Assistant" },
    period: { es: "2014 — 2018", en: "2014 — 2018" },
    place: { es: "Temuco · Valparaíso", en: "Temuco · Valparaíso" },
    bullets: [
      { es: "Asistencia clínica en la Cruz Roja y en clínicas dentales particulares.", en: "Clinical assistance at the Red Cross and private dental clinics." },
      { es: "Trabajo en distintas ciudades y equipos, adaptándose a cada entorno clínico.", en: "Work across cities and teams, adapting to each clinical setting." },
    ],
  },
  {
    id: "cesfam",
    kind: "job",
    icon: HeartPulse,
    title: "CESFAM La Granja",
    role: { es: "Asistente Dental · Salud pública", en: "Dental Assistant · Public health" },
    period: { es: "Ago 2018 — Sep 2021", en: "Aug 2018 — Sep 2021" },
    place: { es: "Santiago", en: "Santiago" },
    techs: ["Atención centrada en el paciente", "Equipos multidisciplinarios", "Bioseguridad", "Prevención"],
    bullets: [
      { es: "Asistencia en atención primaria: obturaciones, profilaxis y tratamientos preventivos.", en: "Primary-care assistance: fillings, prophylaxis and preventive treatments." },
      { es: "Programas infantiles de sellantes y flúor en campañas escolares.", en: "Children's sealant and fluoride programs in school campaigns." },
      { es: "Esterilización de instrumental bajo protocolos de bioseguridad.", en: "Instrument sterilization under biosafety protocols." },
      { es: "Comité Paritario y campañas de vacunación (influenza, VPH, COVID-19).", en: "Health & Safety Committee and vaccination campaigns (flu, HPV, COVID-19)." },
    ],
  },
  {
    id: "health-now",
    kind: "now",
    icon: Code2,
    title: "",
    role: { es: "Transición al desarrollo de software", en: "Transition into software development" },
    period: { es: "2021", en: "2021" },
  },
]

const ROUTES: Record<RouteId, { stops: Stop[]; since: [number, number]; until?: [number, number] }> = {
  dev: { stops: devRoute, since: [2021, 11] },
  health: { stops: healthRoute, since: [2014, 1], until: [2021, 9] },
}

// ─── Utilidades ───
function monthsBetween(from: [number, number], to?: [number, number]) {
  const now = new Date()
  const [ty, tm] = to ?? [now.getFullYear(), now.getMonth() + 1]
  return Math.max((ty - from[0]) * 12 + (tm - from[1]), 0)
}

function formatDuration(months: number, isEs: boolean) {
  const y = Math.floor(months / 12)
  const m = months % 12
  const yl = isEs ? (y === 1 ? "año" : "años") : y === 1 ? "yr" : "yrs"
  const ml = isEs ? (m === 1 ? "mes" : "meses") : m === 1 ? "mo" : "mos"
  if (y === 0) return `${m} ${ml}`
  return m ? `${y} ${yl} ${m} ${ml}` : `${y} ${yl}`
}

type Pt = { x: number; y: number }

/**
 * Camino serpenteante: baja en vertical junto a cada hito (fuera de las cards)
 * y cruza al otro lado en el espacio entre hitos con una curva en S.
 */
function buildPath(nodes: Pt[], gaps: number[]) {
  if (!nodes.length) return ""
  const r = 46 // radio de la curva en el cruce
  let d = `M ${nodes[0].x} 0 L ${nodes[0].x} ${nodes[0].y}`
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i]
    const b = nodes[i + 1]
    const g = gaps[i]
    d += ` L ${a.x} ${g - r}`
    d += ` C ${a.x} ${g + r * 0.2}, ${b.x} ${g - r * 0.2}, ${b.x} ${g + r}`
    d += ` L ${b.x} ${b.y}`
  }
  return d
}

// ─── Componente ───
export function Experience() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"
  const t = (v: Lang) => (isEs ? v.es : v.en)
  const accentText = "var(--accent)"

  const [route, setRoute] = useState<RouteId>("dev")
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [geo, setGeo] = useState<{ d: string; w: number; h: number }>({ d: "", w: 0, h: 0 })

  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  const { stops, since, until } = ROUTES[route]
  const totalMonths = monthsBetween(since, until)
  const devMonths = monthsBetween(ROUTES.dev.since)
  const healthMonths = monthsBetween(ROUTES.health.since, ROUTES.health.until)

  // Medir los hitos y construir el camino serpenteante
  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const box = el.getBoundingClientRect()
    const rel = (r: DOMRect) => ({ x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top })
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".route-node")).map(n => rel(n.getBoundingClientRect()))
    const stopsEls = Array.from(el.querySelectorAll<HTMLElement>(".route-stop"))
    const gaps = stopsEls.slice(0, -1).map((s, i) => {
      const bottom = s.getBoundingClientRect().bottom - box.top
      const nextTop = stopsEls[i + 1].getBoundingClientRect().top - box.top
      return (bottom + nextTop) / 2
    })
    if (!nodes.length) return
    setGeo({ d: buildPath(nodes, gaps), w: box.width, h: box.height })
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(() => measure())
    if (track.current) ro.observe(track.current)
    return () => ro.disconnect()
  }, [measure, route, locale, open])

  useGSAP(
    () => {
      if (!geo.d) return
      const scroller = document.querySelector<HTMLElement>("#portfolio-scroller") ?? window
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trail = root.current?.querySelector<SVGPathElement>(".route-trail")
        const glow = root.current?.querySelector<SVGPathElement>(".route-glow")
        const comet = root.current?.querySelector<SVGGElement>(".route-comet")
        if (!trail || !glow || !comet) return
        const len = trail.getTotalLength()

        gsap.set([trail, glow], { strokeDasharray: len, strokeDashoffset: len })

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: track.current, scroller, start: "top 70%", end: "bottom 65%", scrub: 0.8 },
        })
        tl.to([trail, glow], { strokeDashoffset: 0 }, 0)
          .to(comet, { motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5] } }, 0)

        // Pulso suave del cometa
        gsap.to(".route-comet-halo", { scale: 1.6, opacity: 0, transformOrigin: "50% 50%", repeat: -1, duration: 1.4, ease: "power1.out" })

        gsap.utils.toArray<HTMLElement>(".route-stop").forEach((stop, i) => {
          const card = stop.querySelector(".route-card")
          const pieces = stop.querySelectorAll(".route-reveal")
          const fromX = stop.dataset.side === "left" ? -50 : 50

          gsap.timeline({
            scrollTrigger: {
              trigger: stop,
              scroller,
              start: "top 62%",
              toggleActions: "play play play reverse",
              onEnter: () => stop.classList.add("is-reached"),
              onLeaveBack: () => stop.classList.remove("is-reached"),
            },
          })
            .from(stop.querySelector(".route-node"), { scale: 0, rotate: -120, duration: 0.55, ease: "back.out(2.2)" })
            .from(card, { x: fromX, y: 20, opacity: 0, rotate: fromX > 0 ? 2 : -2, duration: 0.7, ease: "power3.out" }, "<0.05")
            .from(pieces, { y: 12, opacity: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }, "<0.2")

          // Flotación sutil distinta en cada card para que la ruta se sienta viva
          gsap.to(card, { y: "+=6", duration: 2.4 + i * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 })
        })

        // Entrada al cambiar de ruta
        gsap.from(".route-stop", { opacity: 0, duration: 0.4, stagger: 0.05 })
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.current?.querySelectorAll(".route-stop").forEach(s => s.classList.add("is-reached"))
      })
    },
    { scope: root, dependencies: [geo.d, route, locale], revertOnUpdate: true },
  )

  const toggleBullets = (id: string) => {
    const el = root.current?.querySelector<HTMLElement>(`[data-extra="${id}"]`)
    const willOpen = !open[id]
    if (!el) return setOpen(o => ({ ...o, [id]: willOpen }))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const done = () => {
      setOpen(o => ({ ...o, [id]: willOpen }))
      ScrollTrigger.refresh()
    }
    if (willOpen) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: reduce ? 0 : 0.45, ease: "power2.out", onComplete: done })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: reduce ? 0 : 0.3, ease: "power2.in", onComplete: done })
    }
  }

  const switchRoute = (next: RouteId) => {
    if (next === route) return
    setOpen({})
    setRoute(next)
  }

  return (
    <section id="experience" ref={root} className="portfolio-section">
      <SectionHeader index="03" label={isEs ? "EXPERIENCIA" : "EXPERIENCE"} title={isEs ? "Trayectoria" : "Work history"} />

      {/* Selector de ruta */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label={isEs ? "Elegir ruta" : "Choose route"} className="route-switch">
          {(["dev", "health"] as const).map(id => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={route === id}
              onClick={() => switchRoute(id)}
              className={`route-switch-btn ${route === id ? "is-on" : ""}`}
            >
              {id === "dev" ? <Code2 size={13} /> : <HeartPulse size={13} />}
              {id === "dev" ? (isEs ? "Ruta desarrollo" : "Dev route") : (isEs ? "Ruta salud" : "Health route")}
              <span className="route-switch-count">{formatDuration(id === "dev" ? devMonths : healthMonths, isEs)}</span>
            </button>
          ))}
        </div>
        <p className="m-0 text-[11px]" style={{ color: "var(--text-muted)" }}>
          {route === "dev"
            ? isEs ? `${formatDuration(totalMonths, true)} construyendo software` : `${formatDuration(totalMonths, false)} building software`
            : isEs ? `${formatDuration(totalMonths, true)} en el área de la salud` : `${formatDuration(totalMonths, false)} in healthcare`}
        </p>
      </div>

      {/* Ruta */}
      <div ref={track} className="route-track relative" key={route}>
        {geo.d && (
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
            aria-hidden
          >
            <defs>
              <filter id="route-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <radialGradient id="route-comet-grad">
                <stop offset="0%" stopColor="var(--route-trail)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--route-trail)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Camino base */}
            <path d={geo.d} className="route-base" fill="none" />
            {/* Estela de luz */}
            <path d={geo.d} className="route-glow" fill="none" filter="url(#route-blur)" />
            <path d={geo.d} className="route-trail" fill="none" />
            {/* Cometa */}
            <g className="route-comet">
              <circle r="14" fill="url(#route-comet-grad)" className="route-comet-halo" />
              <circle r="5" className="route-comet-core" />
            </g>
          </svg>
        )}

        {stops.map((stop, i) => {
          const side = i % 2 === 0 ? "left" : "right" // lado donde va el nodo
          const Icon = stop.icon
          const visible = stop.bullets?.slice(0, 2) ?? []
          const extra = stop.bullets?.slice(2) ?? []
          const isOpen = !!open[stop.id]
          const duration = stop.from ? formatDuration(monthsBetween(stop.from, stop.to), isEs) : null

          return (
            <div key={stop.id} data-side={side} className={`route-stop route-stop--${side} route-stop--${stop.kind}`}>
              <div className="route-node" aria-hidden>
                <Icon size={16} />
              </div>

              <article className="route-card">
                {stop.kind === "now" ? (
                  <div className="route-reveal flex flex-col gap-2">
                    <span className="route-badge self-start">
                      <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                      {t(stop.period)}
                    </span>
                    <p className="m-0 text-[15px] font-extrabold" style={{ color: "var(--text)" }}>
                      {route === "dev"
                        ? isEs ? `${formatDuration(devMonths, true)} como desarrollador` : `${formatDuration(devMonths, false)} as a developer`
                        : isEs ? `${formatDuration(healthMonths, true)} de experiencia en salud` : `${formatDuration(healthMonths, false)} of healthcare experience`}
                    </p>
                    <p className="m-0 text-xs" style={{ color: "var(--text-muted)" }}>{t(stop.role)}</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="route-reveal route-badge">{t(stop.period)}</span>
                      {duration && <span className="route-reveal tag-pill">{duration}</span>}
                      {stop.kind === "edu" && <span className="route-reveal tag-pill">{isEs ? "Título" : "Degree"}</span>}
                    </div>

                    <h3 className="route-reveal m-0 mt-3 text-lg font-extrabold" style={{ color: "var(--text)" }}>{stop.title}</h3>
                    <p className="route-reveal m-0 mt-1 text-xs italic" style={{ color: accentText }}>{t(stop.role)}</p>
                    {stop.place && (
                      <p className="route-reveal m-0 mt-1 flex items-center gap-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                        <MapPin size={11} /> {t(stop.place)}
                      </p>
                    )}

                    {visible.length > 0 && (
                      <ul className="m-0 mt-4 flex list-none flex-col gap-1.5 p-0">
                        {visible.map(b => <li key={b.es} className="route-reveal xp-bullet">{t(b)}</li>)}
                      </ul>
                    )}

                    {extra.length > 0 && (
                      <>
                        <div data-extra={stop.id} className="overflow-hidden" style={isOpen ? undefined : { height: 0, opacity: 0 }}>
                          <ul className="m-0 mt-1.5 flex list-none flex-col gap-1.5 p-0">
                            {extra.map(b => <li key={b.es} className="xp-bullet">{t(b)}</li>)}
                          </ul>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleBullets(stop.id)}
                          aria-expanded={isOpen}
                          className="route-reveal mt-3 inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[11px] font-bold tracking-wider"
                          style={{ color: accentText, fontFamily: "inherit" }}
                        >
                          {isOpen ? (isEs ? "[ VER MENOS ]" : "[ SHOW LESS ]") : (isEs ? `[ +${extra.length} LOGROS ]` : `[ +${extra.length} MORE ]`)}
                          <ChevronDown size={13} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                        </button>
                      </>
                    )}

                    {stop.techs && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {stop.techs.map(tech => <span key={tech} className="route-reveal tag-pill">{tech}</span>)}
                      </div>
                    )}
                  </>
                )}
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}
