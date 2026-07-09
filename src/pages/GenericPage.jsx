import { Link } from "react-router-dom"
import { Construction, ArrowLeft, Mail } from "lucide-react"
import { siteConfig } from "../data/siteConfig"

export default function GenericPage({ title }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-blue-200">
            <Link to="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">{title}</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy/5">
            <Construction className="h-8 w-8 text-brand-navy" />
          </div>
          <h2 className="mt-5 text-lg font-extrabold text-brand-navy sm:text-xl">This page is being curated</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            We're putting together detailed content for "{title}". Check back soon, or reach out to our admissions
            team for immediate assistance.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-navy-light"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-navy px-6 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
            >
              <Mail className="h-4 w-4" /> Contact Admissions
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
