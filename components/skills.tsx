'use client'

import { Reveal, SectionLabel } from './reveal'

const groups = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'Python', 'C++', 'Java', 'TypeScript', 'SQL'],
  },
  {
    title: 'Full Stack',
    skills: [
      'Next.js',
      'React.js',
      'Node.js',
      'FastAPI',
      'Spring Framework',
      'REST APIs',
      'MongoDB',
      'PostgreSQL',
    ],
  },
  {
    title: 'AI & Agents',
    skills: [
      'Agentic AI Development',
      'RAG Systems',
      'Gen AI',
      'AI Agents',
      'n8n',
      'PyTorch',
      'Hugging Face',
    ],
  },
  {
    title: 'Engineering',
    skills: [
      'Docker',
      'Systems Design',
      'Data Modeling',
      'Problem Solving',
      'Git & GitHub',
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="px-6 py-28 md:px-12 md:py-36">
      <SectionLabel index="03" title="Capabilities" />

      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <div className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-muted md:p-10">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {group.title}
                </h3>
                <span className="font-display text-sm text-accent">
                  0{i + 1}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
