import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  AUTOCOMPLETE,
  PASSWORD_RULE,
} from "@/app/constants";
import { PASSWORD_RULE_STATE } from "@/app/components/password-rules-checklist/constants/PasswordRuleState.constants";
import NewPasswordGroup from "../NewPasswordGroup";
import type { NewPasswordGroupProps } from "../models/NewPasswordGroupProps.interface";
import {
  NEW_PASSWORD_GROUP_DESCRIBED_BY,
  NEW_PASSWORD_GROUP_RULES_ID,
} from "../constants/NewPasswordGroup.constants";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  AUTOCOMPLETE_ATTRIBUTE,
  DEFAULT_NEW_PASSWORD_GROUP_PROPS,
  FIELD_NAME,
  DESCRIBED_BY_ID_COUNT,
  ID_ATTRIBUTE,
  RULE_COUNT,
} from "./NewPasswordGroup.constants";
import { createNewPasswordGroupPage } from "./NewPasswordGroup.page";

const renderGroup = (
  props: Partial<NewPasswordGroupProps> = {}
) => {
  render(
    <NewPasswordGroup
      {...DEFAULT_NEW_PASSWORD_GROUP_PROPS}
      {...props}
    />
  );
  return createNewPasswordGroupPage();
};

describe("NewPasswordGroup", () => {
  it("shows every rule before anything is typed", () => {
    const page = renderGroup();

    expect(page.getItems()).toHaveLength(RULE_COUNT);
    expect(page.getList()).toHaveAttribute(
      ID_ATTRIBUTE,
      NEW_PASSWORD_GROUP_RULES_ID
    );
  });

  it("wires the new password input to the rules", () => {
    const page = renderGroup();

    expect(page.getInput()).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      NEW_PASSWORD_GROUP_DESCRIBED_BY
    );
    expect(page.getInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.NEW_PASSWORD
    );
    expect(page.getInput()).toHaveAttribute(
      ID_ATTRIBUTE,
      FIELD_NAME
    );
  });

  it("points the input at elements that exist", () => {
    const page = renderGroup();
    const ids = (
      page
        .getInput()
        .getAttribute(ARIA_DESCRIBEDBY_ATTRIBUTE) ?? ""
    ).split(" ");

    expect(ids).toHaveLength(DESCRIBED_BY_ID_COUNT);
    ids.forEach((id) => {
      expect(page.getReferencedElement(id)).not.toBeNull();
    });
  });

  it("keeps the rules pending when failures are hidden", () => {
    const page = renderGroup({ showFailures: false });

    expect(page.getState(PASSWORD_RULE.LENGTH)).toBe(
      PASSWORD_RULE_STATE.PENDING
    );
  });

  it("marks unmet rules as failed when failures are shown", () => {
    const page = renderGroup({ showFailures: true });

    expect(page.getState(PASSWORD_RULE.LENGTH)).toBe(
      PASSWORD_RULE_STATE.FAILED
    );
  });
});
