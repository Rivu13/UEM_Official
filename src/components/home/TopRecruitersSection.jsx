import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { topRecruiters } from "../../data/topRecruiters"

export default function TopRecruitersSection() {
  const trackRef = useRef(null)

  const scrollByCard = (direction) => {
    trackRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" })
  }

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
          Top Recruiters
        </motion.h2>

        <div className="relative mt-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto scroll-smooth px-2 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {topRecruiters.map((recruiter) => (
              <div
                key={recruiter.id}
                className="flex h-24 w-56 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="text-lg font-extrabold tracking-tight text-slate-600">{recruiter.name}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll recruiters left"
            className="absolute -left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg ring-1 ring-slate-200 transition-transform duration-300 hover:scale-110 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll recruiters right"
            className="absolute -right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg ring-1 ring-slate-200 transition-transform duration-300 hover:scale-110 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
