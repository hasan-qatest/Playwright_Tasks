import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { CheckoutInformationPage } from "../pages/CheckoutInformationPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { Logout } from "../pages/Logout";

export const test = base.extend<{
  saveLogs: void;
  loginPage: LoginPage;
  homePage: HomePage;
  shoppingCartPage: ShoppingCartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  logout: Logout;
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
  shoppingCartPage: async ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await use(shoppingCartPage);
  },
  checkoutInformationPage: async ({ page }, use) => {
    const checkoutInformationPage = new CheckoutInformationPage(page);
    await use(checkoutInformationPage);
  },
  checkoutOverviewPage: async ({ page }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
  },
  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },
  logout: async ({ page }, use) => {
    const logout = new Logout(page);
    await use(logout);
  },
});

export { expect } from "@playwright/test";
