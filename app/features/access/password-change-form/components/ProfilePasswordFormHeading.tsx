import { Text } from "@/app/components";
import ScreenHeader from "@/app/components/screen-header/ScreenHeader";
import {
  PROFILE_SCREEN_LOGO_ALT,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { PROFILE_PASSWORD_FORM_COPY } from "../constants/ProfilePasswordFormCopy.constants";
import {
  PASSWORD_CHANGE_HEADING_BLOCK_CLASS,
  PASSWORD_CHANGE_INSTRUCTION_CLASS,
} from "../styles/PasswordChangeForm.styles";

const ProfilePasswordFormHeading =
  (): React.JSX.Element => (
    <div className={PASSWORD_CHANGE_HEADING_BLOCK_CLASS}>
      <ScreenHeader
        title={PROFILE_PASSWORD_FORM_COPY.HEADING}
        titleId={PROFILE_SCREEN_TITLE_ID}
        logoAlt={PROFILE_SCREEN_LOGO_ALT}
      />
      <Text className={PASSWORD_CHANGE_INSTRUCTION_CLASS}>
        {PROFILE_PASSWORD_FORM_COPY.INSTRUCTION}
      </Text>
    </div>
  );

export default ProfilePasswordFormHeading;
