import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { GraduationCap, CheckCircle2, User, Mail, Phone, BookOpen, ChevronDown, X } from "lucide-react"

const highlights = ["NAAC A+ Accredited", "95% Placement Rate", "500+ Recruiters"]

const programs = [
  "B.Tech — Engineering",
  "BBA / MBA — Management",
  "BCA / MCA",
  "BHM — Hotel Management",
  "LL.B / LL.M — Law",
]

export default function ApplyNowModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="apply-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-navy-dark/70 p-4 backdrop-blur-sm"
        >
            <motion.div
              key="apply-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="bg-gradient-to-br from-blue-600 via-blue-800 to-brand-navy-dark p-8 sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/25">
                  <GraduationCap className="h-4 w-4 text-brand-gold" />
                  Session 2026
                </span>

                <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  Begin Your Journey at UEM
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-blue-100">
                  Share a few details and our admission team will reach out with everything you need to know about
                  programs, fees and scholarships.
                </p>

                <ul className="mt-8 space-y-3">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-white">
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-brand-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 sm:p-10">
                <h3 className="text-2xl font-extrabold text-brand-navy">Admission Enquiry</h3>
                <p className="mt-1 text-sm text-slate-500">Fill in the form — it only takes a minute.</p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-6 flex flex-col gap-4"
                >
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
                    />
                  </div>

                  <div className="relative">
                    <BookOpen className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                    <select
                      defaultValue={programs[0]}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm font-medium text-slate-800 focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
                    >
                      {programs.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-brand-gold py-3.5 text-sm font-bold text-brand-navy shadow-lg transition-all duration-300 hover:bg-brand-gold-dark hover:shadow-xl"
                  >
                    Submit Enquiry
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    By submitting this form, you agree to our privacy policy and terms.
                  </p>
                </form>
              </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
