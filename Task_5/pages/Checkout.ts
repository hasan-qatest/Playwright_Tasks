import { Locator, Page, expect } from "@playwright/test";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";
import { BasePage } from "./BasePage";

export class Checkout extends BasePage {
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
    super(page);
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

  async verifyProducts() {
    const checkoutProducts = await this.checkoutProductsName.allTextContents();
    for (let i = 0; i < checkoutProducts.length; i++) {
      await expect(checkoutProducts[i]).toBe(constants.productsByName[i]);
      Logger.success(
        `Successfully verified that '${checkoutProducts[i]}' is displayed in the Checkout Cart`,
      );
    }
  }

  async finishCheckout() {
    await super.click(this.finishCheckoutButton);
    Logger.success("Successfully completed the checkout process");
  }

  async isCheckoutInformationPageVisible() {
    expect(await super.isVisible(this.checkoutInformationPage)).toBe(true);
    expect(await super.isVisible(this.checkoutLastName)).toBe(true);
    expect(await super.isVisible(this.checkoutPostalCode)).toBe(true);
    Logger.success(
      "Successfully verified that the Checkout Information page is displayed with all required fields",
    );
  }

  async fillCheckoutInformation(customer: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await super.fill(this.checkoutFirstName, customer.firstName);
    await super.fill(this.checkoutLastName, customer.lastName);
    await super.fill(this.checkoutPostalCode, customer.postalCode);
    Logger.success("Successfully entered checkout information");
  }

  async clickContinueButton() {
    await super.click(this.checkoutContinueButton);
    Logger.success(
      "Successfully clicked the Continue button on the Checkout Information page",
    );
  }

  async isCheckoutCompletePageVisible() {
    expect(await super.isVisible(this.checkoutCompletePage)).toBe(true);
    expect(await super.isVisible(this.checkoutCompleteMessage)).toBe(true);
    Logger.success(
      "Successfully verified that the Checkout Complete page is displayed",
    );
  }

  async clickBackToProductButton() {
    await super.click(this.backToProductsButton);
    Logger.success(
      "Successfully clicked 'Back to Products' button on the Checkout Complete page",
    );
  }
}
