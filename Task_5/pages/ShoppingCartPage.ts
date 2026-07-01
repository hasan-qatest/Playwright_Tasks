import { test } from "../fixture/TestFixture";
import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";

export class ShoppingCartPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartHeader: Locator;
  readonly shoppingCartItemsName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.shoppingCartHeader = page.getByText("Your Cart");
    this.shoppingCartItemsName = page.getByTestId("inventory-item-name");
  }

  async isShoppingCartLinkVisible() {
    await test.step("Verify that the shopping Cart Link is Visible", async () => {
      await this.shoppingCartLink.isVisible();
      Logger.success("Verified that the Shopping Cart link is visible");
    });
  }

  async shoppingCartLinkClick() {
    await test.step("Click on the Shopping Cart Link", async () => {
      await this.shoppingCartLink.click();
      Logger.success(
        "Verified that the Shopping Cart was clicked successfully",
      );
    });
  }

  async isShoppingCartPageVisible() {
    await test.step("Verify that the Shopping Cart page is display", async () => {
      await this.shoppingCartHeader.isVisible();
      Logger.success(
        "Verified that the Shopping Cart page is displayed successfully",
      );
    });
  }

  async verifyShoppingCartItems() {
    const actualShoppingNames =
      await this.shoppingCartItemsName.allTextContents();
    for (let i = 0; i < actualShoppingNames.length; i++) {
      await test.step(`Verify that '${actualShoppingNames[i]}' is displayed in the Shopping Cart`, async () => {
        await expect(actualShoppingNames[i]).toBe(
          constants.addProductsToCartByName[i],
        );
        Logger.success(
          `Verified that '${actualShoppingNames[i]}' is displayed in the Shopping Cart.`,
        );
      });
    }
  }
}
