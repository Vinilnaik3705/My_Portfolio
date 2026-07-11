'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, WordReveal, SectionLabel } from './reveal'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const [stats, setStats] = useState([
    { value: '4', label: 'Shipped projects' },
    { value: '735', label: 'LinkedIn followers' },
    { value: '500', label: 'Connections' },
    { value: '2027', label: 'B.Tech, NIT JSR' },
  ])

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/linkedin')
        if (res.ok) {
          const data = await res.json()
          if (data.stats) {
            const cleanFollowers = String(data.stats.followers || '735').replace(/\+/g, '').trim()
            const cleanConnections = String(data.stats.connections || '500').replace(/\+/g, '').trim()
            setStats([
              { value: '4', label: 'Shipped projects' },
              { value: cleanFollowers, label: 'LinkedIn followers' },
              { value: cleanConnections, label: 'Connections' },
              { value: '2027', label: 'B.Tech, NIT JSR' },
            ])
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic LinkedIn stats', err)
      }
    }
    fetchStats()
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -40])

  return (
    <section ref={ref} id="about" className="px-6 py-28 md:px-12 md:py-36">
      <SectionLabel index="02" title="About Me" />

      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
            <WordReveal text="I build systems that think, act, and ship — from full-stack products to autonomous AI agents." />
          </h2>

          <Reveal delay={0.2} className="mt-8 max-w-lg">
            <p className="leading-relaxed text-muted-foreground">
              A motivated and detail-oriented final year B.Tech Computer
              Science student at NIT Jamshedpur, eager to apply my knowledge in
              software development with a strong foundation in Web Development,
              Agentic AI, and RAG Systems.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Open to connecting with professionals and peers in the tech
              industry — feel free to reach out.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-6">
                <p className="font-display text-3xl font-bold text-accent md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>

        </div>

        <div className="relative flex items-start justify-center gap-6">
          <motion.div
            style={{ y: y1 }}
            className="w-1/2 overflow-hidden rounded-xl border border-border"
          >
            <Image
              src="/images/vinil2-real.jpeg"
              alt="Vinil Naik standing in a red pillar tunnel"
              width={600}
              height={800}
              className="h-auto w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="mt-20 w-1/2 overflow-hidden rounded-xl border border-border"
          >
            <Image
              src="/images/profile-real.jpeg"
              alt="Professional portrait of Vinil Naik"
              width={600}
              height={800}
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
