import { Page, Locator } from "@playwright/test"
import { constants } from '../utils/testData';

export class LoginPage{
    readonly name: Locator;
    readonly email: Locator;
    readonly submit: Locator;

    constructor (page: Page) {
        this.name = page.locator(`//input[@data-qa="signup-name"]`);
        this.email = page.locator(`//input[@data-qa="signup-email"]`);
        this.submit = page.locator(`//button[@data-qa="login-button"]`);
    }

    async enterSignUpCredentials() {
        await this.name.fill(constants.signUpName);
        const [username, domain] = constants.loginEmail.split('@');
        const randomNumber = Math.floor(Math.random() * 1000000);
        const uniqueEmail = `${username}+${randomNumber}@${domain}`;
        await this.email.fill(uniqueEmail);
        console.log(`Sign-up Email : + ${uniqueEmail}`);
    }
}