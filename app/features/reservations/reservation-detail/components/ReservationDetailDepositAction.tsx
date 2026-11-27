import Link from "@/app/components/link/Link";
import { RESERVATION_DEPOSIT_DECISION_KIND } from "@/app/constants";
import type { Nullable } from "@/app/types/Nullable";
import { isReservationDepositRecordable } from "@/app/utils/reservations/isReservationDepositRecordable";
import { resolveReservationDepositPath } from "@/app/utils/reservations/resolveReservationDepositPath";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_DEPOSIT_ACTION_CLASS } from "../styles/ReservationDetailCharges.styles";

const ReservationDetailDepositAction = ({
  detail,
}: ReservationDetailProps): Nullable<React.JSX.Element> =>
  detail.deposit.kind ===
    RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED &&
  isReservationDepositRecordable({
    parentReservationId: detail.parent_reservation_id,
    status: detail.status,
  }) ? (
    <Link
      href={resolveReservationDepositPath(detail.id)}
      ariaLabel={copy.RECORD_DEPOSIT_LABEL(detail.code)}
      className={RESERVATION_DETAIL_DEPOSIT_ACTION_CLASS}
    >
      {copy.RECORD_DEPOSIT}
    </Link>
  ) : null;

export default ReservationDetailDepositAction;
