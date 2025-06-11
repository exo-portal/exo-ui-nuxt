import { AUTH_SERVICE_ENDPOINT } from "~/config";

/**
 * Validates whether the provided email exists or is valid by making a GET request
 * to the authentication service's validate-email endpoint.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.email - The email address to validate.
 * @returns A Promise resolving to the response from the authentication service.
 */
export const validateEmail = ({ email }: { email: string }) => {
  const { $axios } = useNuxtApp();
  return $axios.get(`${AUTH_SERVICE_ENDPOINT}/authentication/validate-email`, {
    params: { email },
  });
};

/**
 * Registers a new user by sending their registration data to the authentication service.
 *
 * @param data - The registration data for the new user.
 * @returns A Promise resolving to the response from the authentication service.
 */
export const registerUser = (data: RegistrationData) => {
  const { $axios } = useNuxtApp();
  return $axios.post(`${AUTH_SERVICE_ENDPOINT}/authentication/register`, data);
};

/**
 * Sends a login request to the authentication service with the provided email and password.
 *
 * @param params - An object containing the user's email and password.
 * @param params.email - The user's email address.
 * @param params.password - The user's password.
 * @returns A Promise resolving to the response from the authentication service.
 */
export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { $axios } = useNuxtApp();
  return $axios.post(`${AUTH_SERVICE_ENDPOINT}/authentication/login`, {
    email,
    password,
  });
};
