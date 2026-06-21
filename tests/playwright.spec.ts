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

    // Wait for navigation to dashboard or home page
    await page.waitForURL(/dashboard/);

    // Simulate an incoming call or interaction that triggers a screen pop
    await page.click('button[id="incoming-call-button"]');

    // Wait for screen pop to appear
    await page.waitForSelector('#screen-pop-modal');

    // Extract customer information from screen pop
    const customerName = await page.textContent('#customer-name');
    const customerIssue = await page.textContent('#customer-issue');

    // Assertions
    expect(customerName).not.toBeNull();
    expect(customerIssue).not.toBeNull();
    expect(customerName).toContain('John Doe'); // Assuming this is the expected customer name
    expect(customerIssue).toContain('Product Inquiry'); // Assuming this is the expected issue

    // Additional assertions or actions can be added as needed
  });
});
```