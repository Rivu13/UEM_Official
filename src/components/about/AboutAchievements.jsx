import { Trophy } from "lucide-react"
import { motion } from "framer-motion"
import { aboutAchievements } from "../../data/aboutContent"

export default function AboutAchievements() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-xl font-extrabold text-brand-navy sm:text-2xl"
        >
          Milestones & Accolades
        </motion.h2>
        <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-brand-gold" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutAchievements.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-dark" />
              <p className="text-sm leading-relaxed text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
