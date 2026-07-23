import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";
import { constants, userDetails, employeeDetails } from "../utils/constants";

export class AdminPage extends BasePage {
  readonly page: Page;
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
  readonly loadingSpinner: Locator;
  readonly validationErrorMessage: Locator;
  readonly toastMessageElement: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
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
    this.userRoleDropdownValue = page.getByText(userDetails.userRole, {
      exact: true,
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
    this.statusDropdownValue = page.getByText(userDetails.status, {
      exact: true,
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
    this.toastMessageElement = page.locator(".oxd-text--toast-message");
  }

  async clickAdminMenu() {
    await this.waitForLoadState();
    await this.waitForVisible(this.adminMenu);
    if (!(await this.isVisible(this.adminMenu))) {
      throw new Error("Admin Menu is Not Visible");
    }
    Logger.success("Admin Menu is Visible");
    await this.click(this.adminMenu);
    Logger.success("Clicked Admin Menu");
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
    if (!(await this.isVisible(this.addUserHeader))) {
      Logger.success("Add User Page Header is Not Visible");
    }
    Logger.success("Redirected to Add User Page");
  }

  async fillUserDetails() {
    await this.selectDropdownValue(
      this.userRoleDropdown,
      this.userRoleDropdownValue,
    );
    await this.verifyDropdownValue(this.userRoleDropdown, userDetails.userRole);

    await this.fill(this.employeeNameInput, constants.username);
    await this.page.getByText(constants.username, { exact: true }).click();

    await this.selectDropdownValue(
      this.statusDropdown,
      this.statusDropdownValue,
    );
    await this.verifyDropdownValue(this.statusDropdown, userDetails.status);

    await this.fill(this.usernameInput, constants.username);
    await this.fill(this.passwordInput, constants.password);
    await this.fill(this.confirmPasswordInput, constants.password);
  }

  async validateUserDetailsWarnings() {
    await this.validateNoInputFieldError(this.validationErrorMessage);
    Logger.success(
      "Verified no validation warnings displayed for user details",
    );
  }

  async saveUserButton() {
    await this.click(this.userSaveButton);
    await this.waitForVisible(this.toastMessageElement);
    await this.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForHidden(this.loadingSpinner);
    //await this.waitForLoadState();
    Logger.success("User created successfully");
  }

  async searchUser(
    employeeDetails: {
      readonly firstName: string;
      readonly middleName: string;
      readonly lastName: string;
      readonly employeeId: string;
    },
    userDetails: {
      readonly userRole: string;
      readonly status: string;
    },
  ) {
    Logger.success("--- Search User ---");
  }
}
