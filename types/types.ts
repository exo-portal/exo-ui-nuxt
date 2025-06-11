import type { TxKeyPath } from "~/i18n/i18n";

export interface ApiResponse<T = any> {
  data: ApiResultModel<T>;
  status: number;
  statusText: string;
}

export interface ApiResultModel<T = any> {
  isSuccess: boolean;
  resultData: T;
  errorMessage: string;
  message: string;
}

export type InstructionConfig = {
  title: TxKeyPath;
  subTitle: TxKeyPath;
  topBadgeTitleKey: TxKeyPath;
  bottomBadgeTitleKey?: TxKeyPath;
  topBadgeData?: {
    count: number;
    keyPrefix: string;
  };
  bottomBadgeData?: {
    count: number;
    keyPrefix: string;
  };
};

export type ExoPortalErrorMessage = {
  errorMessageList: {
    errorMessage: TxKeyPath;
    fieldName: string;
  }[];
  errorType: string;
  status: number;
};

export type PhoneOption = {
  value: string;
  label?: string;
  icon?: string;
  phonePlaceholder?: string;
  countryCode?: string;
};

export type AccessLevelRole = 
  // Admin Roles
  "ROLE_SUPER_ADMIN" |
  "ROLE_ADMIN" |
  // HR Roles
  "ROLE_FINANCE" |
  "ROLE_HR" |
  // Client Roles
  "ROLE_CLIENT" |
  // Employee Roles
  "ROLE_MANAGER" |
  "ROLE_PROJECT_LEAD" |
  "ROLE_TEAM_LEAD" |
  "ROLE_TECH_LEAD" |
  "ROLE_SENIOR_EMPLOYEE" |
  "ROLE_MID_LEVEL_EMPLOYEE" |
  "ROLE_JUNIOR_EMPLOYEE" |
  "ROLE_ENTRY_LEVEL_EMPLOYEE" |
  "ROLE_INTERN" |
  // External roles
  "ROLE_GUEST" |
  "ROLE_APPLICANT";