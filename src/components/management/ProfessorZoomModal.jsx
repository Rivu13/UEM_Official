import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

export default function ProfessorZoomModal({ member, onClose }) {
  useEffect(() => {
    if (!member) return

    const onKeyDown = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [member, onClose])

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          key="zoom-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-navy-dark/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            key="zoom-panel"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <img src={member.image} alt={member.name} className="max-h-[70vh] w-full object-contain" />

            <div className="p-5 text-center">
              <p className="text-lg font-extrabold text-brand-navy">{member.name}</p>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-brand-gold-dark">
                {member.designation}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
