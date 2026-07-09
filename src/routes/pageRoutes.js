import { primaryNav, secondaryNav } from "../data/navigation"
import { footerColumns } from "../data/footer"

function flattenNavRoutes(items) {
  return items.flatMap((item) => {
    const ownRoute = item.path === "/" ? [] : [{ path: item.path, title: item.label }]
    const childRoutes = item.dropdown?.map((child) => ({ path: child.path, title: child.label })) ?? []
    return [...ownRoute, ...childRoutes]
  })
}

function flattenFooterRoutes() {
  return footerColumns.flatMap((column) => column.links.map((link) => ({ path: link.path, title: link.label })))
}

const allRoutes = [...flattenNavRoutes(primaryNav), ...flattenNavRoutes(secondaryNav), ...flattenFooterRoutes()]

// Dedupe by path — nav and footer both link to a few of the same destinations (e.g. "UEM Kolkata").
export const pageRoutes = [...new Map(allRoutes.map((route) => [route.path, route])).values()]
