import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import { CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS } from "../constants/CustomComboReservationDraft.constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { useCustomComboPricing } from "../hooks/useCustomComboPricing";
import { useCustomComboPricingViewModel } from "../hooks/useCustomComboPricingViewModel";
import { CUSTOM_COMBO_UNIT_EXTRAS_TEST } from "./CustomComboUnitExtras.constants";
import { CUSTOM_COMBO_PRICING_TEST } from "./useCustomComboPricing.constants";

vi.mock("../hooks/useCustomComboPricing", () => ({
  useCustomComboPricing: vi.fn(),
}));

describe("useCustomComboPricingViewModel", () => {
  beforeEach(() => {
    vi.mocked(useCustomComboPricing).mockReturnValue({
      retry: vi.fn(),
      state: {
        message: null,
        pricing: null,
        status: CUSTOM_COMBO_PRICING_STATUS.IDLE,
      },
    });
  });

  it("quotes custom combo extras with their selected concrete unit", () => {
    const draft = {
      ...CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS,
      extraIds: [CUSTOM_COMBO_UNIT_EXTRAS_TEST.EXTRA_ID],
      extraUnitId: CUSTOM_COMBO_UNIT_EXTRAS_TEST.UNIT_ID,
      items: [
        {
          categoryId:
            CUSTOM_COMBO_UNIT_EXTRAS_TEST.INVENTORY_CATEGORY_ID,
          kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
          unitId: CUSTOM_COMBO_UNIT_EXTRAS_TEST.UNIT_ID,
        },
      ],
    };

    renderHook(() =>
      useCustomComboPricingViewModel(
        draft,
        CUSTOM_COMBO_PRICING_TEST.FIRST_INPUT.durationHours,
        RESERVATION_TYPE.COMBO
      )
    );

    expect(useCustomComboPricing).toHaveBeenCalledWith(
      expect.objectContaining({
        extraIds: [CUSTOM_COMBO_UNIT_EXTRAS_TEST.EXTRA_ID],
        extraUnitId: CUSTOM_COMBO_UNIT_EXTRAS_TEST.UNIT_ID,
        items: draft.items,
      }),
      true
    );
  });
});
