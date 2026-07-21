import about1 from "../../assets/images/about1.jpg"
import about2 from "../../assets/images/about2.jpg"
import about3 from "../../assets/images/about3.jpg"
import about4 from "../../assets/images/about4.jpg"

const galleryImages = [
  { src: about1, alt: "IEM UEM Group campus life 1" },
  { src: about2, alt: "IEM UEM Group campus life 2" },
  { src: about3, alt: "IEM UEM Group campus life 3" },
  { src: about4, alt: "IEM UEM Group campus life 4" },
]

export default function AboutGallery() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <h2 className="text-center text-xl font-extrabold text-brand-navy sm:text-2xl">Gallery</h2>
        <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-brand-gold" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, i) => (
            <div
              key={i}
              className="group aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 shadow-sm"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
