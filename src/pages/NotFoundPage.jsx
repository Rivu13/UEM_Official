import { Link } from "react-router-dom"
import { Compass } from "lucide-react"

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <Compass className="h-12 w-12 text-brand-navy/40" />
      <p className="mt-4 text-sm font-bold uppercase tracking-wide text-brand-gold-dark">404</p>
      <h1 className="mt-2 text-2xl font-extrabold text-brand-navy sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-slate-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-navy-light"
      >
        Back to Home
      </Link>
    </section>
  )
}
