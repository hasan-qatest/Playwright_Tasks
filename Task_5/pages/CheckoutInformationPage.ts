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
    await test.step("Verify Checkout information (First Name, Last Name, Postal Code) is displayed", async () => {
      await expect(this.checkoutInformationPage).toBeVisible();
      await expect(this.checkoutFirstName).toBeVisible();
      await expect(this.checkoutLastName).toBeVisible();
      await expect(this.checkoutPostalCOde).toBeVisible();
      Logger.success(
        "Verified that the Checkout Information (First Name, Last Name, Postal Code) is displayed",
      );
    });
  }

  async fillCheckoutInformation() {
    await test.step("Fill in the checkout information (First Name, Last Name, and Postal Code)", async () => {
      await this.checkoutFirstName.fill(constants.checkoutFirstNameValue);
      await this.checkoutLastName.fill(constants.checkoutLastNameValue);
      await this.checkoutPostalCOde.fill(constants.checkoutPostalCodeValue);
      Logger.success(
        "Verified that the checkout information was entered successfully",
      );
    });
  }

  async clickCheckoutContinueButton() {
    await test.step("Click the Checkout Continue Button", async () => {
      await this.checkoutContinueButton.click();
      Logger.success("Clicked the checkout continue button successfully");
    });
  }
}
