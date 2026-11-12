import { describe, expect, it } from "vitest";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CUSTOM_COMBO_DATABASE_MESSAGE } from "../constants/CustomComboDatabaseMessage.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { mapCustomComboRpcError } from "../utils/mapCustomComboRpcError";
import { createCustomComboPostgrestError } from "./createCustomComboPostgrestError";

describe("mapCustomComboRpcError reservation messages", () => {
  it.each([
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.INVALID_AGREED_USD,
      CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD,
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_AGREED_AMOUNT_USD,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.INVALID_AGREED_CRC,
      CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_CRC,
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_AGREED_AMOUNT_CRC,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.CUSTOMER_NAME_REQUIRED,
      CUSTOM_COMBO_RESERVATION_FIELD.CUSTOMER_NAME,
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_CUSTOMER_NAME,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.PEOPLE_COUNT_POSITIVE,
      CUSTOM_COMBO_RESERVATION_FIELD.PEOPLE_COUNT,
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_PEOPLE_COUNT,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.DATE_TIME_REQUIRED,
      CUSTOM_COMBO_RESERVATION_FIELD.DATE,
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_DATE_TIME,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.DURATION_POSITIVE,
      CUSTOM_COMBO_RESERVATION_FIELD.DURATION_HOURS,
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_DURATION,
    ],
  ])(
    "maps reservation rejection %s",
    (message, field, copy) => {
      const error = new SupabaseQueryError(
        "create custom combo reservation",
        createCustomComboPostgrestError(message)
      );

      expect(mapCustomComboRpcError(error)).toEqual({
        field,
        message: copy,
      });
    }
  );
});
