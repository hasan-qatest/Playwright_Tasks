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
} as const;

export function getTodayDate(): string {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(today.getDate()).padStart(2, "0")}`;
}

export function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return `${tomorrow.getFullYear()}-${String(
    tomorrow.getMonth() + 1,
  ).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
}