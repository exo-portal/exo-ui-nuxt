import { type ClassValue, clsx } from "clsx";
import parsePhoneNumberFromString, { AsYouType } from "libphonenumber-js";
import { twMerge } from "tailwind-merge";
import type { TxKeyPath } from "~/i18n/i18n";
import type { ExoPortalErrorMessage } from "~/types/types";
import { translate } from "./translate";
import { PATH } from "~/config";

/**
 * Merges multiple class name values into a single string, removing duplicates and handling conditional classes.
 *
 * Utilizes `clsx` to conditionally join class names and `twMerge` to intelligently merge Tailwind CSS classes.
 *
 * @param inputs - An array of class values (strings, arrays, objects, etc.) to be merged.
 * @returns A single string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds a formatted meta title string for the Exo Portal.
 *
 * @param title - The specific page or section title to include.
 * @returns The complete meta title in the format "Exo Portal - {title}".
 */
export const metaTItleBuilder = (title: string): string => {
  return `Exo Portal - ${title}`;
};

/**
 * Formats a phone number input in real-time according to the specified country.
 *
 * - For supported countries ("PH" for Philippines, "US" for United States), the function ensures the input starts with the country code,
 *   then formats the number using the `AsYouType` formatter from the `libphonenumber-js` library.
 * - For unsupported countries, the original input is returned unmodified.
 *
 * @param params - An object containing the following properties:
 * @param params.input - The phone number input string to be formatted.
 * @param params.country - The ISO country code (e.g., "PH", "US").
 * @param params.countryCode - The country dialing code (e.g., "+63", "+1").
 * @returns The formatted phone number string, or the original input if the country is not supported or input is empty/undefined.
 */
export const liveFormat = ({
  input,
  country,
  countryCode,
}: {
  input: string;
  country: string;
  countryCode: string;
}): string => {
  if (country === "PH" || country === "US") {
    if (input.replace(countryCode, "").trim() === "") {
      return "";
    }

    const cleaned = input.startsWith(countryCode)
      ? input
      : `${countryCode}${input}`;
    return new AsYouType(country).input(cleaned);
  }

  return input; // Return the original input if country is not supported
};

/**
 * Formats a phone number string into international format for supported countries.
 *
 * Currently supports formatting for the Philippines ("PH") and United States ("US").
 * If the country is not supported, returns the original value.
 *
 * @param params - An object containing the phone number value and country code.
 * @param params.value - The phone number string to format.
 * @param params.country - The ISO country code (e.g., "PH", "US").
 * @returns The formatted phone number in international format, or the original value if the country is not supported or parsing fails.
 */
export const formatPhoneNumber = ({
  value,
  country,
}: {
  value: string;
  country: string;
}): string => {
  if (country === "PH" || country === "US") {
    const phoneNumber = parsePhoneNumberFromString(value, country);
    return phoneNumber ? phoneNumber.formatInternational() : value;
  }

  return value; // Return the original value if country is not supported
};

export const handleFieldErrors = ({
  errorResponse,
  allowedFields,
  setErrors,
  t,
}: {
  errorResponse: ExoPortalErrorMessage;
  allowedFields: string[];
  setErrors: (errors: Record<string, string>) => void;
  t: any;
}) => {
  if (
    typeof errorResponse.errorType === "string" &&
    errorResponse.errorType === "field"
  ) {
    errorResponse.errorMessageList.forEach(
      (err: { fieldName: string; errorMessage: TxKeyPath }) => {
        if (allowedFields.includes(err.fieldName)) {
          setErrors({ [err.fieldName]: translate(t, err.errorMessage) });
        }
      }
    );
  }
};

/**
 * Redirects the user to the appropriate dashboard based on their role.
 *
 * @param userRole - The role of the user (e.g., "ROLE_ADMIN", "ROLE_CLIENT").
 * @param router - The router instance used for navigation.
 * @param PATH - An object containing route paths for different dashboards.
 */
export function redirectByUserRole(
  userRole: string,
  router: {
    push: (options: { path: string; query?: Record<string, any> }) => void;
  },
  userId?: string | number
) {
  console.log("Redirecting user based on role:", userRole);
  let path = PATH.PROJECT_TEAM_HOME.path;
  switch (userRole) {
    case "ROLE_ADMIN":
    case "ROLE_SUPER_ADMIN":
      path = PATH.ADMIN_HOME.path;
      break;
    case "ROLE_FINANCE":
    case "ROLE_HR":
      path = PATH.HR_HOME.path;
      break;
    case "ROLE_CLIENT":
      path = PATH.CLIENT_HOME.path;
      break;
    case "ROLE_MANAGER":
    case "ROLE_PROJECT_LEAD":
    case "ROLE_TEAM_LEAD":
    case "ROLE_TECH_LEAD":
    case "ROLE_SENIOR_EMPLOYEE":
    case "ROLE_MID_LEVEL_EMPLOYEE":
    case "ROLE_JUNIOR_EMPLOYEE":
    case "ROLE_ENTRY_LEVEL_EMPLOYEE":
    case "ROLE_INTERN":
      path = PATH.PROJECT_TEAM_HOME.path;
      break;
    case "ROLE_GUEST":
    case "ROLE_APPLICANT":
      path = PATH.APPLICANT_HOME.path;
      break;
    default:
      path = PATH.PROJECT_TEAM_HOME.path;
      break;
  }
  router.push({ path });
}
