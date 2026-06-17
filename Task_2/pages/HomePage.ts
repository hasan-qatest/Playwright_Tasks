import {Page, Locator } from '@playwright/test';
import { constances } from '../utils/testData';

export class HomePage{
    readonly page: Page;
    readonly loginLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator(`//a[@href='/login']`);
    }

    async gotoURL() {
        await this.page.goto(constances.homePageURL);
    }
    async clickLoginLink () {
        await this.loginLink.click();
    }
}