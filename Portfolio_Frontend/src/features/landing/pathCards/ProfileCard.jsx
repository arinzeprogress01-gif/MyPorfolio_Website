export default function ProfileCard({ data }) {
  return (
    <>
      <span className="flex size-14 items-center justify-center rounded-full bg-highlight font-display text-lg font-bold text-primary">
        {data.initials}
      </span>

      <h3 className="mt-4 font-display text-xl font-bold text-primary">{data.name}</h3>
      <p className="text-xs text-muted-foreground">{data.role}</p>

      <hr className="my-4 border-border" />

      <p className="text-xs leading-relaxed text-muted-foreground">{data.summary}</p>

      <dl className="mt-5 grid grid-cols-3 text-center">
        {data.stats.map(({ value, label }) => (
          <div key={label}>
            <dd className="font-display text-lg font-bold text-foreground">{value}</dd>
            <dt className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {label}
            </dt>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Skills</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {data.skills.map((skill) => (
            <li key={skill} className="rounded-md bg-subtle px-2 py-1 text-[11px] font-medium text-foreground">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}