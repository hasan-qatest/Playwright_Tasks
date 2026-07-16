import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";

export class DashboardPage extends BasePage {
  readonly page: Page;
  readonly dashboardHeader: Locator;
  readonly userDropdownButton: Locator;
  readonly logoutLink: Locator;
  readonly pimMenu: Locator;
  readonly pimHeader: Locator;
  readonly loader: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
    this.pimHeader = page.getByRole("heading", { name: "PIM" });
    this.pimMenu = page.getByRole("link", { name: "PIM" });
    this.userDropdownButton = page.locator(".oxd-userdropdown-tab");
    this.logoutLink = page.getByRole("menuitem", { name: "Logout" });
    this.loader = page.locator(".oxd-loading-spinner");
  }

  // Dashboard Header
  async isDashboardHeaderVisible() {
    await super.waitForVisible(this.dashboardHeader);
    if (!(await super.isVisible(this.dashboardHeader.first()))) {
      throw new Error("Dashboard Header is Not Visible");
    }
    Logger.success("Dashboard Header is Visible");
  }

  // PIM Menu
  async isPimMenuVisible() {
    await super.waitForVisible(this.pimMenu);
    if (!(await super.isVisible(this.pimMenu.first()))) {
      throw new Error("PIM Menu is Not Visible");
    }
    Logger.success("PIM Menu is Visible");
  }
  async clickPimMenu() {
    await super.click(this.pimMenu.first());
    Logger.success("Clicked PIM Menu");
  }

  async isPimHeaderVisible() {
    await super.waitForVisible(this.pimHeader);
    if (!(await super.isVisible(this.pimHeader.first()))) {
      throw new Error("PIM Header is Not Visible");
    }
    Logger.success("PIM Header is Visible");
  }

  //Logout Flow
  async isUserMenuVisible() {
    await super.waitForVisible(this.userDropdownButton);
    if (!(await super.isVisible(this.userDropdownButton))) {
      throw new Error("User menu is Not Visible");
    }
    Logger.success("User Menu is Visible");
  }
  async clickUserMenu() {
    await super.click(this.userDropdownButton);
    Logger.success("Clicked User Menu");
  }
  async isLogoutLinkIsVisible() {
    await super.waitForVisible(this.logoutLink);
    if (!(await super.isVisible(this.logoutLink))) {
      throw new Error("Logout Link is Not Visible");
    }
    Logger.success("Logout Link is Visible");
  }
  async clickLogoutLink() {
    await super.click(this.logoutLink);
    Logger.success("Clicked Logout Link");
  }
}
