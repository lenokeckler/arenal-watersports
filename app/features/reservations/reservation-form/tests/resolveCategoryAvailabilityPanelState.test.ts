import { describe, expect, it } from "vitest";
import { resolveCategoryAvailabilityPanelState } from "../utils/resolveCategoryAvailabilityPanelState";
import { CATEGORY_AVAILABILITY_PANEL_STATE_CASES } from "./resolveCategoryAvailabilityPanelState.constants";

describe("resolveCategoryAvailabilityPanelState", () => {
  it.each(CATEGORY_AVAILABILITY_PANEL_STATE_CASES)(
    "returns $caseName",
    ({ input, expectedState }) => {
      expect(
        resolveCategoryAvailabilityPanelState(input)
      ).toBe(expectedState);
    }
  );
});
