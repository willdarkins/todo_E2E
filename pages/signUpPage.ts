import { expect, Locator, Page } from "@playwright/test";

export default class SignUpPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly signUpButton: Locator;
  readonly haveAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    (this.firstNameInput = page.getByTestId("first-name")),
      (this.lastNameInput = page.getByTestId("last-name")),
      (this.emailInput = page.getByTestId("email")),
      (this.passwordInput = page.getByTestId("password")),
      (this.confirmPasswordInput = page.getByTestId("confirm-password"));
    this.signUpButton = page.getByRole("button", { name: "SIGNUP" });
    this.haveAccountLink = page.getByTestId("go-login");
  }

  async signUp(
    firstNameInput: string,
    lastNameInput: string,
    emailInput: string,
    passwordInput: string,
    confirmPasswordInput: string
  ) {}
}
