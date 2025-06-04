import {test, expect} from '@playwright/test'
import { faker } from '@faker-js/faker'; // Import faker

test('should be able to register to our applications', async({page}) => {
    await page.goto('https://todo.qacart.com/signup')
    await page.fill("[data-testid=first-name]", 'Will')
    await page.fill("[data-testid=last-name]", 'Darkins')
    await page.fill("[data-testid=email]", 'willdarkins@gmail.com')
    await page.fill("[data-testid=email]", 'willdarkins@gmail.com')
    await page.fill("[data-testid=password]", 'Finley2021!')
    await page.fill("[data-testid=confirm-password]", 'Finley2021!')

    await page.click("[data-testid=submit]")

    const welcomeMessage = page.locator('[data-testid=welcome]')
    await expect(welcomeMessage).toBeVisible()
})