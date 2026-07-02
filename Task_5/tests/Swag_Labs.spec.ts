import { test } from "../fixture/TestFixture";
import { expect } from "@playwright/test";
import { constants } from "../utils/constants";
import { Logger } from "../utils/logger";

test("Swag Labs Sorting Flow Verification ", async ({
  loginPage,
  homePage,
}) => {
  //Redirect to Swag Labs Login/Home Page
  await loginPage.gotoURL();

  //Verify Landing page redirected successfully
  await loginPage.validateLandingWebsite();

  //Fill Standard User credentials in the login page
  await loginPage.loginAsAStandardUser(
    constants.standardUser_userName,
    constants.password,
  );

  //Click Login Button in the Login Page
  await loginPage.clickLoginButton();

  //Verified that the Products section is displayed on the Home Page
  await homePage.isProductsSectionVisibleOnHomePage();

  //Verify that the Products Sort section is displayed on the Home Page
  await homePage.isProductSortingSectionVisible();

  //Verify that all product sort options are available in the sorting section
  await homePage.validateAllSortOptions();

  //Select the 'Name (A to Z)' sort option on the Home Page
  //await homePage.selectProductSortOptionAtoZ();
  await homePage.selectProductSortOptionByName(
    constants.homepageProductSortAscending,
  );

  //Verify that the Name (A to Z) sort option sorts the products in ascending order
  await homePage.validateProductSortingByName(
    constants.homepageProductSortAscending,
  );

  //Select the 'Name (Z to A)' sort option on the Home Page
  //await homePage.selectProductSortOptionZtoA();
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
  //Redirect to Swag Labs Login/Home Page
  await loginPage.gotoURL();

  //Verify Landing page redirected successfully
  await loginPage.validateLandingWebsite();

  //Fill Standard User credentials in the login page
  await loginPage.loginAsAStandardUser(
    constants.standardUser_userName,
    constants.password,
  );

  //Click Login Button in the Login Page
  await loginPage.clickLoginButton();

  //Verified that the Products section is displayed on the Home Page
  await homePage.isProductsSectionVisibleOnHomePage();

  //Add Product to Cart
  await homePage.addProductToCart([...constants.ProductsByName]);

  //Verified that the cart count matched with the number of product added
  await homePage.verifyShoppingCartCount();

  //Verify that the shopping Cart Link is Visible
  await shoppingCartPage.isShoppingCartLinkVisible();

  //Click on the Shopping Cart link
  await shoppingCartPage.shoppingCartLinkClick();

  //Verify that the Shopping Cart page is display
  await shoppingCartPage.isShoppingCartPageVisible();

  //Verify that added products are available in the Shopping Cart
  await shoppingCartPage.verifyShoppingCartItems();

  //Click the Checkout button on the Shopping Cart page
  await shoppingCartPage.clickCheckoutButton();

  //Verify Checkout information (First Name, Last Name, Postal Code) is displayed
  await checkoutInformationPage.isCheckoutInformationPageVisible();

  //Fill Checkout Information (First Name, Last Name, Postal Code) on the checkout page
  await checkoutInformationPage.fillCheckoutInformation();

  //Click the Checkout Continue Button
  await checkoutInformationPage.clickCheckoutContinueButton();

  //Verify that the Checkout Overview Page is Displayed
  await checkoutOverviewPage.isCheckoutOverviewPageVisible();

  //Verify Checkout Products
  await checkoutOverviewPage.verifyCheckoutProducts();

  //Click the Finish button to complete the checkout
  await checkoutOverviewPage.finishCheckout();

  //Verify that the Checkout Complete page is display
  await checkoutCompletePage.isCheckoutCompletePageVisible();

  //Click the Back to Products button on the Checkout Complete page
  await checkoutCompletePage.clickBackToProductButton();

  //Verified that the Products section is displayed on the Home Page
  await homePage.isProductsSectionVisibleOnHomePage();

  //Verify that the Menu is Visible
  await logout.isLogoutMenuVisible();
  
  //Click Logout
  await logout.logoutClick();

  //Verify Login page redirected successfully
  await loginPage.validateLandingWebsite();
});
