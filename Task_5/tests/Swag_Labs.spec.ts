import { test } from "../fixture/TestFixture";
import { expect } from "@playwright/test";
import { constants, ProductSort } from "../utils/constants";
import { Logger } from "../utils/logger";

test.beforeEach(async ({ loginPage }) => {
  //Navigate to the Swag Labs Login Page
  await test.step("Navigate to the Swag Labs Login Page", async () => {
    await loginPage.gotoURL();
  });

  //Verify successful redirection to the Swag Labs Login page
  await test.step("Verify that the user is redirected to the Swag Labs Login page", async () => {
    await loginPage.validateLandingWebsite();
  });

  //Enter Standard User credentials in the login fields
  await test.step("Enter credentials in the login fields and Click Login", async () => {
    await loginPage.login(constants.standardUserName, constants.password);
  });

  //Verified that the Products section is displayed on the Home Page
  await test.step("Verify that the Products section is displayed on the Home Page", async () => {
    await loginPage.isProductsSectionVisibleOnHomePage();
  });
});

test("Swag Labs Sorting Flow Verification ", async ({ homePage }) => {
  //Verify that the Products Sort section is displayed on the Home Page
  await test.step("Verify that the Products Sort section is displayed on the Home Page", async () => {
    await homePage.isProductSortingSectionVisible();
  });

  //Verify that all product sort options are available in the sorting section
  await test.step("Verify that all product sort options are available in the sort dropdown", async () => {
    await homePage.validateAllSortOptions();
  });

  //Select the 'Name (A to Z)' sort option on the Home Page
  await test.step(`Select the '${ProductSort.NAME_ASC}' sort option on the Home page`, async () => {
    await homePage.selectProductSortOptionByName(ProductSort.NAME_ASC);
  });

  //Verify that the Name (A to Z) sort option sorts the products in ascending order
  await test.step(`Verify that the products sorted in '${ProductSort.NAME_ASC}' order`, async () => {
    await homePage.validateProductSortingByName(ProductSort.NAME_ASC);
  });

  //Select the 'Name (Z to A)' sort option on the Home Page
  await test.step(`Select the '${ProductSort.NAME_DESC}' sort option on the Home page`, async () => {
    await homePage.selectProductSortOptionByName(ProductSort.NAME_DESC);
  });

  //Verify that the Name (Z to A) sort option sorts the products in descending order
  await test.step(`Verify that the products sorted in '${ProductSort.NAME_DESC}' order`, async () => {
    await homePage.validateProductSortingByName(ProductSort.NAME_DESC);
  });

  //Select the sort option 'Name (A to Z)' and Verify 'Name (Z to A)' for negative case
  await test.step(`Verify that the products sorted in '${ProductSort.NAME_ASC}' order`, async () => {
    await homePage.selectProductSortOptionByName(ProductSort.NAME_ASC);
    await expect(
      homePage.validateProductSortingByName(ProductSort.NAME_DESC),
    ).rejects.toThrow(
      `Products are not sorted in '${ProductSort.NAME_DESC}' order.`,
    );
    Logger.success(
      `Verified that '${ProductSort.NAME_ASC}' is not sorted as '${ProductSort.NAME_DESC}'`,
    );
  });

  //Select the 'Price (Low to High)' sort option on the Home Page
  await test.step(`Select the '${ProductSort.PRICE_LOW_HIGH}' sort option on the Home page`, async () => {
    await homePage.selectProductSortOptionByPrice(ProductSort.PRICE_LOW_HIGH);
  });

  //Verify that the products sorted as expected 'Price (Low to High)'
  await test.step(`Verify that the products are sorted in '${ProductSort.PRICE_LOW_HIGH}' order`, async () => {
    await homePage.validateProductSortingByPrice(ProductSort.PRICE_LOW_HIGH);
  });

  //Select the 'Price (High to Low)' sort option on the Home Page
  await test.step(`Select the '${ProductSort.PRICE_HIGH_LOW}' sort option on the Home page`, async () => {
    await homePage.selectProductSortOptionByPrice(ProductSort.PRICE_HIGH_LOW);
  });

  //Verify that the products sorted as expected 'Price (High to Low)'
  await test.step(`Verify that the products are sorted in '${ProductSort.PRICE_HIGH_LOW}' order`, async () => {
    await homePage.validateProductSortingByPrice(ProductSort.PRICE_HIGH_LOW);
  });

  //Select the sort option 'Price (Low to High)' and Verify 'Price (High to Low)' for negative case
  await homePage.selectProductSortOptionByPrice(ProductSort.PRICE_LOW_HIGH);
  await expect(async () => {
    await homePage.validateProductSortingByPrice(ProductSort.PRICE_HIGH_LOW);
  }).rejects.toThrow(
    `Products are not sorted in '${ProductSort.PRICE_LOW_HIGH}' order`,
  );
  Logger.success(
    `Verified that '${ProductSort.PRICE_LOW_HIGH}' is not sorted as '${ProductSort.PRICE_HIGH_LOW}'`,
  );
});

test("Swag Labs Add Product and Verify Flow", async ({
  loginPage,
  homePage,
  shoppingCartPage,
  checkout,
}) => {
  //Add Product to the Cart
  await homePage.addProductToCart([...constants.productsByName]);

  //Verified that the cart count matched with the number of added products
  await test.step(`Verify that the cart count matches the number of added products`, async () => {
    await homePage.verifyShoppingCartCount();
  });

  //Verify that the Shopping cart link is visible
  await test.step("Verify that the Shopping cart link is visible", async () => {
    await shoppingCartPage.isShoppingCartLinkVisible();
  });

  //Click on the Shopping Cart link
  await test.step("Click the Shopping cart link", async () => {
    await shoppingCartPage.shoppingCartLinkClick();
  });

  //Verify that the Shopping cart header and checkout button are displayed
  await test.step("Verify that the Shopping cart header and checkout button are displayed", async () => {
    await shoppingCartPage.isShoppingCartPageVisible();
  });

  //Verify that added products are available in the Shopping Cart
  await test.step("Verify that all added products are displayed in the Shopping Cart", async () => {
    await shoppingCartPage.verifyShoppingCartItems();
  });

  //Click the Checkout button on the Shopping Cart page
  await test.step("Click the Checkout button on the Shopping Cart page", async () => {
    await shoppingCartPage.clickCheckoutButton();
  });

  //Verify that the Checkout Information page is displayed with all required fields
  await test.step("Verify that the Checkout Information page is displayed with all required fields", async () => {
    await checkout.isCheckoutInformationPageVisible();
  });

  //Entered the Checkout Information (First Name, Last Name, Postal Code) on the checkout page
  await test.step("Enter the checkout information (First Name, Last Name, and Postal Code) on the checkout page", async () => {
    await checkout.fillCheckoutInformation();
  });

  //Click the Continue button on the Checkout Information page
  await test.step("Click the Continue button on the Checkout Information page", async () => {
    await checkout.clickCheckoutContinueButton();
  });

  //Verify that the Checkout Overview Page is displayed
  await test.step("Verify that the Checkout Overview Page is displayed", async () => {
    await checkout.isCheckoutOverviewPageVisible();
  });

  //Verify that all products displayed in the Checkout Cart
  await checkout.verifyCheckoutProducts();

  //Click the Finish button to complete the checkout process
  await test.step("Click the Finish button to complete the checkout process", async () => {
    await checkout.finishCheckout();
  });

  //Verify that the Checkout Complete Page is displayed
  await test.step("Verify that the Checkout Complete Page is displayed", async () => {
    await checkout.isCheckoutCompletePageVisible();
  });

  //Click the Back to Products button on the Checkout Complete page
  await test.step("Click the 'Back to Products' button on the Checkout Complete page", async () => {
    await checkout.clickBackToProductButton();
  });

  //Verified that the Products section is displayed on the Home Page
  await test.step("Verify that the Products section is displayed on the Home Page", async () => {
    await loginPage.isProductsSectionVisibleOnHomePage();
  });
});

test.afterEach(async ({ loginPage, logout }) => {
  //Verify that the menu is visible
  await test.step("Verify that the menu is visible", async () => {
    await logout.isLogoutMenuVisible();
  });

  //Click the Logout button from the menu
  await test.step("Click the Logout button from the menu", async () => {
    await logout.logoutLinkClick();
  });

  //Verify successful redirection to the Swag Labs Login page
  await test.step("Verify that the user is redirected to the Swag Labs Login page", async () => {
    await loginPage.validateLandingWebsite();
  });
});
