import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
} from "@/app/constants";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";

const DepositsHeading = (): React.JSX.Element => (
  <ScreenHeading
    title={DEPOSITS_REPORT_COPY.PAGE_TITLE}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    logoAlt={IMAGE_ALTS.COMPANY_LOGO}
    instruction={DEPOSITS_REPORT_COPY.PAGE_INSTRUCTION}
  />
);

export default DepositsHeading;
