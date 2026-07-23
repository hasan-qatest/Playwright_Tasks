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
    await this.navigate(env.baseUrl);
    Logger.success("Navigated to Orange_HRM Login Screen");
  }
  async verifyLoginPageVisible() {
    await this.waitForVisible(this.loginButton);
    if (
      !(await this.isVisible(this.loginButton)) ||
      !(await this.isVisible(this.loginUsernameInput))
    ) {
      throw new Error("Orange_HRM Login Page is not visible");
    }
    await expect(this.loginButton).toBeVisible;
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
    await this.fill(this.loginUsernameInput, env.user);
    await this.fill(this.loginPasswordInput, this.runTimePassword!);
    await this.click(this.loginButton);
    if (await this.isVisible(this.invalidCredentialsMessage)) {
      throw new Error("Invalid credentials. Stopping test execution");
    }
    Logger.success("User logged into Orange_HRM successfully");
  }
}
