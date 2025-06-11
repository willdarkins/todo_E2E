import { expect, Locator, Page } from "@playwright/test";
import User from "../models/User";

export default class LoginPage {
  readonly page: Page;
  readonly title: Locator;
  readonly subTitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signUpLink: Locator;
  readonly incorrectEmailError: Locator;
  readonly incorrectCombo: Locator;
  readonly incorrectPasswordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "LOGIN TO APPLICATION" });
    this.subTitle = page.getByRole("heading", {
      name: "Ready to mark some Todos as completed?",
    });
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByRole("button", { name: "LOGIN" });
    this.signUpLink = page.getByTestId("signup");
    this.incorrectEmailError = page.locator("#email-helper-text");
    this.incorrectCombo = page
      .getByTestId("error-alert")
      .getByText(
        "The email and password combination is not correct, please fill a correct email and password"
      );
    this.incorrectPasswordError = page
      .getByTestId("error-alert")
      .getByText("Please Fill a correct Password");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(userName: string, password: string) {
    await this.emailInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
