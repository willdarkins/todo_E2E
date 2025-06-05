import {test, expect} from '@playwright/test'
import { faker } from '@faker-js/faker'; // Import faker
import User from '../models/User';

test('should be able to register to our applications', async({page}) => {

    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        `${faker.internet.username()}_${Date.now()}@test.com`,
        faker.internet.password({ length: 12, memorable: false, pattern: /[A-Za-z0-9!@#$%^&*()_+-]/ }))
    
    await page.goto('/signup')
    await page.fill("[data-testid=first-name]", user.firstName)
    await page.fill("[data-testid=last-name]", user.lastName)
    await page.fill("[data-testid=email]", user.email)
    await page.fill("[data-testid=password]", user.password)
    await page.fill("[data-testid=confirm-password]", user.password)

    await page.click("[data-testid=submit]")

    const welcomeMessage = page.locator('[data-testid=welcome]')
    await expect(welcomeMessage).toBeVisible()
})