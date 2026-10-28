import { IMAGE_ALTS } from "@/app/constants";
import ScreenHeader from "@/app/components/screen-header/ScreenHeader";
import { ACCESS_SCREEN_TITLE_ID } from "./constants/AccessScreen.constants";
import { ACCESS_SCREEN_COPY } from "./constants/AccessScreenCopy.constants";

const AccessScreenHeader = (): React.JSX.Element => (
  <ScreenHeader
    title={ACCESS_SCREEN_COPY.TITLE}
    titleId={ACCESS_SCREEN_TITLE_ID}
    logoAlt={IMAGE_ALTS.COMPANY_LOGO}
  />
);

export default AccessScreenHeader;
