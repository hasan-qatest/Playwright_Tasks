import { Locator, Page, expect } from "@playwright/test";
import { constants } from "../utils/constants";

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
    return locator.waitFor({ state: "visible" });
  }

  async waitForLoadState(
    state: "load" | "domcontentloaded" | "networkidle" = "load",
  ): Promise<void> {
    return this.page.waitForLoadState(state);
  }
  async waitForHidden(locator: Locator): Promise<void> {
    return locator.first().waitFor({ state: "hidden" });
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
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

  async verifyToastMessage(locator: Locator, value: string) {
    await expect(locator).toContainText(value);
  }

  async getEmployeeRow(employeeId: string): Promise<Locator> {
    return this.page.locator(".oxd-table-row").filter({ hasText: employeeId });
  }

  // .oxd-table-cell order: [checkbox, id, name, lastName, ...] — keep EmployeeColumns in sync
  async getCellText(row: Locator, columnIndex: number): Promise<string> {
    return row.locator(".oxd-table-cell").nth(columnIndex).innerText();
  }

  async getEditButton(row: Locator): Promise<Locator> {
    return row.locator("button:has(.bi-pencil-fill)");
  }

  async getDeleteButton(row: Locator): Promise<Locator> {
    return row.locator("button:has(.bi-trash)");
  }

  async clearInputField(locator: Locator) {
    await locator.first().clear();
  }

  async selectDropdownValue(dropdown: Locator, dropdownValue: Locator) {
    await this.click(dropdown);
    await this.click(dropdownValue);
  }

  async validateNoInputFieldError(invalidLocator: Locator) {
    await expect(
      invalidLocator,
      constants.userCreationValidationErrorMessage,
    ).toHaveCount(0);
  }

  async verifyDropdownValue(dropdownLocator: Locator, expectedValue: string) {
    await expect(dropdownLocator).toContainText(expectedValue);
    await expect(dropdownLocator).not.toContainText(
      constants.defaultDropdownValue,
    );
  }
}
