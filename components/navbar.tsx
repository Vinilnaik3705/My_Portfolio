'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'

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
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(latest > prev && latest > 160)
    setScrolled(latest > 50)
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
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        animate={{ y: hidden && !open ? '-110%' : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass background on scroll */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/5 bg-background/60 backdrop-blur-xl md:rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: '9999px' }}
        />
        
        <motion.a
          href="#top"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 font-display text-lg font-semibold tracking-tight"
          aria-label="Back to top"
        >
          VN<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">.</span>
        </motion.a>

        <nav
          aria-label="Main navigation"
          className="relative z-10 hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-xl md:flex"
        >
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative z-10">{link.label}</span>
              <motion.span
                className="absolute inset-0 bg-accent/10"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 77, 0, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="hidden rounded-full bg-gradient-to-r from-accent to-orange-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40 md:block"
          >
            Let&apos;s talk
          </motion.a>
          <motion.button
            onClick={() => setOpen((o) => !o)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl md:hidden"
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
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background/95 backdrop-blur-3xl px-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-[100px]"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            
            <nav aria-label="Mobile navigation" className="relative z-10 flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 10 }}
                  className="font-display text-4xl font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">.</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
