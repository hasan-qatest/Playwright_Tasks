import { expect, Locator, Page } from "@playwright/test";
import { constants } from "../utils/Constants";


export class HomePage {
    readonly page: Page;
    readonly signUpPageLink: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpPageLink = page.locator(`//a[@href='/login']`);
        this.signUpButton = page.locator(`//button[@data-qa="signup-button"]`);
    }

    async gotoURL() {
        await this.page.goto(constants.homePageURL);
    }

    async validateLandingWebsite() {
        await expect(this.page).toHaveTitle('Automation Exercise');
    }

    async clickSignUpPage() {
        await this.signUpPageLink.click();
        await expect(this.signUpButton).toBeVisible();
    }
}