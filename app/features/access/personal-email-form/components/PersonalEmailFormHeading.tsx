import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  IMAGE_ALTS,
  PROFILE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";

const PersonalEmailFormHeading = (): React.JSX.Element => (
  <ScreenHeading
    title={PERSONAL_EMAIL_FORM_COPY.HEADING}
    titleId={PROFILE_SCREEN_TITLE_ID}
    logoAlt={IMAGE_ALTS.COMPANY_LOGO}
    instruction={PERSONAL_EMAIL_FORM_COPY.INSTRUCTION}
  />
);

export default PersonalEmailFormHeading;
