import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import type { UnitFormRuleCase } from "./models/UnitFormRuleCase.interface";

const buildDecimalCases = (
  field: "usageTotal" | "nextOilChangeAt"
): UnitFormRuleCase[] => [
  ...["0", "0.5", "12,25", "9999999999.99"].map((text) => ({
    description: `${field} "${text}"`,
    overrides: { [field]: text },
    expectedErrors: {},
  })),
  ...["-1", "1.234", "abc", "10000000000"].map((text) => ({
    description: `${field} "${text}"`,
    overrides: { [field]: text },
    expectedErrors: {
      [field]: UNIT_FORM_ERROR_COPY.DECIMAL_INVALID,
    },
  })),
];

export const UNIT_DECIMAL_CASES = [
  ...buildDecimalCases("usageTotal"),
  ...buildDecimalCases("nextOilChangeAt"),
  {
    description: "nextOilChangeAt blank means no threshold",
    overrides: { nextOilChangeAt: "" },
    expectedErrors: {},
  },
  {
    description:
      "usageTotal blank is refused so editing cannot reset the history",
    overrides: { usageTotal: "  " },
    expectedErrors: {
      usageTotal: UNIT_FORM_ERROR_COPY.USAGE_REQUIRED,
    },
  },
];
