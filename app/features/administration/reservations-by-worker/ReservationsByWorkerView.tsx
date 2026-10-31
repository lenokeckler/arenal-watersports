import BackLink from "@/app/components/back-link/BackLink";
import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  IMAGE_ALTS,
  PATHS,
} from "@/app/constants";
import { RESERVATIONS_BY_WORKER_COPY } from "./constants/ReservationsByWorkerCopy.constants";
import type { ReservationsByWorkerViewProps } from "./models/ReservationsByWorkerViewProps.interface";
import { RESERVATIONS_BY_WORKER_STACK_CLASS } from "./styles/ReservationsByWorker.styles";
import ReservationsByWorkerPagination from "./ReservationsByWorkerPagination";
import ReservationsByWorkerRecords from "./ReservationsByWorkerRecords";

const ReservationsByWorkerView = ({
  reservationsPage,
}: ReservationsByWorkerViewProps): React.JSX.Element => (
  <div className={RESERVATIONS_BY_WORKER_STACK_CLASS}>
    <ScreenHeading
      title={RESERVATIONS_BY_WORKER_COPY.TITLE}
      titleId={ADMINISTRATION_SCREEN_TITLE_ID}
      logoAlt={IMAGE_ALTS.COMPANY_LOGO}
      instruction={RESERVATIONS_BY_WORKER_COPY.INSTRUCTION}
    />
    <ReservationsByWorkerRecords
      reservations={reservationsPage.items}
    />
    <ReservationsByWorkerPagination
      reservationsPage={reservationsPage}
    />
    <BackLink
      href={PATHS.HOME}
      label={RESERVATIONS_BY_WORKER_COPY.BACK}
    />
  </div>
);

export default ReservationsByWorkerView;
