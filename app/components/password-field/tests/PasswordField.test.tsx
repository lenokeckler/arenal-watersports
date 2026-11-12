import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import PasswordField from "../PasswordField";
import type { PasswordFieldProps } from "../models/PasswordFieldProps.interface";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  AUTOCOMPLETE_ATTRIBUTE,
  DESCRIBED_BY_ID,
  ERROR_MESSAGE,
  FIELD_AUTOCOMPLETE,
  FIELD_NAME,
  FIELD_PLACEHOLDER,
  FIELD_VALUE,
  PASSWORD_TYPE,
  READONLY_ATTRIBUTE,
} from "./PasswordField.constants";
import { DEFAULT_PASSWORD_FIELD_PROPS } from "./PasswordField.defaults.constants";
import { createPasswordFieldPage } from "./PasswordField.page";

const renderField = (
  overrides: Partial<PasswordFieldProps> = {}
) => {
  render(
    <PasswordField
      {...DEFAULT_PASSWORD_FIELD_PROPS}
      {...overrides}
    />
  );
  return createPasswordFieldPage();
};

describe("PasswordField", () => {
  it("renders a password input named and identified by its name", () => {
    const page = renderField();

    expect(page.getInput()).toHaveAttribute(
      "type",
      PASSWORD_TYPE
    );
    expect(page.getInput()).toHaveAttribute(
      "name",
      FIELD_NAME
    );
    expect(page.getInput()).toHaveAttribute(
      "id",
      FIELD_NAME
    );
    expect(page.getInput()).toHaveValue(FIELD_VALUE);
    expect(page.getInput()).toHaveAttribute(
      "placeholder",
      FIELD_PLACEHOLDER
    );
  });

  it("forwards autoComplete and describedBy", () => {
    const page = renderField({
      describedBy: DESCRIBED_BY_ID,
    });

    expect(page.getInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      FIELD_AUTOCOMPLETE
    );
    expect(page.getInput()).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      DESCRIBED_BY_ID
    );
  });

  it("shows the error text only when there is an error", () => {
    const page = renderField({ error: ERROR_MESSAGE });

    expect(
      page.queryText(ERROR_MESSAGE)
    ).toBeInTheDocument();
  });

  it("shows no error text without an error", () => {
    const page = renderField();

    expect(page.queryText(ERROR_MESSAGE)).toBeNull();
  });

  it("becomes read-only while pending", () => {
    const page = renderField({ isPending: true });

    expect(page.getInput()).toHaveAttribute(
      READONLY_ATTRIBUTE
    );
  });

  it("is editable when not pending", () => {
    const page = renderField();

    expect(page.getInput()).not.toHaveAttribute(
      READONLY_ATTRIBUTE
    );
  });
});
