import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function NewsAchievementItemCard({ item, basePath }) {
  const detailPath = `${basePath}/${item.slug}`

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link to={detailPath} className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={item.gallery[0]}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link
          to={detailPath}
          className="text-base font-extrabold leading-snug text-brand-navy transition-colors hover:text-brand-gold-dark"
        >
          {item.title}
        </Link>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>

        <Link
          to={detailPath}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy transition-colors hover:text-brand-gold-dark"
        >
          Read more <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-slate-100 pt-3 text-xs">
          <span className="text-slate-400">{item.date}</span>
          <span className="text-right text-blue-700">{item.tags.join(", ")}</span>
        </div>
      </div>
    </div>
  )
}
