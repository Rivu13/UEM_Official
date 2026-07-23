import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ConferencePagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="inline-flex items-center gap-1.5 rounded-full border-2 border-brand-navy px-5 py-2.5 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:bg-transparent"
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </button>

      <span className="text-sm font-semibold text-slate-500">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="inline-flex items-center gap-1.5 rounded-full bg-brand-navy px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-navy-light disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
