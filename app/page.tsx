import { SmoothScroll } from '@/components/smooth-scroll'
import { Preloader } from '@/components/preloader'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { Manifesto } from '@/components/manifesto'
import { Projects } from '@/components/projects'
import { About } from '@/components/about'
import { Signal } from '@/components/signal'
import { Skills } from '@/components/skills'
import { Journey } from '@/components/journey'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Projects />
        <About />
        <Signal />
        <Skills />
        <Journey />
        <Contact />
      </main>
    </SmoothScroll>
  )
}


