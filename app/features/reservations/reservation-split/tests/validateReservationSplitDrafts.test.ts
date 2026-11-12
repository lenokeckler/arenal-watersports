import { describe, expect, it } from "vitest";
import { validateReservationSplitDrafts } from "../utils/validateReservationSplitDrafts";
import { EXPECTED_SPLIT } from "./ReservationSplit.constants";
import { FILLED_STATE } from "./ReservationSplitDrafts.constants";
import { DRAFTS_ERROR_CASES } from "./validateReservationSplitDrafts.constants";

describe("validateReservationSplitDrafts", () => {
  it("accepts drafts the original can absorb", () => {
    expect(
      validateReservationSplitDrafts(
        EXPECTED_SPLIT,
        FILLED_STATE
      )
    ).toBeNull();
  });

  it.each(DRAFTS_ERROR_CASES)(
    "reports %s",
    (_name, state, expected) => {
      expect(
        validateReservationSplitDrafts(
          EXPECTED_SPLIT,
          state
        )
      ).toMatchObject(expected);
    }
  );
});
