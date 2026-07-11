'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Reveal, SectionLabel } from './reveal'

interface LinkedinPost {
  id: string
  date: string
  content: string
  url: string
}

export function LinkedinFeed() {
  const [posts, setPosts] = useState<LinkedinPost[]>([
    {
      id: '1',
      date: 'July 2026',
      content: 'Excited to share that I have been diving deep into Agentic AI and automated workflows using FastAPI and n8n! The potential to streamline pipelines is huge.',
      url: 'https://www.linkedin.com/in/vinilnaik',
    },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/linkedin')
        if (res.ok) {
          const data = await res.json()
          if (data.posts) {
            setPosts(data.posts)
          }
        }
      } catch (err) {
        console.error('Failed to fetch LinkedIn posts', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section id="linkedin-feed" className="px-6 py-28 md:px-12 md:py-36 bg-[#07100e]/40 border-y border-border/10">
      <SectionLabel index="05" title="LinkedIn Activity" />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
                Live Feed
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                // SYNCED DIRECTLY WITH LINKEDIN PROFILE
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/vinilnaik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent transition-colors duration-300 group border border-border/50 hover:border-accent/50 rounded-full px-5 py-2.5 bg-background/50"
            >
              <span>Connect on LinkedIn</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-sans">
                →
              </span>
            </a>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-xl border border-border/50 bg-[#07100e]/20 p-6 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.1}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between h-full min-h-[220px] rounded-xl border border-border/50 hover:border-accent/40 bg-[#07100e]/25 hover:bg-[#07100e]/60 p-6 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle HUD scanline overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(0,240,137,0.02)_95%)] bg-[size:100%_12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-4">
                      <span>Activity Log</span>
                      <span className="text-accent/80">{post.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors duration-300 line-clamp-5">
                      {post.content}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-2 font-mono text-[10px] text-accent/80 group-hover:text-accent transition-colors duration-300">
                    <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                    <span>READ UPDATE</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
