'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useInView,
} from 'framer-motion'

const HUD_CARDS = [
  {
    title: 'AGENTIC PIPELINE',
    rows: [
      ['STACK', 'FASTAPI + N8N'],
      ['MODEL', 'GPT-4O-MINI'],
      ['STATUS', 'AUTONOMOUS'],
    ],
    pos: 'left-6 top-[14%] md:left-12',
  },
  {
    title: 'RAG SYSTEMS',
    rows: [
      ['EMBEDS', 'SENTENCE-TFMR'],
      ['RETRIEVAL', 'SEMANTIC'],
      ['CERT', 'IBM — 2026'],
    ],
    pos: 'right-6 top-[22%] md:right-12',
  },
  {
    title: 'MARKET SIGNAL',
    rows: [
      ['MODEL', 'FINBERT FINE-TUNE'],
      ['DATASET', '130K+ HEADLINES'],
      ['ACCURACY', '82.3% / F1 0.768'],
    ],
    pos: 'left-6 bottom-[16%] md:left-16',
  },
  {
    title: 'FULL STACK',
    rows: [
      ['FRONTEND', 'REACT / NEXT.JS'],
      ['BACKEND', 'NODE / FASTAPI'],
      ['DATA', 'POSTGRES / MONGO'],
    ],
    pos: 'right-6 bottom-[10%] md:right-16',
  },
]

const STREAM =
  'UPI,345678912345,412345678901,AGENT_RUN_884,resume.match=0.91,interview.scheduled,onboarding.trigger,AQI_HYD=134,signal=BULLISH,f1=0.768,kryonex.fill@99828,latency=42ms,'

function RedactedWord({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-30%' })

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.55 }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 bg-accent"
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.83, 0, 0.17, 1] }}
        style={{ transformOrigin: 'right' }}
      />
    </span>
  )
}

export function Signal() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const scanned = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scannedText = useMotionTemplate`${useTransform(scanned, (v) => Math.round(v))}%`
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const portraitOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.45])

  return (
    <section
      ref={ref}
      id="signal"
      aria-label="Capabilities signal"
      className="relative overflow-hidden bg-[#07100e] py-32 md:py-44"
    >
      {/* Data stream background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col justify-between overflow-hidden py-8 opacity-[0.13]"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="animate-stream whitespace-nowrap font-mono text-xs text-signal"
            style={{
              animationDuration: `${40 + i * 14}s`,
              animationDirection: i % 2 ? 'reverse' : 'normal',
            }}
          >
            {STREAM.repeat(6)}
          </div>
        ))}
      </div>

      {/* Dim portrait */}
      <motion.div
        aria-hidden="true"
        style={{ scale: portraitScale, opacity: portraitOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/images/ai-portrait-mono.png"
          alt=""
          fill
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#07100e]/40" />
      </motion.div>

      {/* HUD annotation cards */}
      {HUD_CARDS.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute hidden font-mono text-[10px] leading-relaxed tracking-wider lg:block ${card.pos}`}
        >
          <p className="flex items-center gap-2 text-signal">
            <span className="inline-block size-1.5 bg-signal" />
            {card.title}
          </p>
          <div className="mt-1.5 border-l border-signal/30 pl-3">
            {card.rows.map(([k, v]) => (
              <p key={k} className="flex gap-3">
                <span className="w-20 text-foreground/40">{k}</span>
                <span className="text-foreground/80">{v}</span>
              </p>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Scan counter */}
      <div className="absolute right-6 top-8 text-right font-mono md:right-12">
        <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">
          Signal scanned
        </p>
        <motion.p className="font-display text-4xl font-bold text-signal md:text-5xl">
          {scannedText}
        </motion.p>
      </div>

      {/* Headline */}
      <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-center px-6 md:px-12">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
          {'// Vinil Naik — capability scan'}
        </p>
        <h2 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          I automate <RedactedWord>the pipeline</RedactedWord> so humans only
          make <RedactedWord>the decisions</RedactedWord> that matter.
        </h2>
        <p className="mt-8 font-mono text-sm text-foreground/50">
          Agentic AI sees the rest.
        </p>
      </div>
    </section>
  )
}
