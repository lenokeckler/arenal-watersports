import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getCustomComboPricingAction } from "../actions/getCustomComboPricingAction";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import type { CustomComboPricingState } from "../models/CustomComboPricingState.type";
import { getCustomComboPricingStatusMessage } from "../utils/getCustomComboPricingStatusMessage";
import { requestCustomComboPricing } from "../utils/requestCustomComboPricing";
import { CUSTOM_COMBO_PRICING_TEST } from "./useCustomComboPricing.constants";

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: vi.fn(),
}));

describe("requestCustomComboPricing", () => {
  beforeEach(() => vi.clearAllMocks());

  it("sets an empty result as ready and shows the missing tariff message", async () => {
    vi.mocked(
      getCustomComboPricingAction
    ).mockResolvedValue({
      ok: true,
      pricing: null,
    });
    let state: CustomComboPricingState = {
      message: null,
      pricing: null,
      status: CUSTOM_COMBO_PRICING_STATUS.LOADING,
    };

    await requestCustomComboPricing({
      input: CUSTOM_COMBO_PRICING_TEST.FIRST_INPUT,
      isCurrentRequest: () => true,
      setState: (nextState) => {
        state = nextState;
      },
    });

    expect(state).toEqual({
      message: null,
      pricing: null,
      status: CUSTOM_COMBO_PRICING_STATUS.READY,
    });
    expect(getCustomComboPricingStatusMessage(state)).toBe(
      CUSTOM_COMBO_FORM_COPY.PRICING_READY_EMPTY
    );
  });

  it("shows the specific missing individual tariff result", async () => {
    vi.mocked(
      getCustomComboPricingAction
    ).mockResolvedValue({
      ok: false,
      errors: {
        [CUSTOM_COMBO_RESERVATION_FIELD.ITEMS]:
          CUSTOM_COMBO_RESERVATION_COPY.TARIFF_UNAVAILABLE,
      },
    });
    let state: CustomComboPricingState = {
      message: null,
      pricing: null,
      status: CUSTOM_COMBO_PRICING_STATUS.LOADING,
    };

    await requestCustomComboPricing({
      input: CUSTOM_COMBO_PRICING_TEST.FIRST_INPUT,
      isCurrentRequest: () => true,
      setState: (nextState) => {
        state = nextState;
      },
    });

    expect(state.status).toBe(
      CUSTOM_COMBO_PRICING_STATUS.ERROR
    );
    expect(getCustomComboPricingStatusMessage(state)).toBe(
      CUSTOM_COMBO_RESERVATION_COPY.TARIFF_UNAVAILABLE
    );
  });
});
