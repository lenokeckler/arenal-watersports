import { RESERVATION_SPLIT_ERROR } from "../constants/ReservationSplitError.constants";

export const FORM_ERROR_CASES: [string, string][] =
  RESERVATION_SPLIT_ERROR.FORM_ERROR_LOOKUP.map(
    ({ formError, message }) => [message, formError]
  );

export const UNMAPPED_MESSAGE =
  "Every departure needs equipment";
export const WRAPPED_PREFIX =
  "Supabase query failed: split reservation - ";
export const TWO_DEPARTURES = 2;
