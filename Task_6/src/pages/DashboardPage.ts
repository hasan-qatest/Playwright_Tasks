import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";

export class DashboardPage extends BasePage {
  readonly page: Page;
  readonly dashboardHeader: Locator;
  readonly userDropdownButton: Locator;
  readonly logoutLink: Locator;
  readonly dashboardMenu: Locator;
  readonly pimMenu: Locator;
  readonly pimHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
    this.pimHeader = page.getByRole("heading", { name: "PIM" });
    this.pimMenu = page.getByRole("link", { name: "PIM" });
    this.dashboardMenu = page.getByRole("link", { name: "Dashboard" });
    this.userDropdownButton = page.locator(".oxd-userdropdown-tab");
    this.logoutLink = page.getByRole("menuitem", { name: "Logout" });
  }

  // Dashboard Header
  async isDashboardHeaderVisible() {
    if (!(await super.isVisible(this.dashboardHeader.first()))) {
      throw new Error("Dashboard Header Not Visible");
    }
    Logger.success("Dashboard Header Visible");
  }

  //Logout Flow
  async isUserMenuVisible() {
    if (!(await super.isVisible(this.userDropdownButton))) {
      throw new Error("User menu Not Visible");
    }
    Logger.success("User Menu is Visible");
  }
  async clickUserMenu() {
    await super.click(this.userDropdownButton);
    Logger.success("User Menu Clicked");
  }
  async isLogoutLinkIsVisible() {
    if (!(await super.isVisible(this.logoutLink))) {
      throw new Error("Logout Link Not Visible");
    }
    Logger.success("Logout Link is Visible");
  }
  async clickLogoutLink() {
    await super.click(this.logoutLink);
    Logger.success("User Clicked Logout Link");
  }

  // PIM Menu
  async isPimMenuVisible() {
    if (!(await super.isVisible(this.pimMenu.first()))) {
      throw new Error("PIM Menu Not Visible");
    }
    Logger.success("PIM Menu is Visible");
  }
  async clickPimMenu() {
    await super.click(this.pimMenu.first());
    Logger.success("PIM Menu is Clicked");
  }

  async isPimHeaderVisible() {
    if (!(await super.isVisible(this.pimHeader.first()))) {
      throw new Error("PIM Header Not Visible");
    }
    Logger.success("PIM Header Visible");
  }
}
