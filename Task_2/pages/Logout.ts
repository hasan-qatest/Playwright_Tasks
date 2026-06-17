
import { Page, Locator} from '@playwright/test';

export class Logout {
    readonly page: Page;
    readonly logout: Locator;

    constructor (page: Page) {
        this.page = page;
        this.logout = page.locator(`//a[@href='/logout']`);
    }

    async logoutClick() {
         await this.logout.click();
    }
}