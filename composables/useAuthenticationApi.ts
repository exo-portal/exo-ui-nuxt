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

/**
 * Logs out the current user by making a POST request to the authentication service's logout endpoint.
 *
 * @returns A Promise resolving to the response from the authentication service.
 */
export const logoutUser = () => {
  const { $axios } = useNuxtApp();
  return $axios.post(`${AUTH_SERVICE_ENDPOINT}/authentication/logout`);
};

/**
 * Verifies the current session by making a GET request to the authentication service's verify-session endpoint.
 * If running on the server, it forwards cookies from the request headers.
 *
 * @returns A Promise resolving to the response from the authentication service.
 */
export const verifySession = () => {
  const { $axios, ssrContext } = useNuxtApp();

  // If running on server, forward cookies
  if (process.server && ssrContext?.event?.req?.headers?.cookie) {
    return $axios.get(
      `${AUTH_SERVICE_ENDPOINT}/authentication/verify-session`,
      {
        headers: {
          cookie: ssrContext.event.req.headers.cookie,
        },
      }
    );
  }

  // On client, just call as usual
  return $axios.get(`${AUTH_SERVICE_ENDPOINT}/authentication/verify-session`);
};

/**
 * Switches the user's role by making a POST request to the authentication service's switch-role endpoint.
 *
 * @param {string} role - The role to switch to.
 * @returns A Promise resolving to the response from the authentication service.
 */
export const switchRole = (role: string) => {
  const { $axios } = useNuxtApp();
  return $axios.post(`${AUTH_SERVICE_ENDPOINT}/authentication/switch-role`, {
    role: role,
  });
};

/**
 * Verifies if the provided email exists for the forgot password process by making a GET request
 * to the authentication service's verify-email endpoint.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.email - The email address to verify.
 * @returns A Promise resolving to the response from the authentication service.
 */
export const verifyEmailForForgotPassword = ({ email }: { email: string }) => {
  const { $axios } = useNuxtApp();
  return $axios.get(`${AUTH_SERVICE_ENDPOINT}/forgot-password/verify-email`, {
    params: { email },
  });
};

/**
 * Sends an OTP to the user's email for the forgot password process by making a POST request
 * to the authentication service's send-otp endpoint.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.email - The email address to send the OTP to.
 * @returns A Promise resolving to the response from the authentication service.
 */
export const verifyOtpForForgotPassword = ({
  email,
  otpCode,
}: {
  email: string;
  otpCode: string;
}) => {
  const { $axios } = useNuxtApp();
  return $axios.get(`${AUTH_SERVICE_ENDPOINT}/forgot-password/verify-otp`, {
    params: { email, otpCode },
  });
};

/**
 * Sends a request to resend the OTP (One-Time Password) for the forgot password process.
 *
 * @param email - The email address of the user requesting the OTP resend.
 * @returns A Promise resolving to the Axios response of the resend OTP request.
 */
export const resendOtpForForgotPassword = ({ email }: { email: string }) => {
  const { $axios } = useNuxtApp();
  return $axios.get(`${AUTH_SERVICE_ENDPOINT}/forgot-password/resend-otp`, {
    params: { email },
  });
};

/**
 * Updates the user's password for the forgot password process by making a POST request
 * to the authentication service's update-password endpoint.
 *
 * @param params - An object containing the user's email and new password.
 * @param params.email - The user's email address.
 * @param params.newPassword - The new password to set.
 * @returns A Promise resolving to the response from the authentication service.
 */
export const updatePasswordForForgotPassword = ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) => {
  const { $axios } = useNuxtApp();
  return $axios.put(`${AUTH_SERVICE_ENDPOINT}/forgot-password/reset-password`, {
    email,
    newPassword,
  });
};
