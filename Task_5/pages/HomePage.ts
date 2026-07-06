import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { test } from "../fixture/TestFixture";
import { constants } from "../utils/constants";

export class HomePage {
  readonly page: Page;
  readonly productsHeader: Locator;
  readonly productSortDropdown: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsHeader = page.getByText("Products");
    this.productSortDropdown = page.getByTestId("product-sort-container");
    this.productName = page.getByTestId("inventory-item-name");
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.cartCount = page.getByTestId("shopping-cart-badge");
  }

  async isProductsSectionVisibleOnHomePage() {
    await test.step("Verify that the Products section is displayed on the Home Page", async () => {
      await expect(this.productsHeader).toBeVisible();
      Logger.success(
        "Successfully verified that the Products section is displayed on the Home Page",
      );
    });
  }

  async isProductSortingSectionVisible() {
    await test.step("Verify that the Products Sort section is displayed on the Home Page", async () => {
      await expect(this.productSortDropdown).toBeVisible();
      Logger.success(
        "Successfully verified that the Products Sort section is displayed on the Home Page",
      );
    });
  }

  async validateAllSortOptions() {
    await test.step("Verify that all product sort options are available in the sort dropdown", async () => {
      await expect(this.productSortDropdown.locator("option")).toHaveText([
        "Name (A to Z)",
        "Name (Z to A)",
        "Price (low to high)",
        "Price (high to low)",
      ]);
      Logger.success(
        "Successfully verified that all product sort options are available in the sort dropdown",
      );
    });
  }

  async selectProductSortOptionByName(sort: "Ascending" | "Descending") {
    const option = sort === "Ascending" ? "az" : "za";
    const sortName = sort === "Ascending" ? "Name (A to Z)" : "Name (Z to A)";
    await test.step(`Select the '${sortName}' sort option on the Home page`, async () => {
      await this.productSortDropdown.selectOption(option);
      Logger.success(
        `Successfully selected the '${sortName}' sort option on the Home page`,
      );
    });
  }

  async selectProductSortOptionByPrice(sort: "Low_to_High" | "High_to_Low") {
    const option = sort === "Low_to_High" ? "lohi" : "hilo";
    const sortPrice =
      sort === "Low_to_High" ? "Price (Low to High)" : "Price (High to Low)";
    await test.step(`Select the '${sortPrice}' sort option on the Home page`, async () => {
      await this.productSortDropdown.selectOption(option);
      Logger.success(
        `Successfully selected the '${sortPrice}' sort option on the Home page`,
      );
    });
  }

  async validateProductSortingByName(sort: string) {
    await test.step(`Verify that the products sorted in '${sort}' order`, async () => {
      const actualProductNames = await this.productName.allTextContents();
      const expectedProductNames = [...actualProductNames].sort((a, b) =>
        sort === constants.homepageProductSortAscending
          ? a.localeCompare(b)
          : b.localeCompare(a),
      );
      if (
        JSON.stringify(actualProductNames) !==
        JSON.stringify(expectedProductNames)
      ) {
        throw new Error(`Products are not sorted in 'Name (Z to A)' order.`);
      }
      Logger.success(
        `Successfully verified that the products are sorted in '${sort}' order`,
      );
      return;
    });
  }

  async validateProductSortingByPrice(sort: string) {
    await test.step(`Verify that the products are sorted in '${sort}' order`, async () => {
      let actualPrices: number[] = [];
      const priceTexts = await this.productPrice.allTextContents();
      actualPrices = priceTexts.map((price) =>
        parseFloat(price.replace("$", "")),
      );
      const expectedPrices = [...actualPrices].sort((a, b) =>
        sort === constants.homepageProductSortPriceLowToHigh ? a - b : b - a,
      );
      if (JSON.stringify(actualPrices) !== JSON.stringify(expectedPrices)) {
        throw new Error(
          `Products are not sorted in 'Price (High to Low)' order`,
        );
      }
      Logger.success(
        `Successfully verified that the products are sorted in '${sort}' order`,
      );
      return;
    });
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
    await test.step(`Verify that the cart count matches the number of added products`, async () => {
      await expect(this.cartCount).toHaveText(
        String(constants.productsByName.length),
      );
      Logger.success(
        `Successfully verified that the cart count matches the number of added products`,
      );
    });
  }
}
