import { describe, expect, it } from "vitest";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { applyCategoryEditedValues } from "../utils/applyCategoryEditedValues";
import {
  buildCategoryAlertFormValues,
  DEFAULT_CATEGORY_ALERTS,
} from "./CategoryAlerts.constants";
import {
  buildCategoryConfiguration,
  FAKE_CONFIGURATION_DEPOSIT_CRC,
  FAKE_CONFIGURATION_DEPOSIT_USD,
} from "./CategoryConfiguration.constants";
import { EDITED_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryConfigureValues.constants";
import {
  buildCategoryDeposit,
  DEFAULT_CATEGORY_DEPOSIT,
  DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
} from "./CategoryDepositFormValues.constants";
import {
  EDITED_EXPIRY_DAYS,
  EDITED_EXPIRY_DAYS_TEXT,
  EDITED_MIN_QUANTITY,
  EDITED_MIN_QUANTITY_TEXT,
} from "./useCategoryAlertForm.constants";

const SAVED_CONFIGURATION = buildCategoryConfiguration({
  deposit: buildCategoryDeposit({
    depositUsd: FAKE_CONFIGURATION_DEPOSIT_USD,
    depositCrc: FAKE_CONFIGURATION_DEPOSIT_CRC,
  }),
  alerts: DEFAULT_CATEGORY_ALERTS,
});

const EDITED_VALUES = {
  behavior: EDITED_CATEGORY_BEHAVIOR_FORM_VALUES,
  deposit: DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
  alerts: buildCategoryAlertFormValues({
    alertType: CATEGORY_ALERT_TYPE.BOTH,
    minQuantityText: EDITED_MIN_QUANTITY_TEXT,
    expiryDaysText: EDITED_EXPIRY_DAYS_TEXT,
  }),
};

const { guideOnly, hasMotor } =
  EDITED_CATEGORY_BEHAVIOR_FORM_VALUES;

describe("applyCategoryEditedValues", () => {
  it("overrides the reservation, trait, deposit and alert values of the saved model", () => {
    const result = applyCategoryEditedValues(
      SAVED_CONFIGURATION,
      EDITED_VALUES
    );

    expect(result.behavior).toMatchObject({
      guideOnly,
      hasMotor,
    });
    expect(result.deposit).toEqual(
      DEFAULT_CATEGORY_DEPOSIT
    );
    expect(result.alerts).toEqual({
      ...DEFAULT_CATEGORY_ALERTS,
      alertMinQuantity: EDITED_MIN_QUANTITY,
      alertExpiryDays: EDITED_EXPIRY_DAYS,
    });
  });

  it("keeps the identity, status and photo of the saved model", () => {
    const result = applyCategoryEditedValues(
      SAVED_CONFIGURATION,
      EDITED_VALUES
    );

    expect(result).toMatchObject({
      id: SAVED_CONFIGURATION.id,
      name: SAVED_CONFIGURATION.name,
      status: SAVED_CONFIGURATION.status,
      image: SAVED_CONFIGURATION.image,
      hasRecords: SAVED_CONFIGURATION.hasRecords,
    });
  });
});
