import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  IMAGE_ALTS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { PROFILE_PASSWORD_FORM_COPY } from "../constants/ProfilePasswordFormCopy.constants";

const ProfilePasswordFormHeading =
  (): React.JSX.Element => (
    <ScreenHeading
      title={PROFILE_PASSWORD_FORM_COPY.HEADING}
      titleId={PROFILE_SCREEN_TITLE_ID}
      logoAlt={IMAGE_ALTS.COMPANY_LOGO}
      instruction={PROFILE_PASSWORD_FORM_COPY.INSTRUCTION}
    />
  );

export default ProfilePasswordFormHeading;
