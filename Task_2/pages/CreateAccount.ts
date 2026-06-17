import { Page, Locator, expect } from '@playwright/test';
import { constances } from '../utils/testData';

export class CreateAcccount {
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
    async fillAccountInformation() {
        if (constances.gender === "mr")
            await this.page.locator('[id="uniform-id_gender1"]').click();
        else if (constances.gender == "mrs")
            await this.page.locator('[id="uniform-id_gender2"]').click();
        else console.log("Give Proper Gender")

        await this.password.fill(constances.password);

        await this.dateOfBirthDate.selectOption(constances.dateOfBirthDate);

        await this.dateOfBirthMonth.selectOption(constances.dateOfBirthMonth);
    
        await this.dateOfBirthYear.selectOption(constances.dateOfBirthYear);

        await this.firstName.fill(constances.firstName);

        await this.lastName.fill(constances.lastName);

        await this.company.fill(constances.company);

        await this.address.fill(constances.address);

        await this.address2.fill(constances.address2);

        await this.country.selectOption(constances.country);

        await this.state.fill(constances.State);

        await this.city.fill(constances.City);

        await this.zipCode.fill(constances.ZipCode);

        await this.mobileNumber.fill(constances.mobileNumber);

        await this.createAccountButton.click();

        //await this.page.pause(); // Browser stays open here
    }

    async verifyAccountCreated() {
        await expect(this.page).toHaveTitle("Automation Exercise - Account Created");
        console.log("Account Created Successfully");
        await this.continue.click();   
    }

}