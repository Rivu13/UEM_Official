import { useEffect, useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import TopBar from "./TopBar"
import NavDropdown from "./NavDropdown"
import SearchOverlay from "./SearchOverlay"
import { primaryNav, secondaryNav } from "../../data/navigation"
import uemLogo from "../../assets/uem_logo.jpg"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50">
      <TopBar onSearchClick={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className={`bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex shrink-0 items-center">
            <img src={uemLogo} alt="UEM - University of Engineering & Management" className="h-14 w-auto object-contain sm:h-16" />
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {primaryNav.map((item) => (
              <NavDropdown key={item.label} item={item} variant="dark" />
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="p-2 text-brand-navy lg:hidden"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      <div className="hidden bg-brand-navy shadow-[0_8px_16px_-8px_rgba(0,0,0,0.45)] lg:block">
        <div className="mx-auto flex h-11 max-w-[1400px] items-center justify-center gap-6 px-6">
          {secondaryNav.map((item) => (
            <NavDropdown key={item.label} item={item} variant="light" />
          ))}
        </div>
      </div>
      <div className="h-[3px] bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-dark" />

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
            />
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed right-0 top-0 z-[70] h-full w-[85%] max-w-sm overflow-y-auto bg-white lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <span className="font-bold text-brand-navy">Menu</span>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6 text-brand-navy" />
                </button>
              </div>
              <div className="flex flex-col gap-0 p-4">
                {[...primaryNav, ...secondaryNav].map((item) => (
                  <MobileNavItem key={item.label} item={item} />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

function MobileNavItem({ item }) {
  const [open, setOpen] = useState(false)
  const hasDropdown = Boolean(item.dropdown?.length)

  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={() => hasDropdown && setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3 text-left font-bold text-slate-800"
      >
        {item.label}
        {hasDropdown && (
          <ChevronDown
            className="h-4 w-4 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </button>
      {hasDropdown && open && (
        <div className="flex flex-col gap-1 pb-2 pl-3">
          {item.dropdown.map((sub) => (
            <a key={sub} href="#" className="py-1.5 text-sm font-semibold text-slate-600">
              {sub}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
