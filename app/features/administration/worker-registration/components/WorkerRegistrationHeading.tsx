import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
} from "@/app/constants";
import { WORKER_REGISTRATION_COPY } from "../constants/WorkerRegistrationCopy.constants";

const WorkerRegistrationHeading = (): React.JSX.Element => (
  <ScreenHeading
    title={WORKER_REGISTRATION_COPY.HEADING}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    logoAlt={IMAGE_ALTS.COMPANY_LOGO}
    instruction={WORKER_REGISTRATION_COPY.INSTRUCTION}
  />
);

export default WorkerRegistrationHeading;
