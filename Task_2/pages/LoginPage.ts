import { Page, Locator } from '@playwright/test';
import { constances } from '../utils/testData';

export class LoginPage {
    readonly page: Page;
    readonly signUpName: Locator;
    readonly signUpEmail: Locator;
    readonly signUpButton: Locator;
    readonly password: Locator;
    readonly loginEmail: Locator;
    readonly LoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpName = page.locator(`//input[@data-qa="signup-name"]`);
        this.signUpEmail = page.locator(`//input[@data-qa="signup-email"]`);
        this.signUpButton = page.locator(`//button[@data-qa="signup-button"]`);
        this.loginEmail = page.locator(`//input[@data-qa="login-email"]`);
        this.password = page.locator('//input[@data-qa="login-password"]');
        this.LoginButton = page.locator(`//button[@data-qa="login-button"]`);
    }


    async fillSignInCredentials(loginEmail: string, password: string) {
        await this.loginEmail.fill(loginEmail);
        await this.password.fill(password);
        await this.page.pause();
        //await this.LoginButton.click();
    }

    async generateRandomEmail(loginEmail: string) {
        const [username, domain] = loginEmail.split('@');
        const randomNumber = Math.floor(Math.random() * 1000000);
        const uniqueEmail = `${username}+${randomNumber}@${domain}`;
        await this.signUpEmail.fill(uniqueEmail);
        //await this.email.fill("a3@a3.com");
        return uniqueEmail;
    }

    async fillSignUpCredentials(signUpName: string, loginEmail: string) {
        await this.signUpName.fill(signUpName);
        await this.signUpEmail.fill(loginEmail);
    }

    async clikSignUpButton() {
        await this.signUpButton.click();
    }
}