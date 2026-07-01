import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

export const test = base.extend<{
  saveLogs: void;
  loginPage: LoginPage;
  homePage: HomePage;
}>({
  saveLogs: [
    async ({}, use) => {
      await use();
    },
    { auto: true },
  ],
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
