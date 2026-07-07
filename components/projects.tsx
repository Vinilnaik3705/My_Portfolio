'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from './reveal'

const projects = [
  {
    index: '01',
    title: 'Autonomous Recruitment Agent',
    period: 'Jan 2026 — Present',
    description:
      'End-to-end agentic AI recruitment pipeline: semantic resume matching with Sentence Transformers + GPT-4o-mini, automated interview scheduling via Google Calendar, structured feedback collection, and onboarding triggers — with minimal human intervention.',
    stack: ['FastAPI', 'PostgreSQL', 'n8n', 'GPT-4o-mini', 'React'],
    tag: 'Agentic AI',
  },
  {
    index: '02',
    title: 'Kryonex',
    period: 'Full Stack',
    description:
      'A full-stack trading simulator bridging professional analysis and intuitive design. Real-time cryptocurrency markets, TradingView Lightweight Charts, and simulated trades without financial risk — in a sleek dark UI with Framer Motion transitions.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    tag: 'Fintech',
  },
  {
    index: '03',
    title: 'AQIfy',
    period: 'Jun — Jul 2026',
    description:
      'AI-powered urban air quality forecasting and mitigation platform for major Indian cities. Gemini-powered multi-agent intelligence, Gradient Boosting ML, live hyperlocal source attributions, policy simulations, and regional-language health advisories.',
    stack: ['FastAPI', 'React', 'Gemini', 'Docker', 'REST APIs'],
    tag: 'AI / ML',
  },
  {
    index: '04',
    title: 'Market Trend Predictor',
    period: 'Jun 2026',
    description:
      'Fine-tuned FinBERT model classifying financial news headlines as Bullish, Bearish, or Neutral. Trained on 130k+ headlines combining Twitter financial news and yfinance-labeled analyst reports — 82.3% accuracy and 0.768 macro F1.',
    stack: ['Python', 'PyTorch', 'Hugging Face', 'FinBERT'],
    tag: 'Deep Learning',
  },
]

function ProjectRow({
  project,
  i,
}: {
  project: (typeof projects)[number]
  i: number
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [open, setOpen] = useState(false)

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-border"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-6 py-8 text-left md:py-10"
      >
        <span className="font-display text-sm text-accent">{project.index}</span>
        <h3 className="flex-1 font-display text-2xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
          {project.title}
        </h3>
        <span className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground md:block">
          {project.tag}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:text-accent"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="flex flex-col gap-6 pb-10 pl-10 md:flex-row md:justify-between md:pl-14">
          <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              {project.period}
            </span>
            <div className="flex max-w-xs flex-wrap gap-2 md:justify-end">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.li>
  )
}

export function Projects() {
  return (
    <section id="work" className="px-6 py-28 md:px-12 md:py-36">
      <SectionLabel index="01" title="Selected Work" />
      <ul className="border-t border-border">
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} i={i} />
        ))}
      </ul>
    </section>
  )
}
