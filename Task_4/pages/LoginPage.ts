import { expect, Locator, Page } from "@playwright/test";
import { Logger } from '../utils/logger';

export class LoginPage {
    readonly page: Page;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly loggedUserName: Locator;
    readonly loginCredentialsErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginEmailInput = page.locator(`//input[@data-qa="login-email"]`);
        this.loginPasswordInput = page.locator(`//input[@data-qa="login-password"]`);
        this.loginButton = page.locator(`//button[@data-qa="login-button"]`);
        this.loggedUserName = page.locator("//a[contains(text(),' Logged in as ')]");
        this.loginCredentialsErrorMessage = page.locator("//p[contains(text(),'Your email or password is incorrect!')]");
    }

    async fillLoginCredentials(loginEmail: string, loginPassword: string) {
        await this.loginEmailInput.fill(loginEmail);
        await this.loginPasswordInput.fill(loginPassword);
        await this.loginButton.click();
        const hasLoginError = await this.loginCredentialsErrorMessage.isVisible();
        return !hasLoginError;
    }

    async verifyLoggedUserName() {
        await expect(this.loggedUserName).toBeVisible();
    }
}