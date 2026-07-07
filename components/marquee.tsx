'use client'

import { motion } from 'framer-motion'

const items = [
  'Next.js',
  'React',
  'Python',
  'Agentic AI',
  'n8n',
  'FastAPI',
  'PyTorch',
  'RAG Systems',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Docker',
]

export function Marquee() {
  const row = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden border-y border-border py-6"
      aria-label="Technologies"
    >
      <motion.div
        className="flex w-max gap-12 pr-12"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-medium text-muted-foreground md:text-3xl"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
