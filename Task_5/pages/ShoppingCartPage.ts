import { test } from "../fixture/TestFixture";
import { Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";

export class ShoppingCartPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.shoppingCartHeader = page.getByText("Your Cart");
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
}
