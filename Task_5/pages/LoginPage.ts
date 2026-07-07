import { Locator, Page, expect } from "@playwright/test";
import { constants } from "../utils/constants";
import { Logger } from "../utils/logger";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly productsHeader: Locator;
  readonly loginButton: Locator;
  readonly username: Locator;
  readonly password: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.productsHeader = page.getByText("Products");
    this.username = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
  }

  async gotoURL() {
    await super.navigate(constants.homePageURL);
    Logger.success("Successfully navigated to the Swag Labs Login Page");
  }

  async validateLandingWebsite() {
    expect(await super.isVisible(this.loginButton)).toBe(true);
    Logger.success(
      "Successfully verified that the Swag Labs Login page is displayed",
    );
  }

  async login(username: string, password: string) {
    await super.fill(this.username, username);
    await super.fill(this.password, password);
    await super.click(this.loginButton);
    Logger.success(
      "Successfully entered Standard User credentials in the login fields",
    );
  }

  async isProductsSectionVisibleOnHomePage() {
    expect(await super.isVisible(this.productsHeader)).toBe(true);
    Logger.success(
      "Successfully verified that the Products section is displayed on the Home Page",
    );
  }
}
