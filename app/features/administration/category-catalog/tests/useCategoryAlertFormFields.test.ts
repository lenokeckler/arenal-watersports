import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { useCategoryAlertFormFields } from "../hooks/useCategoryAlertFormFields";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import { ALERT_TYPE_BY_STORED_VALUES } from "./CategoryAlertCases.constants";
import {
  buildCategoryAlertFormValues,
  buildCategoryAlerts,
  DEFAULT_CATEGORY_ALERTS,
} from "./CategoryAlerts.constants";
import {
  EDITED_MIN_QUANTITY_TEXT,
  NOT_INTEGER_ERRORS,
  TEXT_FIELD_CASES,
} from "./useCategoryAlertForm.constants";

const renderFields = () =>
  renderHook(() =>
    useCategoryAlertFormFields({
      alerts: DEFAULT_CATEGORY_ALERTS,
    })
  );

describe("useCategoryAlertFormFields", () => {
  it.each(ALERT_TYPE_BY_STORED_VALUES)(
    "seeds the $alertType type and its texts without errors",
    ({ alertType, alertMinQuantity, alertExpiryDays }) => {
      const { result } = renderHook(() =>
        useCategoryAlertFormFields({
          alerts: buildCategoryAlerts({
            alertMinQuantity,
            alertExpiryDays,
          }),
        })
      );

      expect(result.current.values).toStrictEqual(
        buildCategoryAlertFormValues({
          alertType,
          minQuantityText:
            alertMinQuantity?.toString() ?? STRING.Empty,
          expiryDaysText:
            alertExpiryDays?.toString() ?? STRING.Empty,
        })
      );
      expect(result.current.errors).toStrictEqual({});
    }
  );

  it("changes only the type, keeps both texts and clears both errors", () => {
    const { result } = renderFields();
    act(() => {
      result.current.showValidationErrors(
        NOT_INTEGER_ERRORS
      );
    });

    act(() => {
      result.current.onAlertTypeChange(
        buildCategoryFormFieldChangeEvent({
          value: CATEGORY_ALERT_TYPE.NONE,
        })
      );
    });

    expect(result.current.values).toStrictEqual(
      buildCategoryAlertFormValues({
        alertType: CATEGORY_ALERT_TYPE.NONE,
      })
    );
    expect(result.current.errors).toStrictEqual({});
  });

  it.each(TEXT_FIELD_CASES)(
    "changes only $field and clears only its own error",
    ({ field, otherField, change }) => {
      const { result } = renderFields();
      act(() => {
        result.current.showValidationErrors(
          NOT_INTEGER_ERRORS
        );
      });

      act(() => {
        result.current[change](
          buildCategoryFormFieldChangeEvent({
            value: EDITED_MIN_QUANTITY_TEXT,
          })
        );
      });

      expect(result.current.values).toStrictEqual(
        buildCategoryAlertFormValues({
          [field]: EDITED_MIN_QUANTITY_TEXT,
        })
      );
      expect(result.current.errors).toStrictEqual({
        [otherField]: NOT_INTEGER_ERRORS[otherField],
      });
    }
  );

  it.each(TEXT_FIELD_CASES)(
    "keeps the same errors when $field has none",
    ({ change, otherField }) => {
      const { result } = renderFields();
      act(() => {
        result.current.showValidationErrors({
          [otherField]: NOT_INTEGER_ERRORS[otherField],
        });
      });
      const errorsBeforeChange = result.current.errors;

      act(() => {
        result.current[change](
          buildCategoryFormFieldChangeEvent({
            value: EDITED_MIN_QUANTITY_TEXT,
          })
        );
      });

      expect(result.current.errors).toBe(
        errorsBeforeChange
      );
    }
  );

  it("keeps the same errors when the type changes and there are none", () => {
    const { result } = renderFields();
    const errorsBeforeChange = result.current.errors;

    act(() => {
      result.current.onAlertTypeChange(
        buildCategoryFormFieldChangeEvent({
          value: CATEGORY_ALERT_TYPE.EXPIRY,
        })
      );
    });

    expect(result.current.errors).toBe(errorsBeforeChange);
  });
});
