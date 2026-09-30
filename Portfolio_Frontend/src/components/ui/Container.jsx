import { cn } from '../../lib/cn'

const widths = {
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export default function Container({ size = 'lg', className, children }) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', widths[size], className)}>
      {children}
    </div>
  )
}