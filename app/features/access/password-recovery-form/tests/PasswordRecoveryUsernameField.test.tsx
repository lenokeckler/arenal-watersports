import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_TYPES,
  PASSWORD_RECOVERY_FIELD,
} from "@/app/constants";
import PasswordRecoveryUsernameField from "../components/PasswordRecoveryUsernameField";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "../constants/PasswordRecoveryRequestCopy.constants";
import {
  AUTOCAPITALIZE_ATTRIBUTE,
  AUTOCOMPLETE_ATTRIBUTE,
  FALSE_VALUE,
  ID_ATTRIBUTE,
  NAME_ATTRIBUTE,
  PLACEHOLDER_PROPERTY,
  READONLY_PROPERTY,
  SPELLCHECK_ATTRIBUTE,
  TYPE_ATTRIBUTE,
  TYPED_USERNAME,
} from "./passwordRecoveryScreen.constants";
import { renderPasswordRecoveryField } from "./renderPasswordRecoveryField";

const getInput = (): HTMLInputElement =>
  screen.getByLabelText<HTMLInputElement>(
    PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_LABEL
  );

describe("PasswordRecoveryUsernameField", () => {
  it("names the field with the recovery username field", () => {
    renderPasswordRecoveryField(
      PasswordRecoveryUsernameField
    );

    expect(getInput()).toHaveAttribute(
      ID_ATTRIBUTE,
      PASSWORD_RECOVERY_FIELD.USERNAME
    );
    expect(getInput()).toHaveAttribute(
      NAME_ATTRIBUTE,
      PASSWORD_RECOVERY_FIELD.USERNAME
    );
  });

  it("asks the phone for a username without capitals or correction", () => {
    renderPasswordRecoveryField(
      PasswordRecoveryUsernameField
    );

    expect(getInput()).toHaveAttribute(
      TYPE_ATTRIBUTE,
      INPUT_TYPES.TEXT
    );
    expect(getInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.USERNAME
    );
    expect(getInput()).toHaveAttribute(
      AUTOCAPITALIZE_ATTRIBUTE,
      AUTOCAPITALIZE.NONE
    );
    expect(getInput()).toHaveAttribute(
      SPELLCHECK_ATTRIBUTE,
      FALSE_VALUE
    );
  });

  it("shows the value and the placeholder from the copy", () => {
    renderPasswordRecoveryField(
      PasswordRecoveryUsernameField
    );

    expect(getInput()).toHaveValue(TYPED_USERNAME);
    expect(getInput()).toHaveProperty(
      PLACEHOLDER_PROPERTY,
      PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_PLACEHOLDER
    );
  });

  it("is editable while idle and read-only while pending", () => {
    const { unmount } = renderPasswordRecoveryField(
      PasswordRecoveryUsernameField
    );
    expect(getInput()).toHaveProperty(
      READONLY_PROPERTY,
      false
    );
    unmount();

    renderPasswordRecoveryField(
      PasswordRecoveryUsernameField,
      { isPending: true }
    );
    expect(getInput()).toHaveProperty(
      READONLY_PROPERTY,
      true
    );
  });
});
