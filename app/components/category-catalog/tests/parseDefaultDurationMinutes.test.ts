import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { DEFAULT_DURATION_MINUTES_MAX } from "../constants/CategoryBehaviorValidation.constants";
import { parseDefaultDurationMinutes } from "../utils/parseDefaultDurationMinutes";
import { BLANK_DURATION_TEXT } from "./CategoryBehaviorFormRules.constants";

const ABOVE_MAXIMUM_DURATION_TEXT = `${DEFAULT_DURATION_MINUTES_MAX + 1}`;
const MAXIMUM_DURATION_TEXT = `${DEFAULT_DURATION_MINUTES_MAX}`;
const ONE_HOUR_DURATION_MINUTES = 60;
const ONE_HOUR_DURATION_TEXT = `${ONE_HOUR_DURATION_MINUTES}`;
const PADDED_ONE_HOUR_DURATION_TEXT = ` ${ONE_HOUR_DURATION_TEXT} `;

const REJECTED_DURATION_TEXTS = [
  { description: "empty", durationText: STRING.Empty },
  {
    description: "whitespace only",
    durationText: BLANK_DURATION_TEXT,
  },
  { description: "non-numeric", durationText: "abc" },
  { description: "zero", durationText: "0" },
  { description: "negative", durationText: "-5" },
  { description: "non-integer", durationText: "1.5" },
  {
    description: "above the maximum",
    durationText: ABOVE_MAXIMUM_DURATION_TEXT,
  },
];

const ACCEPTED_DURATION_TEXTS = [
  {
    description: "a plain number",
    durationText: ONE_HOUR_DURATION_TEXT,
    expectedMinutes: ONE_HOUR_DURATION_MINUTES,
  },
  {
    description: "a number surrounded by whitespace",
    durationText: PADDED_ONE_HOUR_DURATION_TEXT,
    expectedMinutes: ONE_HOUR_DURATION_MINUTES,
  },
  {
    description: "the maximum itself",
    durationText: MAXIMUM_DURATION_TEXT,
    expectedMinutes: DEFAULT_DURATION_MINUTES_MAX,
  },
];

describe("parseDefaultDurationMinutes", () => {
  it.each(REJECTED_DURATION_TEXTS)(
    "returns null for a $description duration",
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
