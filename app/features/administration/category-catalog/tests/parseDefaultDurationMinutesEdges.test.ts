import { describe, expect, it } from "vitest";
import { parseDefaultDurationMinutes } from "../utils/parseDefaultDurationMinutes";
import { ONE_HOUR_DURATION_MINUTES } from "./CategoryBehaviorFormRules.constants";

const HUGE_DIGIT_COUNT = 400;
const LEADING_ZEROS_DURATION_MINUTES = 7;

const REJECTED_DURATION_TEXTS = [
  { description: "negative zero", durationText: "-0" },
  {
    description: "arabic-indic digits",
    durationText: "٣",
  },
  {
    description: "a digit string beyond the float range",
    durationText: "9".repeat(HUGE_DIGIT_COUNT),
  },
  { description: "Infinity", durationText: "Infinity" },
  {
    description: "negative Infinity",
    durationText: "-Infinity",
  },
  { description: "NaN", durationText: "NaN" },
  { description: "a decimal comma", durationText: "1,5" },
  {
    description: "a number followed by a unit",
    durationText: "60 min",
  },
  {
    description: "a zero-width space prefix",
    durationText: "​60",
  },
  { description: "two numbers", durationText: "60 60" },
];

const ACCEPTED_DURATION_TEXTS = [
  {
    description: "tab and newline padding",
    durationText: "\t\n60\r\n",
    expectedMinutes: ONE_HOUR_DURATION_MINUTES,
  },
  {
    description: "a no-break space padding",
    durationText: " 60 ",
    expectedMinutes: ONE_HOUR_DURATION_MINUTES,
  },
  {
    description: "leading zeros",
    durationText: "007",
    expectedMinutes: LEADING_ZEROS_DURATION_MINUTES,
  },
];

describe("parseDefaultDurationMinutes edge texts", () => {
  it.each(REJECTED_DURATION_TEXTS)(
    "returns null for $description",
    ({ durationText }) => {
      expect(
        parseDefaultDurationMinutes(durationText)
      ).toBeNull();
    }
  );

  it.each(ACCEPTED_DURATION_TEXTS)(
    "returns the minutes for $description",
    ({ durationText, expectedMinutes }) => {
      expect(
        parseDefaultDurationMinutes(durationText)
      ).toBe(expectedMinutes);
    }
  );
});
