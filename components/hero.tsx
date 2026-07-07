'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  const line = (text: string, delay: number, className = '') => (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  )

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-12"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #232326 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Portrait */}
      <motion.div
        style={mounted ? { y: imageY, opacity } : undefined}
        className="absolute right-6 top-24 w-40 overflow-hidden rounded-xl border border-border sm:w-52 md:right-12 md:top-28 md:w-72 lg:w-80"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/vin3-hero.jpeg"
          alt="Portrait of Vinil Naik"
          width={640}
          height={800}
          priority
          className="h-auto w-full object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/70 px-3 py-2 backdrop-blur-sm">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Hyderabad, IN
          </span>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        </div>
      </motion.div>

      <motion.div
        style={mounted ? { y: textY, opacity } : undefined}
        className="relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-6 flex items-center gap-3 text-sm text-muted-foreground"
        >
          <span className="h-px w-10 bg-accent" />
          Full Stack Developer — Agentic AI &amp; RAG Systems
        </motion.p>

        <h1 className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight md:text-[10vw]">
          {line('VINIL', 1.15)}
          {line('NAIK', 1.28, 'text-stroke')}
        </h1>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="max-w-md text-pretty leading-relaxed text-muted-foreground"
          >
            Final year B.Tech CS at NIT Jamshedpur. I design and engineer
            full-stack products and autonomous AI systems — from trading
            simulators to end-to-end recruitment agents.
          </motion.p>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            href="#work"
            className="group flex w-fit items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground"
          >
            Scroll to explore
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:text-accent">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path
                  d="M7 1v12M2 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
