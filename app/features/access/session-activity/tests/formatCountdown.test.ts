import { describe, expect, it } from "vitest";
import { formatCountdown } from "../utils/formatCountdown";
import { COUNTDOWN_CASES } from "./SessionActivity.constants";

describe("formatCountdown", () => {
  it.each(COUNTDOWN_CASES)(
    "shows %i seconds as %s",
    (seconds, expected) => {
      expect(formatCountdown(seconds)).toBe(expected);
    }
  );
});
