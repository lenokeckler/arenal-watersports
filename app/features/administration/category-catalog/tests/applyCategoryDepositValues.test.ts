import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { applyCategoryDepositValues } from "../utils/applyCategoryDepositValues";
import {
  buildCategoryConfiguration,
  FAKE_CONFIGURATION_DEPOSIT_CRC,
  FAKE_CONFIGURATION_DEPOSIT_USD,
} from "./CategoryConfiguration.constants";
import { INFINITE_ALERT_TEXT } from "./CategoryConfigureValues.constants";
import {
  BLANK_TEXT,
  buildCategoryDeposit,
  buildCategoryDepositFormValues,
  DECIMAL_DEPOSIT,
  DECIMAL_DEPOSIT_TEXT,
  DEFAULT_CATEGORY_DEPOSIT,
  DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES,
  INVALID_FORMAT_TEXT,
} from "./CategoryDepositFormValues.constants";

const SAVED_CONFIGURATION = buildCategoryConfiguration({
  deposit: buildCategoryDeposit({
    depositUsd: FAKE_CONFIGURATION_DEPOSIT_USD,
    depositCrc: FAKE_CONFIGURATION_DEPOSIT_CRC,
  }),
});

const NULL_RESULT_CASES = [
  { description: "empty text", text: STRING.Empty },
  { description: "blank text", text: BLANK_TEXT },
  {
    description: "a malformed amount",
    text: INVALID_FORMAT_TEXT,
  },
  { description: "infinity", text: INFINITE_ALERT_TEXT },
];

describe("applyCategoryDepositValues", () => {
  it("applies the edited amounts over the saved ones", () => {
    const result = applyCategoryDepositValues(
      SAVED_CONFIGURATION,
      DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES
    );

    expect(result.deposit).toEqual(
      DEFAULT_CATEGORY_DEPOSIT
    );
  });

  it("parses a decimal amount", () => {
    const result = applyCategoryDepositValues(
      SAVED_CONFIGURATION,
      buildCategoryDepositFormValues({
        depositUsd: DECIMAL_DEPOSIT_TEXT,
      })
    );

    expect(result.deposit.depositUsd).toBe(DECIMAL_DEPOSIT);
  });

  it.each(NULL_RESULT_CASES)(
    "turns $description into null in both currencies, never NaN",
    ({ text }) => {
      const result = applyCategoryDepositValues(
        SAVED_CONFIGURATION,
        { depositUsd: text, depositCrc: text }
      );

      expect(result.deposit).toEqual({
        ...SAVED_CONFIGURATION.deposit,
        depositUsd: null,
        depositCrc: null,
      });
    }
  );

  it("leaves the rest of the configuration untouched", () => {
    const result = applyCategoryDepositValues(
      SAVED_CONFIGURATION,
      DEFAULT_CATEGORY_DEPOSIT_FORM_VALUES
    );

    expect({ ...result, deposit: null }).toEqual({
      ...SAVED_CONFIGURATION,
      deposit: null,
    });
  });
});
