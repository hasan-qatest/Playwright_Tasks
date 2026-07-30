import { BasePage } from "./BasePage";
import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";
import { time } from "node:console";

export class LeavePage extends BasePage {
  readonly leaveMenu: Locator;
  readonly leaveHeader: Locator;
  readonly leaveListTab: Locator;
  readonly configureTab: Locator;
  readonly leaveTypesTabHeader: Locator;
  readonly leaveTypesSubTab: Locator;
  readonly entitlementsTab: Locator;
  readonly addEntitlementsSubTab: Locator;
  readonly addLeaveTypeButton: Locator;
  readonly addLeaveTypeHeader: Locator;
  readonly loadingSpinner: Locator;
  readonly leaveTypeNameInput: Locator;
  readonly saveLeaveTypeButton: Locator;
  readonly validationErrorMessage: Locator;
  readonly toastMessageElement: Locator;
  readonly recordsFoundLabel: Locator;
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
    this.entitlementsTab = page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: /^Leave List$/,
    });
    this.addEntitlementsSubTab = page.getByRole("menuitem", {
      name: "Add Entitlements",
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
    this.recordsFoundLabel = page.getByText(/Records Found/);
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
    Logger.success("Configure Menu is Visible");
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
    await this.fill(this.leaveTypeNameInput, constants.leaveTypeName);
    await this.click(this.saveLeaveTypeButton);
    Logger.success("Save Leave Types Button is Clicked");

    await expect(this.validationErrorMessage).toBeVisible({
      timeout: 10000,
    });

    await this.validateNoInputFieldError(
      this.validationErrorMessage,
      constants.recordCreationValidationErrorMessage,
    );
    await this.verifyToastMessage(
      this.toastMessageElement,
      constants.createUpdateToastMessage,
    );
    await this.waitForHidden(this.toastMessageElement);
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    Logger.success(
      `New Leave Type ${constants.leaveTypeName} Saved Successfully`,
    );
  }

  async deleteLeaveType() {
    await this.waitForLoadState();
    await this.waitForLoadingSpinnerToDisappear(this.loadingSpinner);
    if (!(await this.isVisible(this.recordsFoundLabel))) {
      throw new Error("Leave Type Records Not Visible");
    }
    Logger.success("Leave Types Records is Visible");
    this.leaveTypeRow = await this.getTableRowByText(constants.leaveTypeName);
    await this.clickDeleteButtonInRow(this.leaveTypeRow);
    Logger.success("Leave Type Records is Deleted");
  }
}
