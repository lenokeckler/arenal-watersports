import { describe, expect, it } from "vitest";
import { PASSWORD_RULES_COPY } from "../constants/PasswordRulesCopy.constants";
import { resolvePasswordRulesSummary } from "../utils/resolvePasswordRulesSummary";
import {
  ONE_MET_RULE,
  TOTAL_RULES,
  ZERO_MET_RULES,
} from "./PasswordRulesChecklist.constants";

describe("resolvePasswordRulesSummary", () => {
  it("returns the complete summary when every rule is met", () => {
    expect(
      resolvePasswordRulesSummary(TOTAL_RULES, TOTAL_RULES)
    ).toBe(PASSWORD_RULES_COPY.SUMMARY_ALL(TOTAL_RULES));
  });

  it("returns the partial summary when some rules are met", () => {
    expect(
      resolvePasswordRulesSummary(ONE_MET_RULE, TOTAL_RULES)
    ).toBe(
      PASSWORD_RULES_COPY.SUMMARY_PARTIAL(
        ONE_MET_RULE,
        TOTAL_RULES
      )
    );
  });

  it("returns the partial summary when no rule is met", () => {
    expect(
      resolvePasswordRulesSummary(
        ZERO_MET_RULES,
        TOTAL_RULES
      )
    ).toBe(
      PASSWORD_RULES_COPY.SUMMARY_PARTIAL(
        ZERO_MET_RULES,
        TOTAL_RULES
      )
    );
  });
});
