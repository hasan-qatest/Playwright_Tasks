import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { constants } from "../utils/constants";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartHeader: Locator;
  readonly shoppingCartItemsName: Locator;
  readonly checkoutButton: Locator;
  readonly checkoutOverviewPage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.shoppingCartHeader = page.getByTestId("title");
    this.shoppingCartItemsName = page.getByTestId("inventory-item-name");
    this.checkoutButton = page.getByTestId("checkout");
    this.checkoutOverviewPage = page.getByTestId("title");
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
    await super.click(this.checkoutButton);
    Logger.success(
      "Successfully clicked the Checkout button on the Shopping Cart page",
    );
  }

  async isOverviewPageVisible() {
    expect(await super.isVisible(this.checkoutOverviewPage)).toBe(true);
    Logger.success(
      "Successfully verified that the Checkout Overview page is displayed",
    );
  }
}
