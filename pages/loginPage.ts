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
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(user: User) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}
