import { test } from "../fixture/TestFixture";
import { expect } from "@playwright/test";
import { constants } from "../utils/constants";
import { Logger } from "../utils/logger";

test("Swag Labs Sorting Flow Verification ", async ({
  loginPage,
  homePage,
}) => {
  //Navigate to the Swag Labs Login Page
  await loginPage.gotoURL();

  //Verify successful redirection to the Swag Labs Login page
  await loginPage.validateLandingWebsite();

  //Enter Standard User credentials in the login fields
  await loginPage.loginAsAStandardUser(
    constants.standardUser_userName,
    constants.password,
  );

  //Click the Login Button
  await loginPage.clickLoginButton();

  //Verified that the Products section is displayed on the Home Page
  await homePage.isProductsSectionVisibleOnHomePage();

  //Verify that the Products Sort section is displayed on the Home Page
  await homePage.isProductSortingSectionVisible();

  //Verify that all product sort options are available in the sorting section
  await homePage.validateAllSortOptions();

  //Select the 'Name (A to Z)' sort option on the Home Page
  await homePage.selectProductSortOptionByName(
    constants.homepageProductSortAscending,
  );

  //Verify that the Name (A to Z) sort option sorts the products in ascending order
  await homePage.validateProductSortingByName(
    constants.homepageProductSortAscending,
  );

  //Select the 'Name (Z to A)' sort option on the Home Page
  await homePage.selectProductSortOptionByName(
    constants.homepageProductSortDescending,
  );

  //Verify that the Name (Z to A) sort option sorts the products in descending order
  await homePage.validateProductSortingByName(
    constants.homepageProductSortDescending,
  );

  //Select the 'Price (Low to High)' sort option on the Home Page
  await homePage.selectProductSortOptionByPrice(
    constants.homepageProductSortPriceLowToHigh,
  );

  //Verify that the products sorted as expected 'Price (Low to High)'
  await homePage.validateProductSortingByPrice(
    constants.homepageProductSortPriceLowToHigh,
  );

  //Select the 'Price (High to Low)' sort option on the Home Page
  await homePage.selectProductSortOptionByPrice(
    constants.homepageProductSortPriceHighToLow,
  );

  //Verify that the products sorted as expected 'Price (Low to High)'
  await homePage.validateProductSortingByPrice(
    constants.homepageProductSortPriceHighToLow,
  );

  //Select the sort option 'Name (A to Z)' and Verify 'Name (Z to A)' for negative case
  await homePage.selectProductSortOptionByName(
    constants.homepageProductSortAscending,
  );
  await expect(async () => {
    await homePage.validateProductSortingByName(
      constants.homepageProductSortDescending,
    );
  }).rejects.toThrow();
  Logger.success(
    "Verified that 'Name (A to Z)' is not sorted as 'Name (Z to A)'",
  );

  //Select the sort option 'Price (Low to High)' and Verify 'Price (High to Low)' for negative case
  await homePage.selectProductSortOptionByPrice(
    constants.homepageProductSortPriceLowToHigh,
  );
  await expect(async () => {
    await homePage.validateProductSortingByPrice(
      constants.homepageProductSortPriceHighToLow,
    );
  }).rejects.toThrow();
  Logger.success(
    "Verified that 'Price (Low to High)' is not sorted as 'Price (High to Low)'",
  );
});

test("Swag Labs Add Product and Verify Flow", async ({
  loginPage,
  homePage,
  shoppingCartPage,
  checkoutInformationPage,
  checkoutOverviewPage,
  checkoutCompletePage,
  logout,
}) => {
  //Navigate to the Swag Labs Login Page
  await loginPage.gotoURL();

  //Verify successful redirection to the Swag Labs Login page
  await loginPage.validateLandingWebsite();

  //Enter Standard User credentials in the login fields
  await loginPage.loginAsAStandardUser(
    constants.standardUser_userName,
    constants.password,
  );

  //Click the Login Button
  await loginPage.clickLoginButton();

  //Verified that the Products section is displayed on the Home Page
  await homePage.isProductsSectionVisibleOnHomePage();

  //Add Product to the Cart
  await homePage.addProductToCart([...constants.ProductsByName]);

  //Verified that the cart count matched with the number of added products
  await homePage.verifyShoppingCartCount();

  //Verify that the Shopping cart link is visible
  await shoppingCartPage.isShoppingCartLinkVisible();

  //Click on the Shopping Cart link
  await shoppingCartPage.shoppingCartLinkClick();

  //Verify that the Shopping cart header and checkout button are displayed
  await shoppingCartPage.isShoppingCartPageVisible();

  //Verify that added products are available in the Shopping Cart
  await shoppingCartPage.verifyShoppingCartItems();

  //Click the Checkout button on the Shopping Cart page
  await shoppingCartPage.clickCheckoutButton();

  //Verify that the Checkout Information page is displayed with all required fields
  await checkoutInformationPage.isCheckoutInformationPageVisible();

  //Entered the Checkout Information (First Name, Last Name, Postal Code) on the checkout page
  await checkoutInformationPage.fillCheckoutInformation();

  //Click the Continue button on the Checkout Information page
  await checkoutInformationPage.clickCheckoutContinueButton();

  //Verify that the Checkout Overview Page is displayed
  await checkoutOverviewPage.isCheckoutOverviewPageVisible();

  //Verify that all products displayed in the Checkout Cart
  await checkoutOverviewPage.verifyCheckoutProducts();

  //Click the Finish button to complete the checkout process
  await checkoutOverviewPage.finishCheckout();

  //Verify that the Checkout Complete Page is displayed
  await checkoutCompletePage.isCheckoutCompletePageVisible();

  //Click the Back to Products button on the Checkout Complete page
  await checkoutCompletePage.clickBackToProductButton();

  //Verify that the Products section is displayed on the Home Page
  await homePage.isProductsSectionVisibleOnHomePage();

  //Verify that the menu is visible
  await logout.isLogoutMenuVisible();

  //Click the Logout button from the menu
  await logout.logoutLinkClick();

  //Verify successful redirection to the Swag Labs Login page
  await loginPage.validateLandingWebsite();
});