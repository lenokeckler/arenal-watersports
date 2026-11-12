import { expect, it, vi } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getCustomComboPricingAction } from "../actions/getCustomComboPricingAction";
import { CUSTOM_COMBO_DATABASE_MESSAGE } from "../constants/CustomComboDatabaseMessage.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { getCustomComboPrice } from "../services/getCustomComboPrice";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { CUSTOM_COMBO_PRICING_ACTION_TEST } from "./getCustomComboPricingAction.constants";
import { createCustomComboPostgrestError } from "./createCustomComboPostgrestError";

vi.mock("../services/getCustomComboPrice", () => ({
  getCustomComboPrice: vi.fn(),
}));
vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

it("returns a specific safe status when the quote rejects a missing tariff", async () => {
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue(
    createClient<Database>(SUPABASE.URL, SUPABASE.ANON_KEY)
  );
  vi.mocked(getCustomComboPrice).mockRejectedValue(
    new SupabaseQueryError(
      "load custom combo price",
      createCustomComboPostgrestError(
        CUSTOM_COMBO_DATABASE_MESSAGE.TARIFF_MISSING
      )
    )
  );

  await expect(
    getCustomComboPricingAction(
      CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
    )
  ).resolves.toEqual({
    ok: false,
    errors: {
      [CUSTOM_COMBO_RESERVATION_FIELD.ITEMS]:
        CUSTOM_COMBO_RESERVATION_COPY.TARIFF_UNAVAILABLE,
    },
  });
});

it("does not expose SQL detail from an unexpected quote rejection", async () => {
  vi.mocked(
    getAuthorizedReservationFormClient
  ).mockResolvedValue(
    createClient<Database>(SUPABASE.URL, SUPABASE.ANON_KEY)
  );
  vi.mocked(getCustomComboPrice).mockRejectedValue(
    new SupabaseQueryError(
      "load custom combo price",
      createCustomComboPostgrestError("private SQL detail")
    )
  );

  await expect(
    getCustomComboPricingAction(
      CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
    )
  ).resolves.toEqual({ ok: false, errors: {} });
});
