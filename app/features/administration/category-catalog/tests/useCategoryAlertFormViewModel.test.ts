import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import {
  renderCategoryAlertViewModel,
  submitCategoryAlertViewModel,
} from "./CategoryAlertViewModel.harness";
import {
  buildUpdateCategoryAlertsInput,
  DEFAULT_CATEGORY_ALERT_FORM_VALUES,
} from "./CategoryAlerts.constants";
import {
  EDITED_EXPIRY_DAYS,
  EDITED_EXPIRY_DAYS_TEXT,
  EDITED_MIN_QUANTITY,
  EDITED_MIN_QUANTITY_TEXT,
  INVALID_ALERT_TEXT,
  NOT_INTEGER_ERRORS,
  SUCCESS_RESULT,
} from "./useCategoryAlertForm.constants";

const mockPush = vi.fn();
const mockUpdateCategoryAlertsAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: vi.fn() }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryAlertsAction", () => ({
  updateCategoryAlertsAction: (
    input: UpdateCategoryAlertsInput
  ) => mockUpdateCategoryAlertsAction(input),
}));

describe("useCategoryAlertFormViewModel", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockUpdateCategoryAlertsAction.mockReset();
    mockUpdateCategoryAlertsAction.mockResolvedValue(
      SUCCESS_RESULT
    );
  });

  it("exposes the seeded values and an idle form", () => {
    const { result } = renderCategoryAlertViewModel();

    expect(result.current.values).toStrictEqual(
      DEFAULT_CATEGORY_ALERT_FORM_VALUES
    );
    expect(result.current.errors).toStrictEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it("shows the field error without calling the server, then clears it when the field is edited", async () => {
    const { result } = renderCategoryAlertViewModel();
    act(() => {
      result.current.onMinQuantityChange(
        buildCategoryFormFieldChangeEvent({
          value: INVALID_ALERT_TEXT,
        })
      );
    });

    await submitCategoryAlertViewModel(result);

    expect(result.current.errors).toStrictEqual({
      minQuantityText: NOT_INTEGER_ERRORS.minQuantityText,
    });
    expect(
      mockUpdateCategoryAlertsAction
    ).not.toHaveBeenCalled();

    act(() => {
      result.current.onMinQuantityChange(
        buildCategoryFormFieldChangeEvent({
          value: EDITED_MIN_QUANTITY_TEXT,
        })
      );
    });

    expect(result.current.errors).toStrictEqual({});
  });

  it.each([
    {
      description: "minimum quantity",
      change: "onMinQuantityChange",
      text: EDITED_MIN_QUANTITY_TEXT,
      input: buildUpdateCategoryAlertsInput({
        alertMinQuantity: EDITED_MIN_QUANTITY,
      }),
    },
    {
      description: "expiry days",
      change: "onExpiryDaysChange",
      text: EDITED_EXPIRY_DAYS_TEXT,
      input: buildUpdateCategoryAlertsInput({
        alertExpiryDays: EDITED_EXPIRY_DAYS,
      }),
    },
  ] as const)(
    "submits the edited $description and keeps the other value",
    async ({ change, text, input }) => {
      const { result } = renderCategoryAlertViewModel();
      act(() => {
        result.current[change](
          buildCategoryFormFieldChangeEvent({ value: text })
        );
      });

      await submitCategoryAlertViewModel(result);

      expect(
        mockUpdateCategoryAlertsAction
      ).toHaveBeenCalledWith(input);
    }
  );

  it("goes back to the category list", () => {
    const { result } = renderCategoryAlertViewModel();

    act(() => {
      result.current.onBack();
    });

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});
