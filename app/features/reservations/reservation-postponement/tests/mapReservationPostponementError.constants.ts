import { PostgrestError } from "@supabase/supabase-js";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_POSTPONEMENT_ERROR } from "../constants/ReservationPostponementError.constants";
import { RESERVATION_POSTPONEMENT_REFUSALS } from "../constants/ReservationPostponementRefusals.constants";
import type { ReservationPostponementFieldErrors } from "../models/ReservationPostponementFieldErrors.interface";
import type { ReservationPostponementReadingErrors } from "../models/ReservationPostponementReadingErrors.interface";
import { POSTPONEMENT_ITEM_ID } from "./ReservationPostponementInput.constants";

const POSTGRES_RAISE_CODE = "P0001";

export const FORM_REFUSAL_CASES: [string, string][] =
  RESERVATION_POSTPONEMENT_REFUSALS.filter(
    ({ formError }) => formError
  ).map(({ formError, message }) => [
    message,
    `${formError}`,
  ]);

export const FIELD_REFUSAL_CASES: [
  string,
  ReservationPostponementFieldErrors,
][] = RESERVATION_POSTPONEMENT_REFUSALS.filter(
  ({ errors }) => errors
).map(({ errors, message }) => [message, { ...errors }]);

export const READING_REFUSAL_CASES: [
  string,
  ReservationPostponementReadingErrors,
][] = RESERVATION_POSTPONEMENT_REFUSALS.filter(
  ({ reading }) => reading
).map(({ message, reading }) => [message, { ...reading }]);

export const DATABASE_MESSAGES = Object.values(
  RESERVATION_POSTPONEMENT_ERROR.MESSAGE
);

export const UNMAPPED_MESSAGE =
  "Postponement history could not be written";

export const buildRaisedError = (
  message: string,
  details: string
): SupabaseQueryError =>
  new SupabaseQueryError(
    RESERVATION_POSTPONEMENT_ERROR.OPERATION.POSTPONE,
    new PostgrestError({
      code: POSTGRES_RAISE_CODE,
      details,
      hint: "",
      message,
    })
  );

export const READING_ITEM_ID = POSTPONEMENT_ITEM_ID;
