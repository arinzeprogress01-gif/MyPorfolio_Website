import Button from "../../components/ui/Button";
import { ctaContent } from "./data/cta";
import { siteConfig } from "./data/site";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function CtaSection() {
  const { eyebrow, heading, description, buttonLabel } = ctaContent;

  return (
    <section className="bg-[#FAFCFF]">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:px-8 md:py-28 lg:py-36">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2F6BFF] sm:text-sm">
          {eyebrow}
        </p>
        <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#05245A] sm:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          {description}
        </p>
        <Button href={siteConfig.signupHref} className="mt-10 w-full sm:w-auto">
          {buttonLabel}
          <ArrowIcon />
        </Button>
      </div>
    </section>
  );
}