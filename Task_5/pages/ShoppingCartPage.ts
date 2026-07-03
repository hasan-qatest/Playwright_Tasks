import { test } from "../fixture/TestFixture";
import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";

export class ShoppingCartPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartHeader: Locator;
  readonly shoppingCartItemsName: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.shoppingCartHeader = page.locator("//span[text()='Your Cart']");
    this.shoppingCartItemsName = page.getByTestId("inventory-item-name");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async isShoppingCartLinkVisible() {
    await test.step("Verify that the Shopping cart link is visible", async () => {
      await expect(this.shoppingCartLink).toBeVisible();
      Logger.success("Successfully verified that the Shopping cart link is visible");
    });
  }

  async shoppingCartLinkClick() {
    await test.step("Click the Shopping cart link", async () => {
      await this.shoppingCartLink.click();
      Logger.success(
        "Verified that the Shopping Cart page is displayed successfully",
      );
    });
  }

  async isShoppingCartPageVisible() {
    await test.step("Verify that the Shopping cart header and checkout button are displayed", async () => {
      await expect(this.shoppingCartHeader).toBeVisible();
      await expect(this.checkoutButton).toBeVisible();
      Logger.success(
        "Successfully verified that the Shopping cart header and checkout button are displayed",
      );
    });
  }

  async verifyShoppingCartItems() {
    const actualShoppingNames =
      await this.shoppingCartItemsName.allTextContents();
    for (let i = 0; i < actualShoppingNames.length; i++) {
      await test.step(`Verify that '${actualShoppingNames[i]}' is displayed in the Shopping cart`, async () => {
        await expect(actualShoppingNames[i]).toBe(constants.ProductsByName[i]);
        Logger.success(
          `Successfully verified that '${actualShoppingNames[i]}' is displayed in the Shopping Cart`,
        );
      });
    }
  }

  async clickCheckoutButton() {
    await test.step("Click the Checkout button on the Shopping Cart page", async () => {
      await this.checkoutButton.click();
      Logger.success(
        "Successfully verified that the Checkout button clicked",
      );
    });
  }
}
