import { Routes, Route } from "react-router-dom"
import Layout from "../components/layout/Layout"
import HomePage from "../pages/HomePage"
import GenericPage from "../pages/GenericPage"
import NotFoundPage from "../pages/NotFoundPage"
import { pageRoutes } from "./pageRoutes"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        {pageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<GenericPage title={route.title} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
