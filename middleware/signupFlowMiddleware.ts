import { PATH } from "~/config";

type RegistrationFlowStep = "register" | "personal" | "contact";

type RegistrationFlow = {
  step?: RegistrationFlowStep;
};

const steps: RegistrationFlowStep[] = ["register", "personal", "contact"];
const stepToPath = {
  register: PATH.SIGNUP.path,
  personal: PATH.SIGNUP_PERSONAL_DETAILS.path,
  contact: PATH.SIGNUP_CONTACT_DETAILS.path,
};

export default defineNuxtRouteMiddleware((to, from) => {
  const flowCookie = useCookie<RegistrationFlow>("registrationFlow", {
    default: () => ({ step: "register" }),
  });

  const currentStep = flowCookie.value.step || "register";
  const currentStepIndex = steps.indexOf(currentStep);

  // Allow access to current and previous steps only
  const allowedPaths = steps.slice(0, currentStepIndex + 1).map(step => stepToPath[step]);

  if (!allowedPaths.includes(to.path)) {
    // Redirect to the latest allowed step
    return navigateTo(stepToPath[currentStep]);
  }
});