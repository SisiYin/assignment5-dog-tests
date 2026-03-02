import { test, expect } from '@playwright/test'

const FRONTEND_URL = 'http://localhost:5173'
const API_PATTERN = '**/api/dogs/random'

test('Test 3: Page load fetches dog image successfully', async ({ page }) => {
  await page.goto(FRONTEND_URL)

  const img = page.locator('img').first()
  await expect(img).toHaveAttribute('src', /^https:\/\//)
})

test('Test 4: Button click fetches dog image successfully', async ({ page }) => {
  await page.goto(FRONTEND_URL)

  const img = page.locator('img').first()
  const before = await img.getAttribute('src')

  // 点击按钮（按钮文字就是你截图里的）
  await page.getByRole('button', { name: /get another dog/i }).click()

  // 等图片 src 变成新的，并且以 https:// 开头
  await expect(img).toHaveAttribute('src', /^https:\/\//)

  const after = await img.getAttribute('src')
  expect(after).not.toBeNull()
  expect(after).not.toBe(before)
})

test('Test 5: When API call fails, page shows visible error text', async ({ page }) => {
  // 让对 /api/dogs/random 的请求直接失败（模拟后端挂掉）
  await page.route(API_PATTERN, route => route.abort())

  await page.goto(FRONTEND_URL)

  // PDF 要求：element containing word "error" (use regex) AND visible
  const err = page.getByText(/error/i)
  await expect(err).toBeVisible()
})