'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const SENTENCE: { word: string; em?: boolean }[] = [
  { word: 'The' },
  { word: 'architect' },
  { word: 'sees' },
  { word: 'what' },
  { word: 'is' },
  { word: 'hidden.', em: true },
  { word: 'The' },
  { word: 'engineer' },
  { word: 'ensures' },
  { word: 'that' },
  { word: 'it' },
  { word: 'stands.', em: true },
  { word: 'The' },
  { word: 'agent' },
  { word: 'acts' },
  { word: 'with' },
  { word: 'intention.', em: true },
  { word: 'I' },
  { word: 'bring' },
  { word: 'them' },
  { word: 'all' },
  { word: 'to' },
  { word: 'code', em: true },
  { word: 'that' },
  { word: 'thinks,' },
  { word: 'learns,' },
  { word: 'and' },
  { word: 'ships.', em: true },
]

function Word({
  word,
  em,
  index,
  total,
  progress,
}: {
  word: string
  em?: boolean
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.14, 1])

  return (
    <motion.span
      style={{ opacity }}
      className={em ? 'italic text-accent' : undefined}
    >
      {word}{' '}
    </motion.span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  })

  return (
    <section
      ref={ref}
      id="manifesto"
      aria-label="Manifesto"
      className="relative bg-cream text-cream-foreground"
    >
      <div className="sticky top-0 flex min-h-screen flex-col justify-center px-6 py-24 md:px-12">
        <div className="mb-10 flex items-center gap-4">
          <span className="font-display text-sm text-accent">**</span>
          <span className="text-xs uppercase tracking-[0.3em] text-cream-foreground/50">
            Philosophy
          </span>
        </div>
        <p className="font-display max-w-5xl text-3xl font-medium leading-snug tracking-tight text-pretty md:text-5xl lg:text-6xl">
          {SENTENCE.map((w, i) => (
            <Word
              key={i}
              word={w.word}
              em={w.em}
              index={i}
              total={SENTENCE.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
        <span className="sr-only">
          The architect sees what is hidden. The engineer ensures that it
          stands. The agent acts with intention. I bring them all to code that
          thinks, learns, and ships.
        </span>
      </div>
      {/* Scroll runway that drives the word reveal */}
      <div aria-hidden="true" className="h-[120vh]" />
    </section>
  )
}
