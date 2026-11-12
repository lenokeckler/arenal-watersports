import { beforeEach, expect, it, vi } from "vitest";
import { createClient } from "@supabase/supabase-js";
import {
  POSTGRES_ERROR_CODE,
  SUPABASE,
} from "@/app/constants";
import type { Database } from "@/app/types";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { CUSTOM_COMBO_DATABASE_MESSAGE } from "../constants/CustomComboDatabaseMessage.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { createCustomComboReservation } from "../services/createCustomComboReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { CUSTOM_COMBO_RESERVATION_ACTION_TEST } from "./createCustomComboReservationAction.constants";

vi.mock("../services/createCustomComboReservation", () => ({
  createCustomComboReservation: vi.fn(),
}));
vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue(
    createClient<Database>(SUPABASE.URL, SUPABASE.ANON_KEY)
  );
});

it("returns a localized field error for a known RPC failure", async () => {
  vi.mocked(createCustomComboReservation).mockRejectedValue(
    new SupabaseQueryError(
      "create custom combo reservation",
      {
        code: POSTGRES_ERROR_CODE.RAISE_EXCEPTION,
        details: "",
        hint: "",
        message:
          CUSTOM_COMBO_DATABASE_MESSAGE.GUIDES_REQUIRE_TOUR,
        name: "PostgrestError",
        toJSON: () => ({
          code: POSTGRES_ERROR_CODE.RAISE_EXCEPTION,
          details: "",
          hint: "",
          message:
            CUSTOM_COMBO_DATABASE_MESSAGE.GUIDES_REQUIRE_TOUR,
          name: "PostgrestError",
        }),
      }
    )
  );

  await expect(
    createCustomComboReservationAction(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT
    )
  ).resolves.toEqual({
    ok: false,
    errors: {
      [CUSTOM_COMBO_RESERVATION_FIELD.GUIDE_IDS]:
        CUSTOM_COMBO_RESERVATION_COPY.INVALID_GUIDES,
    },
  });
});

it("returns only safe generic feedback for an unknown RPC failure", async () => {
  vi.mocked(createCustomComboReservation).mockRejectedValue(
    new SupabaseQueryError(
      "create custom combo reservation",
      {
        code: POSTGRES_ERROR_CODE.RAISE_EXCEPTION,
        details: "",
        hint: "",
        message: "private SQL detail",
        name: "PostgrestError",
        toJSON: () => ({
          code: POSTGRES_ERROR_CODE.RAISE_EXCEPTION,
          details: "",
          hint: "",
          message: "private SQL detail",
          name: "PostgrestError",
        }),
      }
    )
  );

  await expect(
    createCustomComboReservationAction(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT
    )
  ).resolves.toEqual({
    errors: {},
    formError: RESERVATION_FORM_UI_COPY.SUBMIT_ERROR,
    ok: false,
  });
});
