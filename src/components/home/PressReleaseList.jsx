import { pressReleases } from "../../data/pressReleases"

export default function PressReleaseList() {
  return (
    <div>
      <h3 className="text-base font-extrabold text-white">
        Press <span className="text-brand-gold">Releases</span>
      </h3>
      <div className="mt-3 flex flex-col gap-3">
        {pressReleases.map((item) => (
          <div key={item.id} className="rounded-lg bg-white p-4 shadow-sm">
            <a
              href={item.href}
              className="text-sm font-semibold leading-snug text-sky-700 transition-colors hover:text-sky-900 hover:underline"
            >
              {item.title}
            </a>
            <p className="mt-1.5 text-xs text-slate-400">
              {item.date} by {item.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
