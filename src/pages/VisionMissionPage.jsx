import { Link } from "react-router-dom"
import VisionMissionBlocks from "../components/visionMission/VisionMissionBlocks"
import NewsAchievementsSection from "../components/home/NewsAchievementsSection"
import RankingsSection from "../components/home/RankingsSection"

export default function VisionMissionPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative mx-auto max-w-[1400px] px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-blue-200">
            <Link to="/" className="transition-colors hover:text-brand-gold">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Vision & Mission</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">Vision & Mission</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <VisionMissionBlocks />
      <NewsAchievementsSection />
      <RankingsSection />
    </>
  )
}
