import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  IMAGE_ALTS,
  WORK_MODE_SCREEN_TITLE_ID,
} from "@/app/constants";
import { WORK_MODE_COPY } from "../constants/WorkModeCopy.constants";

const WorkModeHeading = (): React.JSX.Element => (
  <ScreenHeading
    title={WORK_MODE_COPY.HEADING}
    titleId={WORK_MODE_SCREEN_TITLE_ID}
    logoAlt={IMAGE_ALTS.COMPANY_LOGO}
    instruction={WORK_MODE_COPY.INSTRUCTION}
  />
);

export default WorkModeHeading;
