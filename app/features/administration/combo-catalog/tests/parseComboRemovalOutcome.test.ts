import { describe, expect, it } from "vitest";
import { COMBO_CATALOG_DIAGNOSTICS } from "../constants/ComboCatalogDiagnostics.constants";
import { COMBO_REMOVAL_OUTCOME } from "../constants/ComboRemovalOutcome.constants";
import { parseComboRemovalOutcome } from "../utils/parseComboRemovalOutcome";
import { UNKNOWN_REMOVAL_OUTCOME } from "./Combo.constants";

describe("parseComboRemovalOutcome", () => {
  it.each(Object.values(COMBO_REMOVAL_OUTCOME))(
    "accepts the %s outcome",
    (outcome) => {
      expect(parseComboRemovalOutcome(outcome)).toBe(
        outcome
      );
    }
  );

  it("throws with the returned value as cause for an unknown outcome", () => {
    expect(() =>
      parseComboRemovalOutcome(UNKNOWN_REMOVAL_OUTCOME)
    ).toThrow(
      COMBO_CATALOG_DIAGNOSTICS.UNKNOWN_REMOVAL_OUTCOME
    );
  });
});
