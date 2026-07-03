# Enroll Now Button & Authentication Windows — Removal Plan

## Overview

This document provides a step-by-step plan to safely remove the **Enroll Now** button and all associated Sign In / Sign Up windows, pages, routes, styles, handlers, tests, and documentation references from the project. Every removal is scoped to the minimum necessary — nothing unrelated will be touched.

---

## Inventory: Every File Touched by This Feature

### Files to delete entirely (6 files)

| # | File | Reason |
|---|------|--------|
| 1 | `app/signin/page.tsx` | Next.js route at `/signin` — imports `SignInPage` dynamically |
| 2 | `app/signup/page.tsx` | Next.js route at `/signup` — imports `SignUpPage` dynamically |
| 3 | `src/components/SignInPage.tsx` | Full Sign In screen component (227 lines) |
| 4 | `src/components/SignUpPage.tsx` | Full Sign Up screen component (327 lines) |
| 5 | `signin-test.spec.ts` | Playwright test file for Sign In (11 tests, 183 lines) |
| 6 | `signup-test.spec.ts` | Playwright test file for Sign Up (13 tests, 255 lines) |

### Files to edit (4 files)

| # | File | What to remove |
|---|------|----------------|
| 1 | `src/components/Navbar.tsx` | Enroll Now button code (2 button instances + 1 handler + 1 comment + 2 affected lines for state/cleanup) |
| 2 | `src/App.css` | `.nav-cta` nav rule (line 3111) + entire SIGN IN PAGE CSS section (lines ~3117 to ~4320) + dark theme `.signin-*` overrides within that block |
| 3 | `homepage-test.spec.ts` | Test #4 "Enroll Now button navigates to /signin" (lines ~177–187) |
| 4 | `README.md` | `/signin, /signup` references in the "Project Structure" section (line 28) |

### Files that must NOT be changed (3 critical files)

| # | File | Why it stays untouched |
|---|------|------------------------|
| 1 | `src/components/ui/Button.tsx` | Reusable Button component used across the entire app (hero CTAs, newsletter, etc.). Removing it would break the whole project. |
| 2 | `src/components/Hero.tsx` | Line 96 has a comment mentioning "sign-in / sign-up overlay background" and the hero contains an SVG with class `hero-bg-svg--signin`. **This is a hero visual decoration**, not part of the auth system. The class name is misleading but the SVG is an independent gradient background for the hero on small screens — it does NOT depend on SignInPage or SignUpPage. Do NOT touch this file. |
| 3 | `src/App.css` (hero section) | The `.hero-bg-svg--signin` CSS rule at line 438 is for the hero's responsive background SVG. It is completely separate from the SIGN IN PAGE section. Do NOT remove it. |

---

## Step-by-Step Removal Plan

### Step 1 — Delete route files

Delete both Next.js App Router page files. These are thin wrappers (13 lines each) that dynamically import the sign-in/up components. Removing them makes `/signin` and `/signup` return 404s.

- Delete `app/signin/page.tsx`
- Delete `app/signup/page.tsx`
- Delete the now-empty `app/signin/` and `app/signup/` directories

**No other routes or pages are affected.**

### Step 2 — Delete component files

Delete the core authentication components. These are self-contained and imported nowhere else.

- Delete `src/components/SignInPage.tsx`
- Delete `src/components/SignUpPage.tsx`

**Verification:** Grep for `SignInPage` and `SignUpPage` across the codebase. The only remaining references should be in test files (handled in Step 4) and these files themselves.

### Step 3 — Edit Navbar.tsx (remove the Enroll Now button)

`src/components/Navbar.tsx` needs these precise edits:

**3a. Remove the unused `Button` import (line 7):**
```diff
- import Button from './ui/Button';
```

**3b. Remove the `handleEnrollClick` handler and its comment (lines 15–23):**
```diff
-  // "Enroll Now" navigates to the dedicated /signin route (client-side, no
-  // reload) instead of toggling an in-page modal. Nothing else in the navbar
-  // is affected.
-  const handleEnrollClick = useCallback(
-    (e: React.MouseEvent) => {
-      e.preventDefault();
-      setMenuOpen(false); // close the mobile drawer if it was open
-      router.push('/signin');
-    },
-    [router],
-  );
```

**3c. Remove the Enroll Now button inside the mobile drawer (lines ~345–350):**
```diff
-          <li>
-            <Button
-              variant="primary"
-              size="sm"
-              className="nav-cta"
-              onClick={handleEnrollClick}
-            >
-              Enroll Now
-            </Button>
-          </li>
```

**3d. Remove the Enroll Now button inside the desktop actions div (lines ~357–365):**
```diff
-          <Button
-            variant="primary"
-            size="sm"
-            className="nav-cta"
-            onClick={handleEnrollClick}
-          >
-            Enroll Now
-          </Button>
```

**3e. Remove unused imports that were only needed by the handler:**
The `useCallback` import is used elsewhere in the file (for `handleToggle`, `handleLinkClick`, `handleTouchStart`, `handleTouchMove`, `handleTouchEnd`), so it stays. The `useRouter` import is also used by the `handleEnrollClick` handler but is needed nowhere else in Navbar. **However** — check carefully: `useRouter` is imported at line 2 and only used in `handleEnrollClick`. After removing the handler, `useRouter` becomes unused.

```diff
- import { useRouter } from 'next/navigation';
```
But double-check: does anything else in Navbar use `router`? Looking at the code... no — `router` is only used inside `handleEnrollClick`. So remove the `useRouter` import and the `const router = useRouter();` line.

```diff
-  const router = useRouter();
```

Wait — let me re-read. `useRouter` is imported from `'next/navigation'`. Does any other import in Navbar.tsx come from `'next/navigation'`? No.

**Final Navbar removals:**
- Line 2: `import { useRouter } from 'next/navigation';`
- Line 7: `import Button from './ui/Button';`
- Line 12: `const router = useRouter();`
- Lines 15–23: The `handleEnrollClick` comment + handler
- Lines ~345–350: Mobile drawer `<li><Button ...>Enroll Now</Button></li>`
- Lines ~357–365: Desktop `<Button ...>Enroll Now</Button>`

### Step 4 — Edit App.css (remove sign-in/sign-up styles)

`src/App.css` needs two precise removals:

**4a. Remove the `.nav-cta` rule inside the mobile nav section (around line 3111):**
```css
  .nav-menu > li > .nav-cta {
    margin: 12px 24px;
    width: calc(100% - 48px);
    justify-content: center;
  }
```
This is a standalone block of 6 lines inside a `@media (max-width: 1024px)` section. Remove it cleanly — the surrounding `.nav-link.active` rule and the closing brace must stay intact.

**4b. Remove the entire SIGN IN PAGE CSS section (lines ~3117 to ~4320):**
This section starts with:
```css
/* ============================================
   SIGN IN PAGE
   ============================================ */
```
And runs to the end of the file (approximately line 4320). This is a contiguous block that contains:
- `.signin-overlay` — the fixed full-screen overlay
- `.signin-bg` / `.signin-bg-svg` — wave SVG background
- `.signin-back` — the back button
- `.signin-stack` — the flex column wrapper
- `.signin-brand` / `.signin-brand-name` / `.signin-brand-tag` — brand lockup
- `.signin-card` — the white card
- `.signin-title` / `.signin-subtitle` — headings
- `.signin-form` / `.signin-group` / `.signin-field` / `.signin-field-icon` — form elements
- `.signin-password-toggle` — password visibility toggle
- `.signin-remember` — checkbox
- `.signin-submit` — submit button
- `.signin-passkey` — passkey button
- `.signin-footer` — footer link text
- `.signin-legal` — legal line
- `.signin-error` — validation error message
- `[data-theme='dark']` overrides for all the above (~70 lines of dark theme)
- `.signup-page.signin-overlay` — sign-up-specific overrides
- All responsive breakpoints for sign-in/sign-up (wide-but-short, mobile ≤767px, short ≤600px, ≤580px, etc.)

**Critical boundary check:** The CSS file ends with the sign-in responsive overrides. There is nothing after this section. Removing lines 3117–EOF should be safe.

**Verify:** Do a visual diff or grep for `.signin-` and `.signup-page` in `App.css` after removal to confirm zero remaining references.

### Step 5 — Edit homepage-test.spec.ts (remove the Enroll Now test)

Remove test #4 (lines ~176–187):
```typescript
  // ─────────────────────────────────────────────────────────────────────────
  // NAVBAR — ENROLL NOW BUTTON
  // ─────────────────────────────────────────────────────────────────────────
  test('4. Enroll Now button navigates to /signin', async ({ page }) => {
    const enrollBtn = page.locator('.nav-cta');
    await expect(enrollBtn).toBeVisible();
    await expect(enrollBtn).toContainText('Enroll Now');

    await enrollBtn.click();

    await page.waitForURL(`${BASE}/signin`);
    await expect(page.locator('.signin-overlay')).toBeVisible();
    console.log('✓ Enroll Now navigated to /signin');
  });
```

The remaining tests (1–3 and 5–N) are completely independent. Do not renumber tests — the test numbers can stay as-is with a gap at 4, or renumber if desired (but that's cosmetic and optional).

### Step 6 — Delete test files

- Delete `signin-test.spec.ts`
- Delete `signup-test.spec.ts`

### Step 7 — Edit README.md

Line 28 currently reads:
```
app/                # Next.js App Router pages (layout, homepage, /signin, /signup)
```
Change to:
```
app/                # Next.js App Router pages (layout, homepage)
```

---

## Verification Checklist

After completing all steps, run these checks:

1. **Build check:** `npm run build` — should succeed with no errors
2. **Type check:** `npx tsc --noEmit` — no type errors
3. **Navbar renders:** Start dev server and confirm the navbar shows all navigation links, logo, hamburger menu, and dark mode toggle — just no Enroll Now button
4. **404 on /signin:** Navigating to `http://localhost:3000/signin` returns a Next.js 404 page
5. **404 on /signup:** Navigating to `http://localhost:3000/signup` returns a Next.js 404 page
6. **Remaining tests pass:** Run `npx playwright test homepage-test.spec.ts` — all non-Enroll tests still pass
7. **Grep for leftovers:** Search the entire codebase for:
   - `Enroll Now` — should find zero matches
   - `signin-overlay` — should find zero matches outside of Hero comments
   - `signin-page\|signup-page` — should find zero matches

---

## Warnings & Guardrails

| ⚠️ Do NOT touch | Why |
|------------------|-----|
| `src/components/ui/Button.tsx` | Shared Button component — used by Hero CTA, newsletter forms, and every other button in the app |
| `src/components/Hero.tsx` | Contains a hero visual with a misleading class name (`hero-bg-svg--signin`). This is an independent gradient SVG for the hero section on small screens, NOT part of authentication |
| `.hero-bg-svg--signin` CSS rule (App.css line ~438) | Hero responsive background — separate from the SIGN IN PAGE section |
| `src/App.tsx` | Main app component — does not import or reference any sign-in/sign-up components |
| `src/hooks/*` | Custom hooks (`useNavbarScroll`, `useTheme`) — no auth dependency |
| `src/data/siteData.ts` | Site data — no auth references |
| `src/index.css` | Global styles — no auth-specific rules |
| Any other test files | No other test files reference auth components |
| `.playwright.config` or test setup files | No auth-specific configuration |

---

## Dependency Isolation

- **No npm packages** need to be uninstalled — the auth UI had no external auth library dependency (no NextAuth, Clerk, Firebase, etc.)
- **No environment variables** reference auth endpoints
- **No backend/API code** exists — authentication was purely a frontend UI shell with `e.preventDefault()` on submit
- **No shared state** (Redux, Zustand, Context) — both pages use local `useState` only
- **No cookies/localStorage/sessionStorage** code exists in these components

---

## Summary of Removals

| Category | Delete | Edit |
|----------|--------|------|
| Route files | `app/signin/page.tsx`, `app/signup/page.tsx` | — |
| Components | `src/components/SignInPage.tsx`, `src/components/SignUpPage.tsx` | `src/components/Navbar.tsx` |
| Styles | — | `src/App.css` (~1200 lines) |
| Tests | `signin-test.spec.ts`, `signup-test.spec.ts` | `homepage-test.spec.ts` |
| Docs | — | `README.md` (1 line) |

**Total: 6 files deleted, 4 files edited, 0 dependencies changed.**
