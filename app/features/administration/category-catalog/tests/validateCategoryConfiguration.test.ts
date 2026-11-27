import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import { validateCategoryAlertFormValues } from "../utils/validateCategoryAlertFormValues";
import { validateCategoryBehaviorFormValues } from "../utils/validateCategoryBehaviorFormValues";
import { validateCategoryConfiguration } from "../utils/validateCategoryConfiguration";
import { validateCategoryDepositFormValues } from "../utils/validateCategoryDepositFormValues";
import {
  BASELINE_EDITED_VALUES,
  buildEditedValues,
  INVALID_EDITED_VALUES,
  INVALID_FIELD_COUNT,
} from "./CategoryConfigureSave.constants";

describe("validateCategoryConfiguration", () => {
  it("accepts valid values in every section", () => {
    expect(
      validateCategoryConfiguration(BASELINE_EDITED_VALUES)
    ).toEqual({
      errors: { behavior: {}, deposit: {}, alerts: {} },
      invalidFieldCount: LENGTH.ZERO,
      isValid: true,
    });
  });

  it("returns the errors of each section in the shape of its own validator", () => {
    const { errors } = validateCategoryConfiguration(
      INVALID_EDITED_VALUES
    );

    expect(errors).toEqual({
      behavior: validateCategoryBehaviorFormValues(
        INVALID_EDITED_VALUES.behavior
      ),
      deposit: validateCategoryDepositFormValues(
        INVALID_EDITED_VALUES.deposit
      ),
      alerts: validateCategoryAlertFormValues(
        INVALID_EDITED_VALUES.alerts
      ),
    });
  });

  it("counts every invalid field across sections", () => {
    const validation = validateCategoryConfiguration(
      INVALID_EDITED_VALUES
    );

    expect(validation.invalidFieldCount).toBe(
      INVALID_FIELD_COUNT
    );
    expect(validation.isValid).toBe(false);
  });

  it("is invalid when only one section has an error", () => {
    const validation = validateCategoryConfiguration(
      buildEditedValues({
        deposit: INVALID_EDITED_VALUES.deposit,
      })
    );

    expect(validation.invalidFieldCount).toBe(LENGTH.ONE);
    expect(validation.isValid).toBe(false);
  });
});
