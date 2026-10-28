import { submitOwnPasswordChange } from "./actions/submitOwnPasswordChange";
import ProfilePasswordBackLink from "./components/ProfilePasswordBackLink";
import ProfilePasswordFormHeading from "./components/ProfilePasswordFormHeading";
import { PROFILE_PASSWORD_ERROR_COPY } from "./constants/ProfilePasswordErrorCopy.constants";
import { PROFILE_PASSWORD_FORM_COPY } from "./constants/ProfilePasswordFormCopy.constants";
import PasswordChangeFormView from "./PasswordChangeFormView";

const ProfilePasswordForm = (): React.JSX.Element => (
  <PasswordChangeFormView
    action={submitOwnPasswordChange}
    copy={PROFILE_PASSWORD_FORM_COPY}
    errorCopy={PROFILE_PASSWORD_ERROR_COPY}
    heading={<ProfilePasswordFormHeading />}
    footer={<ProfilePasswordBackLink />}
  />
);

export default ProfilePasswordForm;
