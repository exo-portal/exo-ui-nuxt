export const validateEmail = ({ email }: { email: string }) => {
  const { $axios } = useNuxtApp();
  return $axios.get("/api/auth/authentication/validate-email", {
    params: { email },
  });
};
