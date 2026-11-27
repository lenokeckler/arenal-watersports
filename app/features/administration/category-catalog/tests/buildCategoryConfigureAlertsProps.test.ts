import { describe, expect, it, vi } from "vitest";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import { buildCategoryConfigureAlertsProps } from "../utils/buildCategoryConfigureAlertsProps";
import { buildCategoryAlertFormValues } from "./CategoryAlerts.constants";
import { ALERT_FIELD_VISIBILITY_CASES } from "./CategoryAlertsForm.constants";
import { NOT_INTEGER_ERRORS } from "./useCategoryAlertForm.constants";

const ALERT_TYPES = Object.values(CATEGORY_ALERT_TYPE);

const buildFields = (
  values: CategoryAlertFormValues,
  errors: CategoryAlertFormErrors = {}
) => ({
  values,
  errors,
  showValidationErrors: vi.fn(),
  onAlertTypeChange: vi.fn(),
  onMinQuantityChange: vi.fn(),
  onExpiryDaysChange: vi.fn(),
});

describe("buildCategoryConfigureAlertsProps", () => {
  it.each(ALERT_TYPES)(
    "selects only the matching choice for a saved %s type",
    (alertType) => {
      const { typeChips } =
        buildCategoryConfigureAlertsProps(
          buildFields(
            buildCategoryAlertFormValues({ alertType })
          )
        );

      expect(
        typeChips.choices
          .filter(({ isSelected }) => isSelected)
          .map(({ type }) => type)
      ).toEqual([alertType]);
    }
  );

  it.each(ALERT_FIELD_VISIBILITY_CASES)(
    "shows the number fields of the $alertType type",
    ({ alertType, showsQuantity, showsExpiry }) => {
      const props = buildCategoryConfigureAlertsProps(
        buildFields(
          buildCategoryAlertFormValues({ alertType })
        )
      );

      expect(props.isQuantityVisible).toBe(showsQuantity);
      expect(props.isExpiryVisible).toBe(showsExpiry);
    }
  );

  it.each(ALERT_TYPES)(
    "reports %s as the new alert type when it is picked",
    (alertType) => {
      const fields = buildFields(
        buildCategoryAlertFormValues()
      );
      const { typeChips } =
        buildCategoryConfigureAlertsProps(fields);

      typeChips.onSelectType(alertType);

      expect(fields.onAlertTypeChange).toHaveBeenCalledWith(
        {
          target: { value: alertType },
        }
      );
    }
  );

  it("passes the values, the errors and the number handlers through", () => {
    const values = buildCategoryAlertFormValues();
    const fields = buildFields(values, NOT_INTEGER_ERRORS);
    const props = buildCategoryConfigureAlertsProps(fields);

    expect(props.values).toBe(values);
    expect(props.errors).toBe(NOT_INTEGER_ERRORS);
    expect(props.onMinQuantityChange).toBe(
      fields.onMinQuantityChange
    );
    expect(props.onExpiryDaysChange).toBe(
      fields.onExpiryDaysChange
    );
  });
});
