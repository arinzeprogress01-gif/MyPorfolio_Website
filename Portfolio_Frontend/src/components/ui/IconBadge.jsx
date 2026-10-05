import { cn } from '../../lib/cn'

const shapes = {
  square: 'size-10 rounded-2xl bg-accent-soft',
  circle: 'size-12 rounded-full bg-card shadow-soft',
}

export default function IconBadge({ icon: Icon, shape = 'square', className }) {
  return (
    <span className={cn('flex shrink-0 items-center justify-center text-accent', shapes[shape], className)}>
      <Icon size={shape === 'square' ? 20 : 22} strokeWidth={1.75} />
    </span>
  )
}