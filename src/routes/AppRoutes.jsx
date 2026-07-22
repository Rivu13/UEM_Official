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
import GenericPage from "../pages/GenericPage"
import NotFoundPage from "../pages/NotFoundPage"
import { pageRoutes } from "./pageRoutes"

const customPages = {
  "/about-iem-uem-group/about-us": AboutUsPage,
  "/about-iem-uem-group/management": ManagementPage,
  "/about-iem-uem-group/vision-and-mission": VisionMissionPage,
  "/admission/admissions": AdmissionsPage,
  "/admission/admissions/apply": AdmissionsApplyPage,
  "/admission/admissions/fee-structure": AdmissionsFeeStructurePage,
  "/admission/provisional-admission": ProvisionalAdmissionPage,
  "/admission/admissions/certificate-courses": CertificateCoursesAdmissionPage,
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        {Object.entries(customPages).map(([path, Page]) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
        {pageRoutes
          .filter((route) => !customPages[route.path])
          .map((route) => (
            <Route key={route.path} path={route.path} element={<GenericPage title={route.title} />} />
          ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
