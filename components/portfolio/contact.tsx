"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Copy, Check, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const contactPills = [
  { icon: Mail, label: "claudio.a.vargas91@gmail.com", href: "mailto:claudio.a.vargas91@gmail.com" },
  { icon: Phone, label: "+56 951 211 558", href: "tel:+56951211558" },
  { icon: Github, label: "GonFrecces", href: "https://github.com/GonFrecces" },
  { icon: Linkedin, label: "claudio-vargas-zapata", href: "https://www.linkedin.com/in/claudio-vargas-zapata/" },
  { icon: MapPin, label: "Santiago, Chile", href: "#" },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const email = "claudio.a.vargas91@gmail.com"
  const { theme, locale } = useTheme()
  const isEs = locale === "es"

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="contact" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      {/* Editorial heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "48px" }}
      >
        <p style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "0.15em", fontWeight: 700, margin: "0 0 16px 0" }}>
          {isEs ? "05 - CONTACTO" : "05 - CONTACT"}
        </p>

        <div style={{ lineHeight: 0.95, marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              fontWeight: 900,
              WebkitTextStroke: "2px var(--text)",
              color: "transparent",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {isEs ? "CONSTRUYAMOS" : "LET'S BUILD"}
          </div>
          <div
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              fontWeight: 900,
              /* WebkitTextStroke: theme === "dark" ? "transparent" : "2px var(--text)", */
              color: theme === "dark" ? "var(--accent)" : "var(--text)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {isEs ? "ALGO." : "SOMETHING."}
          </div>
        </div>

        <p
          style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            maxWidth: "400px",
            margin: "0 auto 24px",
            lineHeight: 1.7,
          }}
        >
          {isEs
            ? "Abierto a roles full-time, proyectos freelance y colaboraciones interesantes."
            : "Open to full-time roles, freelance projects and interesting collaborations."}
        </p>

        {/* Email + copy */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 20px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            background: "var(--surface)",
          }}
        >
          <a
            href={`mailto:${email}`}
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text)",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            {email}
          </a>

          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isEs ? "Copiar email" : "Copy email"}
            style={{
              width: 30,
              height: 30,
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: copied ? "var(--accent)" : "var(--bg)",
              color: copied ? "#0c0c0c" : "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Contact pills row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {contactPills.map(pill => (
          <motion.a
            key={pill.label}
            href={pill.href}
            target={pill.href.startsWith("http") ? "_blank" : undefined}
            rel={pill.href.startsWith("http") ? "noopener noreferrer" : undefined}
            whileHover={{ scale: 1.04, borderColor: "var(--accent)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-muted)",
              fontSize: "12px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
          >
            <pill.icon size={13} />
            {pill.label}
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          marginTop: "64px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
          © 2025 Claudio Vargas
        </span>
        <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
          {isEs ? "Hecho con Next.js · TypeScript · Framer Motion" : "Built with Next.js · TypeScript · Framer Motion"}
        </span>
      </motion.div>
      <style>{`
        @media (width > 1000px) {
          #contact {
            padding-top: 120px !important;
            
          }
        }
      `}</style>
    </section>
    
  )
}
