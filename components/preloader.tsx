'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const greetings = ['Hello', 'Namaste', 'Bonjour', 'Hola', 'Vinil Naik']

export function Preloader() {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (index >= greetings.length - 1) {
      const t = setTimeout(() => setDone(true), 650)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIndex((i) => i + 1), 280)
    return () => clearTimeout(t)
  }, [index])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-display text-3xl font-medium tracking-tight md:text-5xl"
          >
            <span className="mr-3 inline-block h-2.5 w-2.5 rounded-full bg-accent align-middle" />
            {greetings[index]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
