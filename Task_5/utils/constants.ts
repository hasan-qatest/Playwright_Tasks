export const constants = {
  homePageURL: "https://www.saucedemo.com/",
  standardUserName: "standard_user",
  password: "secret_sauce",
} as const;

export const products = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
];

export enum ProductSort {
  NAME_ASC = "Name (A to Z)",
  NAME_DESC = "Name (Z to A)",
  PRICE_LOW_HIGH = "Price (low to high)",
  PRICE_HIGH_LOW = "Price (high to low)",
}

export const customerData = {
  standardUser: {
    firstName: "Test First Name",
    lastName: "Test Last Name",
    postalCode: "600001",
  },
};
