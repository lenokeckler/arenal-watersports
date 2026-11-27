import { Link, Text } from "@/app/components";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_EXTRA_TIME_FORM_COPY as COPY } from "../constants/ReservationExtraTimeFormCopy.constants";
import {
  RESERVATION_EXTRA_TIME_FIELD_ID,
  RESERVATION_EXTRA_TIME_FOCUS,
} from "../constants/ReservationExtraTimeUi.constants";
import { useReservationExtraTimeSuccessFocus } from "../hooks/useReservationExtraTimeSuccessFocus";
import type { ReservationExtraTimeSuccessProps } from "../models/ReservationExtraTimeSuccessProps.interface";
import {
  RESERVATION_EXTRA_TIME_DETAIL_LINK_CLASS,
  RESERVATION_EXTRA_TIME_DETAILS_CLASS,
  RESERVATION_EXTRA_TIME_STACK_CLASS,
} from "../styles/ReservationExtraTime.styles";
import { formatReservationExtraTimeMinutes } from "../utils/formatReservationExtraTimeMinutes";
import ReservationExtraTimeDetailRow from "./ReservationExtraTimeDetailRow";

const ReservationExtraTimeSuccess = ({
  extraTime,
  recorded,
}: ReservationExtraTimeSuccessProps): React.JSX.Element => {
  useReservationExtraTimeSuccessFocus();

  return (
    <div className={RESERVATION_EXTRA_TIME_STACK_CLASS}>
      <Text
        id={RESERVATION_EXTRA_TIME_FIELD_ID.SUCCESS}
        role={ARIA_ROLE.STATUS}
        tabIndex={RESERVATION_EXTRA_TIME_FOCUS.TAB_INDEX}
      >
        {COPY.SUCCESS[recorded.outcome](extraTime.code)}
      </Text>
      <dl className={RESERVATION_EXTRA_TIME_DETAILS_CLASS}>
        <ReservationExtraTimeDetailRow
          label={COPY.LABEL_MINUTES}
          value={formatReservationExtraTimeMinutes(
            recorded.extraMinutes
          )}
        />
        <ReservationExtraTimeDetailRow
          label={COPY.LABEL_OUTCOME}
          value={COPY.OUTCOME_LABEL[recorded.outcome]}
        />
        {recorded.charge ? (
          <>
            <ReservationExtraTimeDetailRow
              label={COPY.LABEL_AMOUNT}
              value={formatMoney(recorded.charge)}
            />
            <ReservationExtraTimeDetailRow
              label={COPY.LABEL_METHOD}
              value={recorded.charge.paymentMethod}
            />
          </>
        ) : null}
      </dl>
      <Text>
        {COPY.RECORDED_BY(recorded.recordedByName)}
      </Text>
      <Link
        href={PATHS.RESERVATIONS.DETAIL(extraTime.id)}
        className={RESERVATION_EXTRA_TIME_DETAIL_LINK_CLASS}
      >
        {COPY.BACK}
      </Link>
    </div>
  );
};

export default ReservationExtraTimeSuccess;
