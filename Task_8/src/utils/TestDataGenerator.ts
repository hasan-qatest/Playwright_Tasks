import { faker } from "@faker-js/faker";

export const employeeDetails = {
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  employeeId: "",
} as const;

export const leaveType = {
  leaveTypeName: `Casual Leave-${faker.string.alphanumeric(6).toUpperCase()}`,
} as const;

export const userData = {
  updateLastName: `${employeeDetails.lastName} Test`,
  employeeName: `${employeeDetails.firstName} ${employeeDetails.middleName} ${employeeDetails.lastName}`,
  employeeNameInUserSearchResult: `${employeeDetails.firstName} ${employeeDetails.lastName}`,
  loggerUserName: `${employeeDetails.firstName} ${employeeDetails.lastName}`,
  username: `${employeeDetails.firstName} ${employeeDetails.middleName} ${employeeDetails.lastName}`,
  get userPassword() {
    return `${employeeDetails.firstName}${employeeDetails.employeeId}`;
  },
};

export function getTodayDate(): string {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(today.getDate()).padStart(2, "0")}`;
}

export function getTomorrowDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  // Skip Saturday (6) and Sunday (0)
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
}
