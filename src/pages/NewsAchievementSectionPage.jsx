import { Link, useParams, useSearchParams } from "react-router-dom"
import NewsAchievementItemCard from "../components/newsAchievements/NewsAchievementItemCard"
import ConferencePagination from "../components/conferences/ConferencePagination"
import NewsAchievementsSection from "../components/home/NewsAchievementsSection"
import NotFoundPage from "./NotFoundPage"
import { getNewsAchievementsSection, ITEMS_PER_PAGE } from "../data/newsAchievementsSections"

export default function NewsAchievementSectionPage() {
  const { section: sectionSlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const section = getNewsAchievementsSection(sectionSlug)

  if (!section) return <NotFoundPage />

  const basePath = `/news-and-achievements/${section.slug}`
  const totalPages = Math.max(1, Math.ceil(section.items.length / ITEMS_PER_PAGE))
  const requestedPage = Number(searchParams.get("page")) || 1
  const page = Math.min(Math.max(requestedPage, 1), totalPages)

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const visibleItems = section.items.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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
            <span className="text-white">{section.label}</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">{section.label}</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <NewsAchievementItemCard key={item.slug} item={item} basePath={basePath} />
            ))}
          </div>

          <ConferencePagination page={page} totalPages={totalPages} onPageChange={goToPage} />
        </div>
      </section>

      <NewsAchievementsSection />
    </>
  )
}
