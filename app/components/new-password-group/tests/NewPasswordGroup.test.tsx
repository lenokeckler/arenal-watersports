import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { AUTOCOMPLETE } from "@/app/constants";
import NewPasswordGroup from "../NewPasswordGroup";
import {
  NEW_PASSWORD_GROUP_DESCRIBED_BY,
  NEW_PASSWORD_GROUP_RULES_ID,
} from "../constants/NewPasswordGroup.constants";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  AUTOCOMPLETE_ATTRIBUTE,
  DEFAULT_NEW_PASSWORD_GROUP_PROPS,
  FIELD_NAME,
  ID_ATTRIBUTE,
  RULE_COUNT,
} from "./NewPasswordGroup.constants";
import { createNewPasswordGroupPage } from "./NewPasswordGroup.page";

const renderGroup = () => {
  render(
    <NewPasswordGroup
      {...DEFAULT_NEW_PASSWORD_GROUP_PROPS}
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
});
