import { test, expect } from "../fixtures/base";
import User from "../models/User";

test.describe("Register Tests", () => {
  test.beforeEach(async ({ signUpPage, context }) => {
    await context.clearCookies();
    await context.storageState();
    await signUpPage.goto();
  });

  test("should display login page with correct components", async ({
    signUpPage,
  }) => {
    await expect(signUpPage.firstNameInput).toBeVisible();
    await expect(signUpPage.lastNameInput).toBeVisible();
    await expect(signUpPage.emailInput).toBeVisible();
    await expect(signUpPage.passwordInput).toBeVisible();
    await expect(signUpPage.confirmPasswordInput).toBeVisible();
    await expect(signUpPage.signUpButton).toBeVisible();
    await expect(signUpPage.haveAccountLink).toBeVisible();
  });

  test("should register with valid info", async ({ signUpPage }) => {
    const user = new User();

    await signUpPage.signUp(user);
    await signUpPage.validateSignUp();
  });

  test("should throw error for missing first name", async ({ signUpPage }) => {
    await signUpPage.signUpButton.click();
    await expect(signUpPage.missingFirstName).toBeVisible();
  });

  test("should throw error for missing last name", async ({ signUpPage }) => {
    await signUpPage.firstNameInput.fill("John");
    await signUpPage.signUpButton.click();
    await expect(signUpPage.missingLastName).toBeVisible();
  });

  test("should throw error for missing email", async ({ signUpPage }) => {
    await signUpPage.firstNameInput.fill("John");
    await signUpPage.lastNameInput.fill("Doe");
    await signUpPage.signUpButton.click();
    await expect(signUpPage.missingEmail).toBeVisible();
  });

  test("should throw error for missing password", async ({ signUpPage }) => {
    await signUpPage.firstNameInput.fill("John");
    await signUpPage.lastNameInput.fill("Doe");
    await signUpPage.emailInput.fill("john.doe@gmail.com");
    await signUpPage.signUpButton.click();
    await expect(signUpPage.missingPassword).toBeVisible();
  });

  test("should throw error for missing confirm password", async ({
    signUpPage,
  }) => {
    await signUpPage.firstNameInput.fill("John");
    await signUpPage.lastNameInput.fill("Doe");
    await signUpPage.emailInput.fill("john.doe@gmail.com");
    await signUpPage.passwordInput.fill("Password123!");
    await signUpPage.signUpButton.click();
    await expect(signUpPage.missingConfirmPassword).toBeVisible();
  });
});
