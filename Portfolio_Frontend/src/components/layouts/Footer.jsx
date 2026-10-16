import { navLinks, siteConfig } from "../data/site";

function LogoMark() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-[#05245A] text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-[#FAFCFF]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-primary">
            {siteConfig.name}
          </a>
           
          </div>
          <p className="mt-3 text-slate-600 text-sm">{siteConfig.tagline}</p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:pt-3">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-medium text-sm text-[#05245A] transition hover:text-[#2F6BFF]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p className="text-slate-500 text-sm lg:pt-3">
          © {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}