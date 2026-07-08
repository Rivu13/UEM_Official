import { ArrowRight } from "lucide-react"
import { alumniSpotlights } from "../../data/alumniSpotlights"
import NewsCard from "./NewsCard"

export default function NewsAchievementsSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1400px] px-6">
        <h2 className="text-xl font-extrabold text-brand-navy sm:text-2xl">News & Achievements</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alumniSpotlights.map((item, i) => (
            <NewsCard key={item.id} item={item} seed={i} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy transition-colors hover:text-brand-gold-dark"
          >
            More <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
