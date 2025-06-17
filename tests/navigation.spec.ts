import { expect, test } from "../fixtures/base";
import loginUsers from "../db/loginUsers";

test.describe("Navigation Tests", () => {
  test.beforeEach(async ({ navigationPage, context }) => {
    await context.clearCookies(); // Clear session cookies
    await context.storageState();
    await navigationPage.page.goto("/");
  });

  test("should contain all header navigation links on base page", async ({
    navigationPage,
  }) => {
    await expect(navigationPage.homeLink).toBeVisible();
    await expect(navigationPage.loginLink).toBeVisible();
    await expect(navigationPage.signUpLink).toBeVisible();
  });

  test("should navigate to Home page", async ({ navigationPage, page }) => {
    await navigationPage.clickNav("Home");
    await expect(page).toHaveURL("/");
  });

  test("should navigate to Login page", async ({ navigationPage, page }) => {
    await navigationPage.clickNav("Login");
    await expect(page).toHaveURL("/login");
  });

  test("should navigate to Sign Up page", async ({ navigationPage, page }) => {
    await navigationPage.clickNav("Signup");
    await expect(page).toHaveURL("/signup");
  });

  test("should contain logout button & todo nav when logged in", async ({
    navigationPage,
    loginPage,
  }) => {
    await loginPage.login(
      loginUsers.validCredentials.email,
      loginUsers.validCredentials.password
    );
    await expect(navigationPage.homeLink).toBeVisible();
    await expect(navigationPage.todoLink).toBeVisible();
    await expect(navigationPage.logoutButton).toBeVisible();
    await expect(navigationPage.loginButton).not.toBeVisible();
  });

  test("should navigate to To Do when logged in", async ({
    navigationPage,
    loginPage,
    page,
  }) => {
    await loginPage.login(
      loginUsers.validCredentials.email,
      loginUsers.validCredentials.password
    );
    await expect(page).toHaveURL(/todo/);

    await navigationPage.clickNav("Todo");
    await expect(page).toHaveURL("/todo");
  });

  test("should logout and return to base page", async ({
    navigationPage,
    loginPage,
    page,
  }) => {
    await loginPage.login(
      loginUsers.validCredentials.email,
      loginUsers.validCredentials.password
    );
    await expect(page).toHaveURL(/todo/);

    await navigationPage.logout();
    await expect(page).toHaveURL("/login");
    await expect(navigationPage.loginButton).toBeVisible();
  });
});
