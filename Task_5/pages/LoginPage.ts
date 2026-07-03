import { Locator, Page, expect } from "@playwright/test";
import { test } from "../fixture/TestFixture";
import { constants } from "../utils/constants";
import { Logger } from "../utils/logger";

export class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly username: Locator;
  readonly password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.username = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
  }

  async gotoURL() {
    await test.step("Navigate to the Swag Labs Login Page", async () => {
      await this.page.goto(constants.homePageURL);
      Logger.success("Successfully navigated to the Swag Labs Login Page");
    });
  }

  async validateLandingWebsite() {
    await test.step("Verify that the user is redirected to the Swag Labs Login page", async () => {
      await expect(this.loginButton).toBeVisible();
      Logger.success(
        "Successfully verified that the Swag Labs Login page is displayed",
      );
    });
  }

  async loginAsAStandardUser(username: string, password: string) {
    await test.step("Enter Standard User credentials in the login fields", async () => {
      await this.username.fill(username);
      await this.password.fill(password);
      Logger.success("Successfully entered Standard User credentials in the login fields");
    });
  }

  async clickLoginButton() {
    await test.step("Click the Login Button", async () => {
      await this.loginButton.click();
      Logger.success("Successfully logged into the application");
    });
  }
}
