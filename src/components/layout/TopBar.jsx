 import { Search, Mail, Phone } from "lucide-react"
import { topBarLinks } from "../../data/navigation"
import { siteConfig } from "../../data/siteConfig"

export default function TopBar({ onSearchClick }) {
  return (
    <div className="hidden bg-brand-navy-dark text-slate-100 md:block">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-6 text-xs font-semibold">
        <ul className="flex items-center gap-6">
          {topBarLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors duration-200 hover:text-brand-gold">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-6">
          <li>
            <button
              type="button"
              onClick={onSearchClick}
              className="flex items-center gap-1.5 transition-colors hover:text-brand-gold"
            >
              <Search className="h-3.5 w-3.5" /> Search
            </button>
          </li>
          <li>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 transition-colors hover:text-brand-gold">
              <Mail className="h-3.5 w-3.5" /> {siteConfig.email}
            </a>
          </li>
          <li className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span>Admission Helpline - {siteConfig.phones.join(" / ")}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
