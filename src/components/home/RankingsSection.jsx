import { ArrowRight, Award } from "lucide-react"
import { motion } from "framer-motion"
import { rankings } from "../../data/rankings"

function RankingCard({ title, source }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-start gap-2.5">
        <Award className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-dark" />
        <div>
          <p className="text-sm font-bold leading-snug text-brand-navy">{title}</p>
          <p className="mt-1 text-xs font-medium leading-snug text-amber-700">{source}</p>
        </div>
      </div>
    </div>
  )
}

export default function RankingsSection() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-xl font-extrabold text-brand-navy sm:text-2xl"
        >
          Rankings
        </motion.h2>

        {rankings.map((entry) => (
          <div key={entry.year} className="mt-10">
            <div className="flex flex-col items-center">
              <span className="rounded-full bg-brand-navy px-4 py-1 text-sm font-extrabold text-white">
                {entry.year}
              </span>
              <div className="mt-2 hidden h-8 w-px bg-slate-300 lg:block" />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-10">
              <div className="grid gap-4 sm:grid-cols-2">
                {entry.left.map((item, i) => (
                  <RankingCard key={i} {...item} />
                ))}
              </div>

              <div className="hidden w-px self-stretch bg-slate-300 lg:block" />

              <div className="grid gap-4 sm:grid-cols-2">
                {entry.right.map((item, i) => (
                  <RankingCard key={i} {...item} />
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy transition-colors hover:text-brand-gold-dark"
          >
            More <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
