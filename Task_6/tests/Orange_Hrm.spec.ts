import { test } from "../src/fixtures/TestFixture";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ loginPage, dashboardPage }) => {
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

  //Verify Dashboard Page Visible
  await test.step("Verify Dashboard Page Visible", async () => {
    await dashboardPage.isDashboardHeaderVisible();
  });
});

test("Orange_HRM Login and Add Employee Flow", async ({
  dashboardPage,
  pimPage,
}) => {
  const employeeDetails = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 100000, max: 999999 }).toString(),
  };

  await test.step("Verify PIM Menu Visible", async () => {
    await dashboardPage.isPimMenuVisible();
  });

  await test.step("Verify PIM Menu Click", async () => {
    await dashboardPage.clickPimMenu();
  });

  await test.step("Verify PIM Header Visible", async () => {
    await dashboardPage.isPimHeaderVisible();
  });

  await test.step("Verify Employee List Tab is Visible", async () => {
    await pimPage.isEmployeeListTabVisible();
  });

  await test.step("Verify Employee List Tab Click", async () => {
    await pimPage.clickEmployeeListTab();
  });

  await test.step("Verify Employee List Header is Visible", async () => {
    await pimPage.isEmployeeListHeaderVisible();
  });

  await test.step("Verify Add Employee Tab is Visible", async () => {
    await pimPage.isAddEmployeeTabVisible();
  });
  await test.step("Verify Add Employee Tab Click", async () => {
    await pimPage.clickAddEmployeeTab();
  });

  await test.step("Verify Add Employee Header is Visible", async () => {
    await pimPage.isAddEmployeeHeaderVisible();
  });

  await test.step("Add New Employee Details", async () => {
    await pimPage.fillNewEmployeeDetails(employeeDetails);
  });

  await test.step("click Save Button", async () => {
    await pimPage.clickSaveButton();
  });

  await test.step("Verify New Employee's Personal Details to be visible", async () => {
    await pimPage.isPersonalDetailsHeaderVisible();
  });

  await test.step("Verify Employee List Tab is Visible", async () => {
    await pimPage.isEmployeeListTabVisible();
  });

  await test.step("Verify Employee List Tab Click", async () => {
    await pimPage.clickEmployeeListTab();
  });

  await test.step("Verify Employee List Header is Visible", async () => {
    await pimPage.isEmployeeListHeaderVisible();
  });

  await test.step("Enter the New Emp value in the Search Box", async () => {
    await pimPage.SearchEmployee(employeeDetails);
  });

  await test.step("verify Employee Created", async () => {
    await pimPage.verifyEmployeeCreated(employeeDetails);
  });

  await test.step("Click Update Button for New Employee", async () => {
    await pimPage.clickUpdateButton(employeeDetails);
  });

  await test.step("Update New Employee Details", async () => {
    await pimPage.updateEmployeeDetails(employeeDetails);
  });

  await test.step("click Save Button", async () => {
    //await pimPage.clickSaveButton();
  });

  await test.step("Verify Employee List Tab is Visible", async () => {
    await pimPage.isEmployeeListTabVisible();
  });

  await test.step("Verify Employee List Tab Click", async () => {
    await pimPage.clickEmployeeListTab();
  });

  await test.step("Verify Employee List Header is Visible", async () => {
    await pimPage.isEmployeeListHeaderVisible();
  });

  await test.step("Enter the Updated Employee Details in the Search Box", async () => {
    await pimPage.SearchEmployee(employeeDetails);
  });

  await test.step("Verify Updated Employee", async () => {
    await pimPage.verifyUpdatedEmployee(employeeDetails);
  });
});

test.afterEach(async ({ dashboardPage }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.log("Test failed, skipping logout");
    return;
  }

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
