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
  const row = [...items, ...items, ...items]

  return (
    <div
      className="relative overflow-hidden border-y border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent py-8"
      aria-label="Technologies"
    >
      {/* Glow effects */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      
      <motion.div
        className="flex w-max gap-16 pr-16"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="flex items-center gap-16 whitespace-nowrap font-display text-2xl font-medium text-muted-foreground/70 transition-colors hover:text-accent md:text-3xl"
          >
            {item}
            <motion.span 
              className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-orange-400"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity 
              }}
              aria-hidden="true" 
            />
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
