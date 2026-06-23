import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { constants } from '../utils/Constants';
import { Logger } from '../utils/logger';
import TestData from '../testdata/TestData.json';

type InvalidEmailData = {
    description: string;
    email: string;
    errorMessage: string;
};

const testData = TestData.invalidSignUpEmails as InvalidEmailData[];

test('AutomationExercise Login Validations', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);

    await test.step('Naviagte to URL', async () => {
        await homePage.gotoURL();
    });

    await test.step('Validate Automation Exercise Home Page loaded', async () => {
        await homePage.validateLandingWebsite();
        Logger.success("Verified Automation Exercise Home Page loaded successfully");
    });

    await test.step('Click SignUp Page', async () => {
        await homePage.clickSignUpLink();
        Logger.success("Verified Signup Page loaded Successfully");
    });

    await test.step('Try SignUp with Empty Name and Empty Email fields', async () => {
        await signUpPage.fillSignUpCredentials('','');
    });

    await test.step('Try SignUp with Empty Name and Valid Email fields', async () => {
        await signUpPage.fillSignUpCredentials('',constants.signUpEmail);
    });

    await test.step('Try SignUp with Valid Name and Empty Email fields', async () => {
        await signUpPage.fillSignUpCredentials(constants.signupName,'');
    });

    for (const invalidSignUpEmails of testData) {
        await test.step(`Verify signup rejects email - ${invalidSignUpEmails.description}`, async () => {
            await signUpPage.fillSignUpCredentials(constants.signupName, invalidSignUpEmails.email);
            await signUpPage.validateRequiredField(signUpPage.signUpEmailInput, invalidSignUpEmails.errorMessage);
            Logger.success(`Verified signup rejects because of email - ${invalidSignUpEmails.description}`);
        });
    }

    await test.step('Try Signup with Valid SignUp Name, SignUp Email', async () => {
        await signUpPage.fillSignUpCredentials(constants.signupName, constants.signUpEmail);
        Logger.success("verified Successfully Signup with Valid Name, Valid Email")
    });

    await test.step('Verify Created Account Page Redirection', async () => {
        await signUpPage.verifiedCreateAccountPage();
        Logger.success("Verified Created Account page Redirected Successfully");
    });
});