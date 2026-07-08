import PlaceholderImage from "../common/PlaceholderImage"

export default function NewsCard({ item, seed = 0 }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <PlaceholderImage seed={seed} label={item.title} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-bold leading-snug">
          <a href={item.href} className="text-brand-navy transition-colors hover:text-brand-gold-dark">
            {item.title}
          </a>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-500">{item.excerpt}</p>
        <a href={item.href} className="mt-3 inline-block w-fit text-xs font-bold text-sky-600 hover:text-sky-800">
          Read more
        </a>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
          <span className="shrink-0">{item.date}</span>
          <span className="truncate text-right">{item.tags.join(", ")}</span>
        </div>
      </div>
    </article>
  )
}
