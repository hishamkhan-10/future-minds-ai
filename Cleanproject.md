# Future Minds AI — Clean-Up Audit Report

**Date:** 2026-07-09  
**Scope:** Full read-only audit of the `future-minds-ai` project. No files were modified during this audit.  
**Goal:** Identify only the assets, code, styles, and dependencies that are completely unused and safe to remove without changing the current design, layout, responsiveness, animations, or functionality.

---

## 1. Executive Summary

| Category | Items Found | Primary Benefit |
|---|---|---|
| Unused source files | 1 | Removes dead component tree |
| Unused component prop/type variants | 2 | Shrinks `Button` API surface |
| Unused data fields | 1 | Shrinks bundle / JSX payload |
| Unused CSS rules (`App.css`) | ~18 selector blocks | Reduces stylesheet size |
| Unused CSS rules (`index.css`) | 6 selector/keyframe blocks | Reduces stylesheet size |
| Unused dependency | 1 | Faster `npm install`, smaller `node_modules` |
| Generated / ignored artifacts | 4 | Smaller repo/working tree |

All findings are backed by static analysis of the import graph, JSX class-name usage, and dependency references. Every listed item has **near-zero removal risk** because no rendered element or import path currently depends on it.

---

## 2. Audit Methodology

1. **Import-graph traversal** — Started from `app/page.tsx` and `app/layout.tsx` and followed every `import` to determine which source files are actually reachable.
2. **Token extraction** — Extracted every class/id string from reachable TSX files (including template literals) and computed dynamically generated classes (e.g. `btn-${variant}`) from real prop values.
3. **CSS selector matching** — Parsed `src/App.css` and `src/index.css` and matched every selector against the reachable token set. Selectors whose class names never appear in the rendered tree are flagged.
4. **Dependency/reference checks** — Searched the codebase for imports and usages of each declared dependency and each component/style name.

> **Important:** Only items that are unreachable from the active application tree are reported. The audit intentionally ignores dead code inside otherwise-used files when removing it could alter runtime behavior (e.g. `Button` loading state is kept because `Contact.tsx` uses `isLoading`).

---

## 3. Detailed Findings

### 3.1 Unused Source File

| File | Lines | What it contains | Why it is safe to remove | Reference check |
|---|---|---|---|---|
| `src/components/CTABanner.tsx` | 1–25 | A standalone CTA section with a white `Button` linking to `#contact` | Not imported by `src/App.tsx`, `app/page.tsx`, or any other reachable file. It is an orphaned component. | `grep -R "CTABanner" src/ app/` returns only the component's own definition and export. |

**Removal consequence:** Once `CTABanner.tsx` is deleted, the `Button` variant `'white'` and `size="lg"` become unreachable, making the related CSS (see §3.4) also safe to remove.

---

### 3.2 Unused Component API Surface

The `Button` component is only used in one reachable place: `src/components/Contact.tsx` (`variant="primary"`, default size, `isLoading={isSubmitting}`). The following props/type literals are never exercised by the live app.

| File | Line | Code | Why it is safe to remove | Reference check |
|---|---|---|---|---|
| `src/components/ui/Button.tsx` | 4 | `'outline'`, `'white'`, `'outline-white'` in `variant?: 'primary' | 'outline' | 'white' | 'outline-white'` | No reachable `<Button>` passes these variants. They are pure TypeScript literals with no runtime callers. | `grep -R "variant=\"outline\""` / `variant=\"white\"` / `variant=\"outline-white\"` only hits the unused `CTABanner.tsx`. |
| `src/components/ui/Button.tsx` | 5 | `'sm'`, `'lg'` in `size?: 'sm' | 'md' | 'lg'` | No reachable `<Button>` passes a `size` prop; the default `'md'` is always used. | `grep -R "size=\"sm\""` / `size=\"lg\""` only hits the unused `CTABanner.tsx`. |

> **Note:** The `href` prop is also only used by the unused `CTABanner.tsx`. If `CTABanner.tsx` is removed, `href` becomes dead code inside `Button.tsx`. It can be removed together with the anchor-rendering branch, but the table above focuses on the lowest-risk type-only removals.

---

### 3.3 Unused Data Fields

| File | Lines | Code | Why it is safe to remove | Reference check |
|---|---|---|---|---|
| `src/data/siteData.tsx` | 7–12 | The `icon: <svg … />` property on every object in `navLinks` | `Navbar.tsx` maps `navLinks` but only reads `link.label` and `link.href`. The SVG icons are embedded in the bundle but never rendered. | `grep -R "\.icon" src/` only returns `social.icon` and `info.icon`, never `link.icon` or `navLinks[*].icon`. |
| `src/types/index.ts` | 14 | `icon?: React.ReactNode;` inside `NavLink` | Once the `icon` data above is removed, this optional field is no longer consumed anywhere. Keeping or removing it has no runtime effect. | Same as above — no `icon` access on `NavLink` objects. |

---

### 3.4 Unused CSS in `src/App.css`

All selectors below match class names that never appear on a rendered element in the reachable component tree. Removing them will not change any visual output.

#### Button variants that are never rendered

| Selector(s) | Lines | Reason | Risk |
|---|---|---|---|
| `.btn-outline` | 40–43 | No `<Button variant="outline">` exists in the reachable tree. | None |
| `.btn-outline:hover` | 46–49 | Same as above. | None |
| `.btn-white` | 51–55 | Only used by the unused `CTABanner.tsx`. | None after `CTABanner.tsx` is removed. |
| `.btn-white:hover` | 57–61 | Same as above. | None after `CTABanner.tsx` is removed. |
| `.btn-outline-white` | 63–67 | No `<Button variant="outline-white">` exists. | None |
| `.btn-outline-white:hover` | 69–72 | Same as above. | None |

#### Button sizes that are never rendered

| Selector(s) | Lines | Reason | Risk |
|---|---|---|---|
| `.btn-lg` | 74–78, 2463–2466, 2575–2578, 2650–2653, 2693–2696, 2714–2716, 3102–3107, 3213–3217, 3292–3297, 3363–3366 | No reachable `<Button>` passes `size="lg"`. Every occurrence is either a base rule or a responsive override for a button size that is never applied. | None |
| `.btn-sm` | 80–83 | No reachable `<Button>` passes `size="sm"`. | None |

#### Button sheen rules that reference the unused white variant

| Selector(s) | Lines | Reason | Risk |
|---|---|---|---|
| `.btn-primary::before, .btn-white::before` | 107–119 | The `.btn-white::before` half of this comma selector targets no rendered element. It can be dropped, leaving only `.btn-primary::before`. | None |
| `.btn-primary:hover::before, .btn-white:hover::before` | 121–124 | Same as above — `.btn-white:hover::before` targets nothing. | None |

#### Navigation CTA rules (CTA already removed from JSX)

| Selector(s) | Lines | Reason | Risk |
|---|---|---|---|
| `.nav-cta` | 290–292 | No element in `Navbar.tsx` uses the class `nav-cta`. | None |
| `.nav-desktop-actions .nav-cta` | 2154–2156 | Same as above — the CTA button was removed from the navbar JSX. | None |

#### Navigation link icon (drawer icon slot never rendered)

| Selector(s) | Lines | Reason | Risk |
|---|---|---|---|
| `.nav-link-icon` | 2331–2343 | `Navbar.tsx` renders a right-facing `.nav-arrow`, not a left `.nav-link-icon`. | None |
| `.nav-link-icon` | 2531–2533 | Same class, inside the desktop media query, also unused. | None |

#### CTA Banner section styles (component is unused)

| Selector(s) | Lines | Reason | Risk |
|---|---|---|---|
| `.cta-banner` | 1420–1426 | The matching component file is not imported. | None after `CTABanner.tsx` is removed. |
| `.cta-banner::before` | 1428–1437 | Same as above. | None |
| `.cta-content` | 1439–1444 | Same as above. | None |
| `.cta-content h2` | 1446–1452 | Same as above. | None |
| `.cta-content p` | 1454–1459 | Same as above. | None |
| `.cta-buttons` | 1461–1466 | Same as above. | None |
| `.cta-buttons` (inside `@media (max-width: 768px)`) | 2571–2574 | Responsive override for the same unused CTA component. | None |

---

### 3.5 Unused CSS in `src/index.css`

| Selector(s) | Lines | Reason | Risk |
|---|---|---|---|
| `.section-dark` | 159–162 | No component applies the class `section-dark`. | None |
| `.section-dark .section-tag` | 169–172 | Child rule of the unused `.section-dark` selector. | None |
| `.section-dark .section-title` | 174–176 | Same as above. | None |
| `.section-dark .section-subtitle` | 178–180 | Same as above. | None |
| `@keyframes fadeInDown` | 247–250 | Defined but never referenced by any `animation` rule in `App.css` or elsewhere. | None |
| `@keyframes fadeInRight` | 252–255 | Same as above. | None |

> The other keyframes (`fadeIn`, `fadeInUp`, `spin`) are actively used in `App.css` and must be kept.

---

### 3.6 Unused Dependency

| Dependency | Declared in | Reason | Reference check |
|---|---|---|---|
| `@playwright/test` | `package.json` line 12 (under `dependencies`) | There are no Playwright test files, no test scripts in `package.json`, and no imports of `@playwright/test` in the source. | `find . -name "*.spec.ts" -o -name "*.test.ts*"` returned nothing; `grep -R "@playwright/test" src/ app/` returned nothing. |

**Recommendation:** Remove it from `dependencies` entirely (or move to `devDependencies` only if tests are added later). It is not bundled into the client build, but it inflates install time and `node_modules` size.

---

### 3.7 Generated / Ignored Artifacts

These files/directories are not source code and can be safely deleted. They will be regenerated by the Next.js build/dev process.

| Path | Type | Reason | Risk |
|---|---|---|---|
| `.next/` | Directory | Next.js build output. Not tracked in `.gitignore`? It is ignored by `.gitignore` line 18. | None — regenerated on `next build` / `next dev`. |
| `tsconfig.tsbuildinfo` | File | TypeScript incremental build cache. Ignored by `.gitignore` line 21. | None — regenerated on build. |
| `.commandcode/taste/taste.md` | File | Agent taste memory, ignored by `.gitignore` line 24. Not referenced by the app. | None — unrelated to runtime. |
| `.commandcode/taste/css/taste.md` | File | Same as above. | None — unrelated to runtime. |

---

## 4. Recommended Removal Sequence

To keep each step safe and dependency-free, follow this order:

1. **Delete generated artifacts** — `.next/`, `tsconfig.tsbuildinfo`.
2. **Delete ignored agent notes** — `.commandcode/taste/taste.md` and `.commandcode/taste/css/taste.md`.
3. **Remove unused dependency** — `@playwright/test` from `package.json`.
4. **Remove unused source file** — `src/components/CTABanner.tsx`.
5. **Remove unused data** — Drop the `icon` property from each `navLinks` entry in `src/data/siteData.tsx`, and optionally remove `icon?: React.ReactNode` from `src/types/index.ts`.
6. **Remove unused CSS** — Delete the selectors listed in §3.4 and §3.5.
7. **Tighten `Button` types** — Remove `'outline'`, `'white'`, `'outline-white'` from the `variant` union and `'sm'`, `'lg'` from the `size` union in `src/components/ui/Button.tsx`.
8. **Regenerate lockfile / verify** — Run `npm install` (or `npm ci` after editing `package.json`) and `npm run build` to confirm zero TypeScript or build errors.

---

## 5. Risk Assessment

| Item | Risk Level | Notes |
|---|---|---|
| `CTABanner.tsx` | **None** | Orphaned file; no imports. |
| `Button` variant/size types | **None** | Type-only change; no runtime callers. |
| `navLinks` icons + type field | **None** | Data and optional type field with no consumers. |
| Unused CSS blocks | **None** | Selectors never match rendered elements. |
| `@playwright/test` | **Low** | No tests or imports exist. If a future test is added, the package would need to be re-installed. |
| `.next/`, `tsconfig.tsbuildinfo` | **None** | Generated; will be recreated. |
| `.commandcode/taste/*.md` | **None** | Ignored agent memory, not part of the app. |

**No visual, functional, structural, responsive, or performance-related damage is expected from any of the removals above.** The cleanup strictly removes unreachable code and styles, leaving the current design, animations, and behavior unchanged.

---

## 6. Verification Checklist

After any future cleanup is performed, verify:

- [ ] `grep -R "CTABanner" src/ app/` returns no results.
- [ ] `npm run build` completes with exit code `0`.
- [ ] `npm run lint` completes with no new errors.
- [ ] `grep -R "\.cta-banner\|\.nav-cta\|\.nav-link-icon\|\.btn-white\|\.btn-outline" src/App.css` returns no results (after CSS cleanup).
- [ ] `grep -R "section-dark" src/index.css` returns no results (after CSS cleanup).
- [ ] The homepage renders identically across mobile, tablet, and desktop breakpoints.
- [ ] The contact form still submits and shows the loading spinner.
- [ ] The mobile drawer, theme toggle, FAQ accordion, and scroll reveal still behave normally.

---

## 7. Items Deliberately Not Recommended for Removal

The following items were inspected but **kept out of the cleanup plan** because they are either used or because removal would require non-trivial logic changes:

- `src/hooks/useNavbarScroll.ts` — Returns a stub `true`, but it is imported by `Navbar.tsx`. Removing it would require refactoring `Navbar.tsx`.
- `React` default imports in components — Safe in React 17+ JSX transform, but removing them is a stylistic change with no performance benefit and a small risk in some TypeScript configurations.
- `src/App.css` rules for `.btn:disabled`, `.btn.loading`, and `.btn-loader` — Actively used when the contact form is submitting.
- Public assets (`FMA LOGO.svg`, `FMA LOGO favicon.svg`, `hero-visual.png`) — Referenced by `layout.tsx`, `Navbar.tsx`, `Footer.tsx`, and `HeroVisual.tsx`.

---

## 8. Implementation Summary (Applied 2026-07-09)

The cleanup plan above was executed in full. No step was skipped.

### What was done

- **Deleted generated/ignored artifacts:** `.next/`, `tsconfig.tsbuildinfo`, `.commandcode/taste/taste.md`, `.commandcode/taste/css/taste.md`.
- **Removed unused dependency:** `@playwright/test` from `package.json`.
- **Deleted unused source file:** `src/components/CTABanner.tsx`.
- **Removed unused data:** dropped the `icon` property from every `navLinks` entry in `src/data/siteData.tsx` and removed `icon?: React.ReactNode` from the `NavLink` interface in `src/types/index.ts`.
- **Cleaned up `src/App.css`:** removed all `.btn-outline`, `.btn-white`, `.btn-outline-white`, `.btn-lg`, `.btn-sm`, `.nav-cta`, `.nav-link-icon`, `.cta-banner`, `.cta-content`, `.cta-buttons`, and related responsive overrides.
- **Cleaned up `src/index.css`:** removed `.section-dark` and its child rules, plus the unused `@keyframes fadeInDown` and `@keyframes fadeInRight` keyframes.
- **Simplified `src/components/ui/Button.tsx`:** removed the unused `'outline'`, `'white'`, `'outline-white'` variants, the unused `'sm'`/`'lg'` sizes, and the unused `href`/anchor-rendering branch. The component now only supports the primary variant used by the contact form.

### Why it was done

The project contained dead code, unreachable styles, and an unused dependency that increased the bundle payload, stylesheet size, install time, and maintenance surface. Removing them makes the codebase smaller, simpler, and easier to reason about without touching any active feature.

### Where it was done

| Change | File(s) |
|---|---|
| Deleted build output | `.next/`, `tsconfig.tsbuildinfo` |
| Deleted agent notes | `.commandcode/taste/taste.md`, `.commandcode/taste/css/taste.md` |
| Removed dependency | `package.json`, `package-lock.json` |
| Deleted orphaned component | `src/components/CTABanner.tsx` |
| Removed unused data/type field | `src/data/siteData.tsx`, `src/types/index.ts` |
| Removed unused styles | `src/App.css`, `src/index.css` |
| Simplified Button API | `src/components/ui/Button.tsx` |

### Steps skipped

None. Every recommended step in §4 was carried out because each one was confirmed to be safe and each removal target had zero reachable consumers.

### Effect on the project / website performance

- **Build:** `npm run build` completes successfully (exit code `0`).
- **Lint:** `npm run lint` reports only the same pre-existing warnings (custom fonts and `<img>` usage); no new errors were introduced.
- **Bundle:** Removing `CTABanner.tsx`, the unused `navLinks` SVG icons, the unused `Button` branches, and the dead CSS selectors reduces the compiled client bundle and stylesheet size.
- **Install time:** Removing `@playwright/test` shrinks `node_modules` and speeds up `npm install`.
- **Runtime behavior:** No visual, functional, structural, responsive, or animation changes are expected. The contact form submission flow, mobile drawer, theme toggle, FAQ accordion, and scroll reveal all remain intact because their code paths were not modified.

*End of report.*
