import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { INPUT_MODE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";
import { buildUpdateCategoryAlertsInput } from "./CategoryAlerts.constants";
import {
  ALERT_ERROR_FIELD_CASES,
  ALERT_SUBMIT_CASES,
  INPUT_MODE_ATTRIBUTE,
} from "./CategoryAlertsForm.constants";
import { renderCategoryAlertsForm } from "./renderCategoryAlertsForm";
import {
  INVALID_ALERT_TEXT,
  NOT_INTEGER_ERRORS,
  SUCCESS_RESULT,
} from "./useCategoryAlertForm.constants";

const mockUpdateCategoryAlertsAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
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

describe("CategoryAlertsForm submit", () => {
  beforeEach(() => {
    mockUpdateCategoryAlertsAction.mockReset();
    mockUpdateCategoryAlertsAction.mockResolvedValue(
      SUCCESS_RESULT
    );
  });

  it("opens the digits keypad on both numeric fields", () => {
    const alertsFormPage = renderCategoryAlertsForm();

    alertsFormPage.getTextInputs().forEach((input) => {
      expect(input).toHaveAttribute(
        INPUT_MODE_ATTRIBUTE,
        INPUT_MODE.NUMERIC
      );
    });
  });

  it("describes the type and both fields with the hint", () => {
    const alertsFormPage = renderCategoryAlertsForm();

    [
      alertsFormPage.getTypeSelect(),
      ...alertsFormPage.getTextInputs(),
    ].forEach((control) => {
      expect(control).toHaveAccessibleDescription(
        CATEGORY_CATALOG_COPY.ALERT_FORM_HINT
      );
    });
  });

  it.each(ALERT_SUBMIT_CASES)(
    "sends numbers and null for what does not apply when saving $alertType",
    async ({
      alertType,
      minQuantityText,
      expiryDaysText,
      expected,
    }) => {
      const alertsFormPage = renderCategoryAlertsForm();

      await alertsFormPage.selectType(alertType);
      if (minQuantityText) {
        await alertsFormPage.typeMinQuantity(
          minQuantityText
        );
      }
      if (expiryDaysText) {
        await alertsFormPage.typeExpiryDays(expiryDaysText);
      }
      await alertsFormPage.submit();

      await waitFor(() =>
        expect(
          mockUpdateCategoryAlertsAction
        ).toHaveBeenCalledWith(
          buildUpdateCategoryAlertsInput(expected)
        )
      );
      await alertsFormPage.waitForSubmitSettled();
    }
  );

  it.each(ALERT_ERROR_FIELD_CASES)(
    "shows the $field error under that field only and saves nothing",
    async ({ field, otherField }) => {
      const alertsFormPage = renderCategoryAlertsForm();
      const fieldInput = {
        minQuantityText:
          alertsFormPage.queryMinQuantityInput,
        expiryDaysText: alertsFormPage.queryExpiryDaysInput,
      };
      const typeInto = {
        minQuantityText: alertsFormPage.typeMinQuantity,
        expiryDaysText: alertsFormPage.typeExpiryDays,
      };

      await typeInto[field](INVALID_ALERT_TEXT);
      await alertsFormPage.submit();

      expect(
        await alertsFormPage.findTextMatches(
          NOT_INTEGER_ERRORS[field]
        )
      ).toHaveLength(1);
      expect(
        fieldInput[field]()
      ).toHaveAccessibleDescription(
        expect.stringContaining(NOT_INTEGER_ERRORS[field])
      );
      expect(
        fieldInput[otherField]()
      ).not.toHaveAccessibleDescription(
        expect.stringContaining(NOT_INTEGER_ERRORS[field])
      );
      expect(
        mockUpdateCategoryAlertsAction
      ).not.toHaveBeenCalled();
    }
  );
});
