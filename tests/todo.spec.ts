import {test, expect} from '@playwright/test'
import { faker } from '@faker-js/faker'; // Import faker
import User from '../models/User';
import UserApi from '../api/userAPI';
import TodoApi from '../api/TodoApi';

const todoText = faker.lorem.sentence({ min: 4, max: 8 });

test("should be able to add a new todo", async({page, request, context}) => {
    
    const user = new User()
            
    
    const response = await new UserApi().signUp(request, user)

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

test ('should be able to delete a new task', async({page, request, context}) => {
    await page.goto('/signup')

    const user = new User()

    const response = await new UserApi().signUp(request, user)
    const responseBody = await response.json();
    const access_token = responseBody.access_token;
    const firstName = responseBody.firstName;
    const userID = responseBody.userID;

    
    await user.setAccessToken(access_token);
    await user.setUserID(userID);

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

    await new TodoApi().addTodo(request, user)
    await page.goto('/todo')
    await page.click('[data-testid=delete]');
    const noTodosMessage = page.locator('[data-testid=no-todos]');
    await expect(noTodosMessage).toBeVisible();
})