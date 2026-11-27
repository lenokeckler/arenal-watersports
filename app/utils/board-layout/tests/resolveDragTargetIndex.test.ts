import { describe, expect, it } from "vitest";
import { resolveDragTargetIndex } from "../resolveDragTargetIndex";
import {
  FIRST_INDEX,
  NOT_FOUND_INDEX,
  POINTER_ABOVE_LIST,
  POINTER_BELOW_LIST,
  POINTER_IN_GAP_AFTER_FIRST_SLOT,
  POINTER_INSIDE_FIRST_SLOT,
  POINTER_INSIDE_LAST_SLOT,
  POINTER_INSIDE_SECOND_SLOT,
  SECOND_INDEX,
  SLOT_COUNT,
  SLOT_GAP,
  SLOT_HEIGHT,
} from "./boardLayout.constants";

const SLOTS = Array.from(
  { length: SLOT_COUNT },
  (_, index) => ({
    bottom: index * (SLOT_HEIGHT + SLOT_GAP) + SLOT_HEIGHT,
    top: index * (SLOT_HEIGHT + SLOT_GAP),
  })
);

describe("resolveDragTargetIndex", () => {
  it("returns the slot under the pointer", () => {
    expect(
      resolveDragTargetIndex(
        SLOTS,
        POINTER_INSIDE_FIRST_SLOT
      )
    ).toBe(FIRST_INDEX);
    expect(
      resolveDragTargetIndex(
        SLOTS,
        POINTER_INSIDE_SECOND_SLOT
      )
    ).toBe(SECOND_INDEX);
    expect(
      resolveDragTargetIndex(
        SLOTS,
        POINTER_INSIDE_LAST_SLOT
      )
    ).toBe(SLOT_COUNT - 1);
  });

  it("keeps a pointer in the gap between two rows on the row above", () => {
    expect(
      resolveDragTargetIndex(
        SLOTS,
        POINTER_IN_GAP_AFTER_FIRST_SLOT
      )
    ).toBe(FIRST_INDEX);
  });

  it("clamps a pointer above the list to the first slot", () => {
    expect(
      resolveDragTargetIndex(SLOTS, POINTER_ABOVE_LIST)
    ).toBe(FIRST_INDEX);
  });

  it("clamps a pointer below the list to the last slot", () => {
    expect(
      resolveDragTargetIndex(SLOTS, POINTER_BELOW_LIST)
    ).toBe(SLOT_COUNT - 1);
  });

  it("reports no target when there are no slots", () => {
    expect(
      resolveDragTargetIndex([], POINTER_INSIDE_FIRST_SLOT)
    ).toBe(NOT_FOUND_INDEX);
  });
});
