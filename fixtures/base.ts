import { test as base } from "@playwright/test";
import SignUpPage from "../pages/signUpPage";

type MyFixtures = {
  signUpPage: SignUpPage;
};

export const test = base.extend<MyFixtures>({
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
});

export { expect } from "@playwright/test";
