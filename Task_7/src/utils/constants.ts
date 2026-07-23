import { faker } from "@faker-js/faker";

export const default_config = {
  DEFAULT_TIMEOUT: 120000,
};
export const employeeDetails = {
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  employeeId: faker.number.int({ min: 100000, max: 999999 }).toString(),
} as const;

export const constants = {
  deleteEmployeeToastMessage: "No Records Found",
  createUpdateToastMessage: "Successfully",
  updateLastName: `${employeeDetails.lastName} Test`,
  username: `${employeeDetails.firstName} ${employeeDetails.middleName} ${employeeDetails.lastName} Test`,
  password: `${employeeDetails.firstName}${employeeDetails.employeeId}`,
  userCreationValidationErrorMessage: "Validation error message is displayed",
  defaultDropdownValue: "-- Select --",
};
export const EmployeeSearchResultColumns = {
  EMPLOYEE_ID: 1,
  NAME: 2,
  LAST_NAME: 3,
} as const;

export const userDetails = {
  userRole: "ESS",
  status: "Enabled",
} as const;
