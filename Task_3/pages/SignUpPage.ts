import { expect, Locator, Page } from "@playwright/test";
import { Logger } from '../utils/logger';
import { constants } from '../utils/Constants';

export class SignUpPage {
    readonly page: Page;
    readonly signUpNameInput: Locator;
    readonly signUpEmailInput: Locator;
    readonly signUpButton: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpNameInput = page.locator(`//input[@data-qa="signup-name"]`);
        this.signUpEmailInput = page.locator(`//input[@data-qa="signup-email"]`);
        this.signUpButton = page.locator(`//button[@data-qa="signup-button"]`);
        this.createAccountButton = page.locator(`//button[@data-qa="create-account"]`);
    }

    async fillSignUpCredentials(signUpName: string, signUpEmail: string) {
        if (!signUpName && !signUpEmail) {
            await this.validateRequiredField(this.signUpNameInput, constants.fieldValidationMessage);
            await this.validateRequiredField(this.signUpEmailInput, constants.fieldValidationMessage);
            Logger.info("Verified Signup rejects with Empty Name and Empty Email");
        } else if (!signUpName) {
            await this.validateRequiredField(this.signUpNameInput, constants.fieldValidationMessage);
            Logger.info("Verified Signup rejects with Empty Name and Valid Email");
        } else if (!signUpEmail) {
            await this.validateRequiredField(this.signUpEmailInput, constants.fieldValidationMessage);
            Logger.info("Verified Signup rejects with Valid Name and Empty Email");
        } else {
            await this.signUpNameInput.fill(signUpName);
            await this.signUpEmailInput.fill(signUpEmail);
            await this.signUpButton.click();
            Logger.info("Signup credentials submitted successfully");
        }
    }

    async validateRequiredField(locator: Locator, expectedMessage: string) {
        const message = await locator.evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(message).toBe(expectedMessage);
    }

    async verifiedCreateAccountPage() {
        await expect(this.createAccountButton).toBeVisible();
    }
}