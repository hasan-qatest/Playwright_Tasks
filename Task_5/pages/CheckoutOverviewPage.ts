import { Locator, Page, expect } from "@playwright/test";
import { test } from "../fixture/TestFixture";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly checkoutOverviewPage: Locator;
  readonly CheckoutProductsName: Locator;
  readonly finishCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOverviewPage = page.locator(
      "//span[text()='Checkout: Overview']",
    );
    //this.checkoutOverviewPage = page.getByText("Checkout: Overview");
    this.CheckoutProductsName = page.getByTestId("inventory-item-name");
    this.finishCheckoutButton = page.getByTestId("finish");
  }

  async isCheckoutOverviewPageVisible() {
    await test.step("Verify that the Checkout Overview Page is Displayed", async () => {
      await expect(this.checkoutOverviewPage).toBeVisible();
      Logger.success(
        "Verified that the Checkout Overview Page is Displayed Successfully",
      );
    });
  }

  async verifyCheckoutProducts() {
    const checkoutProducts = await this.CheckoutProductsName.allTextContents();
    for (let i = 0; i < checkoutProducts.length; i++) {
      await test.step(`Verify that '${checkoutProducts[i]}' is displayed in the Checkout Cart`, async () => {
        await expect(checkoutProducts[i]).toBe(constants.ProductsByName[i]);
        Logger.success(
          `Verified that '${checkoutProducts[i]}' is displayed in the Checkout Cart.`,
        );
      });
    }
  }

  async finishCheckout() {
    await test.step("Click the 'Finish' button to complete the checkout process", async () => {
      await this.finishCheckoutButton.click();
    });
    Logger.success("Successfully completed the checkout process");
  }
}
