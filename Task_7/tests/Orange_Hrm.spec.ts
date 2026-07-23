import { test } from "../src/fixtures/TestFixture";
import { Logger } from "../src/utils/logger";
import { employeeDetails, userDetails } from "../src/utils/constants";

test.beforeEach(async ({ loginPage, dashboardPage }) => {
  //Check Password is Set Properly
  await test.step("Check Password is Set Properly", async () => {
    await loginPage.validateRuntimePassword();
  });

  //Navigate to Orange_HRM Login Screen
  await test.step("Navigate to Orange_HRM Login Screen", async () => {
    await loginPage.navigateToLoginScreen();
  });

  //Orange_HRM Login Page is Visible
  await test.step("Verify Orange_HRM Login Page is Visible", async () => {
    await loginPage.verifyLoginPageVisible();
  });

  //Login Into Orange_HRM
  await test.step("Login Into Orange_HRM", async () => {
    await loginPage.login();
  });

  //Verify Orange_HRM Dashboard Page is Visible
  await test.step("Verify Orange_HRM Dashboard Page is Visible", async () => {
    await dashboardPage.verifyDashboardHeaderVisible();
  });
});

test.describe("Orange-HRM Employee and User Management ", async () => {
  test.describe.configure({ mode: "serial" });

  test("Employee Management Flow", async ({
    dashboardPage,
    pimPage,
  }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      Logger.warn(
        "Login Test failed, skipping test 'Orange-HRM Employee/ Admin Management Flow and logout'",
      );
      return;
    }

    await test.step("Add New Employee", async () => {
      //Click PIM Menu
      await dashboardPage.clickPimMenu();

      //Click Employee List Tab
      await pimPage.clickEmployeeListTab();

      //Click Add Employee Tab
      await pimPage.clickAddEmployeeTab();

      //Enter Employee Details
      await pimPage.enterEmployeeDetails(employeeDetails);

      //click Save Button
      await pimPage.saveEmployee();

      //Verify Employee's First Name, Middle Name, Last Name and Employee Id
      await pimPage.verifyEmployeeInformation(employeeDetails);
    });

    await test.step("Search Created Employee", async () => {
      //Click Employee List Tab
      await pimPage.clickEmployeeListTab();

      //Enter the first and middle name in the search box and click the Search button
      await pimPage.searchEmployee(employeeDetails);

      //Verify Employee's Name and Employee's ID in the Search Result
      await pimPage.verifyEmployeeSearchResult(employeeDetails);
    });

    await test.step("Update Created Employee from the Search Result", async () => {
      //Click the Update Button
      await pimPage.ClickUpdateButton(employeeDetails);

      //Verify Employee's First Name, Middle Name, Last Name and Employee Id
      await pimPage.verifyEmployeeInformation(employeeDetails);

      //Update Employee Details
      await pimPage.updateEmployeeDetails();

      //Click Save Button
      await pimPage.saveEmployee();
    });

    await test.step("Verify Updated Employee Details", async () => {
      //Click Employee Tab
      await pimPage.clickEmployeeListTab();

      //Enter the first and middle name in the search box and click the Search button
      await pimPage.searchEmployee(employeeDetails);

      //Verify Updated Employee Details
      await pimPage.verifyEmployeeUpdated(employeeDetails);
    });
  });

  test("Admin Management FLow", async ({ adminPage, pimPage }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      Logger.warn(
        "Employee Management Flow failed, skipping test 'Orange-HRM Admin Management FLow and logout'",
      );
      return;
    }

    await test.step("Create User for Newly Created Employee", async () => {
      //Click Admin Menu
      await adminPage.clickAdminMenu();

      //Click User Tab
      await adminPage.clickUsersTab();

      //Click Add User Button
      await adminPage.addNewUser();

      //Fill New User details
      await adminPage.fillUserDetails();

      //Validate Entered New User details
      await adminPage.validateUserDetailsWarnings();

      //Click Save User Button
      await adminPage.saveUserButton();
    });

    await test.step("Search Created User", async () => {
      //Search Created User
      await adminPage.searchUser(employeeDetails, userDetails);
    });

    // await test.step("Delete Created Employee", async () => {
    //   //Click Employee Tab
    //   await pimPage.clickEmployeeListTab();

    //   //Enter the first and middle name in the search box and click the Search button
    //   await pimPage.searchEmployee(employeeDetails);

    //   // Click the Delete icon and confirm the deletion
    //   await pimPage.deleteEmployee(employeeDetails);

    //   //Verify Employee Deletion
    //   await pimPage.verifyEmployeeDeleted(employeeDetails);
    // });
  });
});

test.afterEach(async ({ loginPage, dashboardPage }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    Logger.warn(
      "Orange-HRM Add, Update and Delete Employee Flow Test failed, skipping logout",
    );
    return;
  }
  Logger.info("Logout Flow Started");
  //Click User Menu
  await test.step("Click User Menu", async () => {
    await dashboardPage.clickUserMenu();
  });

  //Click Logout Link
  await test.step("Click Logout Link", async () => {
    await dashboardPage.clickLogoutLink();
  });

  //Orange_HRM Login Page is Visible
  await test.step("Verify Orange_HRM Login Page is Visible", async () => {
    await loginPage.verifyLoginPageVisible();
  });
});
