import Link from "@/app/components/link/Link";
import type { Nullable } from "@/app/types/Nullable";
import { hasReservationRefundable } from "@/app/utils/reservations/hasReservationRefundable";
import { resolveReservationRefundPath } from "@/app/utils/reservations/resolveReservationRefundPath";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_REFUND_ACTION_CLASS } from "../styles/ReservationDetailCharges.styles";

const ReservationDetailRefundAction = ({
  detail,
}: ReservationDetailProps): Nullable<React.JSX.Element> =>
  hasReservationRefundable(detail.refundable) ? (
    <Link
      href={resolveReservationRefundPath(detail.id)}
      ariaLabel={copy.RECORD_REFUND_LABEL(detail.code)}
      className={RESERVATION_DETAIL_REFUND_ACTION_CLASS}
    >
      {copy.RECORD_REFUND}
    </Link>
  ) : null;

export default ReservationDetailRefundAction;
