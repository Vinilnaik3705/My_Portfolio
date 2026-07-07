'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(latest > prev && latest > 160)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
        animate={{ y: hidden && !open ? '-110%' : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight"
          aria-label="Back to top"
        >
          VN<span className="text-accent">.</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 rounded-full border border-border bg-background/70 px-8 py-3 backdrop-blur-md md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground md:block"
          >
            Let&apos;s talk
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-background/70 backdrop-blur-md md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
              className="block h-px w-5 bg-foreground"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
              className="block h-px w-5 bg-foreground"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-5xl font-semibold tracking-tight"
                >
                  {link.label}
                  <span className="text-accent">.</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
