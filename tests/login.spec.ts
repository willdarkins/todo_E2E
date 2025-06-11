import { expect, test } from "../fixtures/base";

test.describe("Login Page", () => {
  test.beforeEach(async ({ loginPage, context }) => {
    await context.clearCookies(); // Clear session cookies
    await context.storageState();
    await loginPage.goto();
  });

  test("should display the login page with correct components", async ({
    loginPage,
  }) => {
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.subTitle).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.signUpLink).toBeVisible();
  });
});
