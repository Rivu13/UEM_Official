import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export default function NavDropdown({ item, variant = "light" }) {
  const [open, setOpen] = useState(false)
  const hasDropdown = Boolean(item.dropdown?.length)

  return (
    <div
      className="relative"
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
    >
      <a
        href={item.href}
        className={`flex items-center gap-1 py-2 text-[13.5px] font-bold transition-colors duration-200 ${
          variant === "dark"
            ? "text-brand-navy hover:text-brand-gold-dark"
            : "text-white hover:text-brand-gold"
        }`}
      >
        {item.label}
        {hasDropdown && (
          <ChevronDown
            className="h-3.5 w-3.5 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </a>

      <AnimatePresence>
        {open && hasDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 min-w-[220px] rounded-xl bg-white py-2 shadow-2xl ring-1 ring-black/5"
          >
            {item.dropdown.map((sub) => (
              <li key={sub}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-brand-gold/10 hover:text-brand-navy"
                >
                  {sub}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
