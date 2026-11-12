import type { ReservationGuideLoadResult } from "../models/ReservationGuideLoadResult.type";

export const RESERVATION_GUIDE_LOAD_ERROR_CODE = {
  UNKNOWN: "UNKNOWN",
} as const;

export const RESERVATION_GUIDE_LOAD_RESULT_KIND = {
  FAILURE: "failure",
  SUCCESS: "success",
} as const;

export const RESERVATION_GUIDE_LOAD_LOG_LINE_TERMINATOR =
  "\n";

export const EMPTY_RESERVATION_GUIDE_LOAD_RESULT = {
  guides: [],
  kind: RESERVATION_GUIDE_LOAD_RESULT_KIND.SUCCESS,
} satisfies ReservationGuideLoadResult;
