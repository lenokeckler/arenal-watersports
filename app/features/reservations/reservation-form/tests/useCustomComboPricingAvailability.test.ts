import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getCustomComboPricingAction } from "../actions/getCustomComboPricingAction";
import { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useCustomComboForm } from "../hooks/useCustomComboForm";
import type { CustomComboPricingActionResult } from "../models/CustomComboPricingActionResult.type";
import type { ReservationType } from "../models/ReservationType.type";
import { CUSTOM_COMBO_FORM_TEST } from "./useCustomComboForm.constants";
import { CUSTOM_COMBO_PRICING_TEST } from "./useCustomComboPricing.constants";

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: vi.fn(),
}));

const createDeferredPricing = () => {
  let resolve = (
    _result: CustomComboPricingActionResult
  ): void => undefined;
  const promise =
    new Promise<CustomComboPricingActionResult>(
      (resolvePromise) => {
        resolve = resolvePromise;
      }
    );
  return { promise, resolve };
};

const renderComboFormWithSelection = () => {
  const rendered = renderHook<
    ReturnType<typeof useCustomComboForm>,
    { reservationType: ReservationType }
  >(
    ({ reservationType }) =>
      useCustomComboForm({
        categories: CUSTOM_COMBO_FORM_TEST.CATEGORIES,
        clearFieldError: vi.fn(),
        durationHours:
          CUSTOM_COMBO_FORM_TEST.INITIAL_DURATION_HOURS,
        onGuideIdsChange: vi.fn(),
        reservationType,
      }),
    {
      initialProps: {
        reservationType: RESERVATION_TYPE.COMBO,
      },
    }
  );
  act(() =>
    rendered.result.current.handleItemChange({
      kind: CUSTOM_COMBO_FORM_TEST.CATEGORY_SELECTION_KIND,
      categoryId:
        CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID,
      quantity: CUSTOM_COMBO_FORM_TEST.VALID_QUANTITY,
    })
  );
  return rendered;
};

const expectPricingStatus = (
  result: {
    current: ReturnType<typeof useCustomComboForm>;
  },
  status: ReturnType<
    typeof useCustomComboForm
  >["pricing"]["status"]
) =>
  waitFor(() =>
    expect(result.current.pricing.status).toBe(status)
  );

const switchAwayAndBack = async (
  rendered: ReturnType<typeof renderComboFormWithSelection>
) => {
  rendered.rerender({
    reservationType: RESERVATION_TYPE.RENTAL,
  });
  expect(rendered.result.current.pricing.status).toBe(
    CUSTOM_COMBO_PRICING_STATUS.IDLE
  );
  expect(
    rendered.result.current.pricing.pricing
  ).toBeNull();
  rendered.rerender({
    reservationType: RESERVATION_TYPE.COMBO,
  });
  expect(rendered.result.current.pricing.status).toBe(
    CUSTOM_COMBO_PRICING_STATUS.LOADING
  );
  await waitFor(() =>
    expect(
      getCustomComboPricingAction
    ).toHaveBeenCalledTimes(2)
  );
  expect(
    rendered.result.current.pricing.pricing
  ).toBeNull();
};

describe("useCustomComboPricing availability", () => {
  beforeEach(() => vi.clearAllMocks());

  it("discards the resolved quote after switching away from combo", async () => {
    const freshPricing = createDeferredPricing();
    vi.mocked(getCustomComboPricingAction)
      .mockResolvedValueOnce({
        ok: true,
        pricing: CUSTOM_COMBO_PRICING_TEST.STALE_PRICING,
      })
      .mockImplementationOnce(() => freshPricing.promise);
    const rendered = renderComboFormWithSelection();
    const { result } = rendered;
    await expectPricingStatus(
      result,
      CUSTOM_COMBO_PRICING_STATUS.READY
    );
    expect(result.current.pricing.pricing).toEqual(
      CUSTOM_COMBO_PRICING_TEST.STALE_PRICING
    );

    await switchAwayAndBack(rendered);

    act(() =>
      freshPricing.resolve({
        ok: true,
        pricing: CUSTOM_COMBO_PRICING_TEST.PRICING,
      })
    );
    await expectPricingStatus(
      result,
      CUSTOM_COMBO_PRICING_STATUS.READY
    );
    expect(result.current.pricing.pricing).toEqual(
      CUSTOM_COMBO_PRICING_TEST.PRICING
    );
  });
});
