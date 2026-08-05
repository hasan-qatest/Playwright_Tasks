import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";
import {
  Constants,
  UserDetails,
  UserSearchResultColumns,
} from "../utils/constants";
import { EmployeeDetails, UserData } from "../utils/TestDataGenerator";

export class AdminPage extends BasePage {
  readonly adminMenu: Locator;
  readonly adminHeader: Locator;
  readonly userManagementTab: Locator;
  readonly usersTab: Locator;
  readonly userManagementHeader: Locator;
  readonly addUserButton: Locator;
  readonly addUserHeader: Locator;
  readonly userRoleDropdown: Locator;
  readonly userRoleDropdownValue: Locator;
  readonly employeeNameInput: Locator;
  readonly statusDropdown: Locator;
  readonly statusDropdownValue: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly userSaveButton: Locator;
  readonly userSearchButton: Locator;
  readonly loadingSpinner: Locator;
  readonly validationErrorMessage: Locator;
  readonly toastMessageElement: Locator;
  readonly deleteConfirmationButton: Locator;
  userRow!: Locator;

  constructor(page: Page) {
    super(page);
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
    this.adminMenu = page.getByRole("link", { name: "Admin" });
    this.adminHeader = page.getByRole("heading", { name: "Admin" });
    this.userManagementTab = page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: "User Management",
    });
    this.addUserButton = page.getByRole("button", { name: " Add " });
    this.usersTab = page.getByRole("menuitem", { name: "Users" });
    this.userManagementHeader = page.getByRole("heading", {
      name: "User Management",
    });
    this.addUserHeader = page.getByRole("heading", { name: "Add User" });
    this.userRoleDropdown = page
      .locator(".oxd-input-group", {
        has: page.locator("label", { hasText: "User Role" }),
      })
      .locator(".oxd-select-text");
    this.userRoleDropdownValue = page.locator(".oxd-select-option", {
      hasText: UserDetails.userRole,
    });
    this.employeeNameInput = page
      .locator(".oxd-input-group", {
        has: page.locator("label", { hasText: "Employee Name" }),
      })
      .locator("input");
    this.validationErrorMessage = page.locator(
      ".oxd-input-field-error-message",
    );
    this.statusDropdown = page
      .locator(".oxd-input-group", {
        has: page.locator("label", { hasText: "Status" }),
      })
      .locator(".oxd-select-text");
    this.statusDropdownValue = page.locator(".oxd-select-option", {
      hasText: UserDetails.status,
    });
    this.usernameInput = page
      .locator(".oxd-input-group", {
        has: page.locator("label", { hasText: "Username" }),
      })
      .locator("input");
    this.passwordInput = page
      .locator(".oxd-input-group", {
        has: page.locator("label", { hasText: "Password" }),
      })
      .locator("input")
      .first();
    this.confirmPasswordInput = page
      .locator(".oxd-input-group", {
        has: page.locator("label", { hasText: "Confirm Password" }),
      })
      .locator("input");
    this.userSaveButton = page.getByRole("button", { name: " Save " });
    this.userSearchButton = page.getByRole("button", { name: " Search " });
    this.toastMessageElement = page.locator(".oxd-text--toast-message");
    this.deleteConfirmationButton = page.getByRole("button", {
      name: " Yes, Delete ",
    });
  }

  async clickAdminMenu() {
    await this.waitForLoadState();
    await this.waitForVisible(this.adminMenu);
    if (!(await this.isVisible(this.adminMenu))) {
      throw new Error("Admin Menu is Not Visible");
    }
    await this.click(this.adminMenu);
    Logger.success("Clicked Admin Menu");
    await this.waitForLoadState();
    await this.waitForVisible(this.adminHeader);
    if (!(await this.isVisible(this.adminHeader))) {
      throw new Error("Admin Header is Not Visible");
    }
    Logger.success("Redirected to Admin Menu");
  }
  async clickUsersTab() {
    await this.waitForLoadState();
    if (!(await this.isVisible(this.userManagementTab.first()))) {
      throw new Error("User Management Tab is Not Visible");
    }
    await this.click(this.userManagementTab.first());
    Logger.success("Clicked User Management Tab");

    await this.waitForVisible(this.usersTab);
    if (!(await this.isVisible(this.usersTab))) {
      throw new Error("Users Sub-Tab is Not Visible");
    }
    await this.click(this.usersTab);
    Logger.success("Clicked Users sub-tab");

    await this.waitForLoadState();
    await this.waitForVisible(this.userManagementHeader);
    if (!(await this.isVisible(this.userManagementHeader))) {
      throw new Error("User Management Header is Not Visible");
    }
    Logger.success("Redirected to Users Screen");
  }
  async addNewUser() {
    if (!(await this.isVisible(this.addUserButton))) {
      throw new Error("Add User Button Not Visible");
    }
    await this.click(this.addUserButton);
    Logger.success("Add User Button is Clicked");

    await this.waitForLoadState();
    await this.waitForVisible(this.addUserHeader);
    if (!(await this.isVisible(this.addUserHeader))) {
      throw new Error("Add User Page Header is Not Visible");
    }
    Logger.success("Redirected to Add User Page");
  }

  async fillUserDetails() {
    await this.selectDropdownValue(
      this.userRoleDropdown,
      this.userRoleDropdownValue,
    );
    await this.verifyDropdownValue(this.userRoleDropdown, UserDetails.userRole);
    UserData.employeeName = `${EmployeeDetails.firstName} ${EmployeeDetails.middleName} ${EmployeeDetails.lastName}`;
    await this.fill(this.employeeNameInput, UserData.employeeName);
    await this.page.getByText(UserData.employeeName, { exact: true }).click();

    await this.selectDropdownValue(
      this.statusDropdown,
      this.statusDropdownValue,
    );
    await this.verifyDropdownValue(this.statusDropdown, UserDetails.status);

    await this.fill(this.usernameInput, UserData.username);
    await this.fill(this.passwordInput, UserData.userPassword);
    await this.fill(this.confirmPasswordInput, UserData.userPassword);

    await this.validateNoInputFieldError(
      this.validationErrorMessage,
      Constants.recordCreationValidationErrorMessage,
    );

    Logger.success(
      `Entered User Role, Employee Name, Status, Username ${UserData.username}, Password, and Confirm Password details`,
    );
  }

  async saveUserButton() {
    await this.click(this.userSaveButton);
    await this.waitForVisible(this.toastMessageElement);
    await this.verifyToastMessage(
      this.toastMessageElement,
      Constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success("User created successfully");
  }

  async searchUser() {
    await this.fill(this.usernameInput, UserData.username);
    await this.selectDropdownValue(
      this.userRoleDropdown,
      this.userRoleDropdownValue,
    );
    await this.verifyDropdownValue(this.userRoleDropdown, UserDetails.userRole);

    await this.fill(this.employeeNameInput, UserData.employeeName);
    await this.page.getByText(UserData.employeeName, { exact: true }).click();
    
    await this.selectDropdownValue(
      this.statusDropdown,
      this.statusDropdownValue,
    );
    await this.verifyDropdownValue(this.statusDropdown, UserDetails.status);

    await this.validateNoInputFieldError(
      this.validationErrorMessage,
      Constants.recordCreationValidationErrorMessage,
    );
    await this.click(this.userSearchButton);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success("Created user selected and searched successfully");
  }

  async verifySearchResult() {
    UserData.employeeNameInUserSearchResult = `${EmployeeDetails.firstName} ${EmployeeDetails.lastName}`;
    await this.verifySearchResultRow(UserData.username, [
      {
        column: UserSearchResultColumns.Username,
        value: UserData.username,
      },
      {
        column: UserSearchResultColumns.UserRole,
        value: UserDetails.userRole,
      },
      {
        column: UserSearchResultColumns.EmployeeName,
        value: UserData.employeeNameInUserSearchResult,
      },
      {
        column: UserSearchResultColumns.Status,
        value: UserDetails.status,
      },
    ]);

    Logger.success(
      "Verified User's Username, User Role, EmployeeName and Status in the Search Result",
    );
  }

  async deleteUser() {
    this.userRow = await this.getSearchResultRow(UserData.username);
    await expect(this.userRow).toBeVisible();

    const deleteButton = await this.getDeleteButton(this.userRow);
    await expect(deleteButton).toBeVisible();

    await this.click(deleteButton);
    await this.click(this.deleteConfirmationButton);
    await this.verifyToastMessage(
      this.toastMessageElement,
      Constants.createUpdateToastMessage,
    );
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.waitForHidden(this.toastMessageElement);
    Logger.success(`Deleted User Name: ${UserData.username}`);
  }

  async verifyUserDeleted() {
    if (!(await this.isVisible(this.usernameInput))) {
      throw new Error("User Name Input not Visible");
    }
    await this.fill(this.usernameInput, UserData.username);
    await this.click(this.userSearchButton);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.waitForVisible(this.toastMessageElement);
    await this.verifyToastMessage(
      this.toastMessageElement,
      Constants.deleteRecordToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    Logger.success(`User Deleted Successfully`);
  }
}
