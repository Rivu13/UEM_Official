import { useOutletContext } from "react-router-dom"
import HeroSlider from "../components/home/HeroSlider"
import ImportantLinksBar from "../components/home/ImportantLinksBar"
import AdBanner from "../components/home/AdBanner"
import GroupInfoSection from "../components/home/GroupInfoSection"
import NewsAchievementsSection from "../components/home/NewsAchievementsSection"
import CampusNewsSection from "../components/home/CampusNewsSection"
import TopRecruitersSection from "../components/home/TopRecruitersSection"
import RankingsSection from "../components/home/RankingsSection"
import TestimonialsSection from "../components/home/TestimonialsSection"

export default function HomePage() {
  const { openApply } = useOutletContext()

  return (
    <>
      <HeroSlider onApplyClick={openApply} />
      <ImportantLinksBar />
      <AdBanner />
      <GroupInfoSection />
      <NewsAchievementsSection />
      <CampusNewsSection />
      <TopRecruitersSection />
      <RankingsSection />
      <TestimonialsSection />
    </>
  )
}
