import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { test } from "../fixture/TestFixture";
import { constants, ProductSort } from "../utils/constants";

export class HomePage {
  readonly page: Page;
  readonly productSortDropdown: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSortDropdown = page.getByTestId("product-sort-container");
    this.productName = page.getByTestId("inventory-item-name");
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.cartCount = page.getByTestId("shopping-cart-badge");
  }

  async isProductSortingSectionVisible() {
    await expect(this.productSortDropdown).toBeVisible();
    Logger.success(
      "Successfully verified that the Products Sort section is displayed on the Home Page",
    );
  }

  async validateAllSortOptions() {
    await expect(this.productSortDropdown.locator("option")).toHaveText(Object.values(ProductSort));
    Logger.success(
      "Successfully verified that all product sort options are available in the sort dropdown",
    );
  }

  async selectProductSortOptionByName(
    sort: ProductSort.NAME_ASC | ProductSort.NAME_DESC,
  ) {
    const option = sort === ProductSort.NAME_ASC ? "az" : "za";
    const sortName =
      sort === ProductSort.NAME_ASC
        ? ProductSort.NAME_ASC
        : ProductSort.NAME_DESC;
    await this.productSortDropdown.selectOption(option);
    Logger.success(
      `Successfully selected the '${sortName}' sort option on the Home page`,
    );
  }

  async selectProductSortOptionByPrice(
    sort: ProductSort.PRICE_LOW_HIGH | ProductSort.PRICE_HIGH_LOW,
  ) {
    const option = sort === ProductSort.PRICE_LOW_HIGH ? "lohi" : "hilo";
    const sortPrice =
      sort === ProductSort.PRICE_LOW_HIGH
        ? ProductSort.PRICE_LOW_HIGH
        : ProductSort.PRICE_HIGH_LOW;
    await this.productSortDropdown.selectOption(option);
    Logger.success(
      `Successfully selected the '${sortPrice}' sort option on the Home page`,
    );
  }

  async validateProductSortingByName(sort: string) {
    const actualProductNames = await this.productName.allTextContents();
    const expectedProductNames = [...actualProductNames].sort((a, b) =>
      sort === ProductSort.NAME_ASC ? a.localeCompare(b) : b.localeCompare(a),
    );
    if (
      JSON.stringify(actualProductNames) !==
      JSON.stringify(expectedProductNames)
    ) {
      throw new Error(
        `Products are not sorted in '${ProductSort.NAME_DESC}' order.`,
      );
    }
    Logger.success(
      `Successfully verified that the products are sorted in '${sort}' order`,
    );
    return;
  }

  async validateProductSortingByPrice(sort: string) {
    let actualPrices: number[] = [];
    const priceTexts = await this.productPrice.allTextContents();
    actualPrices = priceTexts.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    const expectedPrices = [...actualPrices].sort((a, b) =>
      sort === ProductSort.PRICE_LOW_HIGH ? a - b : b - a,
    );
    if (JSON.stringify(actualPrices) !== JSON.stringify(expectedPrices)) {
      throw new Error(
        `Products are not sorted in '${ProductSort.PRICE_LOW_HIGH}' order`,
      );
    }
    Logger.success(
      `Successfully verified that the products are sorted in '${sort}' order`,
    );
    return;
  }

  async addProductToCart(productName: string[]) {
    for (const name of productName) {
      const product = name.toLowerCase().replace(/\s+/g, "-");
      await test.step(`Add '${name}' product to the Cart`, async () => {
        await this.page.getByTestId(`add-to-cart-${product}`).click();
        Logger.success(`Successfully added product '${name}' to the Cart`);
      });
    }
  }

  async verifyShoppingCartCount() {
    await expect(this.cartCount).toHaveText(
      String(constants.productsByName.length),
    );
    Logger.success(
      `Successfully verified that the cart count matches the number of added products`,
    );
  }
}
