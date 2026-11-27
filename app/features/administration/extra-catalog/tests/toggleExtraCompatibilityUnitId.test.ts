import { describe, expect, it } from "vitest";
import { toggleExtraCompatibilityUnitId } from "../utils/toggleExtraCompatibilityUnitId";
import {
  FREE_UNIT_ID,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";

describe("toggleExtraCompatibilityUnitId", () => {
  it("adds a unit that is not selected", () => {
    expect(
      toggleExtraCompatibilityUnitId(
        [LINKED_UNIT_ID],
        FREE_UNIT_ID
      )
    ).toStrictEqual([LINKED_UNIT_ID, FREE_UNIT_ID]);
  });

  it("removes a unit that is selected and keeps the others", () => {
    expect(
      toggleExtraCompatibilityUnitId(
        [LINKED_UNIT_ID, FREE_UNIT_ID],
        LINKED_UNIT_ID
      )
    ).toStrictEqual([FREE_UNIT_ID]);
  });

  it("does not change the list it receives", () => {
    const selectedUnitIds = [LINKED_UNIT_ID];

    toggleExtraCompatibilityUnitId(
      selectedUnitIds,
      FREE_UNIT_ID
    );

    expect(selectedUnitIds).toStrictEqual([LINKED_UNIT_ID]);
  });
});
