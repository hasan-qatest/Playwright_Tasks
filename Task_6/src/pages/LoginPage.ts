import { Locator, Page } from "@playwright/test";
import { env } from "../utils/env";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/logger";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly loginUserNameInput: Locator;
  readonly loginUserPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly password: string | undefined;
  readonly invalidCredentialsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.password = process.env.PASSWORD;
    this.loginUserNameInput = page.getByRole("textbox", { name: "username" });
    this.loginUserPasswordInput = page.getByRole("textbox", {
      name: "password",
    });
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
  async isLoginPageVisible() {
    await super.waitForVisible(this.loginButton);
    if (
      !(await super.isVisible(this.loginButton)) ||
      !(await super.isVisible(this.loginUserNameInput))
    ) {
      throw new Error("Orange_HRM Login Page is not visible");
    }
    Logger.success("Orange_HRM Login Screen is Visible");
  }

  async checkPasswordIsValid() {
    if (!this.password) {
      throw new Error(
        "Password is required. Run the test with PASSWORD=<your_password>.",
      );
    }
    Logger.success("Password Set Successfully");
  }
  async login() {
    await super.fill(this.loginUserNameInput, env.user);
    await super.fill(this.loginUserPasswordInput, this.password!);
    await super.click(this.loginButton);
    if (await super.isVisible(this.invalidCredentialsMessage)) {
      throw new Error("Invalid credentials. Stopping test execution.");
    }
    Logger.success("User logged in successfully");
  }
}
