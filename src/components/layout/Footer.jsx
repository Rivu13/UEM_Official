import { Link } from "react-router-dom"
import { Phone, Mail } from "lucide-react"
import uemLogo from "../../assets/uem_logo.jpg"
import { siteConfig } from "../../data/siteConfig"
import { footerColumns } from "../../data/footer"

const socialLinks = [
  { label: "Facebook", initials: "f", href: "#" },
  { label: "Instagram", initials: "IG", href: "#" },
  { label: "Twitter", initials: "X", href: "#" },
  { label: "YouTube", initials: "YT", href: "#" },
  { label: "LinkedIn", initials: "in", href: "#" },
]

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col items-center gap-4 bg-brand-gold px-8 py-10 text-center">
        <img src={uemLogo} alt="UEM - University of Engineering & Management" className="h-24 w-auto object-contain" />

        <a href={`tel:${siteConfig.phones[0]}`} className="flex items-center gap-2 text-sm font-bold text-brand-navy">
          <Phone className="h-4 w-4" /> {siteConfig.phones.join(" / ")}
        </a>
        <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm font-bold text-brand-navy">
          <Mail className="h-4 w-4" /> {siteConfig.email}
        </a>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, initials, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white transition-transform duration-300 hover:scale-110"
            >
              {initials}
            </a>
          ))}
        </div>

        <p className="mt-1 text-xs font-bold leading-relaxed text-brand-navy">
          Copyright {new Date().getFullYear()} | IEM-UEM Group
          <br />
          Designed by Renderbit Technologies
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 bg-brand-navy px-8 py-10 sm:grid-cols-4">
        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-brand-gold">{column.heading}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm font-medium text-slate-100 transition-colors hover:text-brand-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
