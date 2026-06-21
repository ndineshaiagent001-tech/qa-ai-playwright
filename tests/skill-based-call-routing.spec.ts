```typescript
// screen-pop-for-agent.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Screen Pop for Agent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display screen pop with customer information', async ({ page }) => {
    // Login as an agent
    await page.fill('#username', 'agentUsername');
    await page.fill('#password', 'agentPassword');
    await page.click('#login-button');

    // Wait for navigation to dashboard
    await page.waitForURL(/dashboard/);

    // Simulate an incoming call
    await page.click('#incoming-call-button');

    // Wait for screen pop to appear
    await page.waitForSelector('#screen-pop');

    // Extract customer information from screen pop
    const customerName = await page.textContent('#customer-name');
    const customerPhone = await page.textContent('#customer-phone');

    // Assert customer information is not empty
    expect(customerName).not.toBeNull();
    expect(customerPhone).not.toBeNull();

    // Verify customer information matches expected values
    expect(customerName).toBe('John Doe');
    expect(customerPhone).toBe('123-456-7890');

    // Close screen pop
    await page.click('#close-screen-pop');

    // Verify screen pop is closed
    await page.waitForSelector('#screen-pop', { state: 'hidden' });
  });
});
```