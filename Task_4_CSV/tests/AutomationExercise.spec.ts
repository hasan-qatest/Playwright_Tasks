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

    for (const loginCredentials of records) {
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

