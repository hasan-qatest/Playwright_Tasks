import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { constants } from '../utils/constants';
import { Logger } from '../utils/logger';
import { Logout } from '../pages/Logout';
import TestData from '../testData/TestData.json';

type LoginCredentials = {
    description: string;
    email: string;
    password: string;
};

const testData = TestData.LoginCredentials as LoginCredentials[];

test(`Automation Exercise Data-Driver Login Testing`, async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const logout = new Logout(page);
    
    await test.step(`Navigate to Automation Exercise Home Page`, async() => {
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

    for (const loginCredentials of testData) {
        await test.step(`Verify Login with Email - ${loginCredentials.description}`, async () => {
            const loginSuccess = await loginPage.fillLoginCredentials(loginCredentials.email, loginCredentials.password);
             if (loginSuccess) {
                Logger.success(`Verified Login with Email - ${loginCredentials.description}`);
                await logout.logoutClick();
            }
        });
    }
});