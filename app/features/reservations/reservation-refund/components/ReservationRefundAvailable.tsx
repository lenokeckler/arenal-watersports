import { Section, Text, Title } from "@/app/components";
import {
  CURRENCY_NAME_COPY,
  TitleVariant,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import {
  RESERVATION_REFUND_CURRENCY_ORDER,
  RESERVATION_REFUND_FIELD_ID,
} from "../constants/ReservationRefundUi.constants";
import { RESERVATION_REFUND_UI_COPY as COPY } from "../constants/ReservationRefundUiCopy.constants";
import type { ReservationRefundAvailableProps } from "../models/ReservationRefundAvailableProps.interface";
import {
  RESERVATION_REFUND_AVAILABLE_GRID_CLASS,
  RESERVATION_REFUND_NOTE_CLASS,
  RESERVATION_REFUND_SUMMARY_CLASS,
  RESERVATION_REFUND_SUMMARY_HEADING_CLASS,
  RESERVATION_REFUND_TERM_CLASS,
  resolveReservationRefundAvailableClassName,
} from "../styles/ReservationRefund.styles";
import { resolveReservationRefundAvailable } from "../utils/resolveReservationRefundAvailable";

const ReservationRefundAvailable = ({
  refund,
}: ReservationRefundAvailableProps): React.JSX.Element => (
  <Section
    ariaLabel={
      RESERVATION_REFUND_FIELD_ID.AVAILABLE_HEADING
    }
    className={RESERVATION_REFUND_SUMMARY_CLASS}
  >
    <Title
      id={RESERVATION_REFUND_FIELD_ID.AVAILABLE_HEADING}
      variant={TitleVariant.SECONDARY}
      text={COPY.AVAILABLE_HEADING}
      className={RESERVATION_REFUND_SUMMARY_HEADING_CLASS}
    />
    <dl className={RESERVATION_REFUND_AVAILABLE_GRID_CLASS}>
      {RESERVATION_REFUND_CURRENCY_ORDER.map((currency) => {
        const amount = resolveReservationRefundAvailable(
          refund.refundable,
          currency
        );

        return (
          <div key={currency}>
            <dt className={RESERVATION_REFUND_TERM_CLASS}>
              {CURRENCY_NAME_COPY[currency]}
            </dt>
            <dd
              className={resolveReservationRefundAvailableClassName(
                amount > 0
              )}
            >
              {amount > 0
                ? formatMoney({ amount, currency })
                : COPY.NOTHING_IN_CURRENCY}
            </dd>
          </div>
        );
      })}
    </dl>
    <Text className={RESERVATION_REFUND_NOTE_CLASS}>
      {COPY.AVAILABLE_NOTE}
    </Text>
  </Section>
);

export default ReservationRefundAvailable;
