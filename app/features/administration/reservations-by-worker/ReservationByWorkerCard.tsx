import SectionTitle from "@/app/components/section-title/SectionTitle";
import { Text } from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATIONS_BY_WORKER_COPY } from "./constants/ReservationsByWorkerCopy.constants";
import type { ReservationByWorkerCardProps } from "./models/ReservationByWorkerCardProps.interface";
import {
  RESERVATION_RECORD_CLASS,
  RESERVATION_RECORD_CODE_CLASS,
  RESERVATION_RECORD_DETAIL_CLASS,
} from "./styles/ReservationsByWorker.styles";

const ReservationByWorkerCard = ({
  reservation,
}: ReservationByWorkerCardProps): React.JSX.Element => (
  <div
    role={ARIA_ROLE.LISTITEM}
    className={RESERVATION_RECORD_CLASS}
  >
    <SectionTitle
      className={RESERVATION_RECORD_CODE_CLASS}
      text={reservation.code}
    />
    <Text className={RESERVATION_RECORD_DETAIL_CLASS}>
      {RESERVATIONS_BY_WORKER_COPY.CUSTOMER(
        reservation.customerName
      )}
    </Text>
    <Text className={RESERVATION_RECORD_DETAIL_CLASS}>
      {RESERVATIONS_BY_WORKER_COPY.RECORDED_BY(
        reservation.workerName
      )}
    </Text>
  </div>
);

export default ReservationByWorkerCard;
