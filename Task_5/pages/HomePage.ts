import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../utils/logger";
import { test } from "../fixture/TestFixture";
import { constants } from "../utils/constants";

export class HomePage {
  readonly page: Page;
  readonly productsHeader: Locator;
  readonly productSortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsHeader = page.getByText("Products");
    this.productSortDropdown = page.getByTestId("product-sort-container");
    this.productNames = page.getByTestId("inventory-item-name");
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async isProductsSectionVisibleOnHomePage() {
    await test.step("Verify that the Products section is displayed on the Home Page", async () => {
      await this.productsHeader.isVisible();
      Logger.success(
        "Successfully verified that the Products section is displayed on the Home Page",
      );
    });
  }

  async isProductSortingSectionVisible() {
    await test.step("Verify that the Products Sort section is displayed on the Home Page", async () => {
      await this.productSortDropdown.isVisible();
      Logger.success(
        "Successfully verified that the Products Sort section is displayed on the Home Page",
      );
    });
  }

  async validateAllSortOptions() {
    await test.step("Verify that all product sort options are available in the sorting section", async () => {
      await expect(this.productSortDropdown.locator("option")).toHaveText([
        "Name (A to Z)",
        "Name (Z to A)",
        "Price (low to high)",
        "Price (high to low)",
      ]);
      Logger.success(
        "Verified that all expected sort options are available in the sort dropdown",
      );
    });
  }

  async selectProductSortOptionAtoZ() {
    await test.step("Select the 'Name (A to Z)' sort option on the Home Page", async () => {
      await this.productSortDropdown.selectOption("az");
      Logger.success("Selected the Name (A to Z) sort option on the Home Page");
    });
  }

  async selectProductSortOptionZtoA() {
    await test.step("Select the 'Name (Z to A)' sort option on the Home Page", async () => {
      await this.productSortDropdown.selectOption("za");
      Logger.success("Selected the Name (Z to A) sort option on the Home Page");
    });
  }

  async selectProductSortOptionByPriceLowToHigh() {
    await test.step("Select the 'Price (Low to High)' sort option on the Home Page", async () => {
      await this.productSortDropdown.selectOption("lohi");
      Logger.success(
        "Selected the 'Price (Low to High)' sort option on the Home Page",
      );
    });
  }

  async selectProductSortOptionByPriceHighToLow() {
    await test.step("Select the 'Price (High to Low)' sort option on the Home Page", async () => {
      await this.productSortDropdown.selectOption("hilo");
      Logger.success(
        "Selected the 'Price (High to Low)' sort option on the Home Page",
      );
    });
  }

  async validateProductSortingByName(sort: string) {
    await test.step(`Verify that the products sorted as expected '${sort}'`, async () => {
      const actualProductNames = await this.productNames.allTextContents();
      const expectedProductNames = [...actualProductNames].sort((a, b) =>
        sort === constants.homepageProductSortAscending
          ? a.localeCompare(b)
          : b.localeCompare(a),
      );
      await expect(actualProductNames).toEqual(expectedProductNames);
      Logger.success(
        `Verified that the products are sorted in '${sort}' order`,
      );
      return;
    });
  }

  async validateProductSortingByPrice(sort: string) {
    await test.step(`Verify that the products sorted as expected '${sort}'`, async () => {
      let actualPrices: number[] = [];
      const priceTexts = await this.productPrices.allTextContents();
      actualPrices = priceTexts.map((price) =>
        parseFloat(price.replace("$", "")),
      );
      const expectedPrices = [...actualPrices].sort((a, b) =>
        sort === constants.homepageProductSortPriceLowToHigh ? a - b : b - a,
      );
      await expect(actualPrices).toEqual(expectedPrices);
      Logger.success(
        `Verified that the products are sorted in Price '${sort}' order`,
      );
      return;
    });
  }
}