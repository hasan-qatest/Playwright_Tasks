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

  async waitForLoadState(
    state: "load" | "domcontentloaded" | "networkidle" = "load",
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }
  async waitForHidden(locator: Locator): Promise<void> {
    await locator.first().waitFor({
      state: "hidden",
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

  async getEmployeeRow(employeeId: string): Promise<Locator> {
    return await this.page
      .locator(".oxd-table-row")
      .filter({ hasText: employeeId });
  }

  async getEmployeeId(row: Locator): Promise<string> {
    return await row.locator(".oxd-table-cell").nth(1).innerText();
  }

  async getEmployeeName(row: Locator): Promise<string> {
    return await row.locator(".oxd-table-cell").nth(2).innerText();
  }
  async getEmployeeLastName(row: Locator): Promise<string> {
    return await row.locator(".oxd-table-cell").nth(3).innerText();
  }

  async getEditButton(row: Locator): Promise<Locator> {
    return await row.locator("button:has(.bi-pencil-fill)");
  }

  async getDeleteButton(row: Locator): Promise<Locator> {
    return await row.locator("button:has(.bi-trash)");
  }
}
