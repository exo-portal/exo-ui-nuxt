import { defineStore } from "pinia";

export type GENDER_TYPE = "male" | "female" | "other";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: any;
  gender: GENDER_TYPE;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  barangay: string;
  postalCode: string;
}

export const DEFAULT_REGISTRATION_DATA: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  address: "",
  gender: "male",
  country: "PH",
  state: "",
  city: "",
  barangay: "",
  postalCode: "",
};

const LOCAL_STORAGE_REGISTRATION_DATA_KEY = "registrationData";

export const useRegistrationStore = defineStore("registration", {
  state: () => ({
    data: { ...DEFAULT_REGISTRATION_DATA },
  }),
  actions: {
    setData(data: Partial<RegistrationData>) {
      Object.assign(this.data, data);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          LOCAL_STORAGE_REGISTRATION_DATA_KEY,
          JSON.stringify(this.data)
        );
      }
    },
    loadFromLocalStorage() {
      if (process.client) {
      }

      if (typeof window !== "undefined") {
        const localData = localStorage.getItem(
          LOCAL_STORAGE_REGISTRATION_DATA_KEY
        );
        if (localData) {
          this.data = {
            ...DEFAULT_REGISTRATION_DATA,
            ...JSON.parse(localData),
          };
        }
      }
    },
    reset() {
      localStorage.removeItem(LOCAL_STORAGE_REGISTRATION_DATA_KEY);
      this.data = { ...DEFAULT_REGISTRATION_DATA };
    },
  },
});
