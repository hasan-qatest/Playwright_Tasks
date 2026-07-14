import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async waitForVisible(locator: Locator): Promise<void> {
    await locator.waitFor({
      state: "visible",
    });
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
    // try {
    //   await locator.waitFor({ state: "visible", timeout: 6000 });
    //   return true;
    // } catch {
    //   return false;
    // }
  }
  async validatePageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}
