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
    await super.validatePageTitle("OrangeHRM");
    Logger.success("Verified Orange_HRM Login Screen is Visible");
  }
  async checkPasswordIsValid() {
    if (!this.password) {
      throw new Error(
        "Password is required. Run the test with PASSWORD=<your_password>.",
      );
    }
  }
  async login() {
    await super.fill(this.loginUserNameInput, env.user);
    await super.fill(this.loginUserPasswordInput, this.password!);
    await super.click(this.loginButton);
    Logger.success("Entered User Credentials and clicked Login Button ");
  }
  async verifyUserLogin() {
    if (await super.isVisible(this.invalidCredentialsMessage)) {
      throw new Error("Invalid credentials. Stopping test execution.");
    }
    Logger.success("User Logged in Successfully");
  }
}
