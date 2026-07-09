import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import AdmissionTab from "../common/AdmissionTab"
import WhatsAppButton from "../common/WhatsAppButton"
import ApplyNowModal from "../common/ApplyNowModal"

export default function Layout() {
  const [applyOpen, setApplyOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Outlet context={{ openApply: () => setApplyOpen(true) }} />
      </main>
      <Footer />
      <AdmissionTab />
      <WhatsAppButton />
      <ApplyNowModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  )
}
