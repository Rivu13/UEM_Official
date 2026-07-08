import { importantLinks } from "../../data/importantLinks"

export default function ImportantLinksBar() {
  return (
    <section className="bg-[#f7ecd2] py-8">
      <div className="mx-auto max-w-[1400px] px-6">
        <h2 className="text-center text-xl font-extrabold text-brand-navy sm:text-2xl">Important links</h2>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          {importantLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg border-2 border-brand-navy bg-white px-6 py-3 text-center text-sm font-bold text-brand-navy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-navy hover:text-white hover:shadow-md"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
