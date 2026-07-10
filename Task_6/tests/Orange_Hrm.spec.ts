import { test } from "../src/fixtures/TestFixture";

test.beforeEach("Login Flow", async ({ loginPage, dashboardPage }) => {
  test.step("Navigate to Orange_HRM Login Screen", async () => {
    //Navigate to Orange_HRM Login Screen
    await loginPage.navigateToLoginScreen();
  });

  test.step("Login Into the Orange_HRM application as a Admin", async () => {
    //Login Into the Orange_HRM application as a Admin
    await loginPage.isLoginPageVisible();
  });

  test.step("Check Password", async () => {
    //Check Password
    await loginPage.checkPasswordIsValid();
  });

  test.step("Login As a Admin", async () => {
    //Login As a Admin
    await loginPage.login();
  });

  test.step("Verify User Login", async () => {
    //Verify User Login
    await loginPage.verifyUserLogin();
  });
});

test("Orange_HRM User Creation Flow Test", async ({
  loginPage,
  dashboardPage,
}) => {
  test.step("Verify Dashboard Page Visible", async () => {
    //Verify Dashboard Page Visible
    await dashboardPage.isDashboardHeaderVisible();
  });
});

test.afterEach("Logout Flow", async ({ dashboardPage }) => {
  test.step("Verify User Menu is Visible", async () => {
    //Verify User Menu is Visible
    await dashboardPage.isUserMenuVisible();
  });

  test.step("Click User Menu", async () => {
    //Click User Menu
    await dashboardPage.clickUserMenu();
  });

  test.step("Logout Link is Visible", async () => {
    //Logout Link is Visible
    await dashboardPage.isLogLogoutLinIsVisible();
  });

  test.step("Click Logout Link", async () => {
    //Click Logout Link
    await dashboardPage.clickLogoutLink();
  });
});
