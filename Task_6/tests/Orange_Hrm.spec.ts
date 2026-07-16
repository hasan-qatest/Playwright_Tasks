import { test } from "../src/fixtures/TestFixture";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ loginPage, dashboardPage }) => {
  //Navigate to Orange_HRM Login Screen
  await test.step("Navigate to Orange_HRM Login Screen", async () => {
    await loginPage.navigateToLoginScreen();
  });

  //Orange_HRM Login Page is Visible
  await test.step("Verify Orange_HRM Login Page is Visible", async () => {
    await loginPage.isLoginPageVisible();
  });

  //Check Password is Set Properly
  await test.step("Check Password is Set Properly", async () => {
    await loginPage.checkPasswordIsValid();
  });

  //Login Into Orange_HRM
  await test.step("Login Into Orange_HRM", async () => {
    await loginPage.login();
  });

  //Verify Orange_HRM Dashboard Page is Visible
  await test.step("Verify Orange_HRM Dashboard Page is Visible", async () => {
    await dashboardPage.isDashboardHeaderVisible();
  });
});

test("Orange_HRM Add, Update and Delete Employee Flow", async ({
  dashboardPage,
  pimPage,
}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.log("Login Test failed, skipping logout");
    return;
  }
  const employeeDetails = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    employeeId: faker.number.int({ min: 100000, max: 999999 }).toString(),
  };

  await test.step("Verify PIM Menu is Visible", async () => {
    await dashboardPage.isPimMenuVisible();
  });

  await test.step("Click PIM Menu", async () => {
    await dashboardPage.clickPimMenu();
  });

  await test.step("Verify PIM Header is Visible", async () => {
    await dashboardPage.isPimHeaderVisible();
  });

  await test.step("Verify Employee List Tab is Visible", async () => {
    await pimPage.isEmployeeListTabVisible();
  });

  await test.step("Click Employee List Tab", async () => {
    await pimPage.clickEmployeeListTab();
  });

  await test.step("Verify Employee List Header is Visible", async () => {
    await pimPage.isEmployeeListHeaderVisible();
  });

  await test.step("Verify Add Employee Tab is Visible", async () => {
    await pimPage.isAddEmployeeTabVisible();
  });
  await test.step("Click Add Employee Tab", async () => {
    await pimPage.clickAddEmployeeTab();
  });

  await test.step("Verify Add Employee Header is Visible", async () => {
    await pimPage.isAddEmployeeHeaderVisible();
  });

  await test.step("Enter Employee Details", async () => {
    await pimPage.enterEmployeeDetails(employeeDetails);
  });

  await test.step("click Save Button", async () => {
    await pimPage.clickSaveButton();
  });

  await test.step("Verify Employee's Personal Details header is visible", async () => {
    await pimPage.isPersonalDetailsHeaderVisible();
  });

  await test.step("Verify Employee's First Name, Middle Name, Last Name and Employee Id", async () => {
    await pimPage.verifyEmployeeDetails(employeeDetails);
  });

  await test.step("Verify Employee List Tab is Visible", async () => {
    await pimPage.isEmployeeListTabVisible();
  });

  await test.step("Click Employee List Tab", async () => {
    await pimPage.clickEmployeeListTab();
  });

  await test.step("Verify Employee List Header is Visible", async () => {
    await pimPage.isEmployeeListHeaderVisible();
  });

  await test.step("Enter the first and middle name in the search box and click the Search button", async () => {
    await pimPage.SearchEmployee(employeeDetails);
  });

  await test.step("Verify Employee's Name and Employee's ID in the Search Result", async () => {
    await pimPage.verifySearchEmployee(employeeDetails);
  });

  await test.step("Click the Update Button", async () => {
    await pimPage.clickUpdateButton(employeeDetails);
  });

  await test.step("Update Employee Details", async () => {
    await pimPage.updateEmployeeDetails(employeeDetails);
  });

  await test.step("Click Save Button", async () => {
    await pimPage.clickSaveButton();
  });

  await test.step("Verify Employee List Tab is Visible", async () => {
    await pimPage.isEmployeeListTabVisible();
  });

  await test.step("Click Employee List Tab", async () => {
    await pimPage.clickEmployeeListTab();
  });

  await test.step("Verify Employee List Header is Visible", async () => {
    await pimPage.isEmployeeListHeaderVisible();
  });

  await test.step("Enter the first and middle name in the search box and click the Search button", async () => {
    await pimPage.SearchEmployee(employeeDetails);
  });

  await test.step("Verify Updated Employee Details", async () => {
    await pimPage.verifyUpdatedEmployee(employeeDetails);
  });

  await test.step("Click the Delete icon and confirm the deletion", async () => {
    await pimPage.deleteEmployee(employeeDetails);
  });

  await test.step("Verify Employee Deletion", async () => {
    await pimPage.verifyDeletedEmployee(employeeDetails);
  });
});

test.afterEach(async ({ loginPage, dashboardPage }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.log("Orange_HRM Add/ Delete Employee Test failed, skipping logout");
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

  //Orange_HRM Login Page is Visible
  await test.step("Verify Orange_HRM Login Page is Visible", async () => {
    await loginPage.isLoginPageVisible();
  });
});
