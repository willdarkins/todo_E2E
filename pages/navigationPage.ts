import { Locator, Page } from "@playwright/test";
import LoginPage from "./loginPage";

export default class NavigationPage extends LoginPage {
  readonly homeLink: Locator;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly todoLink: Locator;

  constructor(page: Page) {
    super(page);
    this.homeLink = page.locator('a[href="/"]');
    this.loginLink = page.locator('a[href="/login"]');
    this.signUpLink = page.locator('a[href="/signup"]');
    this.todoLink = page.locator('a[href="/todo"]');
  }
  /**
   * Clicks a specified navigation link based on its name.
   * @param linkName The name of the link to click (e.g., "Home", "Login", "Signup").
   * @throws Error if an invalid linkName is provided.
   */
  async clickNav(
    linkName: "Home" | "Login" | "Signup" | "Todo"
  ): Promise<void> {
    switch (linkName) {
      case "Home":
        await this.homeLink.click();
        break;
      case "Login":
        await this.loginLink.click();
        break;
      case "Signup":
        await this.signUpLink.click();
        break;
      case "Todo":
        await this.todoLink.click();
        break;
      default:
        throw new Error(`Invalid navigation link name provided: ${linkName}`);
    }
  }
}
