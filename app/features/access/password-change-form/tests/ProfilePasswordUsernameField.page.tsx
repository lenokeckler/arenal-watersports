import { render, screen } from "@testing-library/react";
import ProfilePasswordUsernameField from "../components/ProfilePasswordUsernameField";
import { USERNAME_VALUE } from "./ProfilePasswordUsernameField.constants";

export const renderProfilePasswordUsernameField = () => {
  render(
    <ProfilePasswordUsernameField
      username={USERNAME_VALUE}
    />
  );

  return {
    getUsernameInput: () =>
      screen.getByDisplayValue<HTMLInputElement>(
        USERNAME_VALUE
      ),
  };
};
