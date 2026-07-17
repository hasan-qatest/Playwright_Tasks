import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";
import { constants, EmployeeColumns } from "../utils/constants";

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
  readonly searchButton: Locator;
  readonly dropdownButton: Locator;
  readonly spinner: Locator;
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
    this.searchButton = page.getByRole("button", { name: " Search " });
    this.dropdownButton = page.locator("button.oxd-icon-button");
    this.spinner = page.locator(".oxd-loading-spinner");
    this.deleteConfirmationButton = page.getByRole("button", {
      name: " Yes, Delete ",
    });
    this.toastMessageElement = page.locator(".oxd-text--toast-message");
  }

  async isEmployeeListTabVisible() {
    await super.waitForLoadState();
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
    await super.waitForLoadState();
    await super.waitForVisible(this.employeeListHeader);
    if (!(await super.isVisible(this.employeeListHeader))) {
      throw new Error("Employee List Header is Not Visible");
    }
    Logger.success("Employee List Header is Visible");
  }

  async isAddEmployeeTabVisible() {
    await super.waitForLoadState();
    if (!(await super.isVisible(this.addEmployeeTab))) {
      throw new Error("Add Employee Tab is Not Visible");
    }
    Logger.success("Add Employee Tab is Visible");
  }

  async clickAddEmployeeTab() {
    await super.click(this.addEmployeeTab.first());
    await super.waitForHidden(this.spinner);
    Logger.success("Clicked Add Employee Tab");
  }

  async isAddEmployeeHeaderVisible() {
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
    await super.waitForHidden(this.spinner);
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
    await super.waitForHidden(this.spinner);
    await super.waitForVisible(this.toastMessageElement);
    await super.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateEmployeeToastMessage,
    );
    await super.waitForHidden(this.toastMessageElement);
    Logger.success("Clicked Save Button");
  }

  async isPersonalDetailsHeaderVisible() {
    await super.waitForLoadState();
    await super.waitForHidden(this.spinner);
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
    await super.waitForLoadState();
    await super.waitForHidden(this.spinner);
    await expect(this.firstNameInput).toHaveValue(newEmployee.firstName);
    await expect(this.middleNameInput).toHaveValue(newEmployee.middleName);
    await expect(this.lastNameInput).toHaveValue(newEmployee.lastName);
    await expect(this.employeeIdInput).toHaveValue(newEmployee.employeeId);
    Logger.success(
      "Verified Employee First Name, Middle Name, Last Name and Employee Id",
    );
  }

  async searchEmployee(newEmployee: {
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
    await super.waitForHidden(this.spinner);
    await super.clearInputField(this.searchEmployeeByNameInput);
    Logger.success(
      "Entered the first and middle name in the search box and clicked the Search button",
    );
  }

  async verifySearchEmployee(newEmployee: {
    firstName: string;
    middleName: string;
    employeeId: string;
  }) {
    this.employeeRow = await super.getEmployeeRow(newEmployee.employeeId);
    await expect(this.employeeRow).toBeVisible();

    const actualEmployeeId = await super.getCellText(
      this.employeeRow,
      EmployeeColumns.EMPLOYEE_ID,
    );

    const actualEmployeeName = await super.getCellText(
      this.employeeRow,
      EmployeeColumns.NAME,
    );

    const expectedEmployeeName = `${newEmployee.firstName} ${newEmployee.middleName}`;

    expect(actualEmployeeId).toBe(newEmployee.employeeId);
    expect(actualEmployeeName).toBe(expectedEmployeeName);

    Logger.success(
      "Verified Employee's Name and Employee's ID in the Search Result",
    );
  }

  async clickUpdateButton(newEmployee: { employeeId: string }) {
    this.employeeRow = await super.getEmployeeRow(newEmployee.employeeId);
    await expect(this.employeeRow).toBeVisible();

    const editButton = await super.getEditButton(this.employeeRow);
    await expect(editButton).toBeVisible();

    await super.click(editButton);
    await super.waitForLoadState();
    await super.waitForHidden(this.spinner);
    Logger.success(
      `Clicked Update button for Employee ID: ${newEmployee.employeeId}`,
    );
  }

  async updateEmployeeDetails(newEmployee: { lastName: string }) {
    await super.waitForHidden(this.spinner);
    this.updateLastName = `${newEmployee.lastName} Test`;
    await super.click(this.lastNameInput);
    await super.clearInputField(this.lastNameInput);
    await super.fill(this.lastNameInput, this.updateLastName);
    Logger.success(`Updated Employee Details`);
  }

  async verifyUpdatedEmployee(newEmployee: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
  }) {
    this.employeeRow = await super.getEmployeeRow(newEmployee.employeeId);
    await expect(this.employeeRow).toBeVisible();

    const actualEmployeeLastName = await super.getCellText(
      this.employeeRow,
      EmployeeColumns.LAST_NAME,
    );
    expect(actualEmployeeLastName).toBe(this.updateLastName);
    Logger.success("Updated Employee details verified successfully");
  }

  async deleteEmployee(newEmployee: { employeeId: string }) {
    this.employeeRow = await super.getEmployeeRow(newEmployee.employeeId);
    await expect(this.employeeRow).toBeVisible();

    const deleteButton = await super.getDeleteButton(this.employeeRow);
    await expect(deleteButton).toBeVisible();

    await super.click(deleteButton);
    await super.click(this.deleteConfirmationButton);
    await super.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateEmployeeToastMessage,
    );
    await super.waitForHidden(this.spinner);
    await super.waitForHidden(this.toastMessageElement);
    Logger.success(
      `Employee ID: ${newEmployee.employeeId} Deleted successfully`,
    );
  }

  async verifyDeletedEmployee(newEmployee: { employeeId: string }) {
    await super.fill(this.employeeIdInput, newEmployee.employeeId);
    await super.click(this.searchButton);
    await super.waitForHidden(this.spinner);
    await super.waitForVisible(this.toastMessageElement);
    await super.verifyToastMessage(
      this.toastMessageElement,
      constants.deleteEmployeeToastMessage,
    );
    await super.waitForHidden(this.toastMessageElement);
    Logger.success(`Employee Deleted Successfully`);
  }
}
