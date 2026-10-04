import Section from '../../components/ui/Section'
import Container from '../../components/ui/Container'
import IconBadge from '../../components/ui/IconBadge'
import { professions } from './data/professions'

export default function ProfessionsStrip() {
  return (
    <Section id="professionals" spacing="sm" tone="subtle" className="border-y border-border">
      <Container size="xl">
        <h2 className="text-center font-display text-lg font-bold text-primary sm:text-xl">
          Built for professionals across every field
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {professions.map(({ label, icon }) => (
            <li
              key={label}
              className="group flex cursor-default flex-col items-center gap-3 transition duration-300 ease-out hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <IconBadge
                icon={icon}
                shape="circle"
                className="transition duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-accent"
              />
              <span className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}