import { slugify } from "../utils/slugify"

export const topBarLinks = [
  { label: "Faculty Login", href: "#" },
  { label: "Student Login", href: "#" },
  { label: "Contact Us", href: "#" },
]

function navItem(label, dropdownLabels = [], options = {}) {
  const path = `/${slugify(label)}`
  const dropdown = dropdownLabels.map((childLabel) => ({
    label: childLabel,
    path: `${path}/${slugify(childLabel)}`,
  }))

  return {
    label,
    path,
    dropdown: dropdown.length ? dropdown : undefined,
    linkable: options.linkable !== false,
  }
}

export const primaryNav = [
  { label: "Home", path: "/", linkable: true },
  navItem("About IEM UEM Group", ["About Us", "Management", "Vision & Mission"], { linkable: false }),
  navItem("Admission", ["Admissions", "Provisional Admission"], { linkable: false }),
  navItem("IEMJEE 2026"),
  navItem("UEM Jaipur Campus"),
  navItem("UEM Kolkata Campus"),
  navItem("Conferences"),
]

export const secondaryNav = [
  navItem("UEM Kolkata", [
    "Placements",
    "Courses",
    "Syllabus",
    "Scholarships",
    "Academic Calendar",
    "Holiday List",
    "Why UEM?",
    "3 Continent (3C) Programmes",
    "Study Abroad Program (SAP)",
  ]),
  navItem("UEM Jaipur", [
    "Placements",
    "Courses",
    "Syllabus",
    "Lesson Plan",
    "Laboratories",
    "Faculty",
    "Scholarships",
    "Academic Calendar",
    "Holiday List",
    "Why UEM?",
    "ACM Student Chapter",
    "UEM Aeromodelling Club",
    "Institute of Engineering and Management, Jaipur",
    "Continent (3C) Programmes",
    "Study Abroad Program (SAP)",
  ]),
  navItem("Approvals", ["UEM Jaipur", "UEM Kolkata"]),
  navItem("News & Achievements", [
    "News & Articles",
    "University Daily News",
    "Industry visits & interactions",
    "Community Development",
    "Conferences",
    "Workshops & Seminars",
    "Faculty Development Programs",
    "Upcoming Events",
    "Awards & Achievements",
    "Academic visits & interactions",
    "Alumni Interactions",
    "Fests",
    "Sports",
    "Regular Placement Activities",
    "Other events",
  ], { linkable: false }),
  navItem("Gallery", ["Photo Gallery", "Video Gallery"]),
  navItem("LMS"),
  navItem("AI Tutor"),
  navItem("Alumni"),
  navItem("Patent and Project", ["Patents", "Projects", "Research Papers"]),
]
