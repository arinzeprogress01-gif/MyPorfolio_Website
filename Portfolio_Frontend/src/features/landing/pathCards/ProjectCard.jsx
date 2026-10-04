import { useState } from 'react'
import { ArrowRight, Building2 } from 'lucide-react'

export default function ProjectCard({ data }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = data.image && !imageFailed

  return (
    <div className="flex h-full flex-col">
      <p className="text-xs text-primary-foreground/70">{data.label}</p>
      <h3 className="mt-1 font-display text-lg font-bold">{data.title}</h3>

      <div className="mt-4 flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
        {showImage ? (
          <img
            src={data.image}
            alt={data.imageAlt}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <Building2 size={40} strokeWidth={1.5} className="text-primary-foreground/70" aria-hidden="true" />
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-primary-foreground/80">
        <span className="font-semibold text-primary-foreground">Challenge:</span> {data.challenge}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-primary-foreground/80">
        <span className="font-semibold text-primary-foreground">Solution:</span> {data.solution}
      </p>

      <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-highlight">
        {data.cta}
        <ArrowRight size={12} aria-hidden="true" />
      </span>

      <div className="mt-auto pt-5">
        <p className="font-display text-sm font-bold">{data.footerTitle}</p>
        <p className="text-xs text-primary-foreground/70">{data.footerText}</p>
      </div>
    </div>
  )
}