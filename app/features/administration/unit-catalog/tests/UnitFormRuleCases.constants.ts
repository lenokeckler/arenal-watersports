import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_LIMITS } from "../constants/UnitFormLimits.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { UnitFormRuleCase } from "./models/UnitFormRuleCase.interface";

const CODE_MAX_LENGTH_TEXT = "A".repeat(
  UNIT_FORM_LIMITS.CODE_MAX_LENGTH
);
const CODE_TOO_LONG_TEXT = `${CODE_MAX_LENGTH_TEXT}A`;
const PADDED_CODE_TEXT = ` ${CODE_MAX_LENGTH_TEXT} `;
const MOTORLESS_RULES = { hasMotor: false };

export const UNIT_CODE_CASES: UnitFormRuleCase[] = [
  {
    description: "a normal code",
    overrides: {},
    expectedErrors: {},
  },
  {
    description: "an empty code",
    overrides: { code: "" },
    expectedErrors: {
      code: UNIT_FORM_ERROR_COPY.CODE_REQUIRED,
    },
  },
  {
    description: "a blank code",
    overrides: { code: "   " },
    expectedErrors: {
      code: UNIT_FORM_ERROR_COPY.CODE_REQUIRED,
    },
  },
  {
    description: "a code of exactly 40 characters",
    overrides: { code: CODE_MAX_LENGTH_TEXT },
    expectedErrors: {},
  },
  {
    description: "a 40 character code padded with spaces",
    overrides: { code: PADDED_CODE_TEXT },
    expectedErrors: {},
  },
  {
    description: "a code of 41 characters",
    overrides: { code: CODE_TOO_LONG_TEXT },
    expectedErrors: {
      code: UNIT_FORM_ERROR_COPY.CODE_TOO_LONG,
    },
  },
];

export const UNIT_STATUS_CASES: UnitFormRuleCase[] = [
  {
    description: "the decommissioned status",
    overrides: { status: UNIT_STATUS.DECOMMISSIONED },
    expectedErrors: {
      status: UNIT_FORM_ERROR_COPY.STATUS_INVALID,
    },
  },
];

export const UNIT_FUEL_CASES: UnitFormRuleCase[] = [
  ...["1", "20"].map((fuelMax) => ({
    description: `fuel max ${fuelMax}`,
    overrides: { fuelMax, fuelLevel: "" },
    expectedErrors: {},
  })),
  ...["0", "21", "1.5", "", "abc", "-1"].map((fuelMax) => ({
    description: `fuel max "${fuelMax}"`,
    overrides: { fuelMax, fuelLevel: "" },
    expectedErrors: {
      fuelMax: UNIT_FORM_ERROR_COPY.FUEL_MAX_INVALID,
    },
  })),
  {
    description: "no fuel reading (empty, not zero)",
    overrides: { fuelLevel: "" },
    expectedErrors: {},
  },
  {
    description: "a fuel reading of zero",
    overrides: { fuelLevel: "0" },
    expectedErrors: {},
  },
  {
    description: "a fuel reading equal to the max",
    overrides: { fuelMax: "6", fuelLevel: "6" },
    expectedErrors: {},
  },
  {
    description: "a fuel reading above the max",
    overrides: { fuelMax: "6", fuelLevel: "7" },
    expectedErrors: {
      fuelLevel: UNIT_FORM_ERROR_COPY.FUEL_LEVEL_ABOVE_MAX,
    },
  },
  {
    description: "a max lowered below the current reading",
    overrides: { fuelMax: "2", fuelLevel: "3" },
    expectedErrors: {
      fuelLevel: UNIT_FORM_ERROR_COPY.FUEL_LEVEL_ABOVE_MAX,
    },
  },
  ...["-1", "1.5", "abc"].map((fuelLevel) => ({
    description: `fuel reading "${fuelLevel}"`,
    overrides: { fuelLevel },
    expectedErrors: {
      fuelLevel: UNIT_FORM_ERROR_COPY.FUEL_LEVEL_INVALID,
    },
  })),
];

const buildDecimalCases = (
  field: "usageTotal" | "nextOilChangeAt"
): UnitFormRuleCase[] => [
  ...["0", "0.5", "12,25", "9999999999.99", ""].map(
    (text) => ({
      description: `${field} "${text}"`,
      overrides: { [field]: text },
      expectedErrors: {},
    })
  ),
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
];

export const UNIT_MOTORLESS_CASES: UnitFormRuleCase[] = [
  {
    description:
      "invalid fuel and usage on a category without motor",
    overrides: {
      fuelMax: "99",
      fuelLevel: "abc",
      usageTotal: "-1",
      nextOilChangeAt: "x",
    },
    rules: MOTORLESS_RULES,
    expectedErrors: {},
  },
];
