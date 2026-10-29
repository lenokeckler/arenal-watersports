import type { ReservationFormInput } from "../models/ReservationFormInput.interface";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { PostgrestError } from "@supabase/supabase-js";

export const VALID_RESERVATION_FORM_INPUT: ReservationFormInput =
  {
    categoryId: "e2400000-0000-4000-8000-000000000101",
    customerName: "Test Reservation",
    date: "2028-02-29",
    durationHours: 1.5,
    extraIds: [],
    peopleCount: 3,
    quantity: 2,
    time: "09:30",
    unitId: "",
  };

export const INVALID_EXTRA_ID = "invalid-extra-id";
export const DUPLICATE_EXTRA_IDS = [
  VALID_RESERVATION_FORM_INPUT.categoryId,
  VALID_RESERVATION_FORM_INPUT.categoryId,
];
export const CASE_INSENSITIVE_DUPLICATE_EXTRA_IDS = [
  VALID_RESERVATION_FORM_INPUT.categoryId,
  VALID_RESERVATION_FORM_INPUT.categoryId.toUpperCase(),
];

export const CREATED_RESERVATION_ID =
  "e2400000-0000-4000-8000-000000000201";

export const RESERVATION_OPERATION_ERROR =
  new SupabaseQueryError(
    "create rental reservation",
    new PostgrestError({
      code: "P0001",
      details: "Reservation row rejected",
      hint: "Inspect the local reservation seed",
      message: "Reservation insert failed",
    })
  );
