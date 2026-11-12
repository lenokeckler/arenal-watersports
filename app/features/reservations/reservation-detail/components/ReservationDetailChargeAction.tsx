import Link from "@/app/components/link/Link";
import { isReservationChargeable } from "@/app/utils/reservations/isReservationChargeable";
import { resolveReservationChargePath } from "@/app/utils/reservations/resolveReservationChargePath";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import { RESERVATION_DETAIL_CHARGE_ACTION_CLASS } from "../styles/ReservationDetailCharges.styles";

const ReservationDetailChargeAction = ({
  detail,
}: ReservationDetailProps): React.JSX.Element | null =>
  isReservationChargeable({
    parentReservationId: detail.parent_reservation_id,
    status: detail.status,
  }) ? (
    <Link
      href={resolveReservationChargePath(detail.id)}
      className={RESERVATION_DETAIL_CHARGE_ACTION_CLASS}
    >
      {copy.REGISTER_CHARGE}
    </Link>
  ) : null;

export default ReservationDetailChargeAction;
