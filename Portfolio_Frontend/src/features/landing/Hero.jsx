import { ArrowRight } from 'lucide-react'
import Section from '../../components/ui/Section'
import Container from '../../components/ui/Container'
import Button from '../../components/ui/Button'
import HeroVisual from './HeroVisuals'

const avatars = [
  { name: 'Amara', src: 'https://api.dicebear.com/9.x/notionists/svg?seed=Amara&backgroundColor=dbeafe' },
  { name: 'Daniel', src: 'https://api.dicebear.com/9.x/notionists/svg?seed=Daniel&backgroundColor=fef3c7' },
  { name: 'Sade', src: 'https://api.dicebear.com/9.x/notionists/svg?seed=Sade&backgroundColor=e0e7ff' },
  { name: 'Jide', src: 'https://api.dicebear.com/9.x/notionists/svg?seed=Jide&backgroundColor=dcfce7' },
]

export default function Hero() {
  return (
    <Section spacing="hero" className="relative overflow-hidden">
      <div className="hero-halo" aria-hidden="true" />

      <Container size="xl" className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* Left: text */}
          <div>
            {/* <span className="inline-flex rounded-full bg-accent-soft px-4 py-2 text-xs font-bold uppercase tracking-wide text-accent">
              The universal professional portfolio
            </span> */}

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
              Your complete professional story.{' '}
              <span className="text-accent">All in one place.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Build a credible professional identity with your experience, education,
              credentials, work, achievements, and proof.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as="a" href="#start" variant="primary" size="lg">
                Create your portfolio
                <ArrowRight size={18} />
              </Button>
              <Button as="a" href="#example" variant="outline" size="lg">
                Explore an example
              </Button>
            </div>

            {/* Avatars */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {avatars.map((person) => (
                  <img
                    key={person.name}
                    src={person.src}
                    alt=""
                    loading="lazy"
                    className="size-11 rounded-full bg-accent-soft object-cover ring-2 ring-background"
                  />
                ))}
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-foreground">Made for every field</p>
                <p className="text-sm text-muted-foreground">One profile. Every chapter.</p>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <HeroVisual />
        </div>
      </Container>
    </Section>
  )
}