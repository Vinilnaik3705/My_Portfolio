'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function SectionLabel({
  index,
  title,
}: {
  index: string
  title: string
}) {
  return (
    <Reveal className="mb-12 flex items-center gap-4 md:mb-16">
      <span className="font-display text-sm text-accent">{index}</span>
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </span>
    </Reveal>
  )
}
