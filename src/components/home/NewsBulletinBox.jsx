import { ArrowRight, ChevronRight } from "lucide-react"
import { newsBulletinItems } from "../../data/newsBulletin"

export default function NewsBulletinBox() {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h3 className="text-base font-extrabold text-brand-navy">
        News <span className="text-brand-gold-dark">Bulletin</span>
      </h3>
      <ul className="mt-3 space-y-2.5 border-t border-slate-100 pt-3">
        {newsBulletinItems.map((item) => (
          <li key={item.label} className="flex items-start gap-2 text-sm leading-snug">
            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-gold-dark" />
            <a href={item.href} className="text-slate-700 transition-colors hover:text-brand-navy hover:underline">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-navy transition-colors hover:text-brand-gold-dark"
      >
        More <ArrowRight className="h-3 w-3" />
      </a>
    </div>
  )
}
