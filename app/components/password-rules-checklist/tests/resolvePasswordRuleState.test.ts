import { describe, expect, it } from "vitest";
import { PASSWORD_RULE_STATE } from "../constants/PasswordRuleState.constants";
import { resolvePasswordRuleState } from "../utils/resolvePasswordRuleState";

describe("resolvePasswordRuleState", () => {
  it("returns met for a met rule when failures are hidden", () => {
    expect(resolvePasswordRuleState(true, false)).toBe(
      PASSWORD_RULE_STATE.MET
    );
  });

  it("returns met for a met rule when failures are shown", () => {
    expect(resolvePasswordRuleState(true, true)).toBe(
      PASSWORD_RULE_STATE.MET
    );
  });

  it("returns pending for an unmet rule when failures are hidden", () => {
    expect(resolvePasswordRuleState(false, false)).toBe(
      PASSWORD_RULE_STATE.PENDING
    );
  });

  it("returns failed for an unmet rule when failures are shown", () => {
    expect(resolvePasswordRuleState(false, true)).toBe(
      PASSWORD_RULE_STATE.FAILED
    );
  });
});
