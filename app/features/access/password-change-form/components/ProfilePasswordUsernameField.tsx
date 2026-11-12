import { AUTOCOMPLETE, INPUT_TYPES } from "@/app/constants";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import { PROFILE_PASSWORD_USERNAME_FIELD } from "../constants/ProfilePasswordUsernameField.constants";
import type { ProfilePasswordUsernameFieldProps } from "../models/ProfilePasswordUsernameFieldProps.interface";

const ProfilePasswordUsernameField = ({
  username,
}: ProfilePasswordUsernameFieldProps): React.JSX.Element => (
  <input
    id={PROFILE_PASSWORD_USERNAME_FIELD.ID}
    name={PROFILE_PASSWORD_USERNAME_FIELD.NAME}
    type={INPUT_TYPES.TEXT}
    autoComplete={AUTOCOMPLETE.USERNAME}
    value={username}
    className={SCREEN_READER_ONLY_CLASS}
    tabIndex={PROFILE_PASSWORD_USERNAME_FIELD.TAB_INDEX}
    aria-hidden
    readOnly
  />
);

export default ProfilePasswordUsernameField;
