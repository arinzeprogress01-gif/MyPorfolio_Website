import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import Container from '../ui/Container'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Example', href: '#example' },
  { label: 'For professionals', href: '#professionals' },
  { label: 'Why FolioX', href: '#why' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container xl>
        <nav className="flex h-16 items-center justify-between" aria-label="Main">
          <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-primary">
            FolioX
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop buttons */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button as="a" href="#start" variant="ghost" size="sm">Sign in</Button>
            <Button as="a" href="#start" variant="primary" size="sm">Get started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-lg p-2 text-foreground hover:bg-accent-soft lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="flex flex-col gap-1 pb-4 lg:hidden">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent-soft"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Button as="a" href="#start" variant="outline" className="flex-1" onClick={close}>Sign in</Button>
              <Button as="a" href="#start" variant="primary" className="flex-1" onClick={close}>Get started</Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}