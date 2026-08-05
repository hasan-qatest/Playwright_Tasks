export const Constants = {
  DEFAULT_TIMEOUT: 120000,
  deleteRecordToastMessage: "No Records Found",
  createUpdateToastMessage: "Successfully",
  recordCreationValidationErrorMessage: "Validation error message is displayed",
  defaultDropdownValue: "-- Select --",
  driverLicenseNumber: "ABCD1234",
  nationalityDropdownValue: "Indian",
  maritalStatusDropdownValue: "Married",
  entitlementCount: "10",
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

export const UserDetails = {
  userRole: "ESS",
  status: "Enabled",
} as const;

export const EmployeeLeaveListRowOrder = {
  date: 1,
  employeeName: 2,
  leaveType: 3,
  leaveBalance: 4,
  numberOfDays: 5,
  comments: 7,
  actions: 8,
};

export const LeaveListRowOrder = {
  comment: "Casual Leave",
  partialDays: `Full Days`,
  duration: `Specify Time`,
  leaveActionCancel: `Cancel`,
  leaveActionApprove: `Approve`,
  leaveActionAfterApprove: "",
};
