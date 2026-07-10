import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";

export class PimPage extends BasePage {
  readonly page: Page;
  readonly employeeListTab: Locator;
  readonly employeeListHeader: Locator;
  readonly addEmployeeButton: Locator;
  readonly addEmployeeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.employeeListTab = page.getByRole("link", { name: "Employee List" });
    this.employeeListHeader = page.getByRole("heading", {
      name: "Employee Information",
    });
    this.addEmployeeButton = page.getByRole("button", { name: " Add " });
    this.addEmployeeHeader = page.getByRole("heading", {
      name: "Add Employee",
    });
  }
  async isEmployeeListTabVisible() {
    if (!(await super.isVisible(this.employeeListTab))) {
      throw new Error("Employee List Tab Not Visible");
    }
    Logger.success("Employee List Tab Visible");
  }
  async clickEmployeeListTab() {
    await super.click(this.employeeListTab.first());
    Logger.success("Employee List Tab is Clicked");
  }

  async isEmployeeListHeaderVisible() {
    if (!(await super.isVisible(this.employeeListHeader))) {
      throw new Error("Employee List Header Not Visible");
    }
    Logger.success("Employee List Header Visible");
  }

  async isAddEmployeeButtonVisible() {
    if (!(await super.isVisible(this.addEmployeeButton))) {
      throw new Error("Add Employee Button Not Visible");
    }
    Logger.success("Add Employee Button Visible");
  }

  async clickAddEmployeeButton() {
    await super.click(this.addEmployeeButton);
    Logger.success("Add Employee Button Clicked");
  }

  async isAddEmployeeHeaderVisible() {
    if (!(await super.isVisible(this.addEmployeeHeader))) {
      throw new Error("Add Employee Header Not Visible");
    }
    Logger.success("Add Employee Header Visible");
  }
}
