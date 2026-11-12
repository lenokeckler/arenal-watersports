import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import { ADMINISTRATION_SCREEN_TITLE_ID } from "@/app/constants";
import { WORKER_AREAS_COPY } from "../constants/WorkerAreasCopy.constants";

const WorkerAreasHeading = (): React.JSX.Element => (
  <ScreenHeading
    title={WORKER_AREAS_COPY.HEADING}
    titleId={ADMINISTRATION_SCREEN_TITLE_ID}
    hasLogo={false}
    instruction={WORKER_AREAS_COPY.INSTRUCTION}
  />
);

export default WorkerAreasHeading;
