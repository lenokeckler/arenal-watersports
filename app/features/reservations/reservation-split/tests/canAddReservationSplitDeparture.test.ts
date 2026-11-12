import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReservationSplitDrafts } from "../hooks/useReservationSplitDrafts";
import { EXPECTED_SPLIT } from "./ReservationSplit.constants";

const TWO_PIECE_SPLIT = {
  ...EXPECTED_SPLIT,
  items: [{ ...EXPECTED_SPLIT.items[1], pieces: 2 }],
};

describe("canAddDeparture", () => {
  it("is false when a second departure could never hold equipment", () => {
    const { result } = renderHook(() =>
      useReservationSplitDrafts(TWO_PIECE_SPLIT)
    );

    expect(result.current.canAddDeparture).toBe(false);
  });
});
