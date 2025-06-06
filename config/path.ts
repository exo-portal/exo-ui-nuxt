export interface PathInterface {
  [key: string]: {
    name: string;
    path: string;
    getPath: (locale: string) => string;
    value: string;
    isProtected: boolean;
  };
}

export const PUBLIC_PATH: PathInterface = {
  LOGOUT: {
    name: "logout",
    path: "/logout",
    value: "logout",
    getPath: (locale: string) => `/${locale}/logout`,
    isProtected: false,
  },
  FORGOT_PASSWORD: {
    name: "forgot-password",
    path: "/forgot-password",
    value: "forgot-password",
    getPath: (locale: string) => `/${locale}/forgot-password`,
    isProtected: false,
  },
  FORGOT_PASSWORD_OTP: {
    name: "forgot-password-otp",
    path: "/forgot-password/otp",
    value: "forgot-password-otp",
    getPath: (locale: string) => `/${locale}/forgot-password/otp`,
    isProtected: false,
  },
  FORGOT_PASSWORD_RESET: {
    name: "forgot-password-reset",
    path: "/forgot-password/reset",
    value: "forgot-password-reset",
    getPath: (locale: string) => `/${locale}/forgot-password/reset`,
    isProtected: false,
  },
  HOME: {
    name: "home",
    path: "/home",
    value: "home",
    getPath: (locale: string) => `/${locale}/home`,
    isProtected: true,
  },

  SIGNIN: {
    name: "signin",
    path: "/signin",
    value: "signin",
    getPath: (locale: string) => `/${locale}/signin`,
    isProtected: false,
  },
  SIGNUP: {
    name: "signup",
    path: "/signup",
    value: "signup",
    getPath: (locale: string) => `/${locale}/signup`,
    isProtected: false,
  },
  SIGNUP_PERSONAL_DETAILS: {
    name: "signup-personal-details",
    path: "/signup/personal-details",
    value: "signup/personal-details",
    getPath: (locale: string) => `/${locale}/signup/personal-details`,
    isProtected: false,
  },
  SIGNUP_CONTACT_DETAILS: {
    name: "signup-contact-details",
    path: "/signup/contact-details",
    value: "signup/contact-details",
    getPath: (locale: string) => `/${locale}/signup/contact-details`,
    isProtected: false,
  },
};

export const PATH: PathInterface = {
  ...PUBLIC_PATH,
};
