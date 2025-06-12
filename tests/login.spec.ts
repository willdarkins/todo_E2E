import { expect, test } from "../fixtures/base";
import loginUsers from "../db/loginUsers";

test.describe("Login Tests", () => {
  test.beforeEach(async ({ loginPage, context }) => {
    await context.clearCookies(); // Clear session cookies
    await context.storageState();
    await loginPage.goto();
  });

  test("should display login page with correct components", async ({
    loginPage,
  }) => {
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.subTitle).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.signUpLink).toBeVisible();
  });

  test("should login with valid credentials", async ({ loginPage, page }) => {
    await loginPage.login(
      loginUsers.validCredentials.email,
      loginUsers.validCredentials.password
    );
    await expect(page).toHaveURL(/todo/);
  });

  test("should throw error for invalid email", async ({ loginPage }) => {
    await loginPage.login(
      loginUsers.invalidEmail.email,
      loginUsers.invalidEmail.password
    );
    await expect(loginPage.incorrectEmailError).toBeVisible();
  });

  test("should throw error for valid email, wrong but valid password", async ({
    loginPage,
  }) => {
    await loginPage.login(
      loginUsers.validEmailIncorrectPassword.email,
      loginUsers.validEmailIncorrectPassword.password
    );
    await expect(loginPage.incorrectCombo).toBeVisible();
  });

  test("should throw error for valid email, invalid password", async ({
    loginPage,
  }) => {
    await loginPage.login(
      loginUsers.validEmailInvalidPassword.email,
      loginUsers.validEmailInvalidPassword.password
    );
    await expect(loginPage.incorrectPasswordError).toBeVisible();
  });

  test("should throw error for invalid email, valid password", async ({
    loginPage,
  }) => {
    await loginPage.login(
      loginUsers.invalidEmail.email,
      loginUsers.invalidEmail.password
    );
    await expect(loginPage.incorrectEmailError).toBeVisible();
  });
});
