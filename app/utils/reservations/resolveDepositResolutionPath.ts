import { PATHS, STRING } from "@/app/constants";

export const resolveDepositResolutionPath = (
  depositId: string
): string =>
  [
    PATHS.RESERVATIONS.DEPOSITS,
    depositId,
    PATHS.RESERVATIONS.RESOLVE_SEGMENT,
  ].join(STRING.SLASH);
