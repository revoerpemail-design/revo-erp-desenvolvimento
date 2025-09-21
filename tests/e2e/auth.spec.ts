import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/app')
    await expect(page).toHaveURL('/login')
  })

  test('should show login form', async ({ page }) => {
    await page.goto('/login')
    
    await expect(page.getByRole('heading', { name: 'Faça login em sua conta' })).toBeVisible()
    await expect(page.getByLabel('E-mail')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Enviar Magic Link' })).toBeVisible()
  })

  test('should require email for magic link', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByRole('button', { name: 'Enviar Magic Link' }).click()
    
    // Note: We can't test actual magic link without real email setup
    // This test just ensures the form validation works
    await expect(page.getByText('Por favor, informe seu e-mail')).toBeVisible()
  })

  test.skip('magic link flow requires real email setup', () => {
    // This test is skipped because it requires actual email configuration
    // In a real environment, you would set up a test email service
  })
})
