import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage} from '../pages/LoginPage';

test('Automation Exercise Login', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    
    await test.step('Landing page', async () => {
        await homePage.gotoURL();
    });

    await test.step('Click Login Page Link', async () => {
        await homePage.clickLoginPage();
    });

    await test.step('Validate Sign-up Page is Visible', async () => {
     	await expect(page).toHaveTitle("Automation Exercise - Signup / Login");
    });

    await test.step('Enter Sign-Up Values', async () => {
        await loginPage.enterSignUpCredentials();
    });
});