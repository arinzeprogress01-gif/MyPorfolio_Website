import { ShieldCheck } from 'lucide-react'

export default function CredentialsCard({ data }) {
  return (
    <div className="flex h-full flex-col">
      <span className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <ShieldCheck size={24} strokeWidth={1.75} />
      </span>

      <h3 className="mt-3 font-display text-lg font-bold text-primary">{data.title}</h3>

      <ul className="mt-3 space-y-3">
        {data.items.map((item) => (
          <li key={item.name}>
            <p className="text-xs font-semibold text-foreground">{item.name}</p>
            {item.details.map((line) => (
              <p key={line} className="text-[11px] text-muted-foreground">{line}</p>
            ))}
          </li>
        ))}
      </ul>

      <h4 className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {data.certificationsTitle}
      </h4>
      <ul className="mt-2 space-y-1">
        {data.certifications.map((cert) => (
          <li key={cert.name} className="text-[11px]">
            <span className="font-medium text-accent underline underline-offset-2">{cert.name}</span>{' '}
            <span className="text-muted-foreground">({cert.type})</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[11px] text-muted-foreground">{data.note}</p>

      <p className="mt-auto pt-4 font-display text-sm font-bold text-primary">{data.footer}</p>
    </div>
  )
}