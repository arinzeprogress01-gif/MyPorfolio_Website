import { ArrowRight } from 'lucide-react'
import Section from '../../components/ui/Section'
import Container from '../../components/ui/Container'
import Button from '../../components/ui/Button'
import PathCardsStack from './PathCardsStack'

export default function DifferentPaths() {
  return (
   <Section id="example" spacing="md" tone="subtle" className="overflow-x-clip">
      <Container size="xl">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Left: text */}
          <div>
            <p className="eyebrow">Built around you</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Different paths. One place to prove them.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whether you build, teach, create, write, research, advise, or lead,
              FolioX gives your work the context it deserves.
            </p>
            <Button as="a" href="#start" variant="primary" size="lg" className="mt-8">
              Create your portfolio
              <ArrowRight size={18} />
            </Button>
          </div>

          {/* Right: cards */}
          <PathCardsStack />
        </div>
      </Container>
    </Section>
  )
}