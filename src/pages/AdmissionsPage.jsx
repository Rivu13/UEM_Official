import { Link } from "react-router-dom"
import AdmissionsNotice from "../components/admissions/AdmissionsNotice"
import NewsAchievementsSection from "../components/home/NewsAchievementsSection"
import RankingsSection from "../components/home/RankingsSection"
import { admissionOfficesNotice } from "../data/admissionsContent"
import { siteConfig } from "../data/siteConfig"

export default function AdmissionsPage() {
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
            <span className="text-white">Admissions</span>
          </nav>
          <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">Admissions</h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-brand-gold" />
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex justify-center">
            <a
              href={siteConfig.onlineAdmissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-brand-navy px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-navy-light"
            >
              Apply for admission
            </a>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <Link
                to="/admission/admissions/apply"
                className="rounded-lg bg-brand-navy px-8 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-navy-light"
              >
                UEM Jaipur
              </Link>
              <Link
                to="/admission/admissions/fee-structure"
                className="rounded-lg bg-brand-navy px-8 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-navy-light"
              >
                UEM Kolkata
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <AdmissionsNotice notice={admissionOfficesNotice} />
          </div>
        </div>
      </section>

      <NewsAchievementsSection />
      <RankingsSection />
    </>
  )
}
