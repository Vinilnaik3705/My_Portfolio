'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
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
  const rotateX = useTransform(mouseY, [-500, 500], [5, -5])
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5])
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
  }
  
  const line = (text: string, delay: number, className = '') => (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '110%', rotate: -5 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  )

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-12"
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-teal-500/15 to-cyan-500/15 blur-[100px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      {/* Enhanced background grid with glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 77, 0, 0.4) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, #232326 1px, transparent 0)
          `,
          backgroundSize: '48px 48px, 48px 48px',
          backgroundPosition: '0 0, 24px 24px',
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-accent/40"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * 800,
            opacity: 0,
          }}
          animate={{
            y: [null, -100, -200],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'easeOut',
          }}
          style={{ left: `${10 + i * 15}%` }}
        />
      ))}

      {/* Portrait with 3D effect */}
      <motion.div
        style={mounted ? { y: imageY, opacity, rotateX, rotateY } : undefined}
        className="absolute right-6 top-24 w-40 overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-orange-500/10 sm:w-52 md:right-12 md:top-28 md:w-72 lg:w-80"
        initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 shimmer" />
        <Image
          src="/images/vin3-hero.jpeg"
          alt="Portrait of Vinil Naik"
          width={640}
          height={800}
          priority
          className="h-auto w-full object-cover grayscale-[0.15] transition-all duration-700 hover:grayscale-0"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/90 to-background/40 px-3 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Hyderabad, IN
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={mounted ? { y: textY, opacity } : undefined}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-6 flex items-center gap-3"
        >
          <motion.span 
            className="h-px w-10 bg-gradient-to-r from-accent to-transparent"
            animate={{ width: [0, 40] }}
            transition={{ duration: 1, delay: 1 }}
          />
          <span className="text-sm text-muted-foreground">
            Full Stack Developer — <span className="text-gradient font-semibold">Agentic AI &amp; RAG Systems</span>
          </span>
        </motion.div>

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            className="group flex w-fit items-center gap-3 rounded-full border border-border/50 bg-white/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-accent/10"
          >
            Scroll to explore
            <motion.span 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all group-hover:border-accent group-hover:text-accent group-hover:shadow-lg group-hover:shadow-accent/20"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 1v12M2 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
