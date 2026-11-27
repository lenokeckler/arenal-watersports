import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import { resolveReservationExtraTimePath } from "@/app/utils/reservations/resolveReservationExtraTimePath";
import { RESERVATION_DETAIL_EXTRA_TIME_STATE } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailProps } from "../models/ReservationDetailProps.interface";
import {
  RESERVATION_DETAIL_CHARGE_ACTION_CLASS,
  RESERVATION_DETAIL_EXTRA_TIME_CLASS,
  RESERVATION_DETAIL_EXTRA_TIME_TEXT_CLASS,
} from "../styles/ReservationDetailCharges.styles";
import { formatReservationDetailDuration } from "../utils/formatReservationDetailDuration";

const ReservationDetailExtraTime = ({
  detail,
}: ReservationDetailProps): React.JSX.Element | null =>
  detail.extraTime === null ? null : (
    <div className={RESERVATION_DETAIL_EXTRA_TIME_CLASS}>
      <Text
        className={RESERVATION_DETAIL_EXTRA_TIME_TEXT_CLASS}
      >
        {copy.EXTRA_TIME_STATE[detail.extraTime.state](
          formatReservationDetailDuration(
            detail.extraTime.minutes
          )
        )}
      </Text>
      {detail.extraTime.state ===
      RESERVATION_DETAIL_EXTRA_TIME_STATE.PENDING ? (
        <Link
          href={resolveReservationExtraTimePath(detail.id)}
          ariaLabel={copy.RESOLVE_EXTRA_TIME_LABEL(
            detail.code
          )}
          className={RESERVATION_DETAIL_CHARGE_ACTION_CLASS}
        >
          {copy.RESOLVE_EXTRA_TIME}
        </Link>
      ) : null}
    </div>
  );

export default ReservationDetailExtraTime;
