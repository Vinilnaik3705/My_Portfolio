'use client'

import { Reveal, SectionLabel } from './reveal'

const education = [
  {
    period: '2023 — 2027',
    title: 'National Institute of Technology, Jamshedpur',
    subtitle: 'Bachelor of Technology — Computer Science',
    detail: 'JavaScript, Python, and core CS fundamentals.',
  },
  {
    period: '2022 — 2023',
    title: 'Pinegrove Junior College',
    subtitle: 'Class XII',
    detail: 'Pre-university education.',
  },
]

const certifications = [
  {
    period: 'Jun 2026',
    title: 'Software Engineering Job Simulation',
    subtitle: 'Wells Fargo — Forage',
    detail: 'Java, Spring Framework, Systems Design, Data Modeling.',
  },
  {
    period: 'May 2026',
    title: 'Make Agentic AI Work For You',
    subtitle: 'IBM',
    detail: 'RAG, AI Agents, Gen AI, Problem Solving.',
  },
]

function Timeline({
  heading,
  items,
}: {
  heading: string
  items: typeof education
}) {
  return (
    <div>
      <Reveal>
        <h3 className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {heading}
        </h3>
      </Reveal>
      <ol className="flex flex-col">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.1}>
            <li className="group relative border-l border-border py-6 pl-8">
              <span
                className="absolute -left-[5px] top-8 h-[9px] w-[9px] rounded-full border border-border bg-background transition-colors duration-300 group-hover:border-accent group-hover:bg-accent"
                aria-hidden="true"
              />
              <p className="text-xs uppercase tracking-[0.25em] text-accent">
                {item.period}
              </p>
              <h4 className="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
                {item.title}
              </h4>
              <p className="mt-1 text-sm text-foreground/80">{item.subtitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

export function Journey() {
  return (
    <section id="journey" className="px-6 py-28 md:px-12 md:py-36">
      <SectionLabel index="04" title="Education & Certifications" />
      <div className="grid gap-16 md:grid-cols-2">
        <Timeline heading="Education" items={education} />
        <Timeline heading="Licenses & Certifications" items={certifications} />
      </div>
    </section>
  )
}
