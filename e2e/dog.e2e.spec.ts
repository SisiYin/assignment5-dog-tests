import { test, expect } from '@playwright/test'

const FRONTEND_URL = 'http://localhost:5173'
const API_PATTERN = '**/api/dogs/random'

test.describe('E2E Tests for Dog App', () => {

  // Test 3: Verify that a dog image is loaded when the page opens
  test('Test 3: Dog image is retrieved successfully when page is loaded', async ({ page }) => {
    await page.goto(FRONTEND_URL);
    // Wait for the image to be loaded
    const image = page.locator('img');
    await image.waitFor();

    // Verify that the image has a valid src attribute
    await expect(image).toHaveAttribute('src', /.*/);
    // Verify that the src attribute starts with "https://"
    const src = await image.getAttribute('src');
    expect(src?.startsWith('https://')).toBeTruthy();
  });

  // Test 4: Verify that clicking the button loads another dog image
  test('Test 4: Dog image is retrieved successfully when button is clicked', async ({ page }) => {
    await page.goto(FRONTEND_URL)
    // Wait for the initial image to be loaded
    const image = page.locator('img')
    await image.waitFor()

    const button = page.getByRole('button', { name: /get another dog/i })
    // Wait for the API response after clicking the button
    const responsePromise = page.waitForResponse(response =>
      response.url().includes('/api/dogs/random') && response.status() === 200
    )
    await button.click()
    await responsePromise
    // Verify that the image has a valid src attribute
    await expect(image).toHaveAttribute('src', /.*/)
    // Verify that the src attribute starts with "https://"
    const newSrc = await image.getAttribute('src')
    expect(newSrc?.startsWith('https://')).toBeTruthy()

  });

  // Test 5: Verify that an error message is shown when API call fails
  test('Test 5: Correct behaviour when API call fails', async ({ page }) => {
    // Intercept the API call and simulate a failure
    await page.route(API_PATTERN, route => route.abort());
    await page.goto(FRONTEND_URL);
    // Wait for the error message to be displayed
    const errorElement = page.getByText(/error/i);
    // Verify that the error message is visible
    await expect(errorElement).toBeVisible();
  });

});