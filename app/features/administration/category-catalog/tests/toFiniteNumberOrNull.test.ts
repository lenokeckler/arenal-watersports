import { describe, expect, it } from "vitest";
import { toFiniteNumberOrNull } from "../utils/toFiniteNumberOrNull";
import { DEFAULT_MIN_QUANTITY } from "./CategoryAlerts.constants";
import { DECIMAL_DEPOSIT } from "./CategoryDepositFormValues.constants";
import { NEGATIVE_ALERT_NUMBER } from "./CategoryConfigureValues.constants";

const NULL_RESULT_CASES = [
  { description: "null", value: null },
  { description: "NaN", value: Number.NaN },
  {
    description: "positive infinity",
    value: Number.POSITIVE_INFINITY,
  },
  {
    description: "negative infinity",
    value: Number.NEGATIVE_INFINITY,
  },
];

const KEPT_VALUE_CASES = [
  {
    description: "an integer",
    value: DEFAULT_MIN_QUANTITY,
  },
  { description: "a decimal", value: DECIMAL_DEPOSIT },
  {
    description: "a negative number",
    value: NEGATIVE_ALERT_NUMBER,
  },
];

describe("toFiniteNumberOrNull", () => {
  it.each(NULL_RESULT_CASES)(
    "turns $description into null",
    ({ value }) => {
      expect(toFiniteNumberOrNull(value)).toBeNull();
    }
  );

  it.each(KEPT_VALUE_CASES)(
    "keeps $description",
    ({ value }) => {
      expect(toFiniteNumberOrNull(value)).toBe(value);
    }
  );
});
