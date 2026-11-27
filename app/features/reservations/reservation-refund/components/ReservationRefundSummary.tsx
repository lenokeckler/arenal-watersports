import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_REFUND_FIELD_ID } from "../constants/ReservationRefundUi.constants";
import { RESERVATION_REFUND_UI_COPY as COPY } from "../constants/ReservationRefundUiCopy.constants";
import type { ReservationRefundSummaryProps } from "../models/ReservationRefundSummaryProps.interface";
import {
  RESERVATION_REFUND_CODE_CLASS,
  RESERVATION_REFUND_DETAILS_CLASS,
  RESERVATION_REFUND_SUMMARY_CLASS,
  RESERVATION_REFUND_SUMMARY_HEADING_CLASS,
} from "../styles/ReservationRefund.styles";
import { formatReservationRefundDate } from "../utils/formatReservationRefundDate";
import ReservationRefundSummaryRow from "./ReservationRefundSummaryRow";

const ReservationRefundSummary = ({
  refund,
}: ReservationRefundSummaryProps): React.JSX.Element => (
  <Section
    ariaLabel={RESERVATION_REFUND_FIELD_ID.SUMMARY_HEADING}
    className={RESERVATION_REFUND_SUMMARY_CLASS}
  >
    <div>
      <Title
        id={RESERVATION_REFUND_FIELD_ID.SUMMARY_HEADING}
        variant={TitleVariant.SECONDARY}
        text={COPY.SUMMARY_HEADING}
        className={RESERVATION_REFUND_SUMMARY_HEADING_CLASS}
      />
      <Text className={RESERVATION_REFUND_CODE_CLASS}>
        {refund.code}
      </Text>
    </div>
    <dl className={RESERVATION_REFUND_DETAILS_CLASS}>
      <ReservationRefundSummaryRow
        label={COPY.LABEL_CUSTOMER}
        value={refund.customerName}
      />
      <ReservationRefundSummaryRow
        label={COPY.LABEL_DATE_TIME}
        value={COPY.CURRENT_DATE_TIME(
          formatReservationRefundDate(refund.date),
          refund.time
        )}
      />
    </dl>
  </Section>
);

export default ReservationRefundSummary;
