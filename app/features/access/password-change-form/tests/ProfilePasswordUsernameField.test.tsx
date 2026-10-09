import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AUTOCOMPLETE } from "@/app/constants";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import ProfilePasswordUsernameField from "../components/ProfilePasswordUsernameField";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { PROFILE_PASSWORD_USERNAME_FIELD } from "../constants/ProfilePasswordUsernameField.constants";
import {
  ARIA_HIDDEN_ATTRIBUTE,
  AUTOCOMPLETE_ATTRIBUTE,
  ARIA_HIDDEN_VALUE,
  READONLY_ATTRIBUTE,
  TAB_INDEX_ATTRIBUTE,
  USERNAME_FIELD_QUERY,
  USERNAME_VALUE,
} from "./ProfilePasswordUsernameField.constants";

const renderField = (): HTMLInputElement => {
  const { container } = render(
    <ProfilePasswordUsernameField
      username={USERNAME_VALUE}
    />
  );
  return container.querySelector(
    USERNAME_FIELD_QUERY
  ) as HTMLInputElement;
};

describe("ProfilePasswordUsernameField", () => {
  it("offers the signed-in username to password managers", () => {
    const input = renderField();

    expect(input).toHaveValue(USERNAME_VALUE);
    expect(input).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.USERNAME
    );
    expect(input).toHaveAttribute(READONLY_ATTRIBUTE);
  });

  it("is not one of the three password fields", () => {
    const input = renderField();

    expect(
      Object.values(PASSWORD_CHANGE_FIELD)
    ).not.toContain(input.name);
    expect(input.name).toBe(
      PROFILE_PASSWORD_USERNAME_FIELD.NAME
    );
  });

  it("stays out of sight, focus order and the accessibility tree", () => {
    const input = renderField();

    expect(input).toHaveClass(SCREEN_READER_ONLY_CLASS);
    expect(input).toHaveAttribute(
      TAB_INDEX_ATTRIBUTE,
      String(PROFILE_PASSWORD_USERNAME_FIELD.TAB_INDEX)
    );
    expect(input).toHaveAttribute(
      ARIA_HIDDEN_ATTRIBUTE,
      ARIA_HIDDEN_VALUE
    );
  });
});
