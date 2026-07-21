import { motion } from "framer-motion"
import ProfessorCard from "./ProfessorCard"

export default function ManagementSection({ title, members, onImageClick, tone = "white" }) {
  return (
    <section className={tone === "white" ? "bg-white py-14 sm:py-16" : "bg-slate-50 py-14 sm:py-16"}>
      <div className="mx-auto max-w-[1400px] px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-xl font-extrabold text-brand-navy sm:text-2xl"
        >
          {title}
        </motion.h2>
        <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-brand-gold" />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <ProfessorCard key={member.id} member={member} onImageClick={onImageClick} />
          ))}
        </div>
      </div>
    </section>
  )
}
