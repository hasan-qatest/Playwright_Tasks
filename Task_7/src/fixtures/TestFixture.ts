import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { PimPage } from "../pages/PimPage";
import { AdminPage } from "../pages/AdminPage";

export const test = base.extend<{
  saveLogs: void;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PimPage;
  adminPage: AdminPage;
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
  adminPage: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },
});

export { expect } from "@playwright/test";
