import { expect, Locator, Page } from "@playwright/test";
import { Logger } from '../utils/logger';

export class LoginPage {
    readonly page: Page;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loggedUserName: Locator;
    readonly loginCredialsErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginEmailInput = page.locator(`//input[@data-qa="login-email"]`);
        this.loginPasswordInput = page.locator(`//input[@data-qa="login-password"]`);
        this.loginButton = page.locator(`//button[@data-qa="login-button"]`);
        this.loggedUserName = page.locator("//a[contains(text(),' Logged in as ')]");
        this.loginCredialsErrorMessage = page.locator("//p[contains(text(),'Your email or password is incorrect!')]");
    }

    async fillSignUpCredentials(loginEmail: string, loginPassword: string) {
        await this.loginEmailInput.fill(loginEmail);
        await this.loginPasswordInput.fill(loginPassword);
        await this.loginButton.click();
        if (await this.loginCredialsErrorMessage.isVisible()) {
            Logger.info(`Your email ${loginEmail} or password is incorrect!`);
            return false;
        }
        else {
            await this.verifiedLoggedUserName();
            return true;
        }
    }

    async verifiedLoggedUserName() {
        await expect(this.loggedUserName).toBeVisible();
    }
}