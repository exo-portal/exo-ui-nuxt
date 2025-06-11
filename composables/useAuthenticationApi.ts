import { AUTH_SERVICE_ENDPOINT } from "~/config";

export const validateEmail = ({ email }: { email: string }) => {
  const { $axios } = useNuxtApp();
  return $axios.get(`${AUTH_SERVICE_ENDPOINT}/authentication/validate-email`, {
    params: { email },
  });
};

export const registerUser = (data: RegistrationData) => {
  const { $axios } = useNuxtApp();
  return $axios.post(`${AUTH_SERVICE_ENDPOINT}/authentication/register`, data);
};
