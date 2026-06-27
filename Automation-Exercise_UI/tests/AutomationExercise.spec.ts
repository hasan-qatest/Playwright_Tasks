import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { constants } from '../utils/constants';
import { Logger } from '../utils/logger';
import { Logout } from '../pages/Logout';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type LoginCredentials = {
    email: string;
    password: string;
    description: string;
}

const records = parse(
    fs.readFileSync(path.join(__dirname, '../testData/TestData.csv')),
    {
        columns: true,
        skipEmptyLines: true,
        trim: true,
        delimiter: ',', // Default delimiter
        comment: '#'
    }
) as LoginCredentials[];

/**
 * UI INTEGRATION HOOK
 * -----------------------------------------------------------------------
 * The web UI (see /html and /server) passes the email entered by the user
 * through the environment variable UI_EMAIL when it launches this test.
 *
 * - If UI_EMAIL is set, we run the login flow ONCE using that email and
 *   the password from the first row of the CSV (password still comes
 *   from test data, per requirement #3).
 * - If UI_EMAIL is NOT set, the test behaves exactly as before and runs
 *   the full data-driven loop over every row in TestData.csv.
 *
 * No Page Object Model classes were changed to support this.
 */
const uiEmail = process.env.UI_EMAIL?.trim();

const loginRecords: LoginCredentials[] = uiEmail
    ? [{
        email: uiEmail,
        password: records[0]?.password ?? '',
        description: `UI-submitted email (${uiEmail})`,
    }]
    : records;


test(`Automation Exercise Data-Driven (CSV) Login Testing`, async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const logout = new Logout(page);

    await test.step(`Navigate to Automation Exercise Home Page`, async () => {
        await homePage.gotoURL(constants.homePageURL);
    });

    await test.step('Validate Automation Exercise Home Page loaded', async () => {
        await homePage.validateLandingWebsite();
        Logger.success("Verified Automation Exercise Home Page loaded successfully");
    });

    await test.step('Click Login Page', async () => {
        await homePage.clickLogin();
        Logger.success("Verified Login Page loaded Successfully");
    });

    for (const loginCredentials of loginRecords) {
        await test.step(`Verify Login with Email - ${loginCredentials.description}`, async () => {
            const loginSuccess = await loginPage.fillLoginCredentials(loginCredentials.email, loginCredentials.password);
            if (loginSuccess) {
                Logger.success(`Verified Login with Email - ${loginCredentials.description}`);
                await loginPage.verifyLoggedUserName();
                await logout.logoutClick();
            } else {
                await expect(loginPage.loginCredentialsErrorMessage).toBeVisible();
                await expect(loginPage.loggedUserName).not.toBeVisible();
                Logger.success(`Verified login correctly rejected for ${loginCredentials.email}`);
            }
        });
    }
});

