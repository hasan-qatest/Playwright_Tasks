import { test } from "../fixture/TestFixture";
import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";

export class LogoutPage {
  readonly page: Page;
  readonly openMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId("logout-sidebar-link");
  }

  async isLogoutMenuVisible() {
    await test.step("Verify that the Menu is Visible", async () => {
      await expect(this.openMenuButton).toBeVisible();
      Logger.success("Verified that the Menu is visible");
    });
  }
  async logoutLinkClick() {
    await test.step("Click the Logout button", async () => {
      await this.openMenuButton.click();
      await this.logoutLink.click();
      Logger.success("Verified that the user was logged out successfully");
    });
  }
}
