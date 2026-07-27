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
  deleteRecordToastMessage: "No Records Found",
  createUpdateToastMessage: "Successfully",
  employeeName: `${employeeDetails.firstName} ${employeeDetails.lastName} Test`,
  updateLastName: `${employeeDetails.lastName} Test`,
  username: `${employeeDetails.firstName} ${employeeDetails.middleName} ${employeeDetails.lastName} Test`,
  password: `${employeeDetails.firstName}${employeeDetails.employeeId}`,
  userCreationValidationErrorMessage: "Validation error message is displayed",
  defaultDropdownValue: "-- Select --",
  driverLicenseNumber: "ABCD1234",
  nationalityDropdownValue:"Indian",
  maritalStatusDropdownValue: "Married",
  bloodTypeDropdownValue:"AB+",
};
export const EmployeeSearchResultColumns = {
  EMPLOYEE_ID: 1,
  NAME: 2,
  LAST_NAME: 3,
} as const;

export const UserSearchResultColumns = {
  Username: 1,
  UserRole: 2,
  EmployeeName: 3,
  Status: 4,
} as const;

export const userDetails = {
  userRole: "ESS",
  status: "Enabled",
} as const;
