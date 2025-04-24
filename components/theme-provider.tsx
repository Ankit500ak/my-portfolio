"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({
  children,
  themes = ["light", "dark", "golden", "black", "neon", "cyberpunk"],
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider themes={themes} {...props}>
      {children}
    </NextThemesProvider>
  )
}
