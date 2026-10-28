import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { PASSWORD_RULE } from "@/app/constants";
import { PASSWORD_RULE_STATE } from "../constants/PasswordRuleState.constants";
import { PASSWORD_RULES_COPY } from "../constants/PasswordRulesCopy.constants";
import {
  CHECKLIST_ID,
  LABELLEDBY_ATTRIBUTE,
  LOWERCASE_AND_DIGIT_RESULTS,
  LOWERCASE_ONLY_RESULTS,
  RULES,
  TITLE_ID,
  TOTAL_RULES,
} from "./PasswordRulesChecklist.constants";
import { renderChecklist } from "./renderPasswordRulesChecklist";

describe("PasswordRulesChecklist states", () => {
  it("reminds the worker not to use a common password", () => {
    renderChecklist();

    expect(
      screen.getByText(
        PASSWORD_RULES_COPY.COMMON_PASSWORD_HINT
      )
    ).toBeInTheDocument();
  });

  it("shows the five rules pending before typing", () => {
    const { page } = renderChecklist();

    expect(page.getItems()).toHaveLength(TOTAL_RULES);
    RULES.forEach((rule) => {
      expect(page.getState(rule)).toBe(
        PASSWORD_RULE_STATE.PENDING
      );
    });
  });

  it("marks only the satisfied rules as met", () => {
    const { page } = renderChecklist({
      results: LOWERCASE_AND_DIGIT_RESULTS,
    });

    expect(page.getState(PASSWORD_RULE.LOWERCASE)).toBe(
      PASSWORD_RULE_STATE.MET
    );
    expect(page.getState(PASSWORD_RULE.DIGIT)).toBe(
      PASSWORD_RULE_STATE.MET
    );
    expect(page.getState(PASSWORD_RULE.SYMBOL)).toBe(
      PASSWORD_RULE_STATE.PENDING
    );
  });

  it("keeps unmet rules pending when failures are hidden", () => {
    const { page } = renderChecklist({
      results: LOWERCASE_ONLY_RESULTS,
      showFailures: false,
    });

    expect(page.getState(PASSWORD_RULE.UPPERCASE)).toBe(
      PASSWORD_RULE_STATE.PENDING
    );
    expect(page.getState(PASSWORD_RULE.UPPERCASE)).not.toBe(
      PASSWORD_RULE_STATE.FAILED
    );
  });

  it("exposes the id on the list that holds the rules", () => {
    const { page } = renderChecklist();

    expect(page.getListById(CHECKLIST_ID)).toBe(
      page.getList()
    );
    expect(page.getListById(CHECKLIST_ID)).toContainElement(
      page.getItems()[0]
    );
  });

  it("labels the list with the title element", () => {
    const { page } = renderChecklist();

    expect(page.getTitle(TITLE_ID)).toHaveTextContent(
      PASSWORD_RULES_COPY.TITLE
    );
    expect(page.getList()).toHaveAttribute(
      LABELLEDBY_ATTRIBUTE,
      TITLE_ID
    );
  });

  it("lists the five rules in password rule order", () => {
    const { page } = renderChecklist();

    page.getItems().forEach((item, index) => {
      expect(item).toHaveTextContent(
        PASSWORD_RULES_COPY.RULE[RULES[index]]
      );
    });
  });

  it("keeps the rule order when the results change", () => {
    const { page, rerenderWith } = renderChecklist();

    rerenderWith({ results: LOWERCASE_AND_DIGIT_RESULTS });

    page.getItems().forEach((item, index) => {
      expect(item).toHaveTextContent(
        PASSWORD_RULES_COPY.RULE[RULES[index]]
      );
    });
  });

  it("renders every rule inside the described list", () => {
    const { page } = renderChecklist();

    RULES.forEach((rule) => {
      expect(page.getList()).toHaveTextContent(
        PASSWORD_RULES_COPY.RULE[rule]
      );
    });
  });

  it("keeps the live status outside the described list", () => {
    const { page } = renderChecklist();

    expect(page.getList()).not.toContainElement(
      page.getStatus()
    );
  });
});
