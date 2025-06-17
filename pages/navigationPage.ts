import { Locator, Page } from "@playwright/test";

export default class NavigationPage {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.locator('a[href="/"]');
    this.loginLink = page.locator('a[href="/login"]');
    this.signUpLink = page.locator('a[href="/signup"]');
  }
  /**
   * Clicks a specified navigation link based on its name.
   * @param linkName The name of the link to click (e.g., "Home", "Login", "Signup").
   * @throws Error if an invalid linkName is provided.
   */
  async clickNav(linkName: "Home" | "Login" | "Signup"): Promise<void> {
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
      default:
        // This 'default' case should ideally not be reached if using the union type for linkName
        // but it's good practice for robustness or if the type is less strict elsewhere.
        throw new Error(`Invalid navigation link name provided: ${linkName}`);
    }
  }
}
