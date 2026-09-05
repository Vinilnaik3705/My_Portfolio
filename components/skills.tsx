'use client'

import { Reveal, SectionLabel } from './reveal'
import { motion } from 'framer-motion'

const groups = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'Python', 'C++', 'Java', 'TypeScript', 'SQL'],
    gradient: 'from-orange-500/20 to-red-500/20',
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
    gradient: 'from-blue-500/20 to-cyan-500/20',
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
    gradient: 'from-purple-500/20 to-pink-500/20',
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
    gradient: 'from-teal-500/20 to-green-500/20',
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:px-12 md:py-36">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/[0.03] via-transparent to-transparent" />
      
      <SectionLabel index="03" title="Capabilities" />

      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl md:grid-cols-2">
        {groups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.08}>
            <motion.div 
              whileHover={{ y: -5 }}
              className={`group relative h-full overflow-hidden bg-background/80 p-8 transition-all duration-500 hover:bg-background md:p-10`}
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${group.gradient}`} />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <motion.h3 
                    whileHover={{ scale: 1.05 }}
                    className="font-display text-xl font-semibold tracking-tight text-balance md:text-2xl"
                  >
                    {group.title}
                  </motion.h3>
                  <motion.span 
                    className="font-display text-sm text-accent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    0{i + 1}
                  </motion.span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.03 }}
                      whileHover={{ 
                        scale: 1.05, 
                        borderColor: 'var(--color-accent)',
                        color: 'var(--color-foreground)',
                        boxShadow: '0 0 20px rgba(255, 77, 0, 0.3)'
                      }}
                      className="cursor-default rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-foreground hover:bg-accent/10"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
