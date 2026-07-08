import { useState } from "react"
import Header from "./components/layout/Header"
import HeroSlider from "./components/home/HeroSlider"
import ImportantLinksBar from "./components/home/ImportantLinksBar"
import AdBanner from "./components/home/AdBanner"
import GroupInfoSection from "./components/home/GroupInfoSection"
import NewsAchievementsSection from "./components/home/NewsAchievementsSection"
import CampusNewsSection from "./components/home/CampusNewsSection"
import AdmissionTab from "./components/common/AdmissionTab"
import WhatsAppButton from "./components/common/WhatsAppButton"
import ApplyNowModal from "./components/common/ApplyNowModal"

function App() {
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSlider onApplyClick={() => setApplyOpen(true)} />
        <ImportantLinksBar />
        <AdBanner />
        <GroupInfoSection />
        <NewsAchievementsSection />
        <CampusNewsSection />
      </main>
      <AdmissionTab />
      <WhatsAppButton />
      <ApplyNowModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  )
}

export default App
