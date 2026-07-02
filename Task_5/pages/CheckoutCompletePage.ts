import { Locator, Page, expect } from "@playwright/test";
import { Logger } from "../utils/logger";
import { test } from "../fixture/TestFixture";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly checkoutCompletePage: Locator;
  readonly checkoutCompleteMessage: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutCompletePage = page.locator(
      "//span[text()='Checkout: Complete!']",
    );
    this.checkoutCompleteMessage = page.locator(
      "//h2[text()='Thank you for your order!']",
    );
    this.backToProductsButton = page.getByTestId("back-to-products");
  }

  async isCheckoutCompletePageVisible() {
    await test.step("Verify that the Checkout Complete Page is Displayed", async () => {
      await expect(this.checkoutCompletePage).toBeVisible();
      await expect(this.checkoutCompleteMessage).toBeVisible();
      Logger.success(
        "Verified that the Checkout Complete Page is Displayed Successfully",
      );
    });
  }

  async clickBackToProductButton() {
    await test.step("Click the Back to Products button on the Checkout Complete page", async () => {
        await this.backToProductsButton.click();
      Logger.success(
        "Verified that the back to product button was clicked successfully",
      );
    });

  }
}
