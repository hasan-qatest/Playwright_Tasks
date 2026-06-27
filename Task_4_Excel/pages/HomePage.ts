import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly loginPage: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = page.locator(`//a[@href='/login']`);
    this.loginButton = page.locator(`//button[@data-qa="login-button"]`);
  }

  async gotoURL(homePageURL: string) {
    await this.page.goto(homePageURL);
  }

  async validateLandingWebsite() {
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  async clickLogin() {
    await this.loginPage.click();
    await expect(this.loginButton).toBeVisible();
  }
}
