import { Text } from "@/app/components/text/Text";
import { RESERVATIONS_BY_WORKER_COPY } from "./constants/ReservationsByWorkerCopy.constants";
import { RESERVATIONS_BY_WORKER_DOM_ID } from "./constants/ReservationsByWorkerDomId.constants";
import { ARIA_ROLE } from "@/app/constants";
import type { ReservationsByWorkerRecordsProps } from "./models/ReservationsByWorkerRecordsProps.interface";
import { RESERVATIONS_BY_WORKER_LIST_CLASS } from "./styles/ReservationsByWorker.styles";
import ReservationByWorkerCard from "./ReservationByWorkerCard";

const ReservationsByWorkerRecords = ({
  reservations,
}: ReservationsByWorkerRecordsProps): React.JSX.Element =>
  reservations.length === 0 ? (
    <Text>{RESERVATIONS_BY_WORKER_COPY.EMPTY}</Text>
  ) : (
    <div
      id={RESERVATIONS_BY_WORKER_DOM_ID.RESULTS}
      role={ARIA_ROLE.LIST}
      className={RESERVATIONS_BY_WORKER_LIST_CLASS}
    >
      {reservations.map((reservation) => (
        <ReservationByWorkerCard
          key={reservation.id}
          reservation={reservation}
        />
      ))}
    </div>
  );

export default ReservationsByWorkerRecords;
