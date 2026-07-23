import { Routes, Route } from "react-router-dom"
import Layout from "../components/layout/Layout"
import HomePage from "../pages/HomePage"
import AboutUsPage from "../pages/AboutUsPage"
import ManagementPage from "../pages/ManagementPage"
import VisionMissionPage from "../pages/VisionMissionPage"
import AdmissionsPage from "../pages/AdmissionsPage"
import AdmissionsApplyPage from "../pages/AdmissionsApplyPage"
import AdmissionsFeeStructurePage from "../pages/AdmissionsFeeStructurePage"
import ProvisionalAdmissionPage from "../pages/ProvisionalAdmissionPage"
import CertificateCoursesAdmissionPage from "../pages/CertificateCoursesAdmissionPage"
import ConferencesPage from "../pages/ConferencesPage"
import ConferenceDetailPage from "../pages/ConferenceDetailPage"
import NewsAchievementSectionPage from "../pages/NewsAchievementSectionPage"
import NewsAchievementItemDetailPage from "../pages/NewsAchievementItemDetailPage"
import AlumniPage from "../pages/AlumniPage"
import GenericPage from "../pages/GenericPage"
import NotFoundPage from "../pages/NotFoundPage"
import { pageRoutes } from "./pageRoutes"
import { newsAchievementsSections } from "../data/newsAchievementsSections"

const customPages = {
  "/about-iem-uem-group/about-us": AboutUsPage,
  "/about-iem-uem-group/management": ManagementPage,
  "/about-iem-uem-group/vision-and-mission": VisionMissionPage,
  "/admission/admissions": AdmissionsPage,
  "/admission/admissions/apply": AdmissionsApplyPage,
  "/admission/admissions/fee-structure": AdmissionsFeeStructurePage,
  "/admission/provisional-admission": ProvisionalAdmissionPage,
  "/admission/admissions/certificate-courses": CertificateCoursesAdmissionPage,
  "/conferences": ConferencesPage,
  "/news-and-achievements/conferences": ConferencesPage,
  "/alumni": AlumniPage,
}

// These are handled by the dynamic /news-and-achievements/:section route below —
// exclude them from the static GenericPage fallback so that route actually gets to run.
const dynamicSectionPaths = new Set(
  newsAchievementsSections.map((section) => `/news-and-achievements/${section.slug}`),
)

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/conferences/:slug" element={<ConferenceDetailPage />} />
        <Route path="/news-and-achievements/:section" element={<NewsAchievementSectionPage />} />
        <Route path="/news-and-achievements/:section/:slug" element={<NewsAchievementItemDetailPage />} />
        {Object.entries(customPages).map(([path, Page]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        {pageRoutes
          .filter((route) => !customPages[route.path] && !dynamicSectionPaths.has(route.path))
          .map((route) => (
            <Route key={route.path} path={route.path} element={<GenericPage title={route.title} />} />
          ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
