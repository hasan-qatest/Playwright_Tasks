import { Locator, Page, expect } from "@playwright/test";
import { test } from "../fixture/TestFixture";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";

export class Checkout {
  readonly page: Page;
  readonly checkoutOverviewPage: Locator;
  readonly checkoutProductsName: Locator;
  readonly finishCheckoutButton: Locator;
  readonly checkoutInformationPage: Locator;
  readonly checkoutFirstName: Locator;
  readonly checkoutLastName: Locator;
  readonly checkoutPostalCode: Locator;
  readonly checkoutContinueButton: Locator;
  readonly checkoutCompletePage: Locator;
  readonly checkoutCompleteMessage: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOverviewPage = page.getByTestId("title");
    this.checkoutProductsName = page.getByTestId("inventory-item-name");
    this.finishCheckoutButton = page.getByTestId("finish");
    this.checkoutInformationPage = page.getByTestId("title");
    this.checkoutFirstName = page.getByTestId("firstName");
    this.checkoutLastName = page.getByTestId("lastName");
    this.checkoutPostalCode = page.getByTestId("postalCode");
    this.checkoutContinueButton = page.getByTestId("continue");
    this.checkoutCompletePage = page.getByTestId("title");
    this.checkoutCompleteMessage = page.getByRole("heading", {
      name: "Thank you for your order!",
    });
    this.backToProductsButton = page.getByTestId("back-to-products");
  }

  async isCheckoutOverviewPageVisible() {
    await expect(this.checkoutOverviewPage).toBeVisible();
    Logger.success(
      "Successfully verified that the Checkout Overview page is displayed",
    );
  }

  async verifyCheckoutProducts() {
    const checkoutProducts = await this.checkoutProductsName.allTextContents();
    for (let i = 0; i < checkoutProducts.length; i++) {
      await test.step(`Verify that '${checkoutProducts[i]}' is displayed in the Checkout Cart`, async () => {
        await expect(checkoutProducts[i]).toBe(constants.productsByName[i]);
        Logger.success(
          `Successfully verified that '${checkoutProducts[i]}' is displayed in the Checkout Cart`,
        );
      });
    }
  }

  async finishCheckout() {
    await this.finishCheckoutButton.click();
    Logger.success("Successfully completed the checkout process");
  }

  async isCheckoutInformationPageVisible() {
    await expect(this.checkoutInformationPage).toBeVisible();
    await expect(this.checkoutFirstName).toBeVisible();
    await expect(this.checkoutLastName).toBeVisible();
    await expect(this.checkoutPostalCode).toBeVisible();
    Logger.success(
      "Successfully verified that the Checkout Information page is displayed with all required fields",
    );
  }

  async fillCheckoutInformation() {
    await this.checkoutFirstName.fill(constants.checkoutFirstNameValue);
    await this.checkoutLastName.fill(constants.checkoutLastNameValue);
    await this.checkoutPostalCode.fill(constants.checkoutPostalCodeValue);
    Logger.success("successfully entered checkout information");
  }

  async clickCheckoutContinueButton() {
    await this.checkoutContinueButton.click();
    Logger.success(
      "Successfully clicked the Continue button on the Checkout Information page",
    );
  }
  async isCheckoutCompletePageVisible() {
    await expect(this.checkoutCompletePage).toBeVisible();
    await expect(this.checkoutCompleteMessage).toBeVisible();
    Logger.success(
      "Successfully verified that the Checkout Complete page is displayed",
    );
  }

  async clickBackToProductButton() {
    await this.backToProductsButton.click();
    Logger.success(
      "Successfully clicked 'Back to Products' button on the Checkout Complete page",
    );
  }
}
