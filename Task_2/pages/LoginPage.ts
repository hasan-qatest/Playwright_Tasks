import { Page, Locator, expect } from '@playwright/test';
import { constants } from '../utils/testData';

export class LoginPage {
    readonly page: Page;
    readonly signUpName: Locator;
    readonly signUpEmail: Locator;
    readonly signUpButton: Locator;
    readonly password: Locator;
    readonly loginEmail: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpName = page.locator(`//input[@data-qa="signup-name"]`);
        this.signUpEmail = page.locator(`//input[@data-qa="signup-email"]`);
        this.signUpButton = page.locator(`//button[@data-qa="signup-button"]`);
        this.loginEmail = page.locator(`//input[@data-qa="login-email"]`);
        this.password = page.locator('//input[@data-qa="login-password"]');
        this.loginButton = page.locator(`//button[@data-qa="login-button"]`);
    }

    async fillSignInCredentials(loginEmail: string, password: string) {
        await this.loginEmail.fill(loginEmail);
        await this.password.fill(password);
    }

    async clikLoginButton() {
        await this.loginButton.click();
    }

    async generateRandomEmail(loginEmail: string): Promise<string> {
        const [username, domain] = loginEmail.split('@');
        const randomNumber = Math.floor(Math.random() * 1000000);
        const randomEmail = `${username}+${randomNumber}@${domain}`;
        return randomEmail;
    }

    async fillSignUpCredentials(signUpName: string, loginEmail: string) {
        await this.signUpName.fill(signUpName);
        await this.signUpEmail.fill(loginEmail);
    }

    async clikSignUpButton() {
        await this.signUpButton.click();
    }

    async verifiedLoggedUserName() {
        await expect(this.page.locator(`//b[contains(text(),'${constants.firstName}')]`)).toBeVisible();
    }
}