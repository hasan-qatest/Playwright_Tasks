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
    await test.step("Redirected to the Swag_Labs Login Page", async () => {
      await this.page.goto(constants.homePageURL);
      Logger.success("Redirected to the Swag_Labs Login Page");
    });
  }

  async validateLandingWebsite() {
    await test.step("Verify the Swag_Labs Login Page redirected the page successfully", async () => {
      await expect(this.loginButton).toBeVisible();
      Logger.success(
        "Verified the Swag labs Login Page redirected successfully",
      );
    });
  }

  async loginAsAStandardUser(username: string, password: string) {
    await test.step("Fill Standard User Credentials in the Textbox", async () => {
      await this.username.fill(username);
      await this.password.fill(password);
      Logger.success("Filled Standard User Credentials in the Textbox");
    });
  }

  async clickLoginButton() {
    await test.step("Click Login Button", async () => {
      await this.loginButton.click();
      Logger.success("Login Button Clicked Successfully");
    });
  }
}
