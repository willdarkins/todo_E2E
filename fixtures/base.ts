// base.ts
import { test as base, Page } from "@playwright/test";
import SignUpPage from "../pages/signUpPage";
import LoginPage from "../pages/loginPage";
import ToDoPage from "../pages/todoPage";
import User from "../models/User"; // Assuming User.ts is in the same directory or adjust path
import UserApi from "../api/UserApi"; // Adjust path as necessary

// Define your base URL if it's consistent and not already in playwright.config.ts
const BASE_URL = "https://todo.qacart.com";

type MyFixtures = {
  signUpPage: SignUpPage;
  loginPage: LoginPage;
  todoPage: ToDoPage;
  user: User; // Add the User instance to your fixtures
  loggedInUser: {
    // Add the loggedInUser fixture
    user: User;
    page: Page;
  };
};

export const test = base.extend<MyFixtures>({
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  todoPage: async ({ page }, use) => {
    await use(new ToDoPage(page));
  },

  // 'user' fixture: Creates a new User instance for each test that uses it
  user: async ({}, use) => {
    const user = new User();
    await use(user);
  },

  // 'loggedInUser' fixture: Signs up a user, sets cookies, and navigates to /todo
  loggedInUser: [
    async ({ page, request, context, user }, use) => {
      const userApi = new UserApi();
      const response = await userApi.signUp(request, user);
      const responseBody = await response.json();

      // Set user properties from API response
      user.setAccessToken(responseBody.access_token);
      user.setUserID(responseBody.userID);

      // Add cookies to the browser context
      await context.addCookies([
        {
          name: "firstName",
          value: responseBody.firstName,
          url: BASE_URL,
        },
        {
          name: "access_token",
          value: responseBody.access_token,
          url: BASE_URL,
        },
        {
          name: "userID",
          value: responseBody.userID,
          url: BASE_URL,
        },
      ]);

      // Navigate to the todo page after login
      await page.goto("/todo");

      // Provide the logged-in user and page to the test
      await use({ user, page });
    },
    { auto: true },
  ], // auto: true ensures this fixture runs before each test that uses it
});

export { expect } from "@playwright/test";
