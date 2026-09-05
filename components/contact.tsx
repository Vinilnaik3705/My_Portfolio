'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, WordReveal } from './reveal'

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vinilnaik' },
  { label: 'GitHub', href: 'https://github.com/Vinilnaik3705' },
  { label: 'Hugging Face', href: 'https://huggingface.co/Vinil05' },
]

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden border-t border-white/5 px-6 pb-10 pt-28 md:px-12 md:pt-36"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-[80px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 blur-[80px]"
        animate={{
          x: [0, -40, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div style={{ y }} className="relative z-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <motion.span 
              className="h-px w-10 bg-gradient-to-r from-accent to-transparent"
              animate={{ width: [0, 40] }}
              transition={{ duration: 1 }}
            />
            <span className="text-gradient font-medium">Open to work — Recruiters welcome</span>
          </p>
        </Reveal>

        <h2 className="font-display text-[11vw] font-bold leading-[0.95] tracking-tight md:text-[8vw]">
          <WordReveal text="LET'S BUILD" />
          <br />
          <WordReveal text="SOMETHING" delay={0.15} className="text-stroke" />
          <br />
          <WordReveal text="TOGETHER" delay={0.3} />
        </h2>

        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.2}>
            <motion.a
              href="https://www.linkedin.com/in/vinilnaik"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 77, 0, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-accent to-orange-500 px-8 py-4 font-medium text-white shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40"
            >
              Connect on LinkedIn
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M3 13L13 3M13 3H5M13 3v8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>
          </Reveal>

          <Reveal delay={0.3}>
            <nav aria-label="Social links" className="flex gap-8">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: 'var(--color-accent)' }}
                  className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors"
                >
                  {social.label}
                </motion.a>
              ))}
            </nav>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col gap-2 border-t border-white/5 pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Vinil Naik Dharavath. All rights
            reserved.
          </p>
          <p>Designed &amp; engineered with care — Greater Hyderabad Area, IN</p>
        </div>
      </motion.div>
    </section>
  )
}
