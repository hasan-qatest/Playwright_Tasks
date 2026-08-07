export const constants = {
  DEFAULT_TIMEOUT: 120000,
  deleteRecordToastMessage: "No Records Found",
  createUpdateToastMessage: "Successfully",
  recordCreationValidationErrorMessage: "Validation error message is displayed",
  defaultDropdownValue: "-- Select --",
  driverLicenseNumber: "ABCD1234",
  nationalityDropdownValue: "Indian",
  maritalStatusDropdownValue: "Married",
  entitlementCount: "10",
} as const;

export const employeeSearchResultColumns = {
  EMPLOYEE_ID: 1,
  NAME: 2,
  LAST_NAME: 3,
} as const;

export const userSearchResultColumns = {
  USERNAME: 1,
  USER_ROLE: 2,
  EMPLOYEE_NAME: 3,
  STATUS: 4,
} as const;

export const userDetails = {
  userRole: "ESS",
  status: "Enabled",
} as const;

export const employeeLeaveListRowOrder = {
  date: 1,
  employeeName: 2,
  leaveType: 3,
  leaveBalance: 4,
  numberOfDays: 5,
  comments: 7,
  actions: 8,
} as const;

export const leaveListRowOrder = {
  comment: "Casual Leave",
  partialDays: "Full Days",
  duration: "Specify Time",
  leaveActionCancel: "Cancel",
  leaveActionApprove: "Approve",
  leaveActionAfterApprove: "",
} as const;