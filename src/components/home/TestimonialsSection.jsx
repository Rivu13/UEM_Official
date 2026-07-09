import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { testimonials } from "../../data/testimonials"
import PlaceholderImage from "../common/PlaceholderImage"

const PAGE_SIZE = 2

export default function TestimonialsSection() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(testimonials.length / PAGE_SIZE)
  const visible = testimonials.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-xl font-extrabold text-brand-navy sm:text-2xl"
        >
          Testimonials
        </motion.h2>

        <div className="relative mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous testimonials"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg ring-1 ring-slate-200 transition-transform duration-300 hover:scale-110 disabled:pointer-events-none disabled:opacity-30 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {visible.map((testimonial, i) => (
                  <div
                    key={testimonial.id}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <PlaceholderImage seed={i} className="h-16 w-16 shrink-0 rounded-full" />
                    <div>
                      <p className="text-sm font-extrabold text-brand-navy">{testimonial.name}</p>
                      <p className="text-xs font-semibold text-slate-400">{testimonial.role}</p>
                      <div className="mt-2 flex gap-1.5 text-slate-600">
                        <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-gold-dark" />
                        <p className="text-sm leading-relaxed">{testimonial.quote}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next testimonials"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg ring-1 ring-slate-200 transition-transform duration-300 hover:scale-110 disabled:pointer-events-none disabled:opacity-30 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
