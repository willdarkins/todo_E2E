import { expect, Locator, Page } from "@playwright/test";
import User from "../models/User";

export default class SignUpPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly signUpButton: Locator;
  readonly haveAccountLink: Locator;
  readonly welcomeMessage: Locator;

  readonly missingFirstName: Locator;
  readonly missingLastName: Locator;
  readonly missingEmail: Locator;
  readonly missingPassword: Locator;
  readonly missingConfirmPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    (this.firstNameInput = page.getByTestId("first-name")),
      (this.lastNameInput = page.getByTestId("last-name")),
      (this.emailInput = page.getByTestId("email")),
      (this.passwordInput = page.getByTestId("password")),
      (this.confirmPasswordInput = page.getByTestId("confirm-password"));
    this.signUpButton = page.getByRole("button", { name: "SIGNUP" });
    this.haveAccountLink = page.getByTestId("go-login");
    this.welcomeMessage = page.getByTestId("welcome");

    this.missingFirstName = page.getByText(
      "First Name is required, and it should be more than 3 characters"
    );
    this.missingLastName = page.getByText(
      "Last Name is required, and it should be more than 3 characters"
    );
    this.missingEmail = page.getByText("Please Insert a correct Email format");
    this.missingPassword = page.getByText(
      "Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    );
    this.missingConfirmPassword = page.getByText(
      "Second password does not match the first Password"
    );
  }

  async goto() {
    await this.page.goto("/signup");
  }

  async signUp(user: User) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.signUpButton.click();
  }

  async validateSignUp() {
    await expect(this.welcomeMessage).toBeVisible();
  }
}
