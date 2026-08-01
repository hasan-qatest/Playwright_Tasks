import { BasePage } from "./BasePage";
import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";
import { randomLeaveType, userData } from "../utils/TestDataGenerator";

export class LeavePage extends BasePage {
  readonly leaveMenu: Locator;
  readonly leaveHeader: Locator;
  readonly leaveListTab: Locator;
  readonly configureTab: Locator;
  readonly leaveTypesTabHeader: Locator;
  readonly leaveTypesSubTab: Locator;
  readonly entitlementTab: Locator;
  readonly addEntitlementSubTab: Locator;
  readonly addLeaveTypeButton: Locator;
  readonly addLeaveTypeHeader: Locator;
  readonly loadingSpinner: Locator;
  readonly leaveTypeNameInput: Locator;
  readonly saveLeaveTypeButton: Locator;
  readonly validationErrorMessage: Locator;
  readonly toastMessageElement: Locator;
  readonly recordList: Locator;
  readonly deleteConfirmationButton: Locator;
  readonly employeeNameInput: Locator;
  readonly leaveTypeDropdown: Locator;
  readonly leaveTypeDropdownValue: Locator;
  readonly entitlementInput: Locator;
  readonly entitlementSaveButton: Locator;
  readonly confirmAddEntitlementButton: Locator;
  readonly leaveEntitlementsList: Locator;
  readonly employeeEntitlementSubTab: Locator;
  readonly searchButton: Locator;
  leaveEntitlementsRow!: Locator;
  leaveTypeRow!: Locator;

  constructor(page: Page) {
    super(page);
    this.leaveMenu = page.getByRole("link", { name: "Leave" });
    this.leaveHeader = page.getByRole("heading", {
      name: "Leave",
      exact: true,
    });
    this.leaveListTab = page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: /^Leave List$/,
    });
    this.configureTab = page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: /^Configure $/,
    });
    this.leaveTypesSubTab = page.getByRole("menuitem", {
      name: "Leave Types",
      exact: true,
    });
    this.leaveTypesTabHeader = page.getByRole("heading", {
      name: /^Leave Types$/,
    });
    this.addLeaveTypeHeader = page.getByRole("heading", {
      name: "Add Leave Type",
      exact: true,
    });
    this.entitlementTab = page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: /^Entitlements $/,
    });
    this.addEntitlementSubTab = page.getByRole("menuitem", {
      name: "Add Entitlements",
      exact: true,
    });
    this.employeeEntitlementSubTab = page.getByRole("menuitem", {
      name: "Employee Entitlements",
      exact: true,
    });
    this.addLeaveTypeButton = page.locator("button").filter({
      hasText: /^\s*Add\s*$/,
    });
    this.saveLeaveTypeButton = page.getByRole("button", { name: "Save" });
    this.loadingSpinner = page.locator(".oxd-loading-spinner");
    this.leaveTypeNameInput = page
      .locator(".oxd-input-group")
      .filter({ has: page.locator("label", { hasText: /^Name$/ }) })
      .locator("input");
    this.validationErrorMessage = page.locator(
      ".oxd-input-field-error-message",
    );
    this.toastMessageElement = page.locator(".oxd-text--toast-message");
    this.leaveEntitlementsList = page.getByText(/Leave Entitlements/);
    this.recordList = page.getByText(/\(\d+\)\sRecords?\sFound/);
    // this.confirmDeleteButton = page.locator("button").filter({
    //   hasText: /^\s* Yes, Delete \s*$/,
    // });
    this.deleteConfirmationButton = page.getByRole("button", {
      name: " Yes, Delete ",
    });
    this.employeeNameInput = page
      .locator(".oxd-input-group", {
        has: page.locator("label", { hasText: "Employee Name" }),
      })
      .locator("input");
    this.leaveTypeDropdown = page.locator(".oxd-input-group", {
      has: page.locator("label", { hasText: "Leave Type" }),
    });
    this.leaveTypeDropdownValue = page.locator(".oxd-select-option", {
      hasText: randomLeaveType.leaveTypeName,
    });
    this.entitlementInput = this.page
      .locator(".oxd-input-group")
      .filter({ hasText: "Entitlement" })
      .locator("input");
    this.entitlementSaveButton = page.getByRole("button", { name: " Save " });
    this.confirmAddEntitlementButton = page.getByRole("button", {
      name: " Confirm ",
    });
    this.searchButton = page.getByRole("button", {
      name: " Search ",
    });
  }
  async clickLeaveMenu() {
    await this.waitForLoadState();
    await this.waitForVisible(this.leaveMenu);
    if (!(await this.isVisible(this.leaveMenu))) {
      throw new Error("Leave Menu is Not Visible");
    }
    Logger.success("Leave Menu is Visible");
    await this.click(this.leaveMenu);
    Logger.success("Clicked Leave Menu");
    await this.waitForVisible(this.leaveHeader);
    if (!(await this.isVisible(this.leaveHeader))) {
      throw new Error("Leave Header is Not Visible");
    }
    Logger.success("Redirected to Leave Menu");
  }
  async clickLeaveTypeSubTab() {
    await this.waitForLoadState();
    await this.waitForVisible(this.configureTab);
    if (!(await this.isVisible(this.configureTab))) {
      throw new Error("Configure Tab Not Visible");
    }
    await this.click(this.configureTab);
    Logger.success("Clicked Configure Tab");
    await this.click(this.leaveTypesSubTab);
    Logger.success("Clicked Leave Types Sub-Tab");
    await this.waitForLoadState();
    await this.waitForVisible(this.leaveTypesTabHeader);
    if (!(await this.isVisible(this.leaveTypesTabHeader))) {
      throw new Error("Leave Type Header Not Visible");
    }
    Logger.success("Navigate to Leave Types Page");
  }
  async clickAddLeaveTypeButton() {
    await this.waitForLoadState();
    await this.waitForVisible(this.addLeaveTypeButton);
    if (!(await this.isVisible(this.addLeaveTypeButton))) {
      throw new Error("Add Leave Types Button Not Visible");
    }
    Logger.success("Add Leave Types Button is Visible");
    await this.click(this.addLeaveTypeButton);
    await this.waitForLoadState();
    await this.waitForVisible(this.addLeaveTypeHeader);
    if (!(await this.isVisible(this.addLeaveTypeHeader))) {
      throw new Error("Add Leave Types Header Not Visible");
    }
    Logger.success("Navigate to Add Leave Types Page");
  }

  async enterLeaveTypeDetails() {
    await this.waitForLoadState();
    if (!(await this.isVisible(this.saveLeaveTypeButton))) {
      throw new Error("Save Leave Types Button Not Visible");
    }
    Logger.success("Save Leave Types Button is Visible");
    await this.fill(this.leaveTypeNameInput, randomLeaveType.leaveTypeName);
    await this.validateNoInputFieldError(
      this.validationErrorMessage,
      constants.recordCreationValidationErrorMessage,
    );
    await this.click(this.saveLeaveTypeButton);
    Logger.success("Save Leave Types Button is Clicked");
    await this.waitForLoadState("networkidle");
    await this.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success(
      `New Leave Type '${randomLeaveType.leaveTypeName}' Saved Successfully`,
    );
  }

  async addLeaveEntitlementsForEmployee() {
    await this.waitForLoadState("networkidle");
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.waitForVisible(this.entitlementTab);
    if (!(await this.isVisible(this.entitlementTab))) {
      throw new Error("Entitlement Tab Not Visible");
    }
    await this.click(this.entitlementTab);
    await this.click(this.addEntitlementSubTab);
    Logger.success("Clicked Add Entitlement Tab");
    await this.fill(this.employeeNameInput, userData.username);
    await this.page.getByText(userData.username, { exact: true }).click();
    await this.click(this.leaveTypeDropdown);
    await this.click(this.leaveTypeDropdownValue);
    await this.fill(this.entitlementInput, constants.entitlementCount);
    await this.validateNoInputFieldError(
      this.validationErrorMessage,
      constants.recordCreationValidationErrorMessage,
    );
    await this.click(this.entitlementSaveButton);
    await this.click(this.confirmAddEntitlementButton);
    await this.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success("Filled Employee name, Leave Type and Entitlement fields");
  }

  async verifyLeaveEntitlements() {
    await this.waitForLoadState();
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.waitForVisible(this.entitlementTab);
    await this.click(this.entitlementTab);
    await this.click(this.employeeEntitlementSubTab);
    Logger.success("Clicked Employee Entitlement Tab");
    await this.fill(this.employeeNameInput, userData.username);
    await this.page.getByText(userData.username, { exact: true }).click();
    await this.click(this.searchButton);
    await this.waitForLoadState("networkidle");
    Logger.success("Filled Employee Details for Leave Entitlements");
    await this.waitForVisible(this.recordList);
    if (!(await this.isVisible(this.recordList))) {
      throw new Error("Leave Entitlements List Not Visible");
    }
    Logger.success("Leave Entitlements List is Visible");

    this.leaveEntitlementsRow = await this.getSearchResultRow(
      randomLeaveType.leaveTypeName,
    );
    await expect(this.leaveEntitlementsRow).toBeVisible();
    Logger.success(`${randomLeaveType.leaveTypeName} is Visible`);
  }

  async deleteLeaveType() {
    await this.waitForLoadState();
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.waitForLoadState("networkidle");
    await this.waitForVisible(this.recordList);
    if (!(await this.isVisible(this.recordList))) {
      throw new Error("Leave Type List Not Visible");
    }
    this.leaveTypeRow = await this.getSearchResultRow(
      randomLeaveType.leaveTypeName,
    );
    const tempDeleteButton = await this.getDeleteButton(this.leaveTypeRow);
    await this.click(tempDeleteButton);
    await this.click(this.deleteConfirmationButton);
    await this.waitForLoadState("networkidle");
    Logger.success("Clicked delete Leave Type Record");
    await this.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success(
      `Leave Type Records '${randomLeaveType.leaveTypeName}' is Deleted`,
    );
  }

  async verifyLeaveTypeDeleted() {
    console.log("Test verifyLeaveTypeDeleted");
  }
}
