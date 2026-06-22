import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3000';

async function goToSignUp(page: Page) {
  await page.goto(`${BASE}/signup`);
  // Wait for the signup overlay to fully render
  await page.waitForSelector('.signin-overlay.signup-page', { state: 'visible' });
  await page.waitForTimeout(500); // let animations settle
}

test.describe('Sign Up Page — Full Interactive Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await goToSignUp(page);
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
    console.log('✓ Back button navigated to homepage');
  });

  test('2. Full name input accepts text', async ({ page }) => {
    const nameInput = page.locator('#signup-name');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('John Doe');

    // Verify the text appears in the input
    await expect(nameInput).toHaveValue('John Doe');
    console.log('✓ Full name input accepts and displays text');
  });

  test('3. Email input accepts text', async ({ page }) => {
    const emailInput = page.locator('#signup-email');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('john@example.com');

    // Verify the text appears in the input
    await expect(emailInput).toHaveValue('john@example.com');
    console.log('✓ Email input accepts and displays text');
  });

  test('4. Password input hides text', async ({ page }) => {
    const passwordInput = page.locator('#signup-password');
    await expect(passwordInput).toBeVisible();

    // Verify initial type is 'password' (hidden)
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Type a password
    await passwordInput.fill('MyPassword123');
    await expect(passwordInput).toHaveValue('MyPassword123');

    // Verify the input is type="password" (dots/bullets shown, not text)
    const typeAttr = await passwordInput.getAttribute('type');
    expect(typeAttr).toBe('password');
    console.log('✓ Password input hides text (type=password)');
  });

  test('5. Password toggle shows/hides password', async ({ page }) => {
    const passwordInput = page.locator('#signup-password');
    const toggleBtn = page.locator('#signup-password').locator('..').locator('.signin-password-toggle');

    await passwordInput.fill('MyPassword123');

    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click toggle — should show password
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click toggle again — should hide password
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    console.log('✓ Password toggle shows/hides password correctly');
  });

  test('6. Confirm password input hides text', async ({ page }) => {
    const confirmInput = page.locator('#signup-confirm');
    await expect(confirmInput).toBeVisible();

    // Verify initial type is 'password' (hidden)
    await expect(confirmInput).toHaveAttribute('type', 'password');

    // Type a password
    await confirmInput.fill('MyPassword123');
    await expect(confirmInput).toHaveValue('MyPassword123');

    // Verify the input is type="password"
    const typeAttr = await confirmInput.getAttribute('type');
    expect(typeAttr).toBe('password');
    console.log('✓ Confirm password input hides text (type=password)');
  });

  test('7. Confirm password toggle shows/hides password', async ({ page }) => {
    const confirmInput = page.locator('#signup-confirm');
    const toggleBtn = page.locator('#signup-confirm').locator('..').locator('.signin-password-toggle');

    await confirmInput.fill('MyPassword123');

    // Initially password should be hidden
    await expect(confirmInput).toHaveAttribute('type', 'password');

    // Click toggle — should show password
    await toggleBtn.click();
    await expect(confirmInput).toHaveAttribute('type', 'text');

    // Click toggle again — should hide password
    await toggleBtn.click();
    await expect(confirmInput).toHaveAttribute('type', 'password');
    console.log('✓ Confirm password toggle shows/hides password correctly');
  });

  test('8. I agree checkbox checks/unchecks', async ({ page }) => {
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
    console.log('✓ I agree checkbox checks and unchecks');
  });

  test('9a. Create account button shows validation errors when form is empty', async ({ page }) => {
    const submitBtn = page.locator('.signin-submit');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText('Create account');

    // Click submit with empty form
    await submitBtn.click();

    // Wait for error message to appear
    const errorEl = page.locator('.signin-error');
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText('Please fill in all fields.');

    // Take screenshot of validation errors
    await page.screenshot({ path: 'screenshots/signup-validation-errors.png', fullPage: true });
    console.log('✓ Validation error displayed for empty form');

    // Now test password length error
    await page.locator('#signup-name').fill('John Doe');
    await page.locator('#signup-email').fill('john@example.com');
    await page.locator('#signup-password').fill('123');
    await page.locator('#signup-confirm').fill('123');
    await submitBtn.click();
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText('Password must be at least 8 characters.');
    console.log('✓ Validation error displayed for short password');

    // Test password mismatch
    await page.locator('#signup-password').fill('MyPassword123');
    await page.locator('#signup-confirm').fill('DifferentPassword');
    await submitBtn.click();
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText('Passwords do not match.');
    console.log('✓ Validation error displayed for password mismatch');

    // Test missing agreement
    await page.locator('#signup-confirm').fill('MyPassword123');
    await submitBtn.click();
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText('Please agree to the Terms of Service and Privacy Policy.');
    console.log('✓ Validation error displayed for missing agreement');
  });

  test('9b. Create account button navigates to /signin with valid form', async ({ page }) => {
    // Fill all fields correctly
    await page.locator('#signup-name').fill('John Doe');
    await page.locator('#signup-email').fill('john@example.com');
    await page.locator('#signup-password').fill('MyPassword123');
    await page.locator('#signup-confirm').fill('MyPassword123');
    await page.locator('.signin-remember input[type="checkbox"]').check();

    // Click create account
    const submitBtn = page.locator('.signin-submit');
    await submitBtn.click();

    // Should navigate to /signin
    await page.waitForURL(`${BASE}/signin`);
    await expect(page.locator('.signin-overlay')).toBeVisible();
    await expect(page.locator('.signin-title')).toContainText('Welcome back');
    console.log('✓ Create account navigated to /signin');
  });

  test('10. Sign in link navigates to /signin', async ({ page }) => {
    const signInLink = page.locator('.signin-footer a');
    await expect(signInLink).toBeVisible();
    await expect(signInLink).toContainText('Sign in');

    // Click the link
    await signInLink.click();

    // Should navigate to /signin
    await page.waitForURL(`${BASE}/signin`);
    await expect(page.locator('.signin-overlay')).toBeVisible();
    await expect(page.locator('.signin-title')).toContainText('Welcome back');
    console.log('✓ Sign in link navigated to /signin');
  });

  test('11. Terms of Service link is clickable (prevents default)', async ({ page }) => {
    const termsLink = page.locator('.signin-legal a').first();
    await expect(termsLink).toBeVisible();
    await expect(termsLink).toContainText('Terms of Service');

    // The link has href="#" and onClick prevents default
    // So clicking it should not navigate anywhere
    await termsLink.click();

    // Verify we stay on the signup page
    await expect(page).toHaveURL(`${BASE}/signup`);
    console.log('✓ Terms of Service link clickable, prevents default navigation');
  });

  test('12. Privacy Policy link is clickable (prevents default)', async ({ page }) => {
    const privacyLink = page.locator('.signin-legal a').last();
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toContainText('Privacy Policy');

    // The link has href="#" and onClick prevents default
    await privacyLink.click();

    // Verify we stay on the signup page
    await expect(page).toHaveURL(`${BASE}/signup`);
    console.log('✓ Privacy Policy link clickable, prevents default navigation');
  });

  test('13. Escape key navigates to homepage', async ({ page }) => {
    // Press the Escape key
    await page.keyboard.press('Escape');

    // Should navigate to homepage
    await page.waitForURL(`${BASE}/`);
    await expect(page.locator('.navbar')).toBeVisible();
    console.log('✓ Escape key navigated to homepage');
  });

});
