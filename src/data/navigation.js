import { slugify } from "../utils/slugify"

export const topBarLinks = [
  { label: "Faculty Login", href: "#" },
  { label: "Student Login", href: "#" },
  { label: "Contact Us", href: "#" },
]

function navItem(label, dropdownLabels = []) {
  const path = `/${slugify(label)}`
  const dropdown = dropdownLabels.map((childLabel) => ({
    label: childLabel,
    path: `${path}/${slugify(childLabel)}`,
  }))

  return { label, path, dropdown: dropdown.length ? dropdown : undefined }
}

export const primaryNav = [
  { label: "Home", path: "/" },
  navItem("About IEM UEM Group", ["Overview", "Chairman's Message", "Vision & Mission", "Governing Body"]),
  navItem("Admission", ["UG Admission", "PG Admission", "Ph.D Admission", "Scholarship"]),
  navItem("IEMJEE 2026"),
  navItem("UEM Jaipur Campus"),
  navItem("UEM Kolkata Campus"),
  navItem("Conferences"),
]

export const secondaryNav = [
  navItem("UEM Kolkata", ["Departments", "Faculty", "Facilities", "Placements"]),
  navItem("UEM Jaipur", ["Departments", "Faculty", "Facilities", "Placements"]),
  navItem("Approvals", ["UGC", "AICTE", "NAAC"]),
  navItem("News & Achievements", ["Latest News", "Achievements", "Press Release"]),
  navItem("Gallery", ["Photo Gallery", "Video Gallery"]),
  navItem("LMS"),
  navItem("AI Tutor"),
  navItem("Alumni"),
  navItem("Patent and Project", ["Patents", "Projects", "Research Papers"]),
]
