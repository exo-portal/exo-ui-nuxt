import { PATH } from "~/config";

type ForgotFlowStep = "forgot" | "otp" | "reset";

type ForgotFlow = {
  step?: ForgotFlowStep;
};

const steps: ForgotFlowStep[] = ["forgot", "otp", "reset"];
const stepToPath = {
  forgot: PATH.FORGOT_PASSWORD.path,
  otp: PATH.FORGOT_PASSWORD_OTP.path,
  reset: PATH.FORGOT_PASSWORD_RESET.path,
};

export default defineNuxtRouteMiddleware((to, from) => {
  const flowCookie = useCookie<ForgotFlow>("forgotFlow", {
    default: () => ({ step: "forgot" }),
  });

  const currentStep = flowCookie.value.step || "forgot";
  const currentStepIndex = steps.indexOf(currentStep);

  // Allow access to current and previous steps only
  const allowedPaths = steps.slice(0, currentStepIndex + 1).map(step => stepToPath[step]);

  if (!allowedPaths.includes(to.path)) {
    // Redirect to the latest allowed step
    return navigateTo(stepToPath[currentStep]);
  }
});