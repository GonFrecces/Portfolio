"use client"

import { motion } from "framer-motion"
import { MapPin, Briefcase, GraduationCap, Layers } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { SectionHeader } from "@/components/portfolio/section-header"

const cellVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" } }),
}

export function About() {
  const { theme, locale } = useTheme()
  const isEs = locale === "es"
  const accentText = theme === "dark" ? "var(--accent)" : "var(--text)"

  const facts = [
    { icon: Briefcase, label: isEs ? "Experiencia" : "Experience", value: isEs ? "4+ años en desarrollo" : "4+ years building software" },
    { icon: Layers, label: isEs ? "Enfoque" : "Focus", value: "Backend · Frontend · Cloud" },
    { icon: GraduationCap, label: isEs ? "Formación" : "Education", value: isEs ? "Analista Programador" : "Programmer Analyst" },
    { icon: MapPin, label: isEs ? "Ubicación" : "Location", value: "Santiago, Chile" },
  ]

  const paragraphs = isEs
    ? [
        "Desarrollador Full Stack con formación técnica en salud e informática, lo que me permite abordar problemas con una visión analítica y orientada a resultados.",
        "He construido aplicaciones escalables, integraciones y sistemas de gestión complejos, con una base sólida en frontend y backend y foco en buenas prácticas.",
        "Entiendo tanto la lógica de negocio como la experiencia de usuario, y busco seguir creciendo en el desarrollo de productos digitales.",
      ]
    : [
        "Full Stack Developer with a technical background in healthcare and computing, which lets me approach problems analytically and with a focus on outcomes.",
        "I have built scalable applications, integrations and complex management systems, with a solid foundation in frontend and backend and a focus on good practices.",
        "I understand both business logic and user experience, and I want to keep growing in digital product development.",
      ]

  return (
    <section id="about" className="portfolio-section">
      <SectionHeader index="01" label={isEs ? "SOBRE MI" : "ABOUT"} title={isEs ? "Quién soy" : "Who I am"} />

      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <motion.div custom={0} variants={cellVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <CardSpotlight className="h-full">
            <div className="flex h-full flex-col gap-4 p-6 md:p-8">
              <span className="text-5xl font-black leading-none" style={{ color: accentText }}>&ldquo;</span>
              {paragraphs.map(p => (
                <p key={p} className="m-0 text-[14px] leading-relaxed" style={{ color: "var(--text)" }}>{p}</p>
              ))}
            </div>
          </CardSpotlight>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {facts.map((f, i) => (
            <motion.div key={f.label} custom={i + 1} variants={cellVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
              <CardSpotlight className="h-full">
                <div className="flex items-center gap-4 p-4">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ border: "1px solid var(--border-hover)", background: "var(--bg)" }}
                  >
                    <f.icon size={15} style={{ color: "var(--text)" }} />
                  </div>
                  <div>
                    <p className="m-0 text-[10px] font-bold tracking-[0.12em]" style={{ color: "var(--text-muted)" }}>{f.label.toUpperCase()}</p>
                    <p className="m-0 mt-0.5 text-[13px] font-bold" style={{ color: "var(--text)" }}>{f.value}</p>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
