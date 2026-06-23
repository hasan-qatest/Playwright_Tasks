import { expect, Locator, Page } from "@playwright/test";
import { constants } from "../utils/Constants";


export class HomePage {
    readonly page: Page;
    readonly signUp: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUp = page.locator(`//a[@href='/login']`);
        this.signUpButton = page.locator(`//button[@data-qa="signup-button"]`);
    }

    async gotoURL() {
        await this.page.goto(constants.homePageURL);
    }

    async validateLandingWebsite() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }

    async clickSignUpLink() {
        await this.signUp.click();
        await expect(this.signUpButton).toBeVisible();
    }
}