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
  readonly checkoutInformationPage: Locator;
  readonly checkoutFirstName: Locator;
  readonly checkoutLastName: Locator;
  readonly checkoutPostalCOde: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.getByTestId("shopping-cart-link");
    this.shoppingCartHeader = page.getByText("Your Cart");
    this.shoppingCartItemsName = page.getByTestId("inventory-item-name");
    this.checkoutButton = page.getByAltText("checkout");
    this.checkoutInformationPage = page.locator(
      "//span[text()='Checkout: Your Information']",
    );
    this.checkoutFirstName = page.getByTestId("firstName");
    this.checkoutLastName = page.getByTestId("lastName");
    this.checkoutPostalCOde = page.getByTestId("postalCode");
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
    await test.step("Verify that the Shopping Cart Header and Checkout Button is display", async () => {
      await this.shoppingCartHeader.isVisible();
      await this.checkoutButton.isVisible();
      Logger.success(
        "Verified that the Shopping Cart Header and Checkout button is displayed",
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

  async clickCheckoutButton() {
    await test.step("Click the Checkout button on the Shopping Cart page", async () => {
      await this.checkoutButton.click();
      Logger.success(
        "Verified that the Checkout button was clicked successfully",
      );
    });
  }

  async isCheckoutInformationPageVisible() {
    await test.step("Verify Checkout information (First Name, Last Name, Postal Code) is displayed", async () => {
      await this.checkoutInformationPage.isVisible();
      await this.checkoutFirstName.isVisible();
      await this.checkoutLastName.isVisible();
      await this.checkoutPostalCOde.isVisible();
      Logger.success(
        "Verified that the Checkout Information (First Name, Last Name, Postal Code) is displayed",
      );
    });
  }
}
