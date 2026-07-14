import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";

export class PimPage extends BasePage {
  readonly page: Page;
  readonly employeeListTab: Locator;
  readonly employeeListHeader: Locator;
  readonly addEmployeeTab: Locator;
  readonly addEmployeeHeader: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly uploadInput: Locator;
  readonly saveButton: Locator;
  readonly personalDetailsHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.employeeListTab = page.getByRole("link", { name: "Employee List" });
    this.employeeListHeader = page.getByRole("heading", {
      name: "Employee Information",
    });
    this.addEmployeeTab = page.getByRole("link", { name: "Add Employee" });
    this.addEmployeeHeader = page.getByRole("heading", {
      name: "Add Employee",
    });
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.middleNameInput = page.getByRole("textbox", { name: "Middle Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.employeeIdInput = this.page
      .locator(".oxd-input-group")
      .filter({ hasText: "Employee Id" })
      .locator("input");
    this.uploadInput = page.locator("input[type='file']");
    this.saveButton = page.getByRole("button", { name: " Save " });
    this.personalDetailsHeader = page.getByRole("heading", {
      name: "Personal Details",
    });
  }

  async isEmployeeListTabVisible() {
    await super.waitForVisible(this.employeeListTab);
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
    await super.waitForVisible(this.employeeListHeader);
    if (!(await super.isVisible(this.employeeListHeader))) {
      throw new Error("Employee List Header Not Visible");
    }
    Logger.success("Employee List Header Visible");
  }

  async isAddEmployeeTabVisible() {
    await super.waitForVisible(this.addEmployeeTab);
    if (!(await super.isVisible(this.addEmployeeTab))) {
      throw new Error("Add Employee Tab Not Visible");
    }
    Logger.success("Add Employee Tab Visible");
  }

  async clickAddEmployeeTab() {
    await super.click(this.addEmployeeTab.first());
    Logger.success("Add Employee Tab Clicked");
  }

  async isAddEmployeeHeaderVisible() {
    await super.waitForVisible(this.addEmployeeHeader);
    if (!(await super.isVisible(this.addEmployeeHeader))) {
      throw new Error("Add Employee Header Not Visible");
    }
    Logger.success("Add Employee Header Visible");
  }

  async fillNewEmployeeDetails(newEmployee: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
  }) {
    console.log(`First Name ${newEmployee.firstName}`);
    console.log(`Middle Name ${newEmployee.middleName}`);
    console.log(`Last Name ${newEmployee.lastName}`);
    console.log(`Employee ID ${newEmployee.employeeId}`);
    await super.fill(this.firstNameInput, newEmployee.firstName);
    await super.fill(this.middleNameInput, newEmployee.middleName);
    await super.fill(this.lastNameInput, newEmployee.lastName);
    await super.fill(this.employeeIdInput, newEmployee.employeeId);
    await this.uploadInput.setInputFiles(
      "test-data/man-avatar-profile-picture.png",
    );
    Logger.success("New Employee Details Entered");
  }

  async clickSaveButton() {
    await super.click(this.saveButton);
    Logger.success("Save Button Click");
  }

  async isPersonalDetailsHeaderVisible() {
    if (!(await super.isVisible(this.personalDetailsHeader))) {
      throw new Error("Personal Details Header Not Visible");
    }
    Logger.success("Personal Details Header Visible");
  }
}
