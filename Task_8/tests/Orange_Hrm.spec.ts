import { test } from "../src/fixtures/TestFixture";
import { Logger } from "../src/utils/logger";
import { employeeDetails, userData } from "../src/utils/TestDataGenerator";
import { leaveListRowOrder } from "../src/utils/constants";

test.beforeEach(async ({ loginPage, dashboardPage }, testInfo) => {
  await test.step("Login FLow", async () => {
    //Check Password is Set Properly
    await loginPage.validateRuntimePassword();

    //Navigate to Orange_HRM Login Screen
    await loginPage.navigateToLoginScreen();

    //Orange_HRM Login Page is Visible
    await loginPage.verifyLoginPageVisible();
  });

  if (testInfo.tags.includes("@skipBeforeEach")) {
    Logger.info("Skipping Before Each Login");
    return;
  }

  await test.step("Login Into Orange_HRM", async () => {
    //Login Into Orange_HRM
    await loginPage.login();

    //Verify Orange_HRM Dashboard Page is Visible
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
      await pimPage.updateEmployeeDetails(employeeDetails);

      //Click Save Button
      await pimPage.saveEmployee();
    });

    await test.step("Verify Updated Employee Details", async () => {
      //Click Employee Tab
      await pimPage.clickEmployeeListTab();

      //Enter the first and middle name in the search box and click the Search button
      await pimPage.searchEmployee(employeeDetails);

      //Click the Update Button
      await pimPage.ClickUpdateButton(employeeDetails);

      //Verify Updated Employee Details
      await pimPage.verifyEmployeeUpdated();
    });
  });

  test("User Creation Flow", async ({ adminPage }, testInfo) => {
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

      //Click Save User Button
      await adminPage.saveUserButton();
    });

    await test.step("Search and Verify Created User", async () => {
      //Search Created User
      await adminPage.searchUser();

      //Verify Created User
      await adminPage.verifySearchResult();
    });
  });

  test("Create Leave Type and Assign Leave to Created user", async ({
    leavePage,
  }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      Logger.warn(
        "Employee Management, User Creation or User Login Flow failed, skipping test 'Delete Flow and Logout Flow'",
      );
      return;
    }
    await test.step("Create Leave Type", async () => {
      //Click Leave Menu
      await leavePage.clickLeaveMenu();

      //Click Leave Type Sub Tab
      await leavePage.clickLeaveTypeSubTab();

      //Click Add Leave Types Button
      await leavePage.clickAddLeaveTypeButton();

      //Enter Leave Type Details to create New
      await leavePage.enterLeaveTypeDetails();
    });

    await test.step("Add Leave Entitlement for the Employee", async ({}) => {
      //Add Leave Entitlement for the Employee
      await leavePage.addLeaveEntitlementsForEmployee();

      //Verify Added Leave Entitlement for the Employee
      await leavePage.verifyEmployeeLeaveEntitlement();
    });
  });

  test("@skipBeforeEach Login as the newly created user and Apply Leave", async ({
    loginPage,
    dashboardPage,
    leavePage,
  }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      Logger.warn(
        "Employee Management or User Creation Flow failed, skipping test 'Logout Flow'",
      );
      return;
    }

    await test.step("Login as the newly created user", async () => {
      //Login Into Orange_HRM
      await loginPage.login(userData.username, userData.userPassword);

      //Verify Orange_HRM Dashboard Page is Visible
      await dashboardPage.verifyDashboardHeaderVisible();

      //Verify Logged Username
      await dashboardPage.verifyLoggedInUser();
    });

    await test.step("Apply Leave as a Employee", async () => {
      //Click Leave Menu
      await leavePage.clickLeaveMenu();

      //Apply Leave as a Employee
      await leavePage.applyEmployeeLeave();

      //verify Leave as a Employee
      await leavePage.verifyEmployeeLeave(leaveListRowOrder.leaveActionCancel);
    });
  });

  test("Approve employee leave as Admin", async ({ leavePage }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      Logger.warn(
        "Employee Management, User Creation or User Login Flow failed, skipping test 'Verify, Delete Flow and Logout Flow'",
      );
      return;
    }
    await test.step("Approve employee leave as Admin", async () => {
      //Click Leave Menu
      await leavePage.clickLeaveMenu();

      //Approve employee leave as Admins
      await leavePage.adminApproveEmployeeLeave(
        leaveListRowOrder.leaveActionApprove,
      );
    });
  });

  test("@skipBeforeEach Login as an employee and verify the leave approval", async ({
    leavePage,
    loginPage,
    dashboardPage,
  }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      Logger.warn(
        "Employee Management, User Creation or User Login Flow failed, skipping test 'Delete Flow and Logout Flow'",
      );
      return;
    }
    //Login As Employee
    await test.step("Login As Employee", async () => {
      //Login Into Orange_HRM
      await loginPage.login(userData.username, userData.userPassword);

      //Verify Orange_HRM Dashboard Page is Visible
      await dashboardPage.verifyDashboardHeaderVisible();

      //Verify Logged Username
      await dashboardPage.verifyLoggedInUser();
    });

    await test.step("Verify the approval leave as a employee", async () => {
      //Click Leave Menu
      await leavePage.clickLeaveMenu();

      //verify Leave as a Employee
      await leavePage.verifyEmployeeLeave(leaveListRowOrder.leaveActionCancel);
    });
  });

  test("Delete the created user, employee and Leave Type", async ({
    pimPage,
    adminPage,
    dashboardPage,
    leavePage,
  }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      Logger.warn(
        "Employee Management or User Creation or Verify Leave Flow failed, skipping test 'Logout Flow'",
      );
      return;
    }
    await test.step("Delete Created User", async () => {
      //Click Admin Menu
      await adminPage.clickAdminMenu();

      //Click User Tab
      await adminPage.clickUsersTab();

      //Search Created User
      await adminPage.searchUser();

      //Verify Created User
      await adminPage.verifySearchResult();

      // Click the Delete icon and confirm the deletion
      await adminPage.deleteUser();

      //Verify Employee Deletion
      await adminPage.verifyUserDeleted();
    });

    await test.step("Delete Created Employee", async () => {
      //Click PIM Menu
      await dashboardPage.clickPimMenu();

      //Click Employee Tab
      await pimPage.clickEmployeeListTab();

      //Enter the first and middle name in the search box and click the Search button
      await pimPage.searchEmployee(employeeDetails);

      // Click the Delete icon and confirm the deletion
      await pimPage.deleteEmployee(employeeDetails);

      //Verify Employee Deletion
      await pimPage.verifyEmployeeDeleted(employeeDetails);
    });

    await test.step("Delete Created Leave Type", async () => {
      //Click Leave Menu
      await leavePage.clickLeaveMenu();

      //Click Leave Type Sub Tab
      await leavePage.clickLeaveTypeSubTab();

      //Delete Created Leave Type
      await leavePage.deleteLeaveType();

      //Verify Leave Type Deletion
      await leavePage.verifyLeaveTypeDeleted();
    });
  });
});

test.afterEach(async ({ loginPage, dashboardPage }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    Logger.warn(
      "Orange-HRM Add, Update and Delete Employee Flow Test failed, skipping logout",
    );
    return;
  }
  await test.step("Logout User", async () => {
    Logger.info("Logout Flow Started");

    //Click User Menu
    await dashboardPage.clickUserMenu();

    //Click Logout Link
    await dashboardPage.clickLogoutLink();

    //Orange_HRM Login Page is Visible
    await loginPage.verifyLoginPageVisible();
  });
});
