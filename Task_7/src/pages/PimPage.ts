import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";
import { constants, EmployeeSearchResultColumns } from "../utils/constants";

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
  readonly profileImageUploadInput: Locator;
  readonly employeeSaveButton: Locator;
  readonly personalDetailsHeader: Locator;
  readonly employeeSearchInput: Locator;
  readonly employeeSearchButton: Locator;
  readonly loadingSpinner: Locator;
  readonly deleteConfirmationButton: Locator;
  readonly toastMessageElement: Locator;
  expectedName: string | undefined;
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
    this.profileImageUploadInput = page.locator("input[type='file']");
    this.employeeSaveButton = page.getByRole("button", { name: " Save " });
    this.personalDetailsHeader = page.getByRole("heading", {
      name: "Personal Details",
    });
    this.employeeSearchInput = page.getByPlaceholder("Type for hints...");
    this.employeeSearchButton = page.getByRole("button", { name: " Search " });
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
    this.deleteConfirmationButton = page.getByRole("button", {
      name: " Yes, Delete ",
    });
    this.toastMessageElement = page.locator(".oxd-text--toast-message");
  }

  async clickEmployeeListTab() {
    await this.waitForLoadState();
    await this.waitForVisible(this.employeeListTab);
    if (!(await this.isVisible(this.employeeListTab))) {
      throw new Error("Employee List Tab is Not Visible");
    }
    Logger.success("Employee List Tab is Visible");

    await this.click(this.employeeListTab.first());
    Logger.success("Clicked Employee List Tab");

    await this.waitForLoadState();
    await this.waitForVisible(this.employeeListHeader);
    if (!(await this.isVisible(this.employeeListHeader))) {
      throw new Error("Employee List Header is Not Visible");
    }
    Logger.success("Redirected to Employee List tab");
  }

  async clickAddEmployeeTab() {
    await this.waitForLoadState();
    if (!(await this.isVisible(this.addEmployeeTab))) {
      throw new Error("Add Employee Tab is Not Visible");
    }
    Logger.success("Add Employee Tab is Visible");

    await this.click(this.addEmployeeTab.first());
    await this.waitForHidden(this.loadingSpinner);
    Logger.success("Clicked Add Employee Tab");

    await this.waitForVisible(this.addEmployeeHeader);
    if (!(await this.isVisible(this.addEmployeeHeader))) {
      throw new Error("Add Employee Header is Not Visible");
    }
    Logger.success("Redirected to Add Employee");
  }

  async enterEmployeeDetails(newEmployee: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
  }) {
    await this.waitForHidden(this.loadingSpinner);
    await this.fill(this.firstNameInput, newEmployee.firstName);
    await this.fill(this.middleNameInput, newEmployee.middleName);
    await this.fill(this.lastNameInput, newEmployee.lastName);
    await this.fill(this.employeeIdInput, newEmployee.employeeId);
    await this.profileImageUploadInput.setInputFiles(
      "test-data/man-avatar-profile-picture.png",
    );
    Logger.success(
      `New Employee Details Entered Successfully
    First Name : ${newEmployee.firstName}
    Middle Name: ${newEmployee.middleName}
    Last Name  : ${newEmployee.lastName}
    Employee ID: ${newEmployee.employeeId}`,
    );
  }

  async saveEmployee() {
    await this.click(this.employeeSaveButton.first());
    await this.waitForHidden(this.loadingSpinner);
    await this.waitForVisible(this.toastMessageElement);
    await this.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    Logger.success("Employee Created/ Saved Successfully");
  }

  async verifyEmployeeInformation(newEmployee: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
  }) {
    await this.waitForLoadState();
    await this.waitForHidden(this.loadingSpinner);
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
    if (!(await this.isVisible(this.employeeSearchInput.first()))) {
      throw new Error("Search by Name field is Not Visible");
    }
    this.expectedName = `${newEmployee.firstName} ${newEmployee.middleName}`;
    await this.fill(this.employeeSearchInput.first(), this.expectedName);
    await this.click(this.employeeSearchButton);
    await this.waitForHidden(this.loadingSpinner);
    await this.clearInputField(this.employeeSearchInput);
    Logger.success(
      "Entered the first and middle name in the search box and clicked the Search button",
    );
  }

  async verifyEmployeeSearchResult(newEmployee: {
    firstName: string;
    middleName: string;
    employeeId: string;
  }) {
    this.employeeRow = await this.getEmployeeRow(newEmployee.employeeId);
    await expect(this.employeeRow).toBeVisible();

    const actualEmployeeId = await this.getCellText(
      this.employeeRow,
      EmployeeSearchResultColumns.EMPLOYEE_ID,
    );

    const actualEmployeeName = await this.getCellText(
      this.employeeRow,
      EmployeeSearchResultColumns.NAME,
    );

    const expectedEmployeeName = `${newEmployee.firstName} ${newEmployee.middleName}`;

    expect(actualEmployeeId).toBe(newEmployee.employeeId);
    expect(actualEmployeeName).toBe(expectedEmployeeName);

    Logger.success(
      "Verified Employee's Name and Employee's ID in the Search Result",
    );
  }

  async ClickUpdateButton(newEmployee: { employeeId: string }) {
    this.employeeRow = await this.getEmployeeRow(newEmployee.employeeId);
    await expect(this.employeeRow).toBeVisible();

    const editButton = await this.getEditButton(this.employeeRow);
    await expect(editButton).toBeVisible();

    await this.click(editButton);
    await this.waitForLoadState();
    await this.waitForHidden(this.loadingSpinner);
    Logger.success(`Get the details of Employee ID: ${newEmployee.employeeId}`);
  }

  async updateEmployeeDetails() {
    await this.waitForHidden(this.loadingSpinner);
    await this.click(this.lastNameInput);
    await this.clearInputField(this.lastNameInput);
    await this.fill(this.lastNameInput, constants.updateLastName);
    Logger.success(`Employee Details Updated Entered Successfully`);
  }

  async verifyEmployeeUpdated(newEmployee: {
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
  }) {
    await this.waitForLoadState();
    await this.waitForHidden(this.loadingSpinner);
    this.employeeRow = await this.getEmployeeRow(newEmployee.employeeId);
    await expect(this.employeeRow).toBeVisible();

    const actualEmployeeLastName = await this.getCellText(
      this.employeeRow,
      EmployeeSearchResultColumns.LAST_NAME,
    );
    expect(actualEmployeeLastName).toBe(constants.updateLastName);
    Logger.success("Employee details verified successfully-");
  }

  async deleteEmployee(newEmployee: { employeeId: string }) {
    this.employeeRow = await this.getEmployeeRow(newEmployee.employeeId);
    await expect(this.employeeRow).toBeVisible();

    const deleteButton = await this.getDeleteButton(this.employeeRow);
    await expect(deleteButton).toBeVisible();

    await this.click(deleteButton);
    await this.click(this.deleteConfirmationButton);
    await this.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.loadingSpinner);
    await this.waitForHidden(this.toastMessageElement);
    Logger.success(`Deleted Employee ID: ${newEmployee.employeeId}`);
  }

  async verifyEmployeeDeleted(newEmployee: { employeeId: string }) {
    await this.fill(this.employeeIdInput, newEmployee.employeeId);
    await this.click(this.employeeSearchButton);
    await this.waitForHidden(this.loadingSpinner);
    await this.waitForVisible(this.toastMessageElement);
    await this.verifyToastMessage(
      this.toastMessageElement,
      constants.deleteEmployeeToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    Logger.success(`Employee Deleted Successfully`);
  }
}
