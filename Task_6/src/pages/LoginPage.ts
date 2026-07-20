import { expect, Locator, Page } from "@playwright/test";
import { env } from "../utils/env";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly loginUsernameInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly runTimePassword: string | undefined;
  readonly invalidCredentialsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.runTimePassword = process.env.PASSWORD;
    this.loginUsernameInput = page.getByRole("textbox", { name: "username" });
    this.loginPasswordInput = page.getByRole("textbox", { name: "password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.invalidCredentialsMessage = page.getByText("Invalid credentials");
  }

  async navigateToLoginScreen() {
    if (!env.baseUrl) {
      throw new Error("Base URL is not declared");
    }
    await super.navigate(env.baseUrl);
    Logger.success("Navigated to Orange_HRM Login Screen");
  }
  async verifyLoginPageVisible() {
    await expect(this.loginButton).toBeVisible;
    await super.waitForVisible(this.loginButton);
    if (
      !(await super.isVisible(this.loginButton)) ||
      !(await super.isVisible(this.loginUsernameInput))
    ) {
      throw new Error("Orange_HRM Login Page is not visible");
    }
    Logger.success("Orange_HRM Login Screen is Visible");
  }

  async validateRuntimePassword() {
    if (!this.runTimePassword) {
      throw new Error(
        "Password is required. Run the test with PASSWORD=<your_password>",
      );
    }
    Logger.success("Password Set Successfully");
  }
  async login() {
    await super.fill(this.loginUsernameInput, env.user);
    await super.fill(this.loginPasswordInput, this.runTimePassword!);
    await super.click(this.loginButton);
    if (await super.isVisible(this.invalidCredentialsMessage)) {
      throw new Error("Invalid credentials. Stopping test execution");
    }
    Logger.success("User logged in successfully");
  }
}
