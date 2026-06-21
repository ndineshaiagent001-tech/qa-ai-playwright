```typescript
// screen-pop.test.ts
import { test, expect } from '@playwright/test';

test.describe('Screen Pop for Agent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display screen pop with correct information', async ({ page }) => {
    // Login as an agent
    await page.fill('input[name="username"]', 'agentUsername');
    await page.fill('input[name="password"]', 'agentPassword');
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForNavigation();

    // Simulate an incoming call
    await page.evaluate(() => {
      // Assume there's a function to simulate an incoming call
      window.simulateIncomingCall('callerId', 'callerName');
    });

    // Wait for screen pop to appear
    await page.waitForSelector('#screen-pop');

    // Assert screen pop contains correct information
    const screenPop = await page.$('#screen-pop');
    expect(await screenPop?.textContent()).toContain('callerName');
    expect(await screenPop?.textContent()).toContain('callerId');

    // Assert screen pop has the correct fields
    const fields = await screenPop?.$$('input');
    expect(fields).toHaveLength(2);
    expect(await fields?.[0].getAttribute('placeholder')).toBe('Customer Name');
    expect(await fields?.[1].getAttribute('placeholder')).toBe('Issue Description');
  });
});
```