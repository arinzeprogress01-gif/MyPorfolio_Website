import { ShieldCheck } from 'lucide-react'
import heroImage from '../../assets/hero-image-1.png'

export default function HeroVisual() {
  return (
    <div className="relative isolate mx-auto w-full max-w-xl px-3 py-10 sm:px-6 lg:max-w-none">
      {/* Soft blue gradient glow behind the image */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 inset-y-12 -z-10 rounded-[2rem] bg-linear-to-br from-accent-soft via-accent-bright/25 to-transparent blur-2xl"
      />

      {/* Main image, floating gently */}
      <div className="">
        <img
          src={heroImage}
          alt="Preview of a FolioX professional portfolio"
          className="h-auto w-full rounded-2xl border border-border shadow-premium"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Small card: top right */}
      <div className="absolute right-0 top-2 z-10 animate-float rounded-xl border border-border bg-card px-4 py-3 shadow-float [animation-delay:-2s] motion-reduce:animate-none">
        <p className="text-[10px] font-semibold uppercase text-muted-foreground">Verified credential</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <ShieldCheck size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Service Design</p>
            <p className="text-xs text-muted-foreground">Credential attached</p>
          </div>
        </div>
      </div>

      {/* Small card: bottom left */}
      <div className="absolute bottom-2 left-0 z-10 animate-float rounded-xl border border-border bg-card px-4 py-3 shadow-float [animation-delay:-4s] motion-reduce:animate-none">
        <p className="text-xs text-muted-foreground">Portfolio strength</p>
        <p className="mt-1 font-display text-2xl font-bold text-primary">
          92% <span className="font-body text-xs font-semibold text-accent">Excellent</span>
        </p>
      </div>
    </div>
  )
}