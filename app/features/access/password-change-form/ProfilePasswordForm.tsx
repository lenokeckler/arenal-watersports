import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import { readSignedInUsername } from "@/app/services/authentication";
import { submitOwnPasswordChange } from "./actions/submitOwnPasswordChange";
import ProfilePasswordBackLink from "./components/ProfilePasswordBackLink";
import ProfilePasswordFormHeading from "./components/ProfilePasswordFormHeading";
import ProfilePasswordUsernameField from "./components/ProfilePasswordUsernameField";
import { PROFILE_PASSWORD_ERROR_COPY } from "./constants/ProfilePasswordErrorCopy.constants";
import { PROFILE_PASSWORD_FORM_COPY } from "./constants/ProfilePasswordFormCopy.constants";
import PasswordChangeFormView from "./PasswordChangeFormView";

const ProfilePasswordForm =
  async (): Promise<React.JSX.Element> => {
    const username = await readSignedInUsername();

    if (!username) {
      redirect(PATHS.ACCESS.LOGIN);
    }

    return (
      <PasswordChangeFormView
        action={submitOwnPasswordChange}
        beforeFields={
          <ProfilePasswordUsernameField
            username={username}
          />
        }
        copy={PROFILE_PASSWORD_FORM_COPY}
        errorCopy={PROFILE_PASSWORD_ERROR_COPY}
        heading={<ProfilePasswordFormHeading />}
        footer={<ProfilePasswordBackLink />}
      />
    );
  };

export default ProfilePasswordForm;
