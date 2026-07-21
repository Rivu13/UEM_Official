import { aboutParagraphs } from "../../data/aboutContent"

export default function AboutIntro() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-xl font-extrabold text-brand-navy sm:text-2xl">
          Who We <span className="text-brand-gold-dark">Are</span>
        </h2>
        <div className="mt-2 h-1 w-14 rounded-full bg-brand-gold" />

        <div className="mt-6 flex flex-col gap-4">
          {aboutParagraphs.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
