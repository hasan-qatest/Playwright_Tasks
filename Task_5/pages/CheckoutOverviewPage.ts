import { Locator, Page, expect } from "@playwright/test";
import { test } from "../fixture/TestFixture";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly checkoutOverviewPage: Locator;
  readonly checkoutProductsName: Locator;
  readonly finishCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOverviewPage  = page.getByTestId("title");
    this.checkoutProductsName = page.getByTestId("inventory-item-name");
    this.finishCheckoutButton = page.getByTestId("finish");
  }

  async isCheckoutOverviewPageVisible() {
    await test.step("Verify that the Checkout Overview Page is displayed", async () => {
      await expect(this.checkoutOverviewPage).toBeVisible();
      Logger.success(
        "Successfully verified that the Checkout Overview page is displayed",
      );
    });
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
    await test.step("Click the Finish button to complete the checkout process", async () => {
      await this.finishCheckoutButton.click();
      Logger.success("Successfully completed the checkout process");
    });
  }
}
