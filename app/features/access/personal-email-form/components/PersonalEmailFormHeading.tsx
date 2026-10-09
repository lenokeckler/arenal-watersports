import { Text } from "@/app/components";
import ScreenHeader from "@/app/components/screen-header/ScreenHeader";
import { SCREEN_INSTRUCTION_CLASS } from "@/app/components/screen-header/styles/ScreenHeader.styles";
import {
  IMAGE_ALTS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import { PERSONAL_EMAIL_HEADING_BLOCK_CLASS } from "../styles/PersonalEmailForm.styles";

const PersonalEmailFormHeading = (): React.JSX.Element => (
  <div className={PERSONAL_EMAIL_HEADING_BLOCK_CLASS}>
    <ScreenHeader
      title={PERSONAL_EMAIL_FORM_COPY.HEADING}
      titleId={PROFILE_SCREEN_TITLE_ID}
      logoAlt={IMAGE_ALTS.COMPANY_LOGO}
    />
    <Text className={SCREEN_INSTRUCTION_CLASS}>
      {PERSONAL_EMAIL_FORM_COPY.INSTRUCTION}
    </Text>
  </div>
);

export default PersonalEmailFormHeading;
