import { test } from "../src/fixtures/TestFixture";

test.beforeEach(async ({ loginPage }) => {
  //Navigate to Orange_HRM Login Screen
  await test.step("Navigate to Orange_HRM Login Screen", async () => {
    await loginPage.navigateToLoginScreen();
  });

  //Login Into the Orange_HRM application as a Admin
  await test.step("Login Into the Orange_HRM application as a Admin", async () => {
    await loginPage.isLoginPageVisible();
  });

  //Check Password
  await test.step("Check Password", async () => {
    await loginPage.checkPasswordIsValid();
  });

  //Login As a Admin
  await test.step("Login As a Admin", async () => {
    await loginPage.login();
  });

  //Verify User Login
  await test.step("Verify User Login", async () => {
    await loginPage.verifyUserLogin();
  });
});

test("Orange_HRM User Creation Flow Test", async ({ dashboardPage }) => {
  //Verify Dashboard Page Visible
  await test.step("Verify Dashboard Page Visible", async () => {
    await dashboardPage.isDashboardHeaderVisible();
  });
});

test.afterEach(async ({ dashboardPage }) => {
  //Verify User Menu is Visible
  await test.step("Verify User Menu is Visible", async () => {
    await dashboardPage.isUserMenuVisible();
  });

  //Click User Menu
  await test.step("Click User Menu", async () => {
    await dashboardPage.clickUserMenu();
  });

  //Logout Link is Visible
  await test.step("Logout Link is Visible", async () => {
    await dashboardPage.isLogoutLinkIsVisible();
  });

  //Click Logout Link
  await test.step("Click Logout Link", async () => {
    await dashboardPage.clickLogoutLink();
  });
});
