import { describe, expect, it } from "vitest";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CUSTOM_COMBO_DATABASE_MESSAGE } from "../constants/CustomComboDatabaseMessage.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { mapCustomComboRpcError } from "../utils/mapCustomComboRpcError";
import { createCustomComboPostgrestError } from "./createCustomComboPostgrestError";

describe("mapCustomComboRpcError equipment messages", () => {
  it.each([
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.EMPTY_SELECTION,
      CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.INVALID_SELECTION,
      CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.REPEATED_CATEGORY,
      CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.CATEGORY_NOT_RESERVABLE,
      CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.SELECTION_NOT_RESERVABLE,
      CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.TARIFF_MISSING,
      CUSTOM_COMBO_RESERVATION_COPY.TARIFF_UNAVAILABLE,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.NEGATIVE_TARIFF,
      CUSTOM_COMBO_RESERVATION_COPY.TARIFF_UNAVAILABLE,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.INSUFFICIENT_AVAILABILITY,
      CUSTOM_COMBO_RESERVATION_COPY.EQUIPMENT_UNAVAILABLE,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.CATEGORY_UNAVAILABLE,
      CUSTOM_COMBO_RESERVATION_COPY.EQUIPMENT_UNAVAILABLE,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.CATEGORY_QUANTITY_UNAVAILABLE,
      CUSTOM_COMBO_RESERVATION_COPY.EQUIPMENT_UNAVAILABLE,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.UNIT_UNAVAILABLE,
      CUSTOM_COMBO_RESERVATION_COPY.EQUIPMENT_UNAVAILABLE,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.UNIT_CONFLICT,
      CUSTOM_COMBO_RESERVATION_COPY.EQUIPMENT_UNAVAILABLE,
    ],
    [
      CUSTOM_COMBO_DATABASE_MESSAGE.EQUIPMENT_REQUIRES_TOUR,
      CUSTOM_COMBO_RESERVATION_COPY.EQUIPMENT_REQUIRES_TOUR,
    ],
  ])("maps equipment rejection %s", (message, copy) => {
    const error = new SupabaseQueryError(
      "create custom combo reservation",
      createCustomComboPostgrestError(message)
    );

    expect(mapCustomComboRpcError(error)).toEqual({
      field: CUSTOM_COMBO_RESERVATION_FIELD.ITEMS,
      message: copy,
    });
  });
});
