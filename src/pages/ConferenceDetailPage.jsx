import { Link, useParams } from "react-router-dom"
import NewsAchievementsSection from "../components/home/NewsAchievementsSection"
import NotFoundPage from "./NotFoundPage"
import { conferences } from "../data/conferences"

export default function ConferenceDetailPage() {
  const { slug } = useParams()
  const conference = conferences.find((c) => c.slug === slug)

  if (!conference) return <NotFoundPage />

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
            <Link to="/conferences" className="transition-colors hover:text-brand-gold">
              Conferences
            </Link>
            <span>/</span>
            <span className="text-white">{conference.title}</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">{conference.title}</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="font-semibold text-slate-400">{conference.date}</span>
            <span className="text-blue-700">{conference.tags.join(", ")}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{conference.description}</p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {conference.gallery.map((image, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <img
                  src={image}
                  alt={`${conference.title} — photo ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsAchievementsSection />
    </>
  )
}
