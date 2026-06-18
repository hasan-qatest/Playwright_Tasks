import { Page, Locator, expect } from '@playwright/test';
import { constants } from '../utils/testData';
import { Logger } from '../utils/logger';

export class CreateAccount {
    readonly page: Page;
    readonly password: Locator;
    readonly dateOfBirthDate: Locator;
    readonly dateOfBirthMonth: Locator;
    readonly dateOfBirthYear: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address: Locator;
    readonly address2: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly mobileNumber: Locator;
    readonly createAccountButton: Locator;
    readonly continue: Locator

    constructor(page: Page) {
        this.page = page;
        
        //AccountInformation
        this.password = page.locator(`//input[@data-qa="password"]`);
        this.dateOfBirthDate = page.locator('#days');
        this.dateOfBirthMonth = page.locator('#months');
        this.dateOfBirthYear = page.locator('#years');
        this.firstName = page.locator(`//input[@data-qa="first_name"]`);
        this.lastName = page.locator(`//input[@data-qa="last_name"]`);
        this.company = page.locator(`//input[@data-qa="company"]`);
        this.address = page.locator('//input[@data-qa="address"]');
        this.address2 = page.locator('//input[@data-qa="address2"]');
        this.country = page.locator('#country');
        this.state = page.locator('//input[@data-qa="state"]');
        this.city = page.locator('//input[@data-qa="city"]');
        this.zipCode = page.locator('//input[@data-qa="zipcode"]');
        this.mobileNumber = page.locator('//input[@data-qa="mobile_number"]');
        this.createAccountButton = page.locator('//button[@data-qa="create-account"]')
        this.continue = page.locator('//a[@data-qa="continue-button"]')
    }

    async verifySignUpPage() {
        await expect(this.page.getByText('Enter Account Information', { exact: true })).toBeVisible();
        Logger.info('Redirected into the Sign Up Page');
    }

    async fillAccountInformation() {
        if (constants.gender === "mr")
            await this.page.locator('[id="uniform-id_gender1"]').click();
        else if (constants.gender == "mrs")
            await this.page.locator('[id="uniform-id_gender2"]').click();
        else Logger.error("Give Proper Gender")

        await this.password.fill(constants.password);

        await this.dateOfBirthDate.selectOption(constants.dateOfBirthDate);

        await this.dateOfBirthMonth.selectOption(constants.dateOfBirthMonth);
    
        await this.dateOfBirthYear.selectOption(constants.dateOfBirthYear);

        await this.firstName.fill(constants.firstName);

        await this.lastName.fill(constants.lastName);

        await this.company.fill(constants.company);

        await this.address.fill(constants.address);

        await this.address2.fill(constants.address2);

        await this.country.selectOption(constants.country);

        await this.state.fill(constants.State);

        await this.city.fill(constants.City);

        await this.zipCode.fill(constants.ZipCode);

        await this.mobileNumber.fill(constants.mobileNumber);

        await this.createAccountButton.click();
    }

    async verifyAccountCreated() {
        await expect(this.page.getByText('Account Created!', { exact: true })).toBeVisible();
        Logger.info('Account Created Successfully')
        await this.continue.click();   
    }

}