import { Page, Locator, expect} from '@playwright/test';

export class Logout {
    readonly page: Page;
    readonly logout: Locator;

    constructor (page: Page) {
        this.page = page;
        this.logout = page.locator(`//a[@href='/logout']`);
    }

    async logoutClick() {
         await this.logout.click();
         await expect(this.page.locator(`//button[@data-qa="login-button"]`)).toBeVisible();

    }
}