import { Link, Text } from "@/app/components";
import {
  ARIA_ROLE,
  CURRENCY_NAME_COPY,
  PATHS,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import {
  RESERVATION_CHARGE_FIELD_ID,
  RESERVATION_CHARGE_FOCUS,
} from "../constants/ReservationChargeUi.constants";
import { RESERVATION_CHARGE_UI_COPY } from "../constants/ReservationChargeUiCopy.constants";
import { useReservationChargeSuccessFocus } from "../hooks/useReservationChargeSuccessFocus";
import type { ReservationChargeSuccessProps } from "../models/ReservationChargeSuccessProps.interface";
import {
  RESERVATION_CHARGE_DETAIL_LINK_CLASS,
  RESERVATION_CHARGE_DETAILS_CLASS,
  RESERVATION_CHARGE_STACK_CLASS,
} from "../styles/ReservationCharge.styles";
import ReservationChargeSummaryRow from "./ReservationChargeSummaryRow";

const ReservationChargeSuccess = ({
  code,
  recorded,
  reservationId,
}: ReservationChargeSuccessProps): React.JSX.Element => {
  useReservationChargeSuccessFocus();

  return (
    <div className={RESERVATION_CHARGE_STACK_CLASS}>
      <Text
        id={RESERVATION_CHARGE_FIELD_ID.SUCCESS}
        role={ARIA_ROLE.STATUS}
        tabIndex={RESERVATION_CHARGE_FOCUS.TAB_INDEX}
      >
        {COPY.SUCCESS(code)}
      </Text>
      <dl className={RESERVATION_CHARGE_DETAILS_CLASS}>
        <ReservationChargeSummaryRow
          label={COPY.LABEL_AMOUNT}
          value={formatMoney({
            amount: recorded.amount,
            currency: recorded.currency,
          })}
        />
        <ReservationChargeSummaryRow
          label={COPY.LABEL_CURRENCY}
          value={CURRENCY_NAME_COPY[recorded.currency]}
        />
        <ReservationChargeSummaryRow
          label={COPY.LABEL_METHOD}
          value={recorded.paymentMethod}
        />
      </dl>
      <Text>
        {COPY.RECORDED_BY(recorded.recordedByName)}
      </Text>
      <Link
        href={PATHS.RESERVATIONS.DETAIL(reservationId)}
        className={RESERVATION_CHARGE_DETAIL_LINK_CLASS}
      >
        {RESERVATION_CHARGE_UI_COPY.BACK_TO_RESERVATION}
      </Link>
    </div>
  );
};

export default ReservationChargeSuccess;
