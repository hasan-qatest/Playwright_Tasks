import { Page, Locator, expect } from "@playwright/test";
import { test } from "../fixture/TestFixture";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";

export class CheckoutInformationPage {
  readonly page: Page;
  readonly checkoutInformationPage: Locator;
  readonly checkoutFirstName: Locator;
  readonly checkoutLastName: Locator;
  readonly checkoutPostalCOde: Locator;
  readonly checkoutContinueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutInformationPage = page.locator(
      "//span[text()='Checkout: Your Information']",
    );
    this.checkoutFirstName = page.getByTestId("firstName");
    this.checkoutLastName = page.getByTestId("lastName");
    this.checkoutPostalCOde = page.getByTestId("postalCode");
    this.checkoutContinueButton = page.getByTestId("continue");
  }

  async isCheckoutInformationPageVisible() {
    await test.step("Verify that the Checkout Information page is displayed with all required fields", async () => {
      await expect(this.checkoutInformationPage).toBeVisible();
      await expect(this.checkoutFirstName).toBeVisible();
      await expect(this.checkoutLastName).toBeVisible();
      await expect(this.checkoutPostalCOde).toBeVisible();
      Logger.success(
        "Successfully verified that the Checkout Information page is displayed with all required fields",
      );
    });
  }

  async fillCheckoutInformation() {
    await test.step("Enter the checkout information (First Name, Last Name, and Postal Code) on the checkout page", async () => {
      await this.checkoutFirstName.fill(constants.checkoutFirstNameValue);
      await this.checkoutLastName.fill(constants.checkoutLastNameValue);
      await this.checkoutPostalCOde.fill(constants.checkoutPostalCodeValue);
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
