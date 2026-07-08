import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { products } from "../utils/constants";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly shoppingCartItemsName: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = page.getByTestId("title");
    this.shoppingCartItemsName = page.getByTestId("inventory-item-name");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async verifyShoppingCartItems() {
    for (let i = 0; i < products.length; i++) {
      await expect(this.shoppingCartItemsName.nth(i)).toHaveText(
        products[i],
      );
      Logger.success(
        `Successfully verified '${products[i]}' is in the Shopping Cart`,
      );
    }
  }

  async clickCheckoutButton() {
    await super.click(this.checkoutButton);
    Logger.success(
      "Successfully clicked the Checkout button on the Shopping Cart page",
    );
  }

  async isOverviewPageVisible() {
    await expect(this.pageTitle).toHaveText("Checkout: Overview");
    Logger.success(
      "Successfully verified that the Checkout Overview page is displayed",
    );
  }
}
