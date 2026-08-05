import { BasePage } from "./BasePage";
import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import {
  Constants,
  EmployeeLeaveListRowOrder,
  LeaveListRowOrder,
} from "../utils/constants";
import {
  LeaveType,
  UserData,
  getTomorrowDate,
} from "../utils/TestDataGenerator";

export class LeavePage extends BasePage {
  readonly leaveMenu: Locator;
  readonly leaveHeader: Locator;
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
  readonly employeeApplyLeaveTab: Locator;
  readonly employeeLeaveTab: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;
  readonly applyButton: Locator;
  readonly durationDropdown: Locator;
  readonly durationValue: Locator;
  readonly commentTextArea: Locator;
  readonly leaveApproveButton: Locator;
  leaveEntitlementsRow!: Locator;
  leaveTypeRow!: Locator;
  employeeLeaveRow!: Locator;

  constructor(page: Page) {
    super(page);
    this.leaveMenu = page.getByRole("link", { name: "Leave" });
    this.leaveHeader = page.getByRole("heading", {
      name: "Leave",
      exact: true,
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
      hasText: LeaveType.leaveTypeName,
    });
    this.durationDropdown = page.locator(".oxd-input-group", {
      has: page.locator("label", { hasText: "Duration" }),
    });
    this.durationValue = page.locator(".oxd-select-option", {
      hasText: LeaveListRowOrder.duration,
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
    this.employeeApplyLeaveTab = page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: /^Apply$/,
    });
    this.employeeLeaveTab = page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: /^My Leave$/,
    });
    this.fromDateInput = this.page
      .locator(".oxd-input-group")
      .filter({ hasText: "From Date" })
      .locator("input");
    this.toDateInput = this.page
      .locator(".oxd-input-group")
      .filter({ hasText: "To Date" })
      .locator("input");
    this.applyButton = page.getByRole("button", { name: " Apply " });
    this.commentTextArea = page
      .locator(".oxd-input-group")
      .filter({ hasText: "Comments" })
      .locator("textarea");
    this.leaveApproveButton = page.getByRole("button", {
      name: " Approve ",
    });
  }
  async clickLeaveMenu() {
    await this.waitForLoadState();
    await this.waitForVisible(this.leaveMenu);
    if (!(await this.isVisible(this.leaveMenu))) {
      throw new Error("Leave Menu is Not Visible");
    }
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
    await this.click(this.addLeaveTypeButton);
    Logger.success("Clicked Add Leave Types Button");
    await this.waitForLoadState();
    await this.waitForVisible(this.addLeaveTypeHeader);
    if (!(await this.isVisible(this.addLeaveTypeHeader))) {
      throw new Error("Add Leave Types Header Not Visible");
    }
    Logger.success("Navigate to Add Leave Types Page");
  }

  async enterLeaveTypeDetails() {
    await this.waitForLoadState();
    if (!(await this.isVisible(this.leaveTypeNameInput))) {
      throw new Error("Leave Types Nama Field Not Visible");
    }
    await this.fill(this.leaveTypeNameInput, LeaveType.leaveTypeName);
    await this.validateNoInputFieldError(
      this.validationErrorMessage,
      Constants.recordCreationValidationErrorMessage,
    );
    await this.click(this.saveLeaveTypeButton);
    Logger.success("Save Leave Types Button is Clicked");
    await this.waitForLoadState("networkidle");
    await this.verifyToastMessage(
      this.toastMessageElement,
      Constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success(
      `New Leave Type '${LeaveType.leaveTypeName}' Saved Successfully`,
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
    await this.fill(this.employeeNameInput, UserData.employeeName);
    await this.page.getByText(UserData.employeeName, { exact: true }).click();
    await this.click(this.leaveTypeDropdown);
    await this.click(this.leaveTypeDropdownValue);
    await this.fill(this.entitlementInput, Constants.entitlementCount);
    await this.validateNoInputFieldError(
      this.validationErrorMessage,
      Constants.recordCreationValidationErrorMessage,
    );
    await this.click(this.entitlementSaveButton);
    await this.click(this.confirmAddEntitlementButton);
    await this.verifyToastMessage(
      this.toastMessageElement,
      Constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success("Filled Employee name, Leave Type and Entitlement fields");
  }

  async verifyEmployeeLeaveEntitlement() {
    await this.waitForLoadState();
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.waitForVisible(this.entitlementTab);
    await this.click(this.entitlementTab);
    await this.click(this.employeeEntitlementSubTab);
    Logger.success("Clicked Employee Entitlement Tab");
    await this.fill(this.employeeNameInput, UserData.employeeName);
    await this.page.getByText(UserData.employeeName, { exact: true }).click();
    await this.click(this.searchButton);
    await this.waitForLoadState("networkidle");
    Logger.success("Filled Employee Details for Leave Entitlements");
    await this.waitForVisible(this.recordList);
    if (!(await this.isVisible(this.recordList))) {
      throw new Error("Leave Entitlements List Not Visible");
    }
    Logger.success("Leave Entitlements List is Visible");

    this.leaveEntitlementsRow = await this.getSearchResultRow(
      LeaveType.leaveTypeName,
    );
    await expect(this.leaveEntitlementsRow).toBeVisible();
    Logger.success(`${LeaveType.leaveTypeName} is Visible`);
  }

  async deleteLeaveType() {
    await this.waitForLoadState();
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.waitForLoadState("networkidle");
    await this.waitForVisible(this.recordList);
    if (!(await this.isVisible(this.recordList))) {
      throw new Error("Leave Type List Not Visible");
    }
    this.leaveTypeRow = await this.getSearchResultRow(LeaveType.leaveTypeName);
    const tempDeleteButton = await this.getDeleteButton(this.leaveTypeRow);
    await this.click(tempDeleteButton);
    await this.click(this.deleteConfirmationButton);
    await this.waitForLoadState("networkidle");
    Logger.success("Clicked delete Leave Type Record");
    await this.verifyToastMessage(
      this.toastMessageElement,
      Constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success(
      `Leave Type Records '${LeaveType.leaveTypeName}' is Deleted`,
    );
  }

  async verifyLeaveTypeDeleted() {
    await this.waitForLoadState();
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.waitForLoadState("networkidle");
    await this.waitForVisible(this.recordList);
    if (!(await this.isVisible(this.recordList))) {
      throw new Error("Leave Type List Not Visible");
    }
    await expect(
      await this.getSearchResultRow(LeaveType.leaveTypeName),
    ).toHaveCount(0);
    Logger.success(
      `Leave Type Records '${LeaveType.leaveTypeName}' is Not Visible`,
    );
  }

  async applyEmployeeLeave() {
    await this.waitForLoadState();
    await this.waitForVisible(this.employeeApplyLeaveTab);
    if (!(await this.isVisible(this.employeeApplyLeaveTab))) {
      throw new Error("Apply Leave Tab is not Visible");
    }
    await this.click(this.employeeApplyLeaveTab);
    Logger.success("Clicked Apply Leave Tab");
    await this.selectDropdownValue(
      this.leaveTypeDropdown,
      this.leaveTypeDropdownValue,
    );
    const tomorrow = getTomorrowDate();
    await this.fill(this.fromDateInput, tomorrow);
    await this.clearInputField(this.toDateInput);
    await this.fill(this.toDateInput, tomorrow);
    await this.fill(this.commentTextArea, LeaveListRowOrder.comment);
    await this.selectDropdownValue(this.durationDropdown, this.durationValue);
    await this.click(this.applyButton);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    await this.verifyToastMessage(
      this.toastMessageElement,
      Constants.createUpdateToastMessage,
    );
    Logger.success("Employee leave applied successfully");
  }

  async verifyEmployeeLeave(leaveAction: string) {
    await this.waitForLoadState();
    await this.waitForVisible(this.employeeLeaveTab);
    if (!(await this.isVisible(this.employeeLeaveTab))) {
      throw new Error("My Leave Tab is not Visible");
    }
    await this.click(this.employeeLeaveTab);
    await this.waitForVisible(this.recordList);
    if (!(await this.isVisible(this.recordList))) {
      throw new Error("My Leave List Not Visible");
    }
    Logger.success("My Leave List is Visible");
    this.employeeLeaveRow = await this.getSearchResultRow(
      LeaveType.leaveTypeName,
    );
    await expect(this.employeeLeaveRow).toBeVisible();

    const tempDate = await this.getCellText(
      this.employeeLeaveRow,
      EmployeeLeaveListRowOrder.date,
    );
    const tomorrow = `${getTomorrowDate()} (09:00 - 17:00)`;
    await expect(tempDate).toBe(tomorrow);

    const tempLeaveType = await this.getCellText(
      this.employeeLeaveRow,
      EmployeeLeaveListRowOrder.leaveType,
    );
    await expect(tempLeaveType).toBe(LeaveType.leaveTypeName);

    const tempActions = await this.getCellText(
      this.employeeLeaveRow,
      EmployeeLeaveListRowOrder.actions,
    );
    await expect(tempActions).toBe(leaveAction);

    Logger.success(
      `Employee Leave ${LeaveType.leaveTypeName} is Visible Action ${leaveAction}`,
    );
  }

  async adminApproveEmployeeLeave(leaveAction: string) {
    await this.waitForLoadState();
    await this.fill(this.employeeNameInput, UserData.employeeName);
    await this.waitForLoadState("networkidle");
    await this.page
      .getByText(UserData.employeeName, { exact: true })
      .first()
      .click();
    await this.click(this.searchButton);
    this.employeeLeaveRow = await this.getSearchResultRow(
      UserData.employeeName,
    );
    await expect(this.employeeLeaveRow).toBeVisible();

    const tempDate = await this.getCellText(
      this.employeeLeaveRow,
      EmployeeLeaveListRowOrder.date,
    );
    const tomorrow = `${getTomorrowDate()} (09:00 - 17:00)`;
    await expect(tempDate).toBe(tomorrow);

    const tempLeaveType = await this.getCellText(
      this.employeeLeaveRow,
      EmployeeLeaveListRowOrder.leaveType,
    );
    await expect(tempLeaveType).toBe(LeaveType.leaveTypeName);

    const tempActions = await this.getCellText(
      this.employeeLeaveRow,
      EmployeeLeaveListRowOrder.actions,
    );
    await expect(tempActions).toContain(leaveAction);

    if (!(await this.isVisible(this.leaveApproveButton))) {
      throw new Error("Leave Approve Button is Not Visible");
    }
    await this.click(this.leaveApproveButton);
    await this.verifyToastMessage(
      this.toastMessageElement,
      Constants.createUpdateToastMessage,
    );
    Logger.success(
      `Clicked Leave Approve Button Employee "${UserData.employeeName}"`,
    );
  }
}
