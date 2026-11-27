import { describe, expect, it } from "vitest";
import { hasExtraCompatibilityChanges } from "../utils/hasExtraCompatibilityChanges";
import {
  FREE_UNIT_ID,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";

describe("hasExtraCompatibilityChanges", () => {
  it("is false when the same units are selected", () => {
    expect(
      hasExtraCompatibilityChanges(
        [LINKED_UNIT_ID],
        [LINKED_UNIT_ID]
      )
    ).toBe(false);
  });

  it("is false when the same units are selected in another order", () => {
    expect(
      hasExtraCompatibilityChanges(
        [LINKED_UNIT_ID, FREE_UNIT_ID],
        [FREE_UNIT_ID, LINKED_UNIT_ID]
      )
    ).toBe(false);
  });

  it("is true when a unit was added", () => {
    expect(
      hasExtraCompatibilityChanges(
        [LINKED_UNIT_ID],
        [LINKED_UNIT_ID, FREE_UNIT_ID]
      )
    ).toBe(true);
  });

  it("is true when a unit was removed", () => {
    expect(
      hasExtraCompatibilityChanges(
        [LINKED_UNIT_ID, FREE_UNIT_ID],
        [LINKED_UNIT_ID]
      )
    ).toBe(true);
  });

  it("is true when one unit replaced another", () => {
    expect(
      hasExtraCompatibilityChanges(
        [LINKED_UNIT_ID],
        [FREE_UNIT_ID]
      )
    ).toBe(true);
  });
});
