import { Locator, Page, expect } from "@playwright/test";
import { constants } from "../utils/constants";
import { Logger } from "../utils/logger";

export class LoginPage {
  readonly page: Page;
  readonly productsHeader: Locator;
  readonly loginButton: Locator;
  readonly username: Locator;
  readonly password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.productsHeader = page.getByText("Products");
    this.username = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
  }

  async gotoURL() {
    await this.page.goto(constants.homePageURL);
    Logger.success("Successfully navigated to the Swag Labs Login Page");
  }

  async validateLandingWebsite() {
    await expect(this.loginButton).toBeVisible();
    Logger.success(
      "Successfully verified that the Swag Labs Login page is displayed",
    );
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    Logger.success(
      "Successfully entered Standard User credentials in the login fields",
    );
  }

  async isProductsSectionVisibleOnHomePage() {
    await expect(this.productsHeader).toBeVisible();
    Logger.success(
      "Successfully verified that the Products section is displayed on the Home Page",
    );
  }
}
