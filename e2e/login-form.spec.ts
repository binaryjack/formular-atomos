import { test, expect } from '@playwright/test'

test.describe('Login Form - Field Interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/login')
    await page.waitForLoadState('networkidle')
  })

  test('should allow typing in email field', async ({ page }) => {
    const emailInput = page.locator('input#email')
    
    // Verify input exists
    await expect(emailInput).toBeVisible()
    
    // Try to type in the field
    await emailInput.click()
    await emailInput.fill('test@example.com')
    
    // Verify the value was actually set
    await expect(emailInput).toHaveValue('test@example.com')
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'e2e-results/login-email-typed.png' })
  })

  test('should allow typing in password field', async ({ page }) => {
    const passwordInput = page.locator('input#password')
    
    await expect(passwordInput).toBeVisible()
    await passwordInput.click()
    await passwordInput.fill('mypassword123')
    
    await expect(passwordInput).toHaveValue('mypassword123')
    await page.screenshot({ path: 'e2e-results/login-password-typed.png' })
  })

  test('should show validation error for invalid email', async ({ page }) => {
    const emailInput = page.locator('input#email')
    
    // Type invalid email
    await emailInput.click()
    await emailInput.fill('notanemail')
    
    // Blur the field to trigger validation
    await emailInput.blur()
    
    // Wait a bit for validation to run
    await page.waitForTimeout(500)
    
    // Check for error message
    const errorMessage = page.locator('text=/Please enter a valid email|Email/i').first()
    await page.screenshot({ path: 'e2e-results/login-email-error.png' })
    
    // This should show an error but let's see what actually happens
    console.log('Error element visible:', await errorMessage.isVisible().catch(() => false))
  })

  test('should show validation error for short password', async ({ page }) => {
    const passwordInput = page.locator('input#password')
    
    await passwordInput.click()
    await passwordInput.fill('short')
    await passwordInput.blur()
    
    await page.waitForTimeout(500)
    
    const errorMessage = page.locator('text=/at least 8 characters|Password/i').first()
    await page.screenshot({ path: 'e2e-results/login-password-error.png' })
    
    console.log('Password error visible:', await errorMessage.isVisible().catch(() => false))
  })

  test('should show validation error for empty required fields', async ({ page }) => {
    const emailInput = page.locator('input#email')
    const passwordInput = page.locator('input#password')
    
    // Focus and blur without typing
    await emailInput.click()
    await emailInput.blur()
    
    await passwordInput.click()
    await passwordInput.blur()
    
    await page.waitForTimeout(500)
    
    await page.screenshot({ path: 'e2e-results/login-required-errors.png' })
    
    // Check if required errors appear
    const emailError = page.locator('text=/Email is required/i').first()
    const passwordError = page.locator('text=/Password is required/i').first()
    
    console.log('Email required error visible:', await emailError.isVisible().catch(() => false))
    console.log('Password required error visible:', await passwordError.isVisible().catch(() => false))
  })

  test('should update field value as user types character by character', async ({ page }) => {
    const emailInput = page.locator('input#email')
    
    await emailInput.click()
    
    // Type character by character and verify each one
    const testEmail = 'test@example.com'
    for (let i = 0; i < testEmail.length; i++) {
      await page.keyboard.press(testEmail[i])
      await page.waitForTimeout(50) // Small delay between keystrokes
      
      const currentValue = await emailInput.inputValue()
      console.log(`After typing '${testEmail[i]}', value is: '${currentValue}'`)
      
      // The value should include the character we just typed
      expect(currentValue).toContain(testEmail[i])
    }
    
    await page.screenshot({ path: 'e2e-results/login-typing-progress.png' })
  })

  test('should display form result in JSON panel after submission', async ({ page }) => {
    const emailInput = page.locator('input#email')
    const passwordInput = page.locator('input#password')
    const submitButton = page.locator('button[type="submit"]')
    
    // Fill valid data
    await emailInput.fill('user@example.com')
    await passwordInput.fill('password123')
    
    // Submit the form
    await submitButton.click()
    
    await page.waitForTimeout(1000)
    
    // Look for JSON result display
    const resultPanel = page.locator('.json-display, .result-panel, pre').first()
    await page.screenshot({ path: 'e2e-results/login-submit-result.png' })
    
    console.log('Result panel visible:', await resultPanel.isVisible().catch(() => false))
  })

  test('should inspect DOM structure and log what we find', async ({ page }) => {
    // Let's see what's actually in the DOM
    const emailInput = page.locator('input#email')
    const passwordInput = page.locator('input#password')
    
    // Get all the properties we can
    console.log('=== EMAIL INPUT INSPECTION ===')
    console.log('Exists:', await emailInput.count() > 0)
    console.log('Visible:', await emailInput.isVisible().catch(() => false))
    console.log('Enabled:', await emailInput.isEnabled().catch(() => false))
    console.log('Editable:', await emailInput.isEditable().catch(() => false))
    console.log('Type attribute:', await emailInput.getAttribute('type'))
    console.log('Value attribute:', await emailInput.getAttribute('value'))
    console.log('Input value:', await emailInput.inputValue())
    
    // Try typing
    await emailInput.click()
    await page.keyboard.type('test')
    await page.waitForTimeout(200)
    
    console.log('Value after typing "test":', await emailInput.inputValue())
    console.log('Value attribute after typing:', await emailInput.getAttribute('value'))
    
    // Check if there's onChange handler
    const onChangeAttr = await emailInput.evaluate(el => {
      return {
        hasOnChange: typeof (el as any).onchange !== 'undefined',
        hasOnInput: typeof (el as any).oninput !== 'undefined',
        reactProps: Object.keys(el).filter(k => k.startsWith('__react'))
      }
    })
    console.log('Event handlers:', onChangeAttr)
    
    await page.screenshot({ path: 'e2e-results/login-dom-inspection.png' })
  })
})
