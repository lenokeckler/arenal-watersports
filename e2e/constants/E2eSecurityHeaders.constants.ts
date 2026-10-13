import { PATHS } from "@/app/constants";

export const E2E_REMOVED_HEADER = "x-powered-by";

export const E2E_SECURITY_HEADER_PATHS = [
  PATHS.HOME,
  PATHS.ACCESS.LOGIN,
] as const;
