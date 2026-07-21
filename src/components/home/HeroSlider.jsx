import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import banner1 from "../../assets/Banner-1.jpg"
import banner2 from "../../assets/Banner-2.jpg"
import banner3 from "../../assets/Banner-3.jpg"

const slides = [
  {
    id: 1,
    image: banner1,
    badge: "Admissions Open 2026",
    title: "Shape Your Future at UEM",
    subtitle:
      "Good Education, Good Jobs — industry-driven programs, expert faculty, and a campus built for tomorrow's innovators.",
  },
  {
    id: 2,
    image: banner2,
    badge: "NAAC Accredited Institution",
    title: "Learn. Build. Lead.",
    subtitle:
      "State-of-the-art labs, global collaborations, and a vibrant campus life across Kolkata & Jaipur.",
  },
  {
    id: 3,
    image: banner3,
    badge: "IEMJEE 2026 Registrations Open",
    title: "Join a Growing Engineering Community",
    subtitle: "Merit scholarships, dedicated placement support, and a legacy of academic excellence.",
  },
]

const imageVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1 },
}

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.12 * i, ease: "easeOut" },
  }),
}

export default function HeroSlider({ onApplyClick }) {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const goTo = (i) => setIndex(i)

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[index]

  return (
    <section className="relative isolate h-[88vh] min-h-[560px] max-h-[800px] w-full overflow-hidden bg-brand-navy-dark">
      <AnimatePresence>
        <motion.div
          key={slide.id}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy-dark/75 via-brand-navy-dark/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-navy-dark/55 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-end px-6 pb-20 sm:px-10 sm:pb-24 lg:pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} className="max-w-2xl">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              className="inline-block rounded-full bg-brand-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-navy"
            >
              {slide.badge}
            </motion.span>
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              className="mt-4 max-w-xl text-base font-medium text-slate-200 sm:text-lg"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onApplyClick}
                className="rounded-full bg-brand-gold px-7 py-3 text-sm font-bold text-brand-navy shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-brand-gold-dark"
              >
                Apply Now
              </button>
              <a
                href="#programs"
                className="rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-white hover:text-brand-navy"
              >
                Explore Programs
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:left-6 sm:flex sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:right-6 sm:flex sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 sm:bottom-8 sm:right-10">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-brand-gold" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-1.5 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark" />
    </section>
  )
}
