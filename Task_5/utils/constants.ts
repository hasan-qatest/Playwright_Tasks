export const constants = {
  homePageURL: "https://www.saucedemo.com/",
  standardUserName: "standard_user",
  password: "secret_sauce",
  productsByName: [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
  ],
  checkoutFirstNameValue: "Test First Name",
  checkoutLastNameValue: "Test Last Name",
  checkoutPostalCodeValue: "123456",
} as const;

export enum ProductSort {
  NAME_ASC = "Name (A to Z)",
  NAME_DESC = "Name (Z to A)",
  PRICE_LOW_HIGH = "Price (low to high)",
  PRICE_HIGH_LOW = "Price (high to low)",
}
