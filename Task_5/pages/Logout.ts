import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { BasePage } from "./BasePage";

export class Logout extends BasePage {
  readonly page: Page;
  readonly openMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.openMenuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.getByTestId("logout-sidebar-link");
  }

  async isMenuIconVisible() {
    expect(await super.isVisible(this.openMenuButton)).toBe(true);
    Logger.success("Successfully verified that the menu is visible");
  }
  async logoutLinkClick() {
    await super.click(this.openMenuButton);
    await super.click(this.logoutLink);
    Logger.success("Successfully clicked the Logout link");
  }
}
