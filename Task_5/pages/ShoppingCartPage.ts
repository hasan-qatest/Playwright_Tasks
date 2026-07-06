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
    this.shoppingCartHeader = page.getByTestId("title");
    this.shoppingCartItemsName = page.getByTestId("inventory-item-name");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async isShoppingCartLinkVisible() {
    await expect(this.shoppingCartLink).toBeVisible();
    Logger.success(
      "Successfully verified that the Shopping cart link is visible",
    );
  }

  async shoppingCartLinkClick() {
    await this.shoppingCartLink.click();
    Logger.success("Successfully clicked the Shopping Cart link");
  }

  async isShoppingCartPageVisible() {
    await expect(this.shoppingCartHeader).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
    Logger.success(
      "Successfully verified that the Shopping cart header and checkout button are displayed",
    );
  }

  async verifyShoppingCartItems() {
    for (let i = 0; i < constants.productsByName.length; i++) {
      await expect(this.shoppingCartItemsName.nth(i)).toHaveText(
        constants.productsByName[i],
      );
      Logger.success(
        `Successfully verified '${constants.productsByName[i]}' is in the Shopping Cart`,
      );
    }
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
    Logger.success(
      "Successfully clicked the Checkout button on the Shopping Cart page",
    );
  }
}
