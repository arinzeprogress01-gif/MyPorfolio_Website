import { cn } from '../../lib/cn'

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({ padding = 'md', hoverable = false, className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card text-card-foreground shadow-soft',
        paddings[padding],
        hoverable && 'transition duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-premium',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}