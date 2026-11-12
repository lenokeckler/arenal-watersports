import { PASSWORD_RECOVERY_USERNAME_COOKIE } from "@/app/constants";

export const USERNAME_COOKIE = {
  NAME: PASSWORD_RECOVERY_USERNAME_COOKIE.NAME,
  RAW: "  Ana.Perez\t",
  NORMALIZED: "ana.perez",
} as const;
