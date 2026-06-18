import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CreateAccount } from '../pages/CreateAccount';
import { Logout } from '../pages/Logout';
import { constants } from '../utils/testData';
import { Logger } from '../utils/logger';

test('AutomationExercise Page Login', async ({ page }) => {
    const homPage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const createAccount = new CreateAccount(page);
    const logout = new Logout(page);
    let loginEmail: string;

    await test.step('Nativate to URL', async () => {
        await homPage.gotoURL();
    });

    await test.step('Click Login Page', async () => {
        await homPage.clickLoginLink();
    });

    await test.step('Generate Random Email for Create New User', async() => {
       loginEmail = await loginPage.generateRandomEmail(constants.loginEmail);
    });

    await test.step('Enter SignUp Credentials', async() => {
        await loginPage.fillSignUpCredentials(constants.firstName, loginEmail);
    });

    await test.step('Click SignUp Button', async() => {
        await loginPage.clikSignUpButton();
    });

    await test.step('Verify SignUp Page', async() => {
        await createAccount.verifySignUpPage();
    });

    await test.step('Filling Account Information', async() => {
        await createAccount.fillAccountInformation();
    });

    await test.step('Validate Sign-up Page is Visible', async () => {
     	await createAccount.verifyAccountCreated();
    });

    await test.step('Logout', async () => {
        await logout.logoutClick();
    });

    await test.step('Click Login Page to Sign-in Using Latest Created User Email', async () => {
        await homPage.clickLoginLink();
    });

    await test.step('Enter Latest Created User Login Credentials', async() => {
        Logger.info(`Login Email: + ${loginEmail}`);
        await loginPage.fillSignInCredentials(loginEmail, constants.password);
    });

    await test.step('Click Login Button', async() => {
        await loginPage.clikLoginButton();
    });

    await test.step('Verify Logged User Name', async() => {
        await loginPage.verifiedLoggedUserName();
    });
});