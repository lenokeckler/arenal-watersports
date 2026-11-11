import { describe, expect, it } from "vitest";
import { formatRemainingTime } from "../utils/formatRemainingTime";
import { getRemainingMinutes } from "../utils/getRemainingMinutes";
import {
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
