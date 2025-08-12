"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-gradient-to-t from-background/80 to-background py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-bg opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2 md:items-start"
          >
            <Link href="/" className="text-xl font-bold">
              <span className="text-gradient font-bold text-2xl">ANKIT.DEV</span>
            </Link>
            <p className="text-sm text-muted-foreground">&copy; {currentYear} Ankit Pal. All rights reserved.</p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-8"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Navigation</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                          <Link href="#technical" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          Technical
        </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </motion.nav>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Designed and built with <span className="text-primary">♥</span> by Ankit Pal
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
