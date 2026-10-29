import { PATHS } from "@/app/constants/strings/Paths.constants";

export const SESSION_CONFIG = {
  ADMIN: {
    INACTIVITY_TIMEOUT: {
      TOTAL_MINUTES: 15,
      WARNING_MINUTES: 5,
      REFRESH_ON_API_CALL: true,
    },
    SESSION: {
      AUTO_LOGOUT: true,
      SHOW_WARNING: true,
      LOGOUT_REDIRECT_PATH: PATHS.ACCESS.LOGIN,
    },
  },
  CLIENT: {
    INACTIVITY_TIMEOUT: {
      TOTAL_MINUTES: 30,
      WARNING_MINUTES: 5,
      REFRESH_ON_API_CALL: true,
    },
    SESSION: {
      AUTO_LOGOUT: true,
      SHOW_WARNING: true,
      LOGOUT_REDIRECT_PATH: PATHS.ACCESS.LOGIN,
    },
  },
} as const;

export type SessionConfigType = keyof typeof SESSION_CONFIG;

export const SESSION_CONFIG_TYPES = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
} as const satisfies Record<
  SessionConfigType,
  SessionConfigType
>;
