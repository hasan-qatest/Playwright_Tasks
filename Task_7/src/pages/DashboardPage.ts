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

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
    this.pimHeader = page.getByRole("heading", { name: "PIM" });
    this.pimMenu = page.getByRole("link", { name: "PIM" });
    this.userDropdownButton = page.locator(".oxd-userdropdown-tab");
    this.logoutLink = page.getByRole("menuitem", { name: "Logout" });
  }

  // Dashboard Header
  async verifyDashboardHeaderVisible() {
    await this.waitForVisible(this.dashboardHeader);
    if (!(await this.isVisible(this.dashboardHeader))) {
      throw new Error("Dashboard Header is Not Visible");
    }
    Logger.success("Dashboard Header is Visible");
  }

  async clickPimMenu() {
    await this.waitForVisible(this.pimMenu);
    if (!(await this.isVisible(this.pimMenu))) {
      throw new Error("PIM Menu is Not Visible");
    }
    Logger.success("PIM Menu is Visible");

    await this.click(this.pimMenu.first());
    Logger.success("Clicked PIM Menu");

    await this.waitForVisible(this.pimHeader);
    if (!(await this.isVisible(this.pimHeader))) {
      throw new Error("PIM Header is Not Visible");
    }
    Logger.success("Redirected to PIM Page");
  }

  //Logout Flow
  async clickUserMenu() {
    if (!(await this.isVisible(this.userDropdownButton))) {
      throw new Error("User menu is Not Visible");
    }
    Logger.success("User Menu is Visible");

    await this.click(this.userDropdownButton);
    Logger.success("Clicked User Menu");
  }

  async clickLogoutLink() {
    await this.waitForVisible(this.logoutLink);
    if (!(await this.isVisible(this.logoutLink))) {
      throw new Error("Logout Link is Not Visible");
    }
    Logger.success("Logout Link is Visible");

    await this.click(this.logoutLink);
    Logger.success("User Logout Successfully");
  }
}
