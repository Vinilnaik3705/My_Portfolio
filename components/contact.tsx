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
      className="relative overflow-hidden border-t border-border px-6 pb-10 pt-28 md:px-12 md:pt-36"
    >
      <motion.div style={{ y }}>
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-px w-10 bg-accent" />
            Open to work — Recruiters welcome
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
            <a
              href="https://www.linkedin.com/in/vinilnaik"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 rounded-full bg-foreground px-8 py-4 font-medium text-background transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              Connect on LinkedIn
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 13L13 3M13 3H5M13 3v8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>

          <Reveal delay={0.3}>
            <nav aria-label="Social links" className="flex gap-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
                >
                  {social.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
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
