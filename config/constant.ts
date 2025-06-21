export const RESEND_OTP_TIME_MINUTES = 3;

export const ROLE_MAP: Record<string, UserMainRole> = {
  ROLE_SUPER_ADMIN: "admin",
  ROLE_ADMIN: "admin",
  ROLE_FINANCE: "hr",
  ROLE_HR: "hr",
  ROLE_MANAGER: "project-team",
  ROLE_PROJECT_LEAD: "project-team",
  ROLE_TEAM_LEAD: "project-team",
  ROLE_TECH_LEAD: "project-team",
  ROLE_SENIOR_EMPLOYEE: "project-team",
  ROLE_MID_LEVEL_EMPLOYEE: "project-team",
  ROLE_JUNIOR_EMPLOYEE: "project-team",
  ROLE_ENTRY_LEVEL_EMPLOYEE: "project-team",
  ROLE_INTERN: "project-team",
};
