import { ChevronRight } from 'lucide-react'
import Section from '../../components/ui/Section'
import Container from '../../components/ui/Container'
import Card from '../../components/ui/Card'
import IconBadge from '../../components/ui/IconBadge'
import { features } from './data/features'

export default function Features() {
  return (
    <Section id="features" spacing="md">
      <Container size="2xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: text */}
          <div className="lg:col-span-5">
            <p className="eyebrow">Everything that matters</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
              More than a portfolio. It&rsquo;s your professional identity.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Showcase your work, prove your credentials, highlight your achievements,
              and tell the full story behind your career.
            </p>
          </div>

          {/* Right: cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {features.map(({ title, description, icon }) => (
              <Card key={title} hoverable padding="lg" className="flex gap-4  cursor-pointer">
                <IconBadge icon={icon} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-[15px] font-semibold text-foreground">{title}</h3>
                    <ChevronRight size={18} className="text-accent" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}