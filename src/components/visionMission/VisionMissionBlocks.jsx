import { Target, Eye, HeartHandshake } from "lucide-react"
import { motion } from "framer-motion"
import { visionMissionBlocks } from "../../data/visionMissionContent"

const icons = {
  Mission: Target,
  Vision: Eye,
  Values: HeartHandshake,
}

export default function VisionMissionBlocks() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6">
        {visionMissionBlocks.map((block, i) => {
          const Icon = icons[block.title]

          return (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy/5">
                  <Icon className="h-5 w-5 text-brand-gold-dark" />
                </div>
                <h2 className="text-xl font-extrabold text-brand-navy sm:text-2xl">{block.title}</h2>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {block.paragraphs.map((paragraph, j) => (
                  <p key={j} className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
