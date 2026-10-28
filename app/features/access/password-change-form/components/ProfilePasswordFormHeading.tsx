import { Text } from "@/app/components";
import ScreenHeader from "@/app/components/screen-header/ScreenHeader";
import {
  IMAGE_ALTS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { SCREEN_INSTRUCTION_CLASS } from "@/app/components/screen-header/styles/ScreenHeader.styles";
import { PROFILE_PASSWORD_FORM_COPY } from "../constants/ProfilePasswordFormCopy.constants";
import { PASSWORD_CHANGE_HEADING_BLOCK_CLASS } from "../styles/PasswordChangeForm.styles";

const ProfilePasswordFormHeading =
  (): React.JSX.Element => (
    <div className={PASSWORD_CHANGE_HEADING_BLOCK_CLASS}>
      <ScreenHeader
        title={PROFILE_PASSWORD_FORM_COPY.HEADING}
        titleId={PROFILE_SCREEN_TITLE_ID}
        logoAlt={IMAGE_ALTS.COMPANY_LOGO}
      />
      <Text className={SCREEN_INSTRUCTION_CLASS}>
        {PROFILE_PASSWORD_FORM_COPY.INSTRUCTION}
      </Text>
    </div>
  );

export default ProfilePasswordFormHeading;
