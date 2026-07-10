import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { PimPage } from "../pages/PimPage";

export const test = base.extend<{
  saveLogs: void;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PimPage;
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
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  pimPage: async ({ page }, use) => {
    const pimPage = new PimPage(page);
    await use(pimPage);
  },
});

export { expect } from "@playwright/test";
