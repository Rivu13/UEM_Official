import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

const PAGE_SIZE = 4

export default function InfoTabList({ tabs, activeId, onSelect }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(tabs.length / PAGE_SIZE)
  const visible = tabs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
        aria-label="Show previous options"
        className="flex h-8 w-8 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-brand-navy/10 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      <div className="flex w-full flex-col gap-2">
        {visible.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm font-bold transition-colors duration-200 ${
              activeId === tab.id
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-slate-200 bg-white text-brand-navy hover:bg-brand-gold/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        disabled={page === totalPages - 1}
        aria-label="Show more options"
        className="flex h-8 w-8 items-center justify-center rounded-full text-brand-navy transition-colors hover:bg-brand-navy/10 disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  )
}
