import { SESSION_LIVENESS } from "@/app/constants";

export const isTransientSupabaseError = (
  status: number | undefined
): boolean =>
  !status ||
  status >= SESSION_LIVENESS.FIRST_SERVER_ERROR_STATUS;
