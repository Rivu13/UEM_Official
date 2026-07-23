import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import alumni6 from "../../assets/images/Alumni6.jpg"
import alumni7 from "../../assets/images/Alumni7.jpg"
import alumni8 from "../../assets/images/Alumni8.jpg"
import alumni9 from "../../assets/images/Alumni9.jpg"
import alumni10 from "../../assets/images/Alumni10.jpg"
import alumni11 from "../../assets/images/Alumni11.jpg"
import alumni12 from "../../assets/images/Alumni12.jpg"
import alumni13 from "../../assets/images/Alumni13.jpg"
import alumni14 from "../../assets/images/Alumni14.jpg"
import alumni15 from "../../assets/images/Alumni15.jpg"
import alumni16 from "../../assets/images/Alumni16.jpg"
import alumni17 from "../../assets/images/Alumni17.jpg"
import alumni18 from "../../assets/images/Alumni18.jpg"
import alumni19 from "../../assets/images/Alumni19.jpg"

// Alumni1–5.jpg are excluded here — they were accidentally overwritten with blank
// placeholders and need to be re-added once real replacements are available.
const slides = [
  alumni6,
  alumni7,
  alumni8,
  alumni9,
  alumni10,
  alumni11,
  alumni12,
  alumni13,
  alumni14,
  alumni15,
  alumni16,
  alumni17,
  alumni18,
  alumni19,
]

export default function AlumniCarousel() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="relative isolate mx-auto h-80 w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg sm:h-96">
      <AnimatePresence>
        <motion.img
          key={index}
          src={slides[index]}
          alt={`Alumni gallery photo ${index + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy-dark/60 via-transparent to-transparent" />

      <button
        type="button"
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/25"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/25"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-brand-gold" : "w-2 bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
