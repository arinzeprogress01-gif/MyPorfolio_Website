
import { evidenceContent } from "./data/evidence";
function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 text-[#3B9BFF]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function EvidenceSection() {
  const { eyebrow, heading, items } = evidenceContent;

  return (
    <section id="why" className="bg-[#05245A] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 md:py-24 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:px-12 lg:py-32">
        {/* Left: eyebrow + heading */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#3B9BFF] sm:text-sm">
            {eyebrow}
          </p>
          <h2 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {heading}
          </h2>
        </div>

        {/* Right: checklist (stacks below the heading on mobile) */}
        <ul className="w-full lg:w-72">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 border-b border-white/20 py-5 text-lg"
            >
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}