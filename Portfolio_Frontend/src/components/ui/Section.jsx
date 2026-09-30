import { cn } from '../../lib/cn'

const spacings = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
  hero: 'pt-10 pb-16 md:pt-10 md:pb-20',
}

const tones = {
  default: 'bg-background',
  subtle: 'bg-subtle',
  dark: 'bg-primary text-primary-foreground',
}

export default function Section({ id, spacing = 'md', tone = 'default', className, children }) {
  return (
    <section id={id} className={cn('scroll-mt-16', spacings[spacing], tones[tone], className)}>
      {children}
    </section>
  )
}