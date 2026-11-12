import { describe, expect, it } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CUSTOM_COMBO_DATABASE_MESSAGE } from "../constants/CustomComboDatabaseMessage.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { mapCustomComboRpcError } from "../utils/mapCustomComboRpcError";
import { createCustomComboPostgrestError } from "./createCustomComboPostgrestError";

describe("mapCustomComboRpcError guide messages", () => {
  it.each([
    CUSTOM_COMBO_DATABASE_MESSAGE.GUIDE_IDS_ARRAY,
    CUSTOM_COMBO_DATABASE_MESSAGE.GUIDE_IDS_UUID,
    CUSTOM_COMBO_DATABASE_MESSAGE.GUIDES_REQUIRE_TOUR,
    CUSTOM_COMBO_DATABASE_MESSAGE.WORKERS_MUST_BE_GUIDES,
  ])("maps guide rejection %s", (message) => {
    const error = new SupabaseQueryError(
      "create custom combo reservation",
      createCustomComboPostgrestError(message)
    );

    expect(mapCustomComboRpcError(error)).toEqual({
      field: CUSTOM_COMBO_RESERVATION_FIELD.GUIDE_IDS,
      message: CUSTOM_COMBO_RESERVATION_COPY.INVALID_GUIDES,
    });
  });

  it("ignores unknown messages and non-raise errors", () => {
    const unknown = new SupabaseQueryError(
      "create custom combo reservation",
      createCustomComboPostgrestError("private SQL detail")
    );
    const otherCode = new SupabaseQueryError(
      "create custom combo reservation",
      createCustomComboPostgrestError(
        CUSTOM_COMBO_DATABASE_MESSAGE.CUSTOMER_NAME_REQUIRED,
        POSTGRES_ERROR_CODE.FOREIGN_KEY_VIOLATION
      )
    );

    expect(mapCustomComboRpcError(unknown)).toBeNull();
    expect(mapCustomComboRpcError(otherCode)).toBeNull();
    expect(
      mapCustomComboRpcError(
        new Error("private SQL detail")
      )
    ).toBeNull();
  });
});
