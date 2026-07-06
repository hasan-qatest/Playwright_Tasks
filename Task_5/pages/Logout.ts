import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";

export class Logout {
  readonly page: Page;
  readonly openMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.getByTestId("logout-sidebar-link");
  }

  async isLogoutMenuVisible() {
    await expect(this.openMenuButton).toBeVisible();
    Logger.success("Successfully verified that the menu is visible");
  }
  async logoutLinkClick() {
    await this.openMenuButton.click();
    await this.logoutLink.click();
    Logger.success("Successfully verified that the user is logged out");
  }
}
