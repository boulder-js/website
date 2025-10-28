import { test, expect } from '@playwright/test'

test('open home page', async ({ page }) => {
  await page.goto('/')

  // Wait for page to load
  await page.waitForLoadState('networkidle')

  // Keep the browser open for inspection
  await page.pause()
})
