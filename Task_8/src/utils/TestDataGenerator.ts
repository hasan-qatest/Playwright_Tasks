import { faker } from "@faker-js/faker";

export const EmployeeDetails = {
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  employeeId: "",
} as const;

export const LeaveType = {
  leaveTypeName: `Casual Leave-${faker.string.alphanumeric(6).toUpperCase()}`,
};

export const UserData = {
  updateLastName: `${EmployeeDetails.lastName} Test`,
  employeeName: `${EmployeeDetails.firstName} ${EmployeeDetails.middleName} ${EmployeeDetails.lastName}`,
  employeeNameInUserSearchResult: `${EmployeeDetails.firstName} ${EmployeeDetails.lastName}`,
  loggerUserName: `${EmployeeDetails.firstName} ${EmployeeDetails.lastName}`,
  username: `${EmployeeDetails.firstName} ${EmployeeDetails.middleName} ${EmployeeDetails.lastName}`,
  get userPassword() {
    return `${EmployeeDetails.firstName}${EmployeeDetails.employeeId}`;
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
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(tomorrow.getDate()).padStart(2, "0")}`;
}
