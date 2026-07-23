import { Link, useSearchParams } from "react-router-dom"
import ConferenceCard from "../components/conferences/ConferenceCard"
import ConferencePagination from "../components/conferences/ConferencePagination"
import NewsAchievementsSection from "../components/home/NewsAchievementsSection"
import { conferences, CONFERENCES_PER_PAGE } from "../data/conferences"

export default function ConferencesPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const totalPages = Math.max(1, Math.ceil(conferences.length / CONFERENCES_PER_PAGE))
  const requestedPage = Number(searchParams.get("page")) || 1
  const page = Math.min(Math.max(requestedPage, 1), totalPages)

  const startIndex = (page - 1) * CONFERENCES_PER_PAGE
  const visibleConferences = conferences.slice(startIndex, startIndex + CONFERENCES_PER_PAGE)

  const goToPage = (nextPage) => {
    setSearchParams(nextPage === 1 ? {} : { page: String(nextPage) })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
            <span className="text-white">Conferences</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">Conferences</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleConferences.map((conference) => (
              <ConferenceCard key={conference.slug} conference={conference} />
            ))}
          </div>

          <ConferencePagination page={page} totalPages={totalPages} onPageChange={goToPage} />
        </div>
      </section>

      <NewsAchievementsSection />
    </>
  )
}
