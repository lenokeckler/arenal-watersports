import Link from "@/app/components/link/Link";
import { Text } from "@/app/components/text/Text";
import type { ReservationsByWorkerPageLinkProps } from "./models/ReservationsByWorkerPageLinkProps.interface";
import {
  RESERVATIONS_BY_WORKER_DISABLED_PAGE_CLASS,
  RESERVATIONS_BY_WORKER_PAGE_LINK_CLASS,
} from "./styles/ReservationsByWorker.styles";
import { buildReservationsByWorkerPath } from "./utils/buildReservationsByWorkerPath";

const ReservationsByWorkerPageLink = ({
  isEnabled,
  label,
  targetPageIndex,
}: ReservationsByWorkerPageLinkProps): React.JSX.Element =>
  isEnabled ? (
    <Link
      href={buildReservationsByWorkerPath(targetPageIndex)}
      className={RESERVATIONS_BY_WORKER_PAGE_LINK_CLASS}
    >
      {label}
    </Link>
  ) : (
    <Text
      className={RESERVATIONS_BY_WORKER_DISABLED_PAGE_CLASS}
    >
      {label}
    </Text>
  );

export default ReservationsByWorkerPageLink;
