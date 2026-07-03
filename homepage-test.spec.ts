import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3000';

async function goToHome(page: Page) {
  await page.goto(BASE);
  // Wait for the page to fully render (Navbar + Hero)
  await page.waitForSelector('.navbar', { state: 'visible' });
  await page.waitForSelector('.hero', { state: 'visible' });
  await page.waitForTimeout(1000); // let animations settle
}

test.describe('Homepage — Full Interactive Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await goToHome(page);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // NAVBAR — ALL 6 NAV LINKS
  // ─────────────────────────────────────────────────────────────────────────
  test('1a. Nav link "About" scrolls to #about section', async ({ page }) => {
    const link = page.locator('.nav-link', { hasText: 'About' });
    await expect(link).toBeVisible();
    await link.click();
    await page.waitForTimeout(800);
    await expect(page).toHaveURL(/#about/);
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    const isIntersecting = await aboutSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Nav link "About" scrolled to #about');
  });

  test('1b. Nav link "Courses" scrolls to #courses section', async ({ page }) => {
    const link = page.locator('.nav-link', { hasText: 'Courses' });
    await expect(link).toBeVisible();
    await link.click();
    await page.waitForTimeout(800);
    await expect(page).toHaveURL(/#courses/);
    const section = page.locator('#courses');
    await expect(section).toBeVisible();
    const isIntersecting = await section.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Nav link "Courses" scrolled to #courses');
  });

  test('1c. Nav link "Why Us" scrolls to #why-us section', async ({ page }) => {
    const link = page.locator('.nav-link', { hasText: 'Why Us' });
    await expect(link).toBeVisible();
    await link.click();
    await page.waitForTimeout(800);
    await expect(page).toHaveURL(/#why-us/);
    const section = page.locator('#why-us');
    await expect(section).toBeVisible();
    const isIntersecting = await section.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Nav link "Why Us" scrolled to #why-us');
  });

  test('1d. Nav link "Testimonials" scrolls to #testimonials section', async ({ page }) => {
    const link = page.locator('.nav-link', { hasText: 'Testimonials' });
    await expect(link).toBeVisible();
    await link.click();
    await page.waitForTimeout(800);
    await expect(page).toHaveURL(/#testimonials/);
    const section = page.locator('#testimonials');
    await expect(section).toBeVisible();
    const isIntersecting = await section.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Nav link "Testimonials" scrolled to #testimonials');
  });

  test('1e. Nav link "FAQ" scrolls to #faq section', async ({ page }) => {
    const link = page.locator('.nav-link', { hasText: 'FAQ' });
    await expect(link).toBeVisible();
    await link.click();
    await page.waitForTimeout(800);
    await expect(page).toHaveURL(/#faq/);
    const section = page.locator('#faq');
    await expect(section).toBeVisible();
    const isIntersecting = await section.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Nav link "FAQ" scrolled to #faq');
  });

  test('1f. Nav link "Contact" scrolls to #contact section', async ({ page }) => {
    const link = page.locator('.nav-link', { hasText: 'Contact' });
    await expect(link).toBeVisible();
    await link.click();
    await page.waitForTimeout(800);
    await expect(page).toHaveURL(/#contact/);
    const section = page.locator('#contact');
    await expect(section).toBeVisible();
    const isIntersecting = await section.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Nav link "Contact" scrolled to #contact');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // NAVBAR — THEME TOGGLE
  // ─────────────────────────────────────────────────────────────────────────
  test('2. Theme toggle button changes theme and toggles back', async ({ page }) => {
    const initialTheme = await page.locator('html').getAttribute('data-theme');
    console.log(`Initial theme: ${initialTheme}`);

    const themeToggle = page.locator('.theme-toggle').first();
    await expect(themeToggle).toBeVisible();

    await themeToggle.click();
    await page.waitForTimeout(300);

    const themeAfterFirstClick = await page.locator('html').getAttribute('data-theme');
    console.log(`Theme after first click: ${themeAfterFirstClick}`);
    expect(themeAfterFirstClick).not.toBe(initialTheme);

    await themeToggle.click();
    await page.waitForTimeout(300);

    const themeAfterSecondClick = await page.locator('html').getAttribute('data-theme');
    console.log(`Theme after second click: ${themeAfterSecondClick}`);
    expect(themeAfterSecondClick).toBe(initialTheme);

    console.log('✓ Theme toggle works correctly');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // NAVBAR — HAMBURGER MENU (mobile)
  // ─────────────────────────────────────────────────────────────────────────
  test('3. Hamburger menu opens and closes on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 900 });
    await goToHome(page);

    const hamburger = page.locator('#hamburger');
    await expect(hamburger).toBeVisible();

    const navMenu = page.locator('#navMenu');
    await expect(navMenu).not.toHaveClass(/active/);

    await hamburger.click();
    await page.waitForTimeout(500);

    await expect(navMenu).toHaveClass(/active/);
    await expect(hamburger).toHaveClass(/active/);

    const aboutLink = navMenu.locator('.nav-link', { hasText: 'About' });
    await aboutLink.click();
    await page.waitForTimeout(500);

    await expect(navMenu).not.toHaveClass(/active/);
    await expect(hamburger).not.toHaveClass(/active/);

    console.log('✓ Hamburger menu opens and closes correctly');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // NAVBAR — LOGO
  // ─────────────────────────────────────────────────────────────────────────
  test('5. Logo click scrolls to top of page', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter).toBeGreaterThan(0);

    const logo = page.locator('.nav-logo');
    await expect(logo).toBeVisible();
    await logo.click();
    await page.waitForTimeout(800);

    const scrollTop = await page.evaluate(() => window.scrollY);
    expect(scrollTop).toBeLessThan(10);

    // URL may have # from href="#" — that's expected from the anchor
    console.log('✓ Logo click scrolled to top of page');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // HERO — BUTTONS
  // ─────────────────────────────────────────────────────────────────────────
  test('6. "See Upcoming Courses" button scrolls to #contact', async ({ page }) => {
    const btn = page.locator('.hero-cta a', { hasText: 'See Upcoming Courses' });
    await expect(btn).toBeVisible();

    await btn.click();
    // Allow extra time for smooth scroll (navbar offset = ~70px)
    await page.waitForTimeout(1200);

    await expect(page).toHaveURL(/#contact/);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Check with navbar offset tolerance (fixed navbar ~70px)
    const isReachable = await contactSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      // Allow for fixed navbar — section top can be slightly above viewport
      return rect.bottom > 80 && rect.top < window.innerHeight;
    });
    expect(isReachable).toBeTruthy();
    await expect(page.locator('#contactForm')).toBeVisible();
    console.log('✓ "Courses" scrolled to #contact');
  });

  test('7. "View Pricing" button scrolls to #courses', async ({ page }) => {
    const btn = page.locator('.hero-cta a', { hasText: 'View Pricing' });
    await expect(btn).toBeVisible();

    await btn.click();
    await page.waitForTimeout(800);

    await expect(page).toHaveURL(/#courses/);

    const coursesSection = page.locator('#courses');
    await expect(coursesSection).toBeVisible();

    const isIntersecting = await coursesSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    await expect(page.locator('.course-filters')).toBeVisible();
    console.log('✓ "View Pricing" scrolled to #courses');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // COURSES — FILTER TABS
  // ─────────────────────────────────────────────────────────────────────────
  test('8a. Course filter tabs exist and "All" is active by default', async ({ page }) => {
    await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
    await page.waitForTimeout(500);

    const filters = page.locator('.course-filters');
    await expect(filters).toBeVisible();

    const allFilter = page.locator('.filter-tab', { hasText: 'All' });
    const beginnerFilter = page.locator('.filter-tab', { hasText: 'Beginner' });
    const intermediateFilter = page.locator('.filter-tab', { hasText: 'Intermediate' });
    const advancedFilter = page.locator('.filter-tab', { hasText: 'Advanced' });

    await expect(allFilter).toBeVisible();
    await expect(beginnerFilter).toBeVisible();
    await expect(intermediateFilter).toBeVisible();
    await expect(advancedFilter).toBeVisible();
    await expect(allFilter).toHaveClass(/active/);
    console.log('✓ Course filter tabs all present');
  });

  test('8b. Clicking "Beginner" filter tab activates it', async ({ page }) => {
    await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
    await page.waitForTimeout(500);

    const filter = page.locator('.filter-tab', { hasText: 'Beginner' });
    await expect(filter).toBeVisible();
    await filter.click();
    await page.waitForTimeout(300);
    await expect(filter).toHaveClass(/active/);
    console.log('✓ "Beginner" filter tab clickable');
  });

  test('8c. Clicking "Intermediate" filter tab activates it', async ({ page }) => {
    await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
    await page.waitForTimeout(500);

    const filter = page.locator('.filter-tab', { hasText: 'Intermediate' });
    await expect(filter).toBeVisible();
    await filter.click();
    await page.waitForTimeout(300);
    await expect(filter).toHaveClass(/active/);
    console.log('✓ "Intermediate" filter tab clickable');
  });

  test('8d. Clicking "Advanced" filter tab activates it', async ({ page }) => {
    await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
    await page.waitForTimeout(500);

    const filter = page.locator('.filter-tab', { hasText: 'Advanced' });
    await expect(filter).toBeVisible();
    await filter.click();
    await page.waitForTimeout(300);
    await expect(filter).toHaveClass(/active/);
    console.log('✓ "Advanced" filter tab clickable');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // COURSES — CAROUSEL CONTROLS
  // ─────────────────────────────────────────────────────────────────────────
  test('9a. Course carousel arrows are clickable', async ({ page }) => {
    await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
    await page.waitForTimeout(500);

    const prevArrow = page.locator('.carousel-arrow').first();
    const nextArrow = page.locator('.carousel-arrow').last();

    const prevCount = await prevArrow.count();
    const nextCount = await nextArrow.count();

    if (prevCount > 0) {
      await expect(prevArrow).toBeVisible();
      await prevArrow.click();
      await page.waitForTimeout(300);
      console.log('✓ Previous arrow clickable');
    }
    if (nextCount > 0) {
      await expect(nextArrow).toBeVisible();
      await nextArrow.click();
      await page.waitForTimeout(300);
      console.log('✓ Next arrow clickable');
    }
  });

  test('9b. Course carousel dots are clickable', async ({ page }) => {
    await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
    await page.waitForTimeout(500);

    const dots = page.locator('.carousel-dot');
    const dotCount = await dots.count();

    if (dotCount > 0) {
      const secondDot = dots.nth(Math.min(1, dotCount - 1));
      await expect(secondDot).toBeVisible();
      await secondDot.click();
      await page.waitForTimeout(300);
      await expect(secondDot).toHaveClass(/active/);
      console.log('✓ Carousel dot clickable');
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // COURSES — ENROLL BUTTONS
  // ─────────────────────────────────────────────────────────────────────────
  test('10. Course "Enroll" buttons scroll to #contact', async ({ page }) => {
    await page.evaluate(() => document.getElementById('courses')?.scrollIntoView());
    await page.waitForTimeout(500);

    const enrollBtns = page.locator('.course-card .btn-primary', { hasText: 'Enroll' });
    const count = await enrollBtns.count();
    expect(count).toBeGreaterThan(0);

    await enrollBtns.first().click();
    await page.waitForTimeout(800);

    await expect(page).toHaveURL(/#contact/);
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    const isIntersecting = await contactSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Course "Enroll" button scrolled to #contact');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // CTA BANNER — BUTTONS
  // ─────────────────────────────────────────────────────────────────────────
  test('11a. "Reserve My Seat" button scrolls to #contact', async ({ page }) => {
    const reserveBtn = page.locator('.cta-banner .btn-white');
    await expect(reserveBtn).toBeVisible();
    await expect(reserveBtn).toContainText('Reserve My Seat');

    await reserveBtn.click();
    await page.waitForTimeout(800);

    await expect(page).toHaveURL(/#contact/);
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    console.log('✓ "Reserve My Seat" scrolled to #contact');
  });

  test('11b. "Browse Courses" button scrolls to #courses', async ({ page }) => {
    const browseBtn = page.locator('.cta-banner .btn-outline-white');
    await expect(browseBtn).toBeVisible();
    await expect(browseBtn).toContainText('Browse Courses');

    await browseBtn.click();
    await page.waitForTimeout(800);

    await expect(page).toHaveURL(/#courses/);
    const coursesSection = page.locator('#courses');
    await expect(coursesSection).toBeVisible();
    console.log('✓ "Browse Courses" scrolled to #courses');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // FAQ — TOGGLE QUESTIONS
  // ─────────────────────────────────────────────────────────────────────────
  test('12. FAQ toggle questions open and close', async ({ page }) => {
    await page.evaluate(() => document.getElementById('faq')?.scrollIntoView());
    await page.waitForTimeout(500);

    const faqItems = page.locator('.faq-item');
    const faqCount = await faqItems.count();
    expect(faqCount).toBeGreaterThan(0);

    const firstItem = faqItems.first();
    await expect(firstItem).toHaveClass(/open/);

    const secondQuestion = faqItems.nth(1).locator('.faq-question');
    await expect(secondQuestion).toBeVisible();
    await secondQuestion.click();
    await page.waitForTimeout(400);

    await expect(firstItem).not.toHaveClass(/open/);
    const secondItem = faqItems.nth(1);
    await expect(secondItem).toHaveClass(/open/);

    const firstQuestion = faqItems.first().locator('.faq-question');
    await firstQuestion.click();
    await page.waitForTimeout(400);

    await expect(firstItem).toHaveClass(/open/);
    await expect(secondItem).not.toHaveClass(/open/);

    console.log('✓ FAQ toggle questions work correctly');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // CONTACT FORM — SUBMIT
  // ─────────────────────────────────────────────────────────────────────────
  test('13a. Contact form has all required fields and submit button', async ({ page }) => {
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
    await page.waitForTimeout(500);

    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();

    const submitBtn = page.locator('.contact-form button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Send Message');
    console.log('✓ Contact form fields and submit button present');
  });

  test('13b. Contact form shows validation errors on empty submit', async ({ page }) => {
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
    await page.waitForTimeout(500);

    const submitBtn = page.locator('.contact-form button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(500);

    const errorMsgs = page.locator('.error-msg');
    const errorCount = await errorMsgs.count();
    expect(errorCount).toBeGreaterThan(0);
    console.log('✓ Contact form shows validation errors');
  });

  test('13c. Contact form submits successfully with valid data', async ({ page }) => {
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
    await page.waitForTimeout(500);

    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#message').fill('This is a test message with sufficient length for validation.');

    const submitBtn = page.locator('.contact-form button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(2500);

    const successMsg = page.locator('.form-success.show');
    await expect(successMsg).toBeVisible();
    console.log('✓ Contact form submits successfully');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER — LOGO LINK
  // ─────────────────────────────────────────────────────────────────────────
  test('14. Footer logo link scrolls to top', async ({ page }) => {
    const footerLogo = page.locator('.footer-logo');
    await expect(footerLogo).toBeVisible();
    await expect(footerLogo).toHaveAttribute('href', '#');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const scrollPosBefore = await page.evaluate(() => window.scrollY);
    expect(scrollPosBefore).toBeGreaterThan(100);

    // Click the logo link — href="#" should scroll to top
    await footerLogo.click();
    await page.waitForTimeout(1500);

    const scrollPosAfter = await page.evaluate(() => window.scrollY);
    console.log(`Scroll position after logo click: ${scrollPosAfter}`);

    // The logo href="#" should scroll the page to top; verify it moved up
    expect(scrollPosAfter).toBeLessThan(scrollPosBefore);

    // Also verify clicking brought us to the top (or near top with navbar offset)
    const nearTop = scrollPosAfter < 100 || scrollPosAfter < scrollPosBefore * 0.1;
    expect(nearTop).toBeTruthy();
    console.log('✓ Footer logo scrolls to top');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER — SOCIAL LINKS
  // ─────────────────────────────────────────────────────────────────────────
  test('15. Footer social links exist with correct labels and no live URLs', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const socialLinks = page.locator('.social-links a');
    const count = await socialLinks.count();
    expect(count).toBe(3);

    // Verify each social link exists with the correct label and has no external URL
    const xLink = page.locator('.social-links a[aria-label="X"]');
    await expect(xLink).toBeVisible();
    await expect(xLink).toHaveAttribute('href', '#');

    const linkedInLink = page.locator('.social-links a[aria-label="LinkedIn"]');
    await expect(linkedInLink).toBeVisible();
    await expect(linkedInLink).toHaveAttribute('href', '#');

    const facebookLink = page.locator('.social-links a[aria-label="Facebook"]');
    await expect(facebookLink).toBeVisible();
    await expect(facebookLink).toHaveAttribute('href', '#');

    console.log('✓ Social links present with correct labels and placeholder hrefs (no live URLs)');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER — LINK GROUPS
  // ─────────────────────────────────────────────────────────────────────────
  test('16a. Footer "About" link scrolls to #about', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const aboutLink = page.locator('.footer-links a', { hasText: 'About' }).first();
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute('href', '#about');

    await aboutLink.click();
    await page.waitForTimeout(800);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    const isIntersecting = await aboutSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Footer "About" link scrolled to #about');
  });

  test('16b. Footer "Courses" link scrolls to #courses', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const coursesLink = page.locator('.footer-links a', { hasText: 'Courses' }).first();
    await expect(coursesLink).toBeVisible();
    await expect(coursesLink).toHaveAttribute('href', '#courses');

    await coursesLink.click();
    await page.waitForTimeout(800);

    const coursesSection = page.locator('#courses');
    await expect(coursesSection).toBeVisible();
    const isIntersecting = await coursesSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Footer "Courses" link scrolled to #courses');
  });

  test('16c. Footer "Testimonials" link scrolls to #testimonials', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const testimonialsLink = page.locator('.footer-links a', { hasText: 'Testimonials' }).first();
    await expect(testimonialsLink).toBeVisible();
    await expect(testimonialsLink).toHaveAttribute('href', '#testimonials');

    await testimonialsLink.click();
    await page.waitForTimeout(800);

    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeVisible();
    const isIntersecting = await testimonialsSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Footer "Testimonials" link scrolled to #testimonials');
  });

  test('16d. Footer "Contact" link scrolls to #contact', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const contactLink = page.locator('.footer-links a', { hasText: 'Contact' }).first();
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute('href', '#contact');

    await contactLink.click();
    await page.waitForTimeout(800);

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    const isIntersecting = await contactSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });
    expect(isIntersecting).toBeTruthy();
    console.log('✓ Footer "Contact" link scrolled to #contact');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER — RESOURCES LINKS
  // ─────────────────────────────────────────────────────────────────────────
  test('17. Footer resources links exist with correct labels', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const resourceSection = page.locator('.footer-links').nth(1);
    await expect(resourceSection.locator('h4')).toContainText('Resources');

    const blogLink = resourceSection.locator('a', { hasText: 'Blog' });
    const guidesLink = resourceSection.locator('a', { hasText: 'Free Guides' });
    const communityLink = resourceSection.locator('a', { hasText: 'Community' });
    const careerLink = resourceSection.locator('a', { hasText: 'Career Center' });

    await expect(blogLink).toBeVisible();
    await expect(guidesLink).toBeVisible();
    await expect(communityLink).toBeVisible();
    await expect(careerLink).toBeVisible();

    await expect(blogLink).toHaveAttribute('href', '#');
    await expect(guidesLink).toHaveAttribute('href', '#');
    await expect(communityLink).toHaveAttribute('href', '#');
    await expect(careerLink).toHaveAttribute('href', '#');

    console.log('✓ Footer resources links present');
  });

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER — NEWSLETTER FORM
  // ─────────────────────────────────────────────────────────────────────────
  test('18. Newsletter form accepts email and submits', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const emailInput = page.locator('.newsletter-form input[type="email"]');
    const submitBtn = page.locator('.newsletter-form button[type="submit"]');
    await expect(emailInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Join');

    await emailInput.fill('test@example.com');
    await submitBtn.click();
    await page.waitForTimeout(500);

    const thanksMsg = page.locator('.newsletter p', { hasText: 'Thanks for subscribing' });
    await expect(thanksMsg).toBeVisible();
    console.log('✓ Newsletter form submits successfully');
  });

});
