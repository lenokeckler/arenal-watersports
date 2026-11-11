import { describe, expect, it } from "vitest";
import { isReservationSplitInput } from "../utils/isReservationSplitInput";
import { VALID_SPLIT_INPUT } from "./ReservationSplit.constants";
import { MALFORMED_INPUT_CASES } from "./isReservationSplitInput.constants";

describe("isReservationSplitInput", () => {
  it("accepts a correctly shaped split input", () => {
    expect(isReservationSplitInput(VALID_SPLIT_INPUT)).toBe(
      true
    );
  });

  it.each(MALFORMED_INPUT_CASES)(
    "rejects %s",
    (_name, input) => {
      expect(isReservationSplitInput(input)).toBe(false);
    }
  );
});
