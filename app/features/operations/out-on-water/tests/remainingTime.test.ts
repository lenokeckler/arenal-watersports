import { describe, expect, it } from "vitest";
import { formatRemainingTime } from "../utils/formatRemainingTime";
import { formatDelay } from "../utils/formatDelay";
import { getRemainingMinutes } from "../utils/getRemainingMinutes";
import {
  DELAY_CASES,
  FORMAT_CASES,
  OUT_ON_WATER_NOW,
  REMAINING_CASES,
} from "./OutOnWater.constants";

describe("getRemainingMinutes", () => {
  it.each(REMAINING_CASES)(
    "counts $minutes minutes until $endsAt",
    ({ endsAt, minutes }) => {
      expect(
        getRemainingMinutes(endsAt, OUT_ON_WATER_NOW)
      ).toBe(minutes);
    }
  );
});

describe("formatRemainingTime", () => {
  it.each(FORMAT_CASES)(
    "writes $minutes minutes as $text",
    ({ minutes, text }) => {
      expect(formatRemainingTime(minutes)).toBe(text);
    }
  );
});

describe("formatDelay", () => {
  it.each(DELAY_CASES)(
    "writes $minutes minutes late as $text",
    ({ minutes, text }) => {
      expect(formatDelay(minutes)).toBe(text);
    }
  );
});
