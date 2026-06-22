import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3000';

async function goToSignIn(page: Page) {
  await page.goto(`${BASE}/signin`);
  // Wait for the sign-in overlay to fully render
  await page.waitForSelector('.signin-overlay', { state: 'visible' });
  await page.waitForTimeout(500); // let animations settle
}

test.describe('Sign In Page — Full Interactive Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await goToSignIn(page);
  });

  test('1. Back button navigates to homepage', async ({ page }) => {
    // Click the Back button (top-left)
    const backBtn = page.locator('.signin-back');
    await expect(backBtn).toBeVisible();
    await expect(backBtn).toContainText('Back');
    await backBtn.click();

    // Should navigate to homepage (the main App layout)
    await page.waitForURL(`${BASE}/`);
    await expect(page.locator('.navbar')).toBeVisible();

    // Take screenshot after navigation
    await page.screenshot({ path: 'screenshots/back-button-homepage.png', fullPage: true });
    console.log('✓ Back button navigated to homepage');
  });

  test('2. Email input accepts text', async ({ page }) => {
    const emailInput = page.locator('#signin-email');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');

    // Verify the text appears in the input
    await expect(emailInput).toHaveValue('test@example.com');
    console.log('✓ Email input accepts and displays text');
  });

  test('3. Password input hides text', async ({ page }) => {
    const passwordInput = page.locator('#signin-password');
    await expect(passwordInput).toBeVisible();

    // Verify initial type is 'password' (hidden)
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Type a password
    await passwordInput.fill('mypassword');
    await expect(passwordInput).toHaveValue('mypassword');

    // Verify the input is type="password" (dots/bullets shown, not text)
    const typeAttr = await passwordInput.getAttribute('type');
    expect(typeAttr).toBe('password');
    console.log('✓ Password input hides text (type=password)');
  });

  test('4. Password toggle shows/hides password', async ({ page }) => {
    const passwordInput = page.locator('#signin-password');
    const toggleBtn = page.locator('.signin-password-toggle');

    await passwordInput.fill('mypassword');

    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(toggleBtn).toHaveAttribute('aria-label', 'Show password');

    // Click toggle — should show password
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    await expect(toggleBtn).toHaveAttribute('aria-label', 'Hide password');
    await expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');

    // Click toggle again — should hide password
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(toggleBtn).toHaveAttribute('aria-label', 'Show password');
    await expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
    console.log('✓ Password toggle shows/hides password correctly');
  });

  test('5. Remember me checkbox checks/unchecks', async ({ page }) => {
    const checkbox = page.locator('.signin-remember input[type="checkbox"]');
    await expect(checkbox).toBeVisible();

    // Should start unchecked
    await expect(checkbox).not.toBeChecked();

    // Click to check
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Click to uncheck
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    console.log('✓ Remember me checkbox checks and unchecks');
  });

  test('6. Continue with Password button submits form', async ({ page }) => {
    const submitBtn = page.locator('.signin-submit');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Continue with Password');

    // The form has onSubmit={(e) => e.preventDefault()} so it prevents
    // actual submission, but clicking the button should trigger the form event
    await submitBtn.click();

    // Verify we stay on the same page (form prevents default)
    // No navigation should occur since e.preventDefault() is called
    await expect(page).toHaveURL(`${BASE}/signin`);
    console.log('✓ Continue with Password button is clickable, form prevents submission');
  });

  test('7. Sign in with Passkey button is clickable', async ({ page }) => {
    const passkeyBtn = page.locator('.signin-passkey');
    await expect(passkeyBtn).toBeVisible();
    await expect(passkeyBtn).toContainText('Sign in with Passkey');

    // Click the button — onClick prevents default, so nothing happens
    await passkeyBtn.click();

    // Verify we stay on the same page
    await expect(page).toHaveURL(`${BASE}/signin`);
    console.log('✓ Sign in with Passkey button is clickable (no-op)');
  });

  test('8. Create an account link navigates to /signup', async ({ page }) => {
    const enrollLink = page.locator('.signin-footer a');
    await expect(enrollLink).toBeVisible();
    await expect(enrollLink).toContainText('Create an account');

    // Click the link
    await enrollLink.click();

    // Should navigate to /signup
    await page.waitForURL(`${BASE}/signup`);
    await expect(page.locator('.signin-overlay.signup-page')).toBeVisible();
    await expect(page.locator('.signin-title')).toContainText('Create your account');
    console.log('✓ Create an account link navigates to /signup');
  });

  test('9. Terms of Service link is clickable (prevents default)', async ({ page }) => {
    const termsLink = page.locator('.signin-legal a').first();
    await expect(termsLink).toBeVisible();
    await expect(termsLink).toContainText('Terms of Service');

    // The link has href="#" and onClick prevents default
    // So clicking it should not navigate anywhere
    await termsLink.click();

    // Verify we stay on the signin page
    await expect(page).toHaveURL(`${BASE}/signin`);
    console.log('✓ Terms of Service link clickable, prevents default navigation');
  });

  test('10. Privacy Policy link is clickable (prevents default)', async ({ page }) => {
    const privacyLink = page.locator('.signin-legal a').last();
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toContainText('Privacy Policy');

    // The link has href="#" and onClick prevents default
    await privacyLink.click();

    // Verify we stay on the signin page
    await expect(page).toHaveURL(`${BASE}/signin`);
    console.log('✓ Privacy Policy link clickable, prevents default navigation');
  });

  test('11. Escape key navigates to homepage', async ({ page }) => {
    // Press the Escape key
    await page.keyboard.press('Escape');

    // Should navigate to homepage
    await page.waitForURL(`${BASE}/`);
    await expect(page.locator('.navbar')).toBeVisible();
    console.log('✓ Escape key navigates to homepage');
  });

});
