import { faker } from "@faker-js/faker";

export const employeeDetails = {
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  employeeId: "",
} as const;

export const userData = {
  employeeName: `${employeeDetails.firstName} ${employeeDetails.lastName} Test`,
  updateLastName: `${employeeDetails.lastName} Test`,
  username: `${employeeDetails.firstName} ${employeeDetails.middleName} ${employeeDetails.lastName} Test`,
  //password: `${employeeDetails.firstName}${employeeDetails.employeeId}`,
   get password() {
    return `${employeeDetails.firstName}${employeeDetails.employeeId}`;
  },
} as const;
