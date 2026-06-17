import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CreateAcccount } from '../pages/CreateAccount';
import { Logout } from '../pages/Logout';
import { constances } from '../utils/testData';

test('AutomationExercise Page Login', async ({ page }) => {

    const homPage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const createAcccount = new CreateAcccount(page);
    const logout = new Logout(page);
    let loginEmail: any;

    await test.step('Nativate to URL', async () => {
        await homPage.gotoURL();
    });

    await test.step('Click Login Page', async () => {
        await homPage.clickLoginLink();
    });

    await test.step('Generate Random Email for Create New User', async() => {
        loginEmail = await loginPage.generateRandomEmail(constances.loginEmail);
        console.log(`Generate Random Email: + ${loginEmail}`);
    });

    await test.step('Enter SignUp Credentials', async() => {
        loginPage.fillSignUpCredentials(constances.firstName, loginEmail);
    });

    await test.step('Click SignUp Button', async() => {
        await loginPage.clikSignUpButton();
    });

    await test.step('Filling Account Information', async() => {
        await createAcccount.fillAccountInformation();
    });

    await test.step('Validate Sign-up Page is Visible', async () => {
     	await createAcccount.verifyAccountCreated();
    });

    await test.step('Logout', async () => {
        logout.logoutClick();
    });

    await test.step('Click Login Page to Sign-in Using Latest Created User Email', async () => {
        await homPage.clickLoginLink();
    });

    await test.step('Enter Latest Created User Login Credentials', async() => {
        console.log(`Login Email: + ${loginEmail}`);
        loginPage.fillSignInCredentials(loginEmail, constances.password);
    });

});