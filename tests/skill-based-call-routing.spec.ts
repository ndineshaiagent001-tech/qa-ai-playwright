```typescript
// screen-pop-for-agent.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Screen Pop for Agent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display screen pop with customer information', async ({ page }) => {
    // Login as an agent
    await page.fill('input[name="username"]', 'agentUsername');
    await page.fill('input[name="password"]', 'agentPassword');
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard or similar page
    await page.waitForURL({ url: '/dashboard' });

    // Simulate an incoming call or similar event that triggers screen pop
    await page.click('#simulate-incoming-call');

    // Wait for screen pop to appear
    await page.waitForSelector('#screen-pop');

    // Extract customer information from screen pop
    const customerName = await page.textContent('#customer-name');
    const customerNumber = await page.textContent('#customer-number');

    // Assertions
    expect(customerName).not.toBeNull();
    expect(customerNumber).not.toBeNull();
    expect(customerName).toContain('John Doe'); // Assuming this is expected customer name
    expect(customerNumber).toContain('1234567890'); // Assuming this is expected customer number

    // Additional assertions or actions can be added as needed
  });
});
```