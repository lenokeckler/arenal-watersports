import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { parseCategoryAlertNumber } from "../utils/parseCategoryAlertNumber";
import { DEFAULT_MIN_QUANTITY } from "./CategoryAlerts.constants";
import { BLANK_TEXT } from "./CategoryDepositFormValues.constants";
import {
  INFINITE_ALERT_TEXT,
  NEGATIVE_ALERT_NUMBER,
  NEGATIVE_ALERT_TEXT,
} from "./CategoryConfigureValues.constants";
import { FAKE_INVALID_AMOUNT_TEXT } from "./CategoryConfiguration.constants";

const MIN_QUANTITY_TEXT = DEFAULT_MIN_QUANTITY.toString();

const NULL_RESULT_CASES = [
  { description: "empty text", text: STRING.Empty },
  { description: "blank text", text: BLANK_TEXT },
  {
    description: "text that is not a number",
    text: FAKE_INVALID_AMOUNT_TEXT,
  },
  { description: "infinity", text: INFINITE_ALERT_TEXT },
];

const NUMBER_RESULT_CASES = [
  {
    description: "a plain number",
    text: MIN_QUANTITY_TEXT,
    expected: DEFAULT_MIN_QUANTITY,
  },
  {
    description: "a number surrounded by spaces",
    text: `${STRING.SPACE}${MIN_QUANTITY_TEXT}${STRING.SPACE}`,
    expected: DEFAULT_MIN_QUANTITY,
  },
  {
    description:
      "a negative number, left to the form validation",
    text: NEGATIVE_ALERT_TEXT,
    expected: NEGATIVE_ALERT_NUMBER,
  },
];

describe("parseCategoryAlertNumber", () => {
  it.each(NULL_RESULT_CASES)(
    "returns null for $description, never NaN",
    ({ text }) => {
      expect(parseCategoryAlertNumber(text)).toBeNull();
    }
  );

  it.each(NUMBER_RESULT_CASES)(
    "parses $description",
    ({ text, expected }) => {
      expect(parseCategoryAlertNumber(text)).toBe(expected);
    }
  );
});
