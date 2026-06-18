import { Page, Locator } from "@playwright/test"
import { constants } from '../utils/testData';

export class HomePage {
    readonly page: Page;
    readonly loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator(`//a[@href='/login']`);
    }

    async gotoURL() {
        await this.page.goto(constants.homePageURL);
    }

    async clickLoginPage() {
        await this.loginLink.click();
    }
    
}