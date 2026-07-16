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
  readonly searchEmployeeByNameInput: Locator;
  readonly searchEmployeeByIdInput: Locator;
  readonly searchButton: Locator;
  readonly dropdownButton: Locator;
  readonly loader: Locator;
  readonly deleteConfirmationButton: Locator;
  readonly toastMessageElement: Locator;
  expectedName: string | undefined;
  updateLastName: string | undefined;
  employeeRow!: Locator;

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
    this.searchEmployeeByNameInput = page.getByPlaceholder("Type for hints...");
    this.searchEmployeeByIdInput = page.locator(
      "//label[text()='Employee Id']/ancestor::div[contains(@class,'oxd-input-group')]//input",
    );
    this.searchButton = page.getByRole("button", { name: " Search " });
    this.dropdownButton = page.locator("button.oxd-icon-button");
    this.loader = page.locator(".oxd-loading-spinner");
    this.deleteConfirmationButton = page.getByRole("button", {
      name: " Yes, Delete ",
    });
    this.toastMessageElement = page.locator(".oxd-text--toast-message");
  }

  async isEmployeeListTabVisible() {
    await this.page.waitForLoadState("load");
    await super.waitForVisible(this.employeeListTab);
    if (!(await super.isVisible(this.employeeListTab))) {
      throw new Error("Employee List Tab is Not Visible");
    }
    Logger.success("Employee List Tab is Visible");
  }
  async clickEmployeeListTab() {
    await super.click(this.employeeListTab.first());
    Logger.success("Clicked Employee List Tab");
  }

  async isEmployeeListHeaderVisible() {
    await this.page.waitForLoadState("load");
    await this.loader.waitFor({ state: "hidden" });
    await super.waitForVisible(this.employeeListHeader);
    if (!(await super.isVisible(this.employeeListHeader))) {
      throw new Error("Employee List Header is Not Visible");
    }
    Logger.success("Employee List Header is Visible");
  }

  async isAddEmployeeTabVisible() {
    await this.page.waitForLoadState("load");
    if (!(await super.isVisible(this.addEmployeeTab))) {
      throw new Error("Add Employee Tab is Not Visible");
    }
    Logger.success("Add Employee Tab is Visible");
  }

  async clickAddEmployeeTab() {
    await super.click(this.addEmployeeTab.first());
    Logger.success("Clicked Add Employee Tab");
  }

  async isAddEmployeeHeaderVisible() {
    await this.page.waitForLoadState("load");
    await super.waitForVisible(this.addEmployeeHeader);
    if (!(await super.isVisible(this.addEmployeeHeader))) {
      throw new Error("Add Employee Header is Not Visible");
    }
    Logger.success("Add Employee Header is Visible");
  }

  async enterEmployeeDetails(newEmployee: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
  }) {
    await this.loader.waitFor({ state: "hidden" });
    await super.fill(this.firstNameInput, newEmployee.firstName);
    await super.fill(this.middleNameInput, newEmployee.middleName);
    await super.fill(this.lastNameInput, newEmployee.lastName);
    await super.fill(this.employeeIdInput, newEmployee.employeeId);
    await this.uploadInput.setInputFiles(
      "test-data/man-avatar-profile-picture.png",
    );
    Logger.success(
      `New Employee Details Entered Successfully:
  First Name : ${newEmployee.firstName}
  Middle Name: ${newEmployee.middleName}
  Last Name  : ${newEmployee.lastName}
  Employee ID: ${newEmployee.employeeId}`,
    );
  }

  async clickSaveButton() {
    await super.click(this.saveButton.first());
    await this.loader.waitFor({ state: "hidden" });
    await super.waitForVisible(this.toastMessageElement);
    await super.toastMessage(this.toastMessageElement, "Successfully");
    Logger.success("Clicked Save Button");
  }

  async isPersonalDetailsHeaderVisible() {
    await this.page.waitForLoadState("load");
    await this.loader.waitFor({ state: "hidden" });
    await super.waitForVisible(this.personalDetailsHeader);
    if (!(await super.isVisible(this.personalDetailsHeader))) {
      throw new Error("Employee Personal Details Header is Not Visible");
    }
    Logger.success("Employee Personal Details Header is Visible");
  }

  async verifyEmployeeDetails(newEmployee: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
  }) {
    await this.page.waitForLoadState("load");
    await this.loader.first().waitFor({ state: "hidden" });
    expect(await this.firstNameInput.inputValue()).toBe(newEmployee.firstName);
    expect(await this.middleNameInput.inputValue()).toBe(
      newEmployee.middleName,
    );
    expect(await this.lastNameInput.inputValue()).toBe(newEmployee.lastName);
    expect(await this.employeeIdInput.inputValue()).toBe(
      newEmployee.employeeId,
    );
    Logger.success(
      "Verified Employee First Name, Middle Name, Last Name and Employee Id",
    );
  }

  async SearchEmployee(newEmployee: {
    firstName: string;
    middleName: string;
    employeeId: string;
  }) {
    if (!(await super.isVisible(this.searchEmployeeByNameInput.first()))) {
      throw new Error("Search by Name field is Not Visible");
    }
    this.expectedName = `${newEmployee.firstName} ${newEmployee.middleName}`;
    await super.fill(this.searchEmployeeByNameInput.first(), this.expectedName);
    await super.click(this.searchButton);
    Logger.success(
      "Entered the first and middle name in the search box and clicked the Search button",
    );
  }

  async verifySearchEmployee(newEmployee: {
    firstName: string;
    middleName: string;
    employeeId: string;
  }) {
    await this.loader.waitFor({ state: "hidden" });

    this.employeeRow = await super.getEmployeeRow(newEmployee.employeeId);
    await super.isVisible(this.employeeRow);

    const actualEmployeeId = await super.getEmployeeId(this.employeeRow);

    const actualEmployeeName = await super.getEmployeeName(this.employeeRow);

    const expectedEmployeeName = `${newEmployee.firstName} ${newEmployee.middleName}`;

    expect(actualEmployeeId).toBe(newEmployee.employeeId);
    expect(actualEmployeeName).toBe(expectedEmployeeName);

    Logger.success(
      "Verified Employee's Name and Employee's ID in the Search Result",
    );
  }

  async clickUpdateButton(newEmployee: { employeeId: string }) {
    this.employeeRow = await super.getEmployeeRow(newEmployee.employeeId);
    await super.isVisible(this.employeeRow);

    const editButton = await super.getEditButton(this.employeeRow);

    await super.isVisible(editButton);
    await super.click(editButton);
    Logger.success(
      `Clicked Update button for Employee ID: ${newEmployee.employeeId}`,
    );
  }

  async updateEmployeeDetails(newEmployee: { lastName: string }) {
    await this.loader.waitFor({ state: "hidden" });
    this.updateLastName = `${newEmployee.lastName} Test`;
    await this.lastNameInput.click();
    await this.lastNameInput.clear();
    await super.fill(this.lastNameInput, this.updateLastName);
    await this.page.waitForTimeout(1200);
    Logger.success(`Updated Employee Details`);
  }

  async verifyUpdatedEmployee(newEmployee: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
  }) {
    this.employeeRow = await super.getEmployeeRow(newEmployee.employeeId);
    await super.isVisible(this.employeeRow);
    const actualEmployeeLastName = await super.getEmployeeLastName(
      this.employeeRow,
    );
    expect(actualEmployeeLastName).toBe(this.updateLastName);
    Logger.success("Updated Employee details verified successfully");
  }

  async deleteEmployee(newEmployee: { employeeId: string }) {
    this.employeeRow = await super.getEmployeeRow(newEmployee.employeeId);
    await super.isVisible(this.employeeRow);

    const deleteButton = await super.getDeleteButton(this.employeeRow);
    await super.isVisible(deleteButton);

    await super.click(deleteButton);
    await super.click(this.deleteConfirmationButton);
    await super.toastMessage(this.toastMessageElement, "Successfully");
    Logger.success(
      `Employee ID: ${newEmployee.employeeId} Deleted successfully`,
    );
  }

  async verifyDeletedEmployee(newEmployee: { employeeId: string }) {
    await super.fill(this.searchEmployeeByIdInput, newEmployee.employeeId);
    await super.click(this.searchButton);
    await this.page.waitForTimeout(3000);
    await super.toastMessage(this.toastMessageElement, "No Records Found");
    Logger.success(`Employee Deleted Successfully`);
  }
}
