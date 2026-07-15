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
  }
  
  async validatePageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async highlight(locator: Locator): Promise<void> {
    await locator.evaluate((el) => {
      (el as HTMLElement).style.border = "3px solid red";
      (el as HTMLElement).style.backgroundColor = "yellow";
    });
  }
  async toastMessage(locator: Locator, value: string) {
    await expect(locator).toContainText(value);
  }
}
