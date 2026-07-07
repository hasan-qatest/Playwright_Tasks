import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { Checkout } from "../pages/Checkout";
import { Logout } from "../pages/Logout";
import { BasePage } from '../pages/BasePage';

export const test = base.extend<{
  saveLogs: void;
  loginPage: LoginPage;
  homePage: HomePage;
  shoppingCartPage: ShoppingCartPage;
  checkout: Checkout;
  logout: Logout;
  basePage: BasePage;
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
  checkout: async ({ page }, use) => {
    const checkoutInformationPage = new Checkout(page);
    await use(checkoutInformationPage);
  },
  logout: async ({ page }, use) => {
    const logout = new Logout(page);
    await use(logout);
  },
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },

});

export { expect } from "@playwright/test";
