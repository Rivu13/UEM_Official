import { slugify } from "../utils/slugify"
import placeholderImage from "../assets/images/news-placeholder.jpg"

export const ITEMS_PER_PAGE = 6

// "Conferences" is intentionally excluded — it already has its own fully-built
// section at src/pages/ConferencesPage.jsx / ConferenceDetailPage.jsx.
export const NEWS_ACHIEVEMENTS_SECTION_LABELS = [
  "News & Articles",
  "University Daily News",
  "Industry visits & interactions",
  "Community Development",
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
]

// Add a real post to any section by pushing an object into that section's array below
// (or replacing a placeholder one) — { slug, title, excerpt, description, date, tags, gallery }.
// `gallery` is an array of imported images; drop in as many as you like.
// The list page and detail page both read from this file, so no other file needs to change.
function buildPlaceholderItems(label) {
  const base = slugify(label)
  return Array.from({ length: 7 }, (_, i) => ({
    slug: `${base}-${i + 1}`,
    title: `${label} — Placeholder Post ${i + 1}`,
    excerpt: "Placeholder — replace with the real summary.",
    description: "Placeholder — replace with the real description.",
    date: "Placeholder date",
    tags: [label],
    gallery: [placeholderImage],
  }))
}

export const newsAchievementsSections = NEWS_ACHIEVEMENTS_SECTION_LABELS.map((label) => ({
  slug: slugify(label),
  label,
  items: buildPlaceholderItems(label),
}))

export function getNewsAchievementsSection(sectionSlug) {
  return newsAchievementsSections.find((section) => section.slug === sectionSlug)
}
