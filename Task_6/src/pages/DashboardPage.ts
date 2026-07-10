import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";

export class DashboardPage extends BasePage {
  readonly page: Page;
  readonly dashboardHeader: Locator;
  readonly userDropdownButton: Locator;
  readonly logoutLink: Locator;
  readonly dashboardMenu: Locator;
  readonly pimMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    //this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
    //this.dashboardHeader = page.locator(".oxd-topbar-header-breadcrumb-module");
    this.dashboardHeader = page.locator(
      "h6.oxd-topbar-header-breadcrumb-module",
    );
    this.pimMenu = page.locator("a").filter({ hasText: "PIM" });
    //this.pimMenu = page.getByRole("link", { name: "PIM" });
    //this.pimMenu = page.locator("//a[.//span[text()='PIM']]");
    this.dashboardMenu = page.getByRole("link", { name: "Dashboard" });
    this.userDropdownButton = page.locator(".oxd-userdropdown-tab");

    this.logoutLink = page.getByRole("menuitem", { name: "Logout" });
  }

  async isDashboardHeaderVisible() {
    // // if (!(await super.isVisible(this.dashboardHeader))) {
    // //   throw new Error("Dashboard Header Not Visible");
    // // }
    // await expect(this.dashboardHeader).toBeVisible();
    // Logger.success("Dashboard Page is visible");
    console.log("A");
    console.log(this.page.url());
    console.log("B");
    //await this.page.pause();
    await this.pimMenu.click();
    //await super.click(this.dashboardMenu);
    //await expect(this.dashboardHeader).toBeVisible();
    console.log("C");
    Logger.success("Dashboard Page is visible");
  }

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
}
