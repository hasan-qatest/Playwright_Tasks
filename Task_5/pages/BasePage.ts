import { Locator, Page } from "@playwright/test";

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

  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: "visible" });
      return true;
    } catch {
      return false;
    }
  }
}
