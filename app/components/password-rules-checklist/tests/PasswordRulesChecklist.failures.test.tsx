import { describe, expect, it } from "vitest";
import { PASSWORD_RULE } from "@/app/constants";
import { PASSWORD_RULE_STATE } from "../constants/PasswordRuleState.constants";
import {
  ALL_PENDING_RESULTS,
  LOWERCASE_ONLY_RESULTS,
  RULES,
} from "./PasswordRulesChecklist.constants";
import { renderChecklist } from "./renderPasswordRulesChecklist";

describe("PasswordRulesChecklist failure display", () => {
  it("marks unmet rules as failed and keeps met ones when failures are shown", () => {
    const { page } = renderChecklist({
      results: LOWERCASE_ONLY_RESULTS,
      showFailures: true,
    });

    expect(page.getState(PASSWORD_RULE.UPPERCASE)).toBe(
      PASSWORD_RULE_STATE.FAILED
    );
    expect(page.getState(PASSWORD_RULE.LOWERCASE)).toBe(
      PASSWORD_RULE_STATE.MET
    );
  });

  it("shows the failed state on every unmet rule when failures are shown", () => {
    const { page } = renderChecklist({
      results: ALL_PENDING_RESULTS,
      showFailures: true,
    });

    RULES.forEach((rule) => {
      expect(page.getState(rule)).toBe(
        PASSWORD_RULE_STATE.FAILED
      );
    });
  });

  it("returns failed rules to pending when failures are hidden again", () => {
    const { page, rerenderWith } = renderChecklist({
      results: LOWERCASE_ONLY_RESULTS,
      showFailures: true,
    });

    rerenderWith({ showFailures: false });

    expect(page.getState(PASSWORD_RULE.UPPERCASE)).toBe(
      PASSWORD_RULE_STATE.PENDING
    );
    expect(page.getState(PASSWORD_RULE.LOWERCASE)).toBe(
      PASSWORD_RULE_STATE.MET
    );
  });

  it("keeps a met rule met when failures become shown", () => {
    const { page, rerenderWith } = renderChecklist({
      results: LOWERCASE_ONLY_RESULTS,
    });

    rerenderWith({ showFailures: true });

    expect(page.getState(PASSWORD_RULE.LOWERCASE)).toBe(
      PASSWORD_RULE_STATE.MET
    );
  });
});
