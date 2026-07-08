import { useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const focusTimer = setTimeout(() => inputRef.current?.focus(), 150)
    const onKeyDown = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKeyDown)

    return () => {
      clearTimeout(focusTimer)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-brand-navy-dark/70 backdrop-blur-sm"
          />
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed left-1/2 top-28 z-[100] w-[92%] max-w-2xl -translate-x-1/2"
          >
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-2xl ring-1 ring-black/5">
              <Search className="h-5 w-5 shrink-0 text-brand-navy" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search courses, admissions, news..."
                className="w-full border-none bg-transparent text-base font-semibold text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
