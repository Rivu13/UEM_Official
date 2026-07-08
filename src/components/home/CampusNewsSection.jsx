import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { campusNewsTabs, campusNewsItems } from "../../data/campusNews"
import NewsCard from "./NewsCard"
import NewsBulletinBox from "./NewsBulletinBox"
import PressReleaseList from "./PressReleaseList"

export default function CampusNewsSection() {
  const [activeTab, setActiveTab] = useState(campusNewsTabs[0].id)
  const items = campusNewsItems[activeTab] ?? []

  return (
    <section className="bg-brand-navy py-14">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">
            Campus <span className="text-brand-gold">News</span>
          </h2>

          <div className="mt-4 flex items-center gap-6 border-b border-white/15">
            {campusNewsTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`-mb-px border-b-2 pb-2 text-sm font-bold transition-colors duration-200 ${
                  activeTab === tab.id ? "border-brand-gold text-brand-gold" : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-6 grid gap-6 sm:grid-cols-2"
            >
              {items.map((item, i) => (
                <NewsCard key={item.id} item={item} seed={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center lg:text-left">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-brand-gold"
            >
              More <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <NewsBulletinBox />
          <PressReleaseList />
        </div>
      </div>
    </section>
  )
}
