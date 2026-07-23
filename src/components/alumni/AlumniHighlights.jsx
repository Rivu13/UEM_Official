import { Briefcase, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { alumniLeadershipRoles, alumniHigherEducation } from "../../data/alumniContent"

const groups = [
  {
    icon: Briefcase,
    title: "Leading as Director & Manager",
    subtitle: "Some of our ex-students are working as Director/Manager",
    items: alumniLeadershipRoles,
  },
  {
    icon: GraduationCap,
    title: "Advancing Through Higher Education",
    subtitle: "Our students are pursuing higher education at",
    items: alumniHigherEducation,
  },
]

export default function AlumniHighlights() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {groups.map((group, i) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="flex items-center gap-4 bg-brand-navy px-6 py-6 sm:px-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gold/15">
                    <Icon className="h-6 w-6 text-brand-gold" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white sm:text-xl">{group.title}</h2>
                    <p className="mt-0.5 text-xs font-medium text-blue-200">{group.subtitle}</p>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 p-6 sm:p-8">
                  {group.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/60 px-4 py-3 text-sm leading-relaxed text-slate-700 transition-colors hover:border-brand-gold/40 hover:bg-brand-gold/5"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-dark" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
