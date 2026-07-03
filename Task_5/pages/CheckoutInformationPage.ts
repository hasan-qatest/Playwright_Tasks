import { Page, Locator, expect } from "@playwright/test";
import { test } from "../fixture/TestFixture";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";

export class CheckoutInformationPage {
  readonly page: Page;
  readonly checkoutInformationPage: Locator;
  readonly checkoutFirstName: Locator;
  readonly checkoutLastName: Locator;
  readonly checkoutPostalCode: Locator;
  readonly checkoutContinueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutInformationPage = page.getByTestId("title");
    this.checkoutFirstName = page.getByTestId("firstName");
    this.checkoutLastName = page.getByTestId("lastName");
    this.checkoutPostalCode = page.getByTestId("postalCode");
    this.checkoutContinueButton = page.getByTestId("continue");
  }

  async isCheckoutInformationPageVisible() {
    await test.step("Verify that the Checkout Information page is displayed with all required fields", async () => {
      await expect(this.checkoutInformationPage).toBeVisible();
      await expect(this.checkoutFirstName).toBeVisible();
      await expect(this.checkoutLastName).toBeVisible();
      await expect(this.checkoutPostalCode).toBeVisible();
      Logger.success(
        "Successfully verified that the Checkout Information page is displayed with all required fields",
      );
    });
  }

  async fillCheckoutInformation() {
    await test.step("Enter the checkout information (First Name, Last Name, and Postal Code) on the checkout page", async () => {
      await this.checkoutFirstName.fill(constants.checkoutFirstNameValue);
      await this.checkoutLastName.fill(constants.checkoutLastNameValue);
      await this.checkoutPostalCode.fill(constants.checkoutPostalCodeValue);
      Logger.success(
        "successfully entered checkout information",
      );
    });
  }

  async clickCheckoutContinueButton() {
    await test.step("Click the Continue button on the Checkout Information page", async () => {
      await this.checkoutContinueButton.click();
      Logger.success("Successfully clicked the Continue button on the Checkout Information page");
    });
  }
}
