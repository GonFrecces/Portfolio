"use client"

import * as React from "react"

type Theme = "light" | "dark"
type Locale = "es" | "en"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mode: "portfolio" | "reading"
  toggleMode: () => void
  locale: Locale
  toggleLocale: () => void
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  mode: "portfolio",
  toggleMode: () => {},
  locale: "es",
  toggleLocale: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("light")
  const [mode, setMode] = React.useState<"portfolio" | "reading">("portfolio")
  const [locale, setLocale] = React.useState<Locale>("es")

  React.useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null
    if (saved) setTheme(saved)

    const savedLocale = localStorage.getItem("portfolio-locale") as Locale | null
    if (savedLocale === "es" || savedLocale === "en") {
      setLocale(savedLocale)
    }
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("portfolio-theme", theme)
  }, [theme])

  React.useEffect(() => {
    localStorage.setItem("portfolio-locale", locale)
    document.documentElement.lang = locale
  }, [locale])

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"))
  const toggleMode = () => setMode(m => (m === "portfolio" ? "reading" : "portfolio"))
  const toggleLocale = () => setLocale(l => (l === "es" ? "en" : "es"))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode, toggleMode, locale, toggleLocale }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return React.useContext(ThemeContext)
}
