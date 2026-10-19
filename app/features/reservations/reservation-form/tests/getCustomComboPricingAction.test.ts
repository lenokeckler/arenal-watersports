import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";
import { getCustomComboPricingAction } from "../actions/getCustomComboPricingAction";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { getCustomComboPrice } from "../services/getCustomComboPrice";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { CUSTOM_COMBO_PRICING_ACTION_TEST } from "./getCustomComboPricingAction.constants";

vi.mock("../services/getCustomComboPrice", () => ({
  getCustomComboPrice: vi.fn(),
}));

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("getCustomComboPricingAction", () => {
  const supabaseClient = createClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY
  );

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabaseClient);
  });

  it("rejects invalid equipment selections before authorization or pricing", async () => {
    await expect(
      getCustomComboPricingAction(
        CUSTOM_COMBO_PRICING_ACTION_TEST.INVALID_INPUT
      )
    ).resolves.toEqual({
      errors: {
        [CUSTOM_COMBO_RESERVATION_FIELD.ITEMS]:
          CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION,
      },
      ok: false,
    });
    expect(
      getAuthorizedReservationFormClient
    ).not.toHaveBeenCalled();
    expect(getCustomComboPrice).not.toHaveBeenCalled();
  });

  it("authorizes and returns the proposed prices for a valid combo", async () => {
    vi.mocked(getCustomComboPrice).mockResolvedValue(
      CUSTOM_COMBO_PRICING_ACTION_TEST.PRICING
    );

    await expect(
      getCustomComboPricingAction(
        CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
      )
    ).resolves.toEqual({
      ok: true,
      pricing: CUSTOM_COMBO_PRICING_ACTION_TEST.PRICING,
    });
    expect(
      getAuthorizedReservationFormClient
    ).toHaveBeenCalledOnce();
    expect(getCustomComboPrice).toHaveBeenCalledWith(
      CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
    );
  });

  it("does not request pricing when authorization rejects", async () => {
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockRejectedValue(
      CUSTOM_COMBO_PRICING_ACTION_TEST.AUTHORIZATION_ERROR
    );

    await expect(
      getCustomComboPricingAction(
        CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
      )
    ).rejects.toBe(
      CUSTOM_COMBO_PRICING_ACTION_TEST.AUTHORIZATION_ERROR
    );
    expect(getCustomComboPrice).not.toHaveBeenCalled();
  });

  it("propagates pricing service failures after authorization", async () => {
    vi.mocked(getCustomComboPrice).mockRejectedValue(
      CUSTOM_COMBO_PRICING_ACTION_TEST.PRICING_ERROR
    );

    await expect(
      getCustomComboPricingAction(
        CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
      )
    ).rejects.toBe(
      CUSTOM_COMBO_PRICING_ACTION_TEST.PRICING_ERROR
    );
    expect(
      getAuthorizedReservationFormClient
    ).toHaveBeenCalledOnce();
    expect(getCustomComboPrice).toHaveBeenCalledWith(
      CUSTOM_COMBO_PRICING_ACTION_TEST.INPUT
    );
  });
});
