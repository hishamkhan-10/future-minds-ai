# CLEANING.md — Confirmed Safe-to-Remove Items

Every item listed below is confirmed unused in the current codebase. Removal will not
change any visual output, behavior, build, or runtime in any way.

---

## 1. Entire files with no active purpose

| File | Reason |
|------|--------|
| `Enroll button.md` | A completed task/plan document detailing removal of the Enroll Now button. The described removals were already executed — the Enroll Now button, SignInPage, SignUpPage, `/signin` and `/signup` routes, and related CSS no longer exist. This document is a historical artifact with no active purpose. |
| `src/hooks/useCountUp.ts` | Exports `useCountUp` — a count-up animation hook. Never imported by any component. The `stats` data in `siteData.tsx` (which would drive it) is also unused (see below). |
| `homepage-test.spec.ts` | Playwright test suite (680 lines, 27 tests). References many UI elements that no longer exist in the app: `#courses` section, `.course-filters`, `.filter-tab`, `.carousel-arrow`, `.carousel-dot`, `.course-card`, `.hero-cta` buttons ("See Upcoming Courses", "View Pricing"), `.cta-banner .btn-outline-white` ("Browse Courses"), `.footer-links a` with text "Courses"/"Blog"/"Free Guides"/"Community"/"Career Center", and `.nav-link` with text "Courses". Approximately half the tests would fail immediately. This test file was written for a previous version of the app that had a courses section and hero CTA buttons. |

---

## 2. Unused imports

| File | Line | Import | Reason |
|------|------|--------|--------|
| `src/components/Hero.tsx` | 2 | `import Button from './ui/Button';` | `Button` is imported but never used in the JSX. The Hero component renders a heading and subtitle only — there are no `<Button>` elements. |

---

## 3. Unused data exports in `src/data/siteData.tsx`

| Export | Lines | Reason |
|--------|-------|--------|
| `courses` (array of 6 `Course` objects) | 13–61 | Never imported by any component. The app has no courses section (`#courses`), no course cards, no course filters, and no course carousel. The `CourseCurriculum` component uses its own inline `curriculumData`, not this `courses` array. |
| `stats` (array of 3 `Stat` objects) | 119–123 | Never imported by any component. The `useCountUp` hook that would animate these stats is also unused. |
| `whyUsItems` (array of 6 `WhyUsItem` objects) | 125–176 | Never imported by any component. The `WhyThisCourseIsDifferent` component defines its own inline `advantages` array and does not use `whyUsItems`. |

---

## 4. Unused type exports in `src/types/index.ts`

| Export | Lines | Reason |
|--------|-------|--------|
| `Course` interface | 1–11 | Only referenced by the `courses` export in `siteData.tsx`, which is itself unused (see above). No component imports or uses `Course`. |
| `Stat` interface | 24–30 | Only referenced by the `stats` export in `siteData.tsx`, which is itself unused. No component imports or uses `Stat`. |
| `WhyUsItem` interface | 32–38 | Only referenced by the `whyUsItems` export in `siteData.tsx`, which is itself unused. No component imports or uses `WhyUsItem`. |

---

## 5. Unused CSS classes in `src/App.css` (conservative — confirm visually before removing)

These CSS rules target class names that have no matching HTML elements in any component.
Removing them will not change any rendered output because no element ever triggers these
selectors.

| CSS selector(s) | Approx. lines | Reason |
|-----------------|---------------|--------|
| `.hero-logo`, `.hero-logo img` | ~345–351 | No element anywhere uses the class `hero-logo`. The Hero component does not render a logo image. |
| `.hero-cta`, `.hero-cta .btn-outline`, `.hero-cta .btn-outline:hover` | ~359–370 | No element uses the class `hero-cta`. The Hero component has no CTA button row. |
| `.advantage-icon`, `.advantage-icon svg` (including the `@media (max-width: 480px)` rules) | ~867–868, ~903–907 | The `WhyThisCourseIsDifferent` component renders `.advantage-card` elements but never renders a `.advantage-icon` div. The icon SVG is part of the inline `advantages` data but is not wrapped in a `.advantage-icon` container. |
| `.nav-menu > li > .nav-cta` and its `::after` shimmer animation + `@keyframes ctaShimmer` | inside the `@media (max-width: 1024px)` block (~3110–3139) | The Enroll Now button was already removed from `Navbar.tsx`. There is no `.nav-cta` element inside the mobile drawer menu. |

---

## 6. Unused variant type in `src/components/ui/Button.tsx`

| Item | Reason |
|------|--------|
| `'secondary'` in the `variant` type union (line 4) | No CSS class `btn-secondary` exists anywhere in `App.css`. No component ever passes `variant="secondary"`. A button with this variant would render with no styling. The type literal `'secondary'` has zero runtime effect and no supporting CSS. |

Note: `'outline'` and `'outline-white'` are also unused in JSX, but their CSS classes
(`.btn-outline`, `.btn-outline-white`) do exist in `App.css`. They are kept out of an
abundance of caution — removing types without removing matching CSS creates a maintenance
inconsistency.

---

## Summary

| Category | Count |
|----------|-------|
| Entire files | 3 |
| Unused imports | 1 |
| Unused data exports (objects) | 3 |
| Unused type exports (interfaces) | 3 |
| Unused CSS blocks | 4 |
| Unused variant type | 1 |
| **Total items** | **15** |
