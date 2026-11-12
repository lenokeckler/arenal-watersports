import { describe, expect, it } from "vitest";
import { EXTRA_REMOVAL_DIAGNOSTICS } from "../constants/ExtraRemovalDiagnostics.constants";
import { EXTRA_REMOVAL_OUTCOME } from "../constants/ExtraRemovalOutcome.constants";
import { parseExtraRemovalOutcome } from "../utils/parseExtraRemovalOutcome";
import { UNKNOWN_REMOVAL_OUTCOME } from "./Extra.constants";

describe("parseExtraRemovalOutcome", () => {
  it.each(Object.values(EXTRA_REMOVAL_OUTCOME))(
    "returns the %s outcome as it came",
    (outcome) => {
      expect(parseExtraRemovalOutcome(outcome)).toBe(
        outcome
      );
    }
  );

  it("throws with the returned value as cause when it is outside the closed set", () => {
    expect(() =>
      parseExtraRemovalOutcome(UNKNOWN_REMOVAL_OUTCOME)
    ).toThrow(
      expect.objectContaining({
        message: EXTRA_REMOVAL_DIAGNOSTICS.UNKNOWN_OUTCOME,
        cause: UNKNOWN_REMOVAL_OUTCOME,
      })
    );
  });
});
