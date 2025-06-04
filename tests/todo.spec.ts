import {test, expect} from '@playwright/test'
import { faker } from '@faker-js/faker'; // Import faker

const todoText = faker.lorem.sentence({ min: 4, max: 8 });

test("should be able to add a new todo", async({page, request, context}) => {
    const response = await request.post('/api/v1/users/register', {
        data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email:`${faker.internet.username()}_${Date.now()}@test.com`,
            password: faker.internet.password({ length: 12, pattern: /[A-Za-z0-9!@#$%^&*()_+-=]/ })
        }
    })
    const responseBody = await response.json();
    const access_token = responseBody.access_token;
    const firstName = responseBody.firstName;
    const userID = responseBody.userID;

    await context.addCookies([
        {
            name: 'firstName',
            value: firstName,
            url: 'https://todo.qacart.com'
        },
                {
            name: 'access_token',
            value: access_token,
            url: 'https://todo.qacart.com'
        },
        {
            name: 'userID',
            value: userID,
            url: 'https://todo.qacart.com' 
        }
    ]);
    await page.goto('/todo');
    await page.click('[data-testid=add]');
    await page.fill('[data-testid=new-todo]', todoText)
    await page.click('[data-testid=submit-newTask]');
    const toDoItem = page.locator('[data-testid=todo-item]');
    await expect(toDoItem).toHaveText(todoText)
})

test ('should be able to delete a new task', async({page}) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${faker.internet.username()}_${Date.now()}@test.com`;
    const todoText = faker.lorem.sentence({ min: 3, max: 7 });

    await page.goto('/signup')
    await page.fill("[data-testid=first-name]", firstName)
    await page.fill("[data-testid=last-name]", lastName)
    await page.fill("[data-testid=email]", email)
    await page.fill("[data-testid=password]", 'Finley2021!')
    await page.fill("[data-testid=confirm-password]", 'Finley2021!')

    await page.click("[data-testid=submit]")

    const welcomeMessage = page.locator('[data-testid=welcome]')
    await expect(welcomeMessage).toBeVisible()
    await page.click('[data-testid=add]')
    await page.fill('[data-testid=new-todo]', todoText)
    await page.click('[data-testid=submit-newTask]')
    const toDoItem = page.locator('[data-testid=todo-item]')
    await expect(toDoItem).toHaveText(todoText)

    await page.click('[data-testid=delete]')
    await expect(toDoItem).not.toBeVisible
})